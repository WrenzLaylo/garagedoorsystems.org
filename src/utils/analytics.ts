type EventPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, payload: EventPayload = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...payload });
}

export function trackCall() {
  trackEvent("phone_call_click", { call_type: "business" });
}

export function trackEmergencyCall() {
  trackEvent("phone_call_click", { call_type: "emergency" });
}