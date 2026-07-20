/**
 * Hero background: a low-poly paper airplane banking through a Tron-style
 * wireframe terrain (blue, to match brand) that scrolls toward the camera.
 *
 * Raw WebGL, zero dependencies. On mobile or when the user prefers reduced
 * motion we never initialise, so the CSS gradient fallback stays in place.
 */

type Vec3 = [number, number, number];
type Mat4 = Float32Array;

// ---------------------------------------------------------------------------
// Tiny column-major mat4 / vec3 helpers (only what this scene needs).
// ---------------------------------------------------------------------------

function mat4(): Mat4 {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
}

function perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) * nf;
  m[11] = -1;
  m[14] = 2 * far * near * nf;
  return m;
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function lookAt(eye: Vec3, center: Vec3, up: Vec3): Mat4 {
  const f = normalize(sub(center, eye));
  const s = normalize(cross(f, up));
  const u = cross(s, f);
  const m = mat4();
  m[0] = s[0];
  m[4] = s[1];
  m[8] = s[2];
  m[1] = u[0];
  m[5] = u[1];
  m[9] = u[2];
  m[2] = -f[0];
  m[6] = -f[1];
  m[10] = -f[2];
  m[12] = -(s[0] * eye[0] + s[1] * eye[1] + s[2] * eye[2]);
  m[13] = -(u[0] * eye[0] + u[1] * eye[1] + u[2] * eye[2]);
  m[14] = f[0] * eye[0] + f[1] * eye[1] + f[2] * eye[2];
  return m;
}

// ---------------------------------------------------------------------------
// Shader helpers.
// ---------------------------------------------------------------------------

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('createShader failed');
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Shader compile error: ' + log);
  }
  return shader;
}

function program(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string): WebGLProgram {
  const prog = gl.createProgram();
  if (!prog) throw new Error('createProgram failed');
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('Program link error: ' + gl.getProgramInfoLog(prog));
  }
  return prog;
}

// ---------------------------------------------------------------------------
// Palette (brand blue).
// ---------------------------------------------------------------------------

const BG_TOP: Vec3 = [0.024, 0.063, 0.094]; // #061018
const BG_BOTTOM: Vec3 = [0.047, 0.133, 0.219]; // #0c2238
const FOG: Vec3 = [0.035, 0.094, 0.157];
const LINE: Vec3 = [0.24, 0.56, 1.0];

// ---------------------------------------------------------------------------
// Geometry: wireframe terrain grid + low-poly paper airplane.
// ---------------------------------------------------------------------------

const GRID_X = 60; // columns
const GRID_Z = 120; // rows
const GRID_WIDTH = 70;
const GRID_NEAR = 8;
const GRID_DEPTH = 100;

function buildTerrain(): { positions: Float32Array; indices: Uint16Array } {
  const cols = GRID_X + 1;
  const rows = GRID_Z + 1;
  const positions = new Float32Array(cols * rows * 2);
  let p = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = (i / GRID_X - 0.5) * GRID_WIDTH;
      const z = GRID_NEAR - (j / GRID_Z) * GRID_DEPTH;
      positions[p++] = x;
      positions[p++] = z;
    }
  }

  const idx: number[] = [];
  const at = (i: number, j: number) => j * cols + i;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < GRID_X; i++) {
      idx.push(at(i, j), at(i + 1, j));
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < GRID_Z; j++) {
      idx.push(at(i, j), at(i, j + 1));
    }
  }
  return { positions, indices: new Uint16Array(idx) };
}

// ---------------------------------------------------------------------------
// Main entry.
// ---------------------------------------------------------------------------

export function initHero(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 800px)').matches;
  if (reduceMotion || isMobile) return; // CSS gradient fallback stays visible.

  const gl =
    canvas.getContext('webgl', { antialias: true, alpha: false }) ??
    canvas.getContext('experimental-webgl', { antialias: true, alpha: false });
  if (!(gl instanceof WebGLRenderingContext)) return;

  // --- Background gradient (fullscreen quad) ---
  const bgProg = program(
    gl,
    `attribute vec2 aPos; varying float vY;
     void main(){ vY = aPos.y * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`,
    `precision mediump float; varying float vY; uniform vec3 uTop; uniform vec3 uBot;
     void main(){ gl_FragColor = vec4(mix(uBot, uTop, vY), 1.0); }`,
  );
  const bgBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const bgLoc = {
    aPos: gl.getAttribLocation(bgProg, 'aPos'),
    uTop: gl.getUniformLocation(bgProg, 'uTop'),
    uBot: gl.getUniformLocation(bgProg, 'uBot'),
  };

  // --- Terrain ---
  const terrainProg = program(
    gl,
    `attribute vec2 aXZ;
     uniform mat4 uProj, uView;
     uniform float uScroll, uCell;
     varying float vFog;
     varying float vHeight;
     float terrain(float x, float z){
       float valley = smoothstep(4.0, 17.0, abs(x));
       float h = 0.0;
       h += sin(x * 0.12) * 1.4;
       h += sin(z * 0.09) * 1.9;
       h += sin(x * 0.07 + z * 0.05) * 2.7;
       h += sin(x * 0.31 + z * 0.17) * 0.5;
       h *= valley;
       h += sin(x * 0.5) * 0.14 + sin(z * 0.42) * 0.14;
       return h - 2.2;
     }
     void main(){
       // Scroll the whole grid toward the camera and wrap every cell, so the
       // lines physically travel (sense of speed), while the height field is
       // sampled at the true world position for a seamless infinite terrain.
       float o = mod(uScroll, uCell);
       float drawnZ = aXZ.y + o;
       float y = terrain(aXZ.x, drawnZ - uScroll);
       vec4 world = vec4(aXZ.x, y, drawnZ, 1.0);
       vec4 viewPos = uView * world;
       gl_Position = uProj * viewPos;
       float dist = -viewPos.z;
       vFog = clamp((dist - 12.0) / 68.0, 0.0, 1.0);
       vHeight = y;
     }`,
    `precision mediump float;
     varying float vFog;
     varying float vHeight;
     uniform vec3 uLine, uFog;
     void main(){
       vec3 col = uLine + vec3(0.10, 0.02, 0.22) * clamp(vHeight * 0.16, 0.0, 1.0);
       col = mix(col, uFog, vFog);
       gl_FragColor = vec4(col, 1.0);
     }`,
  );
  const terrain = buildTerrain();
  const terrainPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, terrainPos);
  gl.bufferData(gl.ARRAY_BUFFER, terrain.positions, gl.STATIC_DRAW);
  const terrainIdx = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainIdx);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, terrain.indices, gl.STATIC_DRAW);
  const tLoc = {
    aXZ: gl.getAttribLocation(terrainProg, 'aXZ'),
    uProj: gl.getUniformLocation(terrainProg, 'uProj'),
    uView: gl.getUniformLocation(terrainProg, 'uView'),
    uScroll: gl.getUniformLocation(terrainProg, 'uScroll'),
    uCell: gl.getUniformLocation(terrainProg, 'uCell'),
    uLine: gl.getUniformLocation(terrainProg, 'uLine'),
    uFog: gl.getUniformLocation(terrainProg, 'uFog'),
  };
  const CELL = GRID_DEPTH / GRID_Z;
  const SCROLL_SPEED = 13; // world units / sec toward the camera

  // --- Sizing ---
  let proj = mat4();
  const view = lookAt([0, 3.0, 6.5], [0, 0.4, -12], [0, 1, 0]);

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    proj = perspective((52 * Math.PI) / 180, canvas.width / canvas.height, 0.1, 220);
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // --- Render loop ---
  gl.enable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);

  let raf = 0;
  let start = performance.now();
  let last = start;
  let scroll = 0;
  let ready = false;

  function frame(now: number): void {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    scroll += dt * SCROLL_SPEED;

    gl.clearColor(BG_TOP[0], BG_TOP[1], BG_TOP[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Background gradient — no depth.
    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.useProgram(bgProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, bgBuf);
    gl.enableVertexAttribArray(bgLoc.aPos);
    gl.vertexAttribPointer(bgLoc.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.uniform3fv(bgLoc.uTop, BG_TOP);
    gl.uniform3fv(bgLoc.uBot, BG_BOTTOM);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.depthMask(true);
    gl.enable(gl.DEPTH_TEST);

    // Terrain wireframe.
    gl.useProgram(terrainProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainPos);
    gl.enableVertexAttribArray(tLoc.aXZ);
    gl.vertexAttribPointer(tLoc.aXZ, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, terrainIdx);
    gl.uniformMatrix4fv(tLoc.uProj, false, proj);
    gl.uniformMatrix4fv(tLoc.uView, false, view);
    gl.uniform1f(tLoc.uScroll, scroll);
    gl.uniform1f(tLoc.uCell, CELL);
    gl.uniform3fv(tLoc.uLine, LINE);
    gl.uniform3fv(tLoc.uFog, FOG);
    gl.drawElements(gl.LINES, terrain.indices.length, gl.UNSIGNED_SHORT, 0);

    if (!ready) {
      ready = true;
      canvas.classList.add('is-ready');
    }
    raf = requestAnimationFrame(frame);
  }

  function play(): void {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function pause(): void {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else play();
  });

  play();
}
