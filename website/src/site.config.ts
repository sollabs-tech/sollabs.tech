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
  pulsys: { name: 'Pulsys', href: 'https://pulsys.io' },
  slerp: { name: 'Slerp', href: 'https://slerp.audio' },
} as const;

/** GCP landing-zone blueprint — six draw.io exports (ref: Google Cloud foundation architecture). */
export const foundationDiagrams = [
  {
    title: 'Bootstrap',
    caption: 'Bootstrap Terraform CI/CD',
    src: '/diagrams/gcp-foundation/bootstrap.svg',
  },
  {
    title: 'Organization Setup',
    caption: 'Setup organization, centralized monitoring',
    src: '/diagrams/gcp-foundation/org.svg',
  },
  {
    title: 'Environment Setup',
    caption: 'Initialize environment settings',
    src: '/diagrams/gcp-foundation/env.svg',
  },
  {
    title: 'Shared VPC',
    caption: 'Create VPCs, VPN, and firewall rules',
    src: '/diagrams/gcp-foundation/net.svg',
  },
  {
    title: 'Projects',
    caption: 'Bootstrap application projects and CI/CD',
    src: '/diagrams/gcp-foundation/prj.svg',
  },
  {
    title: 'Applications',
    caption: 'Deploy GKE applications',
    src: '/diagrams/gcp-foundation/apps.svg',
  },
] as const;

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
      body: 'Environments drift, delivery slows, and starter Terraform rarely ships the enterprise landing zone your security team expects.',
    },
    {
      serviceSlug: 'gke-soc2-readiness',
      title: 'Security and compliance blocking your roadmap',
      // DoiT Optessa (doit.com/customers/optessa) — SOC2 needs audit-ready control + evidence cycles
      body: 'Enterprise reviews and SOC 2 expose gaps in access, change control, and evidence — procurement stalls until the platform can answer with audit-ready delivery, not verbal assurances.',
    },
    {
      serviceSlug: 'ai-infrastructure',
      title: 'Rising cloud costs without clear visibility',
      body: 'Idle infrastructure and unclear ownership drive spend up while AI fleets wait before useful work starts.',
    },
    {
      serviceSlug: 'application-development',
      title: 'AI applications blocked by where inference runs',
      body: 'Cloud, on-device, and hybrid paths each trade cost, privacy, and time-to-ship — teams stall before the first production release.',
    },
  ] as const,

  /**
   * Services ↔ case studies are linked by caseStudySlug (never by array index).
   */
  services: [
    {
      slug: 'platform-engineering',
      title: 'Platform Engineering',
      // Zencore Cloud Foundations capability (zencore.dev/solutions/cloud-native-infrastructure/)
      body: 'The core building blocks — Infrastructure as Code, policy governance, identity and access management, and networking — implemented as a rock-solid foundation for everything you deploy on Google Cloud.',
      href: '/services/platform-engineering/',
      caseStudySlug: null as string | null,
    },
    {
      slug: 'gke-soc2-readiness',
      title: 'GKE SOC 2 Readiness',
      body: 'Regulatory-ready GKE foundations: reviewable delivery, identity-scoped access, and evidence that enterprise security questionnaires can trust.',
      href: '/services/gke-soc2-readiness/',
      caseStudySlug: null as string | null,
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
      title: 'AI Application Development',
      // Zencore AI solutions (zencore.dev) — cloud, on-device, and hybrid AI app delivery
      body: 'Ship AI-powered applications in the cloud, on-device, or hybrid — production delivery your team can operate.',
      href: '/services/application-development/',
      caseStudySlug: 'slerp',
    },
  ] as const,

  // Labs — Sol Labs' own builds, not client work (ref: Google Labs / Vercel Labs / Cloudflare)
  caseStudiesTitle: 'Labs',
  caseStudiesLead: '',
  // Zencore short CTA
  caseStudyCta: 'Learn more',
  caseStudies: [
    {
      slug: 'pulsys',
      name: 'Pulsys',
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
      serviceSlug: 'application-development',
      title: 'Secure on-device AI when sensitive media cannot go to the cloud',
      summary:
        'Artists use visualizations to market unreleased music — but cloud tools require uploading masters. Slerp runs ONNX beat detection on WebGPU in the browser so analysis and visuals stay local.',
      body: 'On-device inference for sensitive media — ONNX models on WebGPU, with no upload path for unreleased audio.',
      metric: 'ONNX on WebGPU · no upload path',
      href: '/work/slerp/',
      image: '/proof/private-vj-inference.webp',
      alt: 'Slerp — secure on-device AI visualizer for local audio',
      area: 'Secure on-device AI',
      focus: 'On-device inference without cloud upload for sensitive media',
      project: 'Sol Labs internal product',
      businessProblem:
        'Musicians and performers need visualizations to market unreleased work. Cloud visualizers require uploading masters — a retention policy artists will not accept. Sensitive media needs AI analysis without sending data to a server.',
      needs: [
        'Run ONNX model inference in the browser, not on a server',
        'Keep unreleased audio on the local machine',
        'Beat detection and visuals for marketing, not just live performance',
        'Make the no-upload trust model obvious from the first use',
      ],
      approach:
        'Slerp runs ONNX beat-detection models on WebGPU with Web Audio analysis and real-time WebGL visuals. Music loads from the local machine; inference and playback stay in the browser without upload.',
      beforeAfter: [
        ['Upload masters to a cloud visualizer', 'Load files locally; nothing sent to a server'],
        ['Remote inference with latency and retention risk', 'ONNX inference on WebGPU on-device'],
        ['Trust depends on a vendor retention policy', 'Sensitive media never leaves the machine'],
      ],
      results: [
        'ONNX beat-detection models run in the browser on WebGPU',
        'Audio analysis and playback run locally via Web Audio',
        'Real-time WebGL visuals driven by on-device inference',
        'No upload path — unreleased media stays on the machine',
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
    // Zencore Cloud Foundations capability (zencore.dev/solutions/cloud-native-infrastructure/)
    lead: 'The core building blocks — Infrastructure as Code, policy governance, identity and access management, and networking — implemented as a rock-solid foundation for everything you deploy on Google Cloud.',
    pageDescription:
      'Platform engineering on Google Cloud — landing-zone Terraform, shared VPC, GKE, and reviewable delivery.',
    painTitle: "Architecture that can't keep up with growth",
    painBody:
      'Environments drift, delivery slows, and every new service adds process instead of leverage. Org folders, baseline IAM, and logging foundations reduce blank-page risk on Google Cloud — but starter Terraform rarely ships the enterprise landing zone your security team expects.',
    caseStudyTitle: '',
    caseStudyBody: '',
    diagramsTitle: 'Reference architecture',
    // Zencore overview line (zencore.dev/solutions/cloud-native-infrastructure/)
    diagramsLead:
      'We build and run the Google Cloud foundation your product teams ship on — org, shared VPC, environments, projects, and application delivery.',
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
      'Deploy and customize the Google Cloud landing-zone Terraform architecture GCP recommends for enterprise — org, networking, environments, and CI/CD wired for audit from day one.',
    capabilities: [
      {
        title: 'Cloud Foundations',
        body: 'The core building blocks — Infrastructure as Code, policy governance, identity and access management, and networking — implemented as a rock-solid foundation for everything you deploy on Google Cloud.',
      },
      {
        title: 'Shared VPC & Environment Isolation',
        body: 'Shared VPC host and service projects, environment separation, VPN, and firewall rules — networking your security team can explain.',
      },
      {
        title: 'GKE & Kubernetes',
        body: 'From your first workload to a large fleet: cluster design, application packaging, deployment automation, and tuning across the full Kubernetes lifecycle.',
      },
      {
        title: 'Software Delivery Automation',
        body: 'Modern CI/CD and a secure software supply chain — pipeline design, golden paths, and reviewable delivery your engineers can own.',
      },
    ],
  },
  'gke-soc2-readiness': {
    slug: 'gke-soc2-readiness',
    featured: true,
    caseStudySlug: null as string | null,
    caseStudyName: '',
    projectHref: engageHref,
    title: 'GKE SOC 2 Readiness.',
    // Offer-test definition — DoiT Optessa “audit-ready” + Zencore Regulatory Compliant Cloud Foundations
    lead: 'A hands-on engagement that makes your GKE platform ready for enterprise security reviews — audit-ready delivery, scoped access, and the evidence auditors ask for.',
    pageDescription:
      'GKE SOC 2 readiness — audit-ready GKE delivery, standardized IAM, centralized logging, and evidence for enterprise security reviews.',
    painTitle: 'Enterprise reviews and SOC 2 expose GKE gaps',
    // Linford (linfordco.com/blog/google-cloud-gcp-soc-2/) + DoiT Optessa challenge framing
    painBody:
      'Landing-zone Terraform and GRC tools cover part of the story — auditors still ask what you do with identities, change management, network boundaries, and workload privileges on the clusters you run. When GKE cannot explain who shipped what, when, and under which approval, deals stall and evidence-collection cycles stretch.',
    caseStudyTitle: '',
    caseStudyBody: '',
    work: [
      'Private GKE and restricted control-plane access',
      'Standardized IAM and Workload Identity Federation',
      'Centralized logging and change evidence',
      'Secure software supply chain on GKE',
    ],
    blogSlug: 'soc2-gke-series-b',
    cta: "Let's Talk",
    // Zencore Cloud Security — Regulatory Compliant Cloud Foundations
    overview:
      'Compliant GKE foundations aligned to how enterprise security reviews and SOC 2 actually inspect delivery — private clusters, identity-scoped access, reviewable GitOps, and evidence your team can reuse.',
    capabilities: [
      {
        // Zencore Cloud Native — Kubernetes lifecycle + our blog GKE gap list
        title: 'Private GKE Control Plane',
        body: 'Private clusters and restricted control-plane access — so GitOps reaches the API with identity, not bastion kubeconfigs or broad authorized networks.',
      },
      {
        // DoiT Optessa — standardized IAM; Onix review area — Identity & access management
        title: 'Standardized IAM & Workload Identity',
        body: 'Identity-scoped access for humans and workloads — Workload Identity Federation instead of long-lived service account keys on cluster control planes.',
      },
      {
        // Zencore Cloud Security — Secure Software Supply Chain
        title: 'Secure Software Supply Chain',
        body: 'End-to-end protection for development and deployment — centralized Argo CD with SSO, least-privilege RBAC, and production sync gates instead of a snowflake agent in every cluster.',
      },
      {
        // DoiT Optessa — centralized logging; shortened evidence-collection cycles
        title: 'Centralized Logging & Change Evidence',
        body: 'Git history, sync events, and audit log retention your team can hand to auditors — so SOC 2 observation reviews existing evidence instead of scrambling for screenshots.',
      },
      {
        // Onix review area — Policies and standards; SADA Onna Gatekeeper pattern (policy enforcement)
        title: 'Admission Controls & Policy',
        body: 'Namespace isolation, admission controls, and deploy-time policy — so the platform enforces the baseline instead of hoping people remember it.',
      },
      {
        // Onix — Create a cloud security roadmap; Zencore Cloud Security Health Check insights
        title: 'Operating Model & Roadmap',
        body: 'A documented delivery and access model plus a clear roadmap your engineers can run after the engagement — not a black-box handoff.',
      },
    ],
    // Onix Cloud Security Posture Review — Key benefits (onixnet.com/cloud-security-posture-review/)
    includedTitle: 'Key benefits',
    included: [
      {
        title: 'Prepare for audits',
        body: 'Shortened evidence-collection cycles — documented delivery, access, and change history security questionnaires can trust.',
      },
      {
        title: 'Clear roadmap for improvements',
        body: 'Prioritized gaps against GKE and Google Cloud best practices, with milestones to the target operating state.',
      },
      {
        title: 'Holistic view of risks',
        body: 'Identity, network boundaries, workload privileges, and delivery paths inspected together — not as disconnected GRC checkboxes.',
      },
      {
        title: 'Stay compliant',
        body: 'An operating model your team owns after the engagement — Terraform, GitOps, and controls that keep working when auditors return.',
      },
    ],
    // Onix methodology labels — Assess / Analyze / Recommend
    // (onixnet.com/cloud-security-posture-review/); section title reuses firm methodTitle
    engagementTitle: 'From first call to live platform',
    engagementSteps: [
      {
        title: 'Assess',
        body: 'Inventory GKE delivery paths, IAM, logging, and policy — confirm scope and review high-level security control concerns with your SMEs.',
      },
      {
        title: 'Analyze',
        body: 'Gap analysis against Google Cloud and GKE configuration best practices — prioritize findings by risk for enterprise review and SOC 2 observation.',
      },
      {
        title: 'Recommend',
        body: 'Document recommendations and a cloud security roadmap with key milestones — then implement private GKE, identity, GitOps, and evidence hooks your team can operate.',
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
    title: 'AI Application Development.',
    // Zencore AI solutions exact (zencore.dev) — extended to on-device and hybrid paths
    lead: 'Innovative solutions to leverage Artificial Intelligence on Google Cloud — and ship AI-powered applications on-device or hybrid when cloud inference is not the right fit.',
    pageDescription:
      'AI application development — cloud, on-device, and hybrid inference paths your team can ship and operate.',
    painTitle: 'AI applications blocked by where inference runs',
    painBody:
      'Cloud inference, on-device models, and hybrid paths each trade cost, privacy, and time-to-ship differently. Teams stall picking a deployment model before the first production release — or ship a demo that cannot operate in production.',
    caseStudyTitle: 'Slerp',
    caseStudyBody:
      'Slerp is the proof for this offer: ONNX beat detection on WebGPU in the browser — visualizations for marketing unreleased music without uploading sensitive media to the cloud.',
    work: [
      'Cloud AI apps on Vertex AI, Cloud Run, and GKE',
      'On-device inference with WebGPU and ONNX in the browser',
      'Hybrid paths when sensitive data cannot go to the cloud',
      'Handoff your engineers can operate after the engagement',
    ],
    blogSlug: 'vj-trust-local-audio',
    cta: "Let's Talk",
    overview:
      'Ship AI-powered applications in the cloud, on-device, or hybrid — from Vertex AI on Google Cloud to ONNX on WebGPU in the browser.',
    capabilities: [
      {
        title: 'Cloud AI Applications',
        body: 'Production AI features on Google Cloud — Vertex AI, Cloud Run, and GKE inference paths with IAM, cost controls, and observability your team can own.',
      },
      {
        title: 'On-Device AI',
        body: 'Models in the browser on WebGPU and ONNX — sensitive data stays local when cloud upload is not an option.',
      },
      {
        title: 'Hybrid & Private Inference',
        body: 'Split paths when some workloads belong in the cloud and others must stay on-device or on-premises — one product, multiple inference surfaces.',
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
