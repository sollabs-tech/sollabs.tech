export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  icp: string;
  outcomeSlug: 'soc2-gke' | 'model-cache-cost' | 'private-vj-inference';
};

export const posts: Post[] = [
  {
    slug: 'soc2-gke-series-b',
    title: 'The GKE gap in “SOC 2 on GCP” checklists',
    description:
      'Why Series B teams stall between landing-zone Terraform, GRC SaaS, and what auditors ask about Kubernetes change evidence.',
    date: '2026-07-19',
    icp: 'Series B CTO / Head of Platform',
    outcomeSlug: 'soc2-gke',
  },
  {
    slug: 'vllm-hf-gpu-idle',
    title: 'The real cost of cold Hugging Face pulls on Kubernetes',
    description:
      'Rate limits, idle GPUs, and why a pull-through cache is an ops control — not a micro-optimization.',
    date: '2026-07-19',
    icp: 'ML platform engineer',
    outcomeSlug: 'model-cache-cost',
  },
  {
    slug: 'vj-trust-local-audio',
    title: 'Why working VJs refuse to upload their sets',
    description:
      'Local media culture, cloud-sync failure modes, and what private in-browser inference has to prove.',
    date: '2026-07-19',
    icp: 'Working VJ / live visualist',
    outcomeSlug: 'private-vj-inference',
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
