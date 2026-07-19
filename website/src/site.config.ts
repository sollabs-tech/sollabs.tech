/** Canonical links. Override at build for forks / Pages. */
export const repoHref =
  import.meta.env.PUBLIC_REPO_URL ?? 'https://github.com/sollabs-tech/sollabs.tech';

export const brandName = 'Sol Labs';
export const companyLegalName = 'Sol Labs';
export const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://sollabs-tech.github.io';

/** Site base path (e.g. /sollabs.tech/ on project Pages). */
export const basePath = import.meta.env.BASE_URL;

const withBase = (path: string) => {
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
};

/** Booking CTA — replace with Cal.com / calendar URL when ready. */
export const engageHref = withBase('/engage/');
export const contactEmail = 'hello@sollabs.tech';
export { withBase };

export const products = {
  kanto: { name: 'Kanto', href: 'https://kanto.ai' },
  pulsys: { name: 'Pulsys', href: 'https://pulsys.io' },
  slerp: { name: 'Slerp', href: 'https://slerp.audio' },
} as const;

/**
 * Landing-page copy.
 * Sources: docs/research/* + Thoughtworks/Pulsys structure.
 * Every quantitative claim needs a receipt path.
 */
export const marketing = {
  pageDescription:
    'Sol Labs helps Series B platform teams ship audit-shaped GKE and stop burning GPU time on model pulls — proven with Kanto, Pulsys, and Slerp.',

  heroTitle: 'SOC 2 evidence from how you ship.',
  heroLead: 'Audit-shaped GKE and GitOps for Series B teams.',
  primaryCta: 'Book a call',
  secondaryCta: 'See outcomes',

  clarityLine:
    'Sol Labs helps Series B CTOs and Heads of Platform reach SOC 2–ready GCP infrastructure through a scoped GKE and GitOps sprint — with Pulsys and Slerp as proof of delivery.',

  trustPills: ['Scoped SOWs', 'GKE + GitOps', 'Receipts, not slides'] as const,

  painTitle: 'The scramble is the product failure.',
  painLead:
    'Landing-zone Terraform and GRC tools leave the GKE control gap open. Enterprise deals wait while evidence is bolted on after the fact.',

  outcomesTitle: 'Outcomes we prove with shipped products',
  methodTitle: 'How an engagement runs',
  methodSteps: [
    {
      title: 'Scope the gap',
      body: 'Map what Google’s starter Terraform and your GRC tool already cover versus what auditors will ask about GKE, change, and identity.',
    },
    {
      title: 'Wire the controls',
      body: 'Private clusters, Workload Identity, Argo CD gates, audit log retention — so evidence is a byproduct of deploys.',
    },
    {
      title: 'Leave a playbook',
      body: 'You keep Terraform, GitOps, and a control map your team can operate after the sprint.',
    },
  ] as const,

  finalCtaHeadline: 'Start with a scoped discovery call.',
  finalCtaLead: 'We qualify fit in one conversation, then propose a fixed SOW.',
  finalPrimaryCta: 'Book a call',

  faqTitle: 'FAQ',
  faq: [
    {
      q: 'Do you certify us for SOC 2?',
      a: 'No. Auditors issue reports. We build audit-shaped platforms so evidence exists from how you ship — complementary to Vanta, Drata, or your auditor.',
    },
    {
      q: 'Who is this for?',
      a: 'Series B and growth teams on GCP that need GKE production maturity before or during a SOC 2 observation period. Early startups without Kubernetes are usually a poor fit.',
    },
    {
      q: 'What about Pulsys and Slerp?',
      a: 'Shipped products that prove delivery in adjacent pains: model-cache cost and reliability, and private in-browser audio inference. They are proof rails, not the hero offer.',
    },
    {
      q: 'How do engagements start?',
      a: 'A discovery call to confirm ICP fit and scope. Fit becomes a fixed statement of work — not open-ended hours.',
    },
  ] as const,
} as const;

export const outcomes = {
  'soc2-gke': {
    slug: 'soc2-gke',
    product: 'Kanto',
    productHref: products.kanto.href,
    title: 'SOC 2–ready GKE without the scramble.',
    lead: 'Fill the control gap landing zones leave open.',
    pageDescription:
      'Scoped GCP/GKE and GitOps work so Series B teams collect SOC 2 evidence from how they ship — not from a pre-audit scramble.',
    painTitle: 'Starter Terraform is not a production control plane.',
    painBody:
      'Secure multi-project examples help with folders and IAM. They under-specify private GKE, Workload Identity, Argo CD change evidence, and the day-two controls auditors ask about. GRC SaaS collects tickets; it does not wire the cluster.',
    proofTitle: 'Proof: Kanto',
    proofBody:
      'Kanto is a SOC 2 readiness product built on GCP best-practice multi-project patterns — extended where GKE, GitOps, and automation actually decide whether evidence exists.',
    method: [
      'Inventory inherited Google controls vs customer GKE responsibilities',
      'Automate identity, network, and GitOps gates for production',
      'Map deploys and logs to Trust Services Criteria evidence',
      'Hand off a runbook your platform team owns',
    ],
    blogSlug: 'soc2-gke-series-b',
    cta: 'Book a call',
  },
  'model-cache-cost': {
    slug: 'model-cache-cost',
    product: 'Pulsys',
    productHref: products.pulsys.href,
    title: 'Stop paying GPUs to wait on Hugging Face.',
    lead: 'Warm model hits from disk you control.',
    pageDescription:
      'Cut GPU idle and Hub SPOF when CI and vLLM fleets re-pull the same weights — proven with Pulsys.',
    painTitle: 'Repeat downloads are the expensive part.',
    painBody:
      'Anonymous CI shares Hub rate limits. Cold pulls leave accelerators idle. Every pod restart that re-crosses the public internet burns egress and calendar time. Auth tokens help quotas; they do not remove Hub as a scale-out dependency.',
    proofTitle: 'Proof: Pulsys',
    proofBody:
      'Pulsys is an authenticated Hugging Face pull-through cache. One upstream fill; warm hits from local disk. Published EC2 benches and reproduction steps live on pulsys.io — not invented ROI slides.',
    method: [
      'Measure cold-pull wall time and idle GPU cost on your fleet',
      'Deploy a pull-through cache with auth and pre-warm',
      'Point HF_ENDPOINT at the cache; keep existing clients',
      'Optional cached-only mode so misses do not phone home',
    ],
    blogSlug: 'vllm-hf-gpu-idle',
    cta: 'Book a call',
  },
  'private-vj-inference': {
    slug: 'private-vj-inference',
    product: 'Slerp',
    productHref: products.slerp.href,
    title: 'Stage visuals without uploading your set.',
    lead: 'In-browser analysis. Music stays local.',
    pageDescription:
      'Audio-reactive visuals with local playback and analysis — for VJs who will not trust a cloud upload with unreleased music.',
    painTitle: 'Most web visualizers want your stems.',
    painBody:
      'Working VJs keep media on local disks for a reason — cloud sync freezes live tools, and unreleased music is livelihood. A web app that requires upload loses the room before the first drop.',
    proofTitle: 'Proof: Slerp',
    proofBody:
      'Slerp runs audio-reactive WebGL in the browser with local file load, Web Audio analysis, EQ, MIDI, and editable GLSL. Playback and analysis stay on the machine.',
    method: [
      'Load music locally — no account upload required for the core path',
      'Analyze in-browser with Web Audio',
      'Drive WebGL decks with MIDI and EQ',
      'Keep stems off someone else’s server',
    ],
    blogSlug: 'vj-trust-local-audio',
    cta: 'Book a call',
  },
} as const;

export type OutcomeSlug = keyof typeof outcomes;
