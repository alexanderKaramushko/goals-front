interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ID: string;
  readonly VITE_GOALS_SERVICE_API: string;
  readonly VITE_GOALS_AUTH_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}