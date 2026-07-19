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
export { withBase };

export const products = {
  kanto: { name: 'Kanto', href: 'https://kanto.ai' },
  pulsys: { name: 'Pulsys', href: 'https://pulsys.io' },
  slerp: { name: 'Slerp', href: 'https://slerp.audio' },
} as const;

/**
 * Marketing copy.
 * Genre refs (structure only): Zencore.dev, buoyantcloudtech.com, Thoughtworks×GCP.
 * Not SOC-2-as-hero. Google Cloud engineering partner with shipped proof.
 */
export const marketing = {
  pageDescription:
    'Sol Labs is a Google Cloud consulting and engineering practice — platform, AI infrastructure, and secure delivery, proven with products we ship.',

  // Buoyant: clear category + “without agency overhead”. Zencore: GCP success purpose.
  heroTitle: 'Google Cloud that ships.',
  heroLead:
    'Platform engineering, AI infrastructure, and secure delivery — without the agency hand-off.',
  primaryCta: 'Talk to us',
  secondaryCta: 'What we do',

  // Clarity formula + Zencore “one purpose” pattern
  clarityLine:
    'Sol Labs helps engineering leaders get real results on Google Cloud: production platforms, AI fleets that do not burn idle GPU time, and delivery pipelines teams can run after we leave.',

  trustPills: ['Google Cloud', 'Hands-on engineering', 'Scoped SOWs', 'Shipped products'] as const,

  // Buoyant “challenges leaders bring”
  challengesTitle: 'Where teams get stuck on GCP',
  challenges: [
    {
      title: 'Platform that cannot keep up',
      body: 'Environments drift, GKE is brittle, and every new service adds toil. The foundation needs a redesign, not another ticket.',
    },
    {
      title: 'AI workloads that stall on the Hub',
      body: 'vLLM and CI fleets re-pull the same weights, hit rate limits, and leave accelerators idle while Hugging Face is the SPOF.',
    },
    {
      title: 'Security bolted on before the deal',
      body: 'Identity, GitOps, and change evidence were never wired into how you ship — so enterprise and audit pressure arrives as a scramble.',
    },
  ] as const,

  capabilitiesTitle: 'What we deliver',
  capabilitiesLead:
    'Implementation work across the surfaces that decide whether Google Cloud actually works for your team.',

  methodTitle: 'How we work',
  methodSteps: [
    {
      title: 'Diagnose with the team that runs it',
      body: 'Short discovery with your platform or ML leads — not a sales layer. We scope a fixed outcome.',
    },
    {
      title: 'Build in your cloud',
      body: 'Terraform, GKE, GitOps, caches, pipelines — in your projects, with your constraints.',
    },
    {
      title: 'Leave it operable',
      body: 'Runbooks and ownership stay with your engineers. We are not a permanent shadow team by default.',
    },
  ] as const,

  finalCtaHeadline: 'Tell us what is blocking production.',
  finalCtaLead: 'One call to see if a scoped engagement fits. Fixed SOW if it does.',
  finalPrimaryCta: 'Talk to us',

  faqTitle: 'FAQ',
  faq: [
    {
      q: 'Are you a Google Cloud partner / agency?',
      a: 'We are an engineering practice focused on Google Cloud outcomes. You work with builders, not a pitch deck and a junior bench.',
    },
    {
      q: 'Is this only compliance or SOC 2?',
      a: 'No. Secure delivery and audit-ready evidence can be part of a platform engagement — they are not the product. The product is a cloud your team can ship on.',
    },
    {
      q: 'Why show Kanto, Pulsys, and Slerp?',
      a: 'They are products we ship. They prove we deliver platform, AI infrastructure, and product engineering — not slideware.',
    },
    {
      q: 'How do engagements start?',
      a: 'A discovery call, then a written scope with a done definition. Not open-ended hours on day one.',
    },
  ] as const,
} as const;

export const outcomes = {
  'gke-platform': {
    slug: 'gke-platform',
    product: 'Kanto',
    productHref: products.kanto.href,
    title: 'Production GKE and GitOps on GCP.',
    lead: 'Platforms teams can operate — not landing-zone demos.',
    pageDescription:
      'Google Cloud platform engineering: private GKE, Workload Identity, Argo CD, and automation your team keeps.',
    painTitle: 'Starter Terraform is not a production control plane.',
    painBody:
      'Org folders and baseline IAM help you start. They under-specify private GKE, Workload Identity, GitOps gates, and day-two operations. That is when velocity and enterprise deals both stall.',
    proofTitle: 'Proof: Kanto',
    proofBody:
      'Kanto extends secure multi-project GCP patterns into the GKE and GitOps layer — the part most “landing zone” examples leave thin.',
    method: [
      'Assess current GCP org, clusters, and delivery path',
      'Automate identity, network, and GitOps for production',
      'Harden the path your team actually deploys on',
      'Hand off Terraform, Argo CD, and an operable runbook',
    ],
    blogSlug: 'soc2-gke-series-b',
    cta: 'Talk to us',
  },
  'model-cache-cost': {
    slug: 'model-cache-cost',
    product: 'Pulsys',
    productHref: products.pulsys.href,
    title: 'AI infrastructure that does not wait on Hugging Face.',
    lead: 'Warm model hits from disk you control.',
    pageDescription:
      'Cut GPU idle and Hub SPOF when CI and vLLM fleets re-pull the same weights — proven with Pulsys.',
    painTitle: 'Repeat downloads are the expensive part.',
    painBody:
      'Cold pulls leave accelerators idle. Shared CI hits Hub rate limits. Auth tokens raise quotas; they do not remove Hugging Face as a scale-out dependency.',
    proofTitle: 'Proof: Pulsys',
    proofBody:
      'Pulsys is an authenticated Hugging Face pull-through cache. One upstream fill; warm hits from local disk. Published benches live on pulsys.io.',
    method: [
      'Measure cold-pull wall time and idle GPU cost',
      'Deploy a pull-through cache with auth and pre-warm',
      'Point HF_ENDPOINT at the cache; keep existing clients',
      'Optional cached-only mode so misses do not phone home',
    ],
    blogSlug: 'vllm-hf-gpu-idle',
    cta: 'Talk to us',
  },
  'private-vj-inference': {
    slug: 'private-vj-inference',
    product: 'Slerp',
    productHref: products.slerp.href,
    title: 'Product engineering with private inference.',
    lead: 'In-browser analysis. Music stays local.',
    pageDescription:
      'Audio-reactive visuals with local playback and analysis — proof we ship product, not only infra decks.',
    painTitle: 'Most web visualizers want your stems.',
    painBody:
      'Working VJs keep media local for a reason. A web app that requires upload loses trust before the first drop.',
    proofTitle: 'Proof: Slerp',
    proofBody:
      'Slerp runs audio-reactive WebGL in the browser with local file load, Web Audio analysis, EQ, MIDI, and editable GLSL.',
    method: [
      'Load music locally for the core path',
      'Analyze in-browser with Web Audio',
      'Drive WebGL decks with MIDI and EQ',
      'Keep stems off someone else’s server',
    ],
    blogSlug: 'vj-trust-local-audio',
    cta: 'Talk to us',
  },
} as const;

export type OutcomeSlug = keyof typeof outcomes;
