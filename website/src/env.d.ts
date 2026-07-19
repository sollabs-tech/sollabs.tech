/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_BASE_PATH?: string;
  readonly PUBLIC_REPO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
