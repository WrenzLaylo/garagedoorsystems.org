/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUOTE_FORM_ENDPOINT?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => string;
  reset: (widgetId?: string | null) => void;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
  turnstile?: TurnstileApi;
}
