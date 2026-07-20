/** Canonical links. Override at build for forks / Pages. */
export const repoHref =
  import.meta.env.PUBLIC_REPO_URL ?? 'https://github.com/sollabs-tech/sollabs.tech';

export const brandName = 'Sol Labs';
export const companyLegalName = 'Sol Labs';
export const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://sollabs.tech';

export const basePath = import.meta.env.BASE_URL;

const withBase = (path: string) => {
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
};

export const engageHref = withBase('/engage/');
export const contactEmail = 'hello@sollabs.tech';
export const calUrl = import.meta.env.PUBLIC_CAL_URL ?? '';
export const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN ?? 'sollabs.tech';
export { withBase };

export const projects = {
  kanto: { name: 'Kanto', href: 'https://kanto.ai' },
  pulsys: { name: 'Pulsys', href: 'https://pulsys.io' },
  slerp: { name: 'Slerp', href: 'https://slerp.audio' },
} as const;

/**
 * ICP: Head / VP of Platform (and DevSecOps leads) at B2B product companies on GCP —
 * especially teams going upmarket where enterprise security reviews, SOC 2, and AI fleet
 * cost become blockers. Firm-scale refs: Zencore, Out.Cloud.
 * Gate: npm run audit:copy
 */
export const marketing = {
  // Meta only — Zencore partner category language
  pageDescription:
    'Sol Labs is a Google Cloud consulting and engineering partner — platform engineering, GKE SOC 2 readiness, and AI infrastructure.',

  /**
   * Home hero — Zencore named practice + ZenBuild consulting lead (not Out.Cloud IDP product copy).
   * CTAs: locked allowlist only.
   * Refs: https://zencore.dev/ (ZenBuild: Implementation Services)
   */
  heroTitle: 'Platform Engineering',
  // Zencore ZenBuild exact
  heroLead: 'Advisory and hands-on implementation services delivered globally.',
  heroPrimaryCta: "Let's Talk",
  heroPrimaryHref: '/engage/',
  heroSecondaryCta: 'Learn more',
  heroSecondaryHref: '/services/platform-engineering/',

  primaryCta: "Let's Talk",
  // Inner pages only
  categoryEyebrow: 'Google Cloud consulting & engineering',

  // Citation matrix: Buoyant “My Services” → firm “Our services” (nav-aligned catalog)
  capabilitiesTitle: 'Our services',

  // Citation matrix — Buoyant buyer pains (structure only; distinct from service bodies)
  challenges: [
    {
      serviceSlug: 'platform-engineering',
      title: "Architecture that can't keep up with growth",
      body: 'Environments drift, delivery slows, and every new service adds process instead of leverage.',
    },
    {
      serviceSlug: 'gke-soc2-readiness',
      title: 'Security and compliance blocking your roadmap',
      body: 'Enterprise reviews and SOC 2 expose gaps in access, change control, and evidence — procurement stalls until the platform can answer.',
    },
    {
      serviceSlug: 'ai-infrastructure',
      title: 'Rising cloud costs without clear visibility',
      body: 'Idle infrastructure and unclear ownership drive spend up while AI fleets wait before useful work starts.',
    },
    {
      serviceSlug: 'application-development',
      title: 'Build vs buy blocking what you ship next',
      body: 'Teams stall choosing between GCP managed services and a custom build — and the wrong call wastes quarters of engineering time.',
    },
  ] as const,

  /**
   * Services ↔ case studies are linked by caseStudySlug (never by array index).
   * Platform Engineering is the general lane; Kanto proves GKE SOC 2 Readiness only.
   */
  services: [
    {
      slug: 'platform-engineering',
      title: 'Platform Engineering',
      // Zencore ZenBuild exact — consulting delivery, not an IDP product
      body: 'Advisory and hands-on implementation services delivered globally.',
      href: '/services/platform-engineering/',
      caseStudySlug: null as string | null,
    },
    {
      slug: 'gke-soc2-readiness',
      title: 'GKE SOC 2 Readiness',
      body: 'Regulatory-ready GKE foundations: reviewable delivery, identity-scoped access, and evidence that enterprise security questionnaires can trust.',
      href: '/services/gke-soc2-readiness/',
      caseStudySlug: 'kanto',
    },
    {
      slug: 'ai-infrastructure',
      title: 'AI Infrastructure',
      body: 'Production AI platforms on Google Cloud — lower idle cost, faster scale-out, and infrastructure your team can operate.',
      href: '/services/ai-infrastructure/',
      caseStudySlug: 'pulsys',
    },
    {
      slug: 'application-development',
      title: 'Application Development on Google Cloud',
      body: 'Ship production apps on Cloud Run, GKE, and Vertex AI — after a build-vs-buy assessment so you do not custom-build what Google Cloud already sells.',
      href: '/services/application-development/',
      caseStudySlug: 'slerp',
    },
  ] as const,

  // Labs — Sol Labs' own builds, not client work (ref: Google Labs / Vercel Labs / Cloudflare)
  caseStudiesTitle: 'Labs',
  caseStudiesLead: '',
  // Honest per-item descriptor (user-selected)
  caseStudyKind: 'In-house project',
  // Zencore short CTA
  caseStudyCta: 'Learn more',
  caseStudies: [
    {
      slug: 'kanto',
      name: 'Kanto',
      eyebrow: 'In-house project',
      serviceSlug: 'gke-soc2-readiness',
      title: 'GKE delivery that stands up to SOC 2 and enterprise review',
      summary:
        'How Sol Labs built a centralized delivery model for private GKE — reviewable changes, less standing access, and an operating model the team can own when auditors and customers ask.',
      body: 'One consistent delivery path across GCP environments — with change history and access model that security reviews can inspect.',
      metric: 'Less manual access · consistent change control',
      href: '/work/kanto/',
      image: '/proof/gke-soc2-readiness.webp',
      alt: 'Kanto — Sol Labs GKE delivery platform',
      area: 'GKE SOC 2 Readiness',
      focus: 'Audit-ready delivery, access, and change control on GKE',
      project: 'Sol Labs internal platform',
      businessProblem:
        'As GKE estates grow, releases slow down, access sprawls, and enterprise security reviews expose gaps in change control and evidence. SOC 2 and customer questionnaires stall until the platform can prove how delivery and access actually work.',
      needs: [
        'One consistent delivery model across GKE environments',
        'Less standing access to cluster control planes',
        'A reviewable history for infrastructure and application changes',
        'Evidence the team can reuse in SOC 2 and enterprise questionnaires',
      ],
      approach:
        'Sol Labs built a centralized delivery model: infrastructure and application changes move through Git review, access is identity-based and scoped to delivery, and private GKE environments stay consistent as the platform grows.',
      beforeAfter: [
        ['Separate access paths per environment', 'Centralized delivery across environments'],
        ['Manual or inconsistent changes', 'Changes reviewed and recorded in Git'],
        ['Verbal answers to security questionnaires', 'Documented delivery and access model'],
      ],
      results: [
        'Infrastructure changes require human review before merge',
        'Application delivery is managed consistently across environments',
        'Private cluster APIs do not need to be exposed publicly for centralized delivery',
      ],
      projectHref: projects.kanto.href,
      projectCta: 'View project',
    },
    {
      slug: 'pulsys',
      name: 'Pulsys',
      eyebrow: 'In-house project',
      serviceSlug: 'ai-infrastructure',
      title: 'Lower AI infrastructure cost and startup delay',
      summary:
        'Reduced idle compute wait, shorter worker startup, and previously fetched models available when upstream delivery was slow or unavailable.',
      body: 'Less paid compute sitting idle while workers wait — faster scale-out, and models that stay available when an upstream service is disrupted.',
      metric: 'Warm Qwen download measured at 664 MiB/s',
      href: '/work/pulsys/',
      image: '/proof/ai-infrastructure.webp',
      alt: 'Pulsys — Sol Labs measured model delivery speed',
      area: 'AI Infrastructure',
      focus: 'Cost, startup speed, and availability',
      project: 'Sol Labs internal infrastructure',
      businessProblem:
        'AI fleets often wait on model files before useful work begins. That idle time increases cloud cost, slows scale-out and recovery, and makes production dependent on an external service the team does not control.',
      needs: [
        'Shorter startup time for new workers and jobs',
        'Less paid compute time lost while workers wait',
        'Better availability when upstream delivery is slow or down',
        'Measured change in startup time and infrastructure cost',
      ],
      approach:
        'Sol Labs built shared model-delivery infrastructure under the team’s control. The first request retrieves and stores a model; later workers receive it locally. Existing clients continue without application rewrites.',
      beforeAfter: [
        ['Every worker waits on a public download', 'One upstream transfer serves later workers'],
        ['Startup speed depends on internet and upstream load', 'Previously fetched models are delivered locally'],
        ['Cached models unavailable when upstream fails', 'Cached models remain available without an upstream request'],
      ],
      results: [
        '664 MiB/s measured warm download for Qwen2.5-7B-Instruct',
        'Up to 90 GB/s measured throughput in the published EC2 reference run',
        'Cached-only operation serves existing models without contacting the upstream service',
      ],
      projectHref: projects.pulsys.href,
      projectCta: 'View benchmark source',
    },
    {
      slug: 'slerp',
      name: 'Slerp',
      eyebrow: 'In-house project',
      serviceSlug: 'application-development',
      title: 'On-device AI inference that keeps media on the machine',
      summary:
        'A browser music visualizer that runs model inference on-device with WebGPU and ONNX — audio analysis, playback, and visuals stay local, so a performer’s set never leaves the machine.',
      body: 'Inference runs in the browser on WebGPU; audio and media stay on the local machine instead of being uploaded to a server.',
      metric: 'Inference runs on-device · media never uploaded',
      href: '/work/slerp/',
      image: '/proof/private-vj-inference.webp',
      alt: 'Slerp — Sol Labs in-browser, on-device inference visualizer',
      area: 'On-device AI inference',
      focus: 'On-device inference, privacy, and live control in the browser',
      project: 'Sol Labs internal product',
      businessProblem:
        'Browser tools that require uploading media lose a performer’s trust before the first use. Sending audio or model workloads to a server adds latency, cost, and a retention policy the user has to trust.',
      needs: [
        'Run model inference in the browser, not on a server',
        'Keep audio and media on the local machine',
        'Offer real live controls (EQ, MIDI, editable GLSL)',
        'Make the privacy model obvious to the user',
      ],
      approach:
        'Slerp runs model inference on-device with WebGPU and ONNX, audio analysis with Web Audio, and visuals with real-time WebGL shaders. Music files load from the local machine; playback, analysis, and inference run in the browser without upload.',
      beforeAfter: [
        ['Media uploaded to a server for processing', 'Files stay on the local machine'],
        ['Inference runs remotely with per-request cost and latency', 'Inference runs on-device via WebGPU and ONNX'],
        ['Trust depends on a server retention policy', 'Nothing to upload; the set never leaves the machine'],
      ],
      results: [
        'Model inference runs in the browser on WebGPU with ONNX',
        'Audio analysis and playback run locally via Web Audio',
        'Real-time WebGL visuals with EQ, MIDI mapping, and editable GLSL',
        'No upload path — performance media stays on the machine',
      ],
      projectHref: projects.slerp.href,
      projectCta: 'Open Slerp',
    },
  ] as const,

  methodTitle: 'From first call to live platform',
  methodSteps: [
    {
      title: 'Discovery',
      body: 'We map your current state, tooling, compliance requirements, team topology, and identify the highest-leverage starting points.',
    },
    {
      title: 'Architecture',
      body: 'We design the platform blueprint: golden paths, integration points, security boundaries, and the metrics that prove ROI.',
    },
    {
      title: 'Build & Embed',
      body: 'Our engineers work alongside your teams, building, training and transferring ownership. Not a hand-off. An embedding.',
    },
  ] as const,

  finalCtaHeadline: 'Ready to ship faster with less overhead?',
  finalCtaLead:
    '30 minutes. No slides. Just an honest conversation about where you are and what it would take to get you there.',
  finalPrimaryCta: "Let's Talk",
  clarityLine: 'No commitment. No vendor pitch. Just the conversation your platform team needs.',

  faqTitle: 'FAQ',
  faq: [] as const,
} as const;

export const outcomes = {
  'platform-engineering': {
    slug: 'platform-engineering',
    featured: true,
    caseStudySlug: null as string | null,
    caseStudyName: '',
    projectHref: engageHref,
    title: 'Platform Engineering on Google Cloud.',
    // Zencore ZenBuild exact
    lead: 'Advisory and hands-on implementation services delivered globally.',
    // Zencore firm line (name swap) — consulting partner, not product
    pageDescription:
      'Sol Labs is a Google Cloud consulting and engineering partner — platform engineering and infrastructure modernization on Google Cloud.',
    painTitle: "Architecture that can't keep up with growth",
    painBody:
      'Environments drift, delivery slows, and every new service adds process instead of leverage.',
    caseStudyTitle: '',
    caseStudyBody: '',
    // Zencore capability labels (chip row / services list)
    work: [
      'Infrastructure Modernization',
      'Cloud Native Infrastructure',
      'Application Development',
      'Security',
    ],
    blogSlug: 'zero-trust-gitops-gke-connect',
    cta: "Let's Talk",
    // Service-page depth — modeled on Zencore "Cloud Native Infrastructure"
    // (zencore.dev/solutions/cloud-native-infrastructure/): overview line +
    // capability blocks, adapted to Sol Labs' GCP/GKE delivery.
    overview:
      'We build and run the Google Cloud foundation your product teams ship on — so you deliver faster, more reliably, at a lower cost.',
    capabilities: [
      {
        title: 'Cloud Foundations',
        body: 'The core building blocks — Infrastructure as Code, policy governance, identity and access management, and networking — implemented as a rock-solid foundation for everything you deploy on Google Cloud.',
      },
      {
        title: 'GKE & Kubernetes',
        body: 'From your first workload to a large fleet: cluster design, application packaging, deployment automation, and tuning across the full Kubernetes lifecycle.',
      },
      {
        title: 'Software Delivery Automation',
        body: 'Modern CI/CD and a secure software supply chain — pipeline design, golden paths, and reviewable delivery your engineers can own.',
      },
      {
        title: 'Cloud Cost Optimization',
        body: 'Assessments and continuous optimization to find and remove waste, so spend tracks the work actually being done.',
      },
    ],
  },
  'gke-soc2-readiness': {
    slug: 'gke-soc2-readiness',
    featured: true,
    caseStudySlug: 'kanto',
    caseStudyName: 'Kanto',
    projectHref: projects.kanto.href,
    title: 'GKE SOC 2 Readiness.',
    lead: 'Compliance by default on GKE — so security reviews and SOC 2 stop blocking enterprise deals.',
    pageDescription:
      'GKE SOC 2 readiness — audit-ready delivery, identity-scoped access, and evidence for enterprise security reviews.',
    painTitle: 'Enterprise reviews and SOC 2 expose GKE gaps',
    painBody:
      'SOC 2 audits and customer security questionnaires expose IAM sprawl, weak change control, and missing evidence. Deals stall until the platform can prove how delivery and access work — with documentation, not verbal assurances.',
    caseStudyTitle: 'Kanto',
    caseStudyBody:
      'Kanto is the case study for this offer: centralized, reviewable delivery for private GKE environments, with an access and change model built for audit and enterprise review.',
    work: [
      'Reviewable infrastructure and application delivery on GKE',
      'Identity-scoped access instead of standing cluster credentials',
      'Evidence packs for SOC 2 and enterprise questionnaires',
      'An operating model your engineers can own after the engagement',
    ],
    blogSlug: 'soc2-gke-series-b',
    cta: "Let's Talk",
    overview:
      'GKE foundations built for enterprise security review — so SOC 2 audits and customer questionnaires stop blocking deals.',
    capabilities: [
      {
        title: 'Reviewable Delivery on GKE',
        body: 'Infrastructure and application changes move through Git review, with a recorded history security teams can inspect.',
      },
      {
        title: 'Identity-Scoped Access',
        body: 'Identity-based access scoped to delivery, replacing standing credentials on cluster control planes.',
      },
      {
        title: 'SOC 2 Evidence Packs',
        body: 'Documented delivery and access models your team can reuse in SOC 2 audits and enterprise security questionnaires.',
      },
      {
        title: 'An Operating Model You Own',
        body: 'A consistent, private-GKE operating model your engineers can run after the engagement ends.',
      },
    ],
  },
  'ai-infrastructure': {
    slug: 'ai-infrastructure',
    featured: true,
    caseStudySlug: 'pulsys',
    caseStudyName: 'Pulsys',
    projectHref: projects.pulsys.href,
    title: 'AI Infrastructure on Google Cloud.',
    lead: 'Innovative solutions to leverage Artificial Intelligence on Google Cloud.',
    pageDescription:
      'AI infrastructure on Google Cloud — cut idle compute cost, shorten startup, improve availability.',
    painTitle: 'AI fleets burn money before work starts',
    painBody:
      'Workers sit idle while models load. Scale-out is slow, recovery is expensive, and spend grows without clear ownership. The gap is production infrastructure — not another demo.',
    caseStudyTitle: 'Pulsys',
    caseStudyBody:
      'Pulsys is the case study for this offer: measured reductions in startup wait and idle cost, with cached models available when upstream delivery is slow or unavailable.',
    work: [
      'Shorten startup time for CI, training, and inference workers',
      'Reduce paid compute time lost while workers wait',
      'Improve availability during upstream disruption',
      'Measure the change in startup time and infrastructure cost',
    ],
    blogSlug: 'vllm-hf-gpu-idle',
    cta: "Let's Talk",
    overview:
      'Production AI infrastructure on Google Cloud — less idle compute, faster scale-out, and models available when you need them.',
    capabilities: [
      {
        title: 'Faster Worker Startup',
        body: 'Shorten startup time for CI, training, and inference workers so paid compute spends less time waiting on model files.',
      },
      {
        title: 'Shared Model Delivery',
        body: 'Model-delivery infrastructure under your control: the first request fetches and stores a model, later workers receive it locally — no application rewrites.',
      },
      {
        title: 'Availability Under Disruption',
        body: 'Previously fetched models stay available when an upstream service is slow or unavailable.',
      },
      {
        title: 'Measured Cost & Speed',
        body: 'Measure the change in startup time and infrastructure cost — warm Qwen2.5-7B download measured at 664 MiB/s.',
      },
    ],
  },
  'application-development': {
    slug: 'application-development',
    featured: true,
    caseStudySlug: 'slerp',
    caseStudyName: 'Slerp',
    projectHref: projects.slerp.href,
    title: 'Application Development on Google Cloud.',
    lead: 'Ship production apps on Cloud Run, GKE, and Vertex AI — starting with a build-vs-buy assessment so you do not custom-build what Google Cloud already sells.',
    pageDescription:
      'Application development on Google Cloud — build-vs-buy assessment, Cloud Run and GKE delivery, and Vertex AI in product workflows.',
    painTitle: 'Build vs buy blocking what you ship next',
    painBody:
      'Product and platform teams stall between buying a managed GCP service and building custom software. The wrong choice burns engineering quarters — or leaves you maintaining something Google already operates better.',
    caseStudyTitle: 'Slerp',
    caseStudyBody:
      'Slerp is the in-house proof for this offer: a shipped browser application with on-device inference, WebGPU visuals, and a local-first trust model — built because off-the-shelf tools did not fit the performance and privacy bar.',
    work: [
      'Build-vs-buy assessment mapped to your GCP estate',
      'Production apps on Cloud Run, GKE, and managed data services',
      'Vertex AI integrated into product workflows where models add value',
      'Handoff your engineers can operate after the engagement',
    ],
    blogSlug: 'vj-trust-local-audio',
    cta: "Let's Talk",
    overview:
      'We help you decide what to build on Google Cloud versus what to buy — then ship the build with production delivery on Cloud Run, GKE, and Vertex AI.',
    capabilities: [
      {
        title: 'Build vs Buy Assessment',
        body: 'A structured read on managed GCP services versus custom software — so you do not spend quarters building what BigQuery, Pub/Sub, or a SaaS partner already covers.',
      },
      {
        title: 'Cloud Run & GKE Delivery',
        body: 'Production application delivery on Google Cloud — containerized services, CI/CD, identity, and observability your team can own.',
      },
      {
        title: 'Vertex AI in Product Workflows',
        body: 'Where models belong in the product: inference paths, cost controls, and IAM-bound access — not a demo bolted onto an app.',
      },
      {
        title: 'Handoff Your Team Operates',
        body: 'Reviewable delivery, documentation, and pairing so your engineers run what we ship — not a black box you inherit.',
      },
    ],
  },
  'private-vj-inference': {
    slug: 'private-vj-inference',
    featured: false,
    caseStudySlug: null as string | null,
    caseStudyName: 'Slerp',
    projectHref: projects.slerp.href,
    title: 'Product engineering with private inference.',
    lead: 'In-browser analysis. Music stays local.',
    pageDescription:
      'Audio-reactive visuals with local playback and analysis in the browser.',
    painTitle: 'Most web visualizers want your stems.',
    painBody:
      'Working VJs keep media local for a reason. A web app that requires upload loses trust before the first drop.',
    caseStudyTitle: 'Slerp',
    caseStudyBody:
      'Slerp creates audio-reactive visuals in the browser while music remains on the local machine.',
    work: [
      'Keep music on the local machine',
      'Create responsive audio-reactive visuals',
      'Support live controls for performance',
      'Make the privacy model clear to the user',
    ],
    blogSlug: 'vj-trust-local-audio',
    cta: 'Open Slerp',
    overview:
      'Audio-reactive visuals generated in the browser, with music that never leaves the local machine.',
    capabilities: [
      {
        title: 'Local-First Playback',
        body: 'Music stays on the local machine — no upload required.',
      },
      {
        title: 'Responsive Visuals',
        body: 'Audio-reactive visuals generated in-browser, in real time.',
      },
      {
        title: 'Live Performance Controls',
        body: 'Controls built for live VJ performance.',
      },
      {
        title: 'A Clear Privacy Model',
        body: 'The privacy model is obvious to the user from the first interaction.',
      },
    ],
  },
} as const;

export type OutcomeSlug = keyof typeof outcomes;

export function caseStudyBySlug(slug: string | null | undefined) {
  if (!slug) return undefined;
  return marketing.caseStudies.find((c) => c.slug === slug);
}
