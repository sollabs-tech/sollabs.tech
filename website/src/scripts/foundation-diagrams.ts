/**
 * GCP foundation diagram viewer — step selector, lazy-loaded SVG preview,
 * native dialog fullscreen with keyboard navigation.
 */

export type FoundationDiagram = {
  title: string;
  caption: string;
  src: string;
};

const loaded = new Set<string>();

function prefetch(src: string) {
  if (loaded.has(src)) return;
  const img = new Image();
  img.src = src;
  loaded.add(src);
}

function setPreviewImg(img: HTMLImageElement, src: string, title: string) {
  if (img.dataset.src === src && img.src === src) return;
  img.dataset.src = src;
  img.alt = title;
  img.removeAttribute('src');
  img.classList.add('foundation-viewer__preview-img--loading');
  const loader = new Image();
  loader.onload = () => {
    if (img.dataset.src !== src) return;
    img.src = src;
    img.classList.remove('foundation-viewer__preview-img--loading');
    loaded.add(src);
  };
  loader.src = src;
}

export function initFoundationDiagrams(root: HTMLElement | null) {
  if (!root) return;

  const raw = root.dataset.diagrams;
  if (!raw) return;

  let diagrams: FoundationDiagram[];
  try {
    diagrams = JSON.parse(raw) as FoundationDiagram[];
  } catch {
    return;
  }
  if (!diagrams.length) return;

  let current = 0;
  let dialogIndex = 0;

  const steps = root.querySelectorAll<HTMLButtonElement>('[data-foundation-step]');
  const previewBtn = root.querySelector<HTMLButtonElement>('[data-foundation-preview]');
  const previewImg = root.querySelector<HTMLImageElement>('[data-foundation-preview-img]');
  const previewCaption = root.querySelector<HTMLElement>('[data-foundation-preview-caption]');
  const live = root.querySelector<HTMLElement>('[data-foundation-live]');
  const dialog = root.querySelector<HTMLDialogElement>('[data-foundation-dialog]');
  const dialogImg = root.querySelector<HTMLImageElement>('[data-foundation-dialog-img]');
  const dialogCaption = root.querySelector<HTMLElement>('[data-foundation-dialog-caption]');
  const dialogCounter = root.querySelector<HTMLElement>('[data-foundation-dialog-counter]');
  const dialogPrev = root.querySelector<HTMLButtonElement>('[data-foundation-dialog-prev]');
  const dialogNext = root.querySelector<HTMLButtonElement>('[data-foundation-dialog-next]');
  const dialogClose = root.querySelector<HTMLButtonElement>('[data-foundation-dialog-close]');
  const mobileStrip = root.querySelector<HTMLElement>('[data-foundation-mobile-strip]');

  function announce(index: number) {
    const d = diagrams[index];
    if (!d || !live) return;
    live.textContent = `${d.title}. ${d.caption}`;
  }

  function updateSteps(index: number) {
    current = index;
    steps.forEach((btn, i) => {
      btn.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    if (mobileStrip) {
      mobileStrip.scrollTo({
        left: (mobileStrip.children[index] as HTMLElement | undefined)?.offsetLeft ?? 0,
        behavior: 'smooth',
      });
    }
    const d = diagrams[index];
    if (previewImg && d) setPreviewImg(previewImg, d.src, d.title);
    if (previewCaption && d) previewCaption.textContent = d.caption;
    announce(index);
    if (diagrams[index + 1]) prefetch(diagrams[index + 1].src);
    if (diagrams[index - 1]) prefetch(diagrams[index - 1].src);
  }

  function updateDialog(index: number) {
    dialogIndex = (index + diagrams.length) % diagrams.length;
    const d = diagrams[dialogIndex];
    if (!d) return;
    if (dialogImg) {
      dialogImg.alt = d.title;
      dialogImg.src = d.src;
    }
    if (dialogCaption) dialogCaption.textContent = d.caption;
    if (dialogCounter) dialogCounter.textContent = `${dialogIndex + 1} / ${diagrams.length}`;
  }

  function openDialog() {
    if (!dialog) return;
    updateDialog(current);
    dialog.showModal();
    dialogClose?.focus();
  }

  function closeDialog() {
    dialog?.close();
    previewBtn?.focus();
  }

  steps.forEach((btn, i) => {
    btn.addEventListener('click', () => updateSteps(i));
    btn.addEventListener('mouseenter', () => prefetch(diagrams[i].src));
    btn.addEventListener('focus', () => prefetch(diagrams[i].src));
  });

  previewBtn?.addEventListener('click', openDialog);
  previewBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDialog();
    }
  });

  dialogPrev?.addEventListener('click', () => updateDialog(dialogIndex - 1));
  dialogNext?.addEventListener('click', () => updateDialog(dialogIndex + 1));
  dialogClose?.addEventListener('click', closeDialog);

  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  dialog?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDialog();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updateDialog(dialogIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updateDialog(dialogIndex + 1);
    } else if (e.key === 'Tab') {
      const nodes = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled'));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      }
    }
  });

  updateSteps(0);
}

document.addEventListener('DOMContentLoaded', () => {
  for (const root of document.querySelectorAll<HTMLElement>('[data-foundation-viewer]')) {
    initFoundationDiagrams(root);
  }
});
