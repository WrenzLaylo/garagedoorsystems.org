import { useEffect, useRef, useState } from "react";
import {
  FileText, X, ChevronDown, Check, AlertCircle,
  Loader2, CheckCircle2, Upload, FileImage,
} from "lucide-react";
import { CONTACT, BUSINESS } from "../../constants";

/* ─── env / constants ─────────────────────────────────────── */
const ENDPOINT = import.meta.env.VITE_QUOTE_FORM_ENDPOINT || "/quote-submit.php";
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const TURNSTILE_PLACEHOLDER = "replace-with-cloudflare-turnstile-site-key";
const HAS_TURNSTILE = Boolean(TURNSTILE_KEY && TURNSTILE_KEY !== TURNSTILE_PLACEHOLDER);

const ELEMENTOR = {
  action: "elementor_pro_forms_send_form",
  post_id: "7",
  form_id: "2372f6b",
  queried_id: "7",
};

const FORM_OPTIONS = {
  propertyTypes: ["Residential", "Commercial", "Industrial", "Strata / Body Corporate", "Other"] as const,
  serviceTypes: [
    "New door supply & install",
    "Garage door repair",
    "Motor / automation",
    "Spring, cable or track repair",
    "Remote or wall control",
    "Preventative maintenance",
    "Emergency repair",
    "Other / not sure",
  ] as const,
  serviceFor: ["Garage Door", "Garage Door Opener", "Gate", "Remote / Controls", "Not Sure"] as const,
  garageDoorTypes: ["Sectional / panel lift", "Roller door", "Tilt door", "Custom door", "Not sure"] as const,
  gateTypes: ["Sliding gate", "Swing gate", "Pedestrian gate", "Not sure"] as const,
};

/* ─── types ───────────────────────────────────────────────── */
interface FormValues {
  name: string; email: string; phone: string; suburb: string;
  propertyType: string; serviceType: string; serviceFor: string;
  garageDoorType: string; gateType: string; message: string; company: string;
}
type Errors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: FormValues = {
  name: "", email: "", phone: "", suburb: "",
  propertyType: "", serviceType: "", serviceFor: "Garage Door",
  garageDoorType: "", gateType: "", message: "", company: "",
};

function validate(f: FormValues): Errors {
  const e: Errors = {};
  if (!f.name.trim())  e.name  = "Required";
  if (!f.phone.trim()) e.phone = "Required";
  if (!f.email.trim()) e.email = "Required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = "Invalid email";
  if (!f.suburb.trim()) e.suburb = "Required";
  return e;
}

/* ─── mini sub-components ─────────────────────────────────── */
function Field({ id, label, value, onChange, error, type = "text", placeholder }: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  error?: string; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink-light">
        {label}
      </label>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-light transition-all focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand ${
          error ? "border-accent" : "border-border hover:border-brand/30"
        }`}
      />
      {error && <p className="mt-0.5 text-[11px] text-accent">{error}</p>}
    </div>
  );
}

function FloatDropdown({ label, value, options, onChange, error }: {
  label: string; value: string; options: readonly string[];
  onChange: (v: string) => void; error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink-light">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex w-full items-center justify-between rounded-xl border bg-surface px-3 py-2.5 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand/15 ${
          error ? "border-accent" : "border-border hover:border-brand/30"
        }`}
      >
        <span className={value ? "text-ink" : "text-ink-light"}>{value || "Select…"}</span>
        <ChevronDown size={15} className={`text-ink-light transition-transform ${open ? "rotate-180 text-brand" : ""}`} />
      </button>
      {open && (
        <ul className="absolute z-[60] mt-1 max-h-44 w-full overflow-auto rounded-xl border border-border bg-surface-raised py-1 shadow-xl">
          {options.map(opt => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors ${
                value === opt ? "bg-brand/8 text-brand" : "text-ink-soft hover:bg-surface-alt"
              }`}
            >
              {opt}
              {value === opt && <Check size={13} className="text-brand" />}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-0.5 text-[11px] text-accent">{error}</p>}
    </div>
  );
}

function FloatChips({ label, value, options, onChange }: {
  label: string; value: string; options: readonly string[]; onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-light">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map(opt => (
          <button
            key={opt} type="button" onClick={() => onChange(opt)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              value === opt
                ? "border-brand bg-brand/10 text-brand"
                : "border-border bg-surface text-ink-soft hover:border-brand/40 hover:text-brand"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────── */
export default function FloatingQuoteButton() {
  const [visible, setVisible]   = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [open, setOpen]         = useState(false);
  const activeRef               = useRef(false);

  const [form, setForm]         = useState<FormValues>(EMPTY);
  const [errors, setErrors]     = useState<Errors>({});
  const [status, setStatus]     = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const [fileName, setFileName] = useState("");
  const [formStartedAt]         = useState(() => Math.floor(Date.now() / 1000));

  const fileRef       = useRef<HTMLInputElement>(null);
  const turnstileRef  = useRef<HTMLDivElement>(null);
  const widgetId      = useRef<string | null>(null);
  const panelRef      = useRef<HTMLDivElement>(null);

  /* scroll visibility */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* hide near contact section unless panel is open */
  useEffect(() => {
    const section = document.getElementById("contact");
    if (!section) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !activeRef.current) setHidden(true);
      else if (!entry.isIntersecting) setHidden(false);
    }, { threshold: 0.15 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* turnstile */
  useEffect(() => {
    if (!HAS_TURNSTILE || !open) return;
    if (!document.querySelector("script[data-turnstile]")) {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true; s.defer = true;
      s.setAttribute("data-turnstile", "true");
      document.head.appendChild(s);
    }
    const iv = window.setInterval(() => {
      if (window.turnstile && turnstileRef.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_KEY, theme: "light",
          callback: () => setSubmitError(""),
          "expired-callback": () => setSubmitError("Please complete the spam check again."),
          "error-callback": () => setSubmitError("Spam protection failed. Refresh and try again."),
        });
        window.clearInterval(iv);
      }
    }, 300);
    return () => window.clearInterval(iv);
  }, [open]);

  const update = (key: keyof FormValues, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const handleOpen = () => {
    activeRef.current = true;
    setOpen(true);
  };

  const handleClose = () => {
    activeRef.current = false;
    setOpen(false);
    const section = document.getElementById("contact");
    if (section) {
      const rect = section.getBoundingClientRect();
      setHidden(rect.top < window.innerHeight * 0.85 && rect.bottom > 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return;

    const errs = validate(form);
    setErrors(errs);
    setSubmitError("");
    if (Object.keys(errs).length) { setStatus("error"); setSubmitError("Please complete the required fields."); return; }

    if (!HAS_TURNSTILE) {
      setStatus("error");
      setSubmitError("Turnstile not configured. Add your site key to .env.local.");
      return;
    }
    const token = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
    if (!token) { setStatus("error"); setSubmitError("Please complete the spam check."); return; }

    setStatus("submitting");
    try {
      const payload = new FormData();
      payload.append("action", ELEMENTOR.action);
      payload.append("post_id", ELEMENTOR.post_id);
      payload.append("form_id", ELEMENTOR.form_id);
      payload.append("queried_id", ELEMENTOR.queried_id);
      payload.append("form_fields[name]",          form.name);
      payload.append("form_fields[email]",         form.email);
      payload.append("form_fields[phone]",         form.phone);
      payload.append("form_fields[suburb]",        form.suburb);
      payload.append("form_fields[property_type]", form.propertyType);
      payload.append("form_fields[service_type]",  form.serviceType);
      payload.append("form_fields[service_for]",   form.serviceFor);
      payload.append("form_fields[door_type]",     form.serviceFor === "Gate" ? form.gateType : form.garageDoorType);
      payload.append("form_fields[message]",       form.message);
      payload.append("form_fields[source]",        "garagedoorsystems.org — floating widget");
      payload.append("form_fields[brand]",         `${BUSINESS.name} by ${BUSINESS.parenBrand}`);
      payload.append("company",                    form.company);
      payload.append("_form_started_at",           String(formStartedAt));
      payload.append("cf-turnstile-response",      token);
      const file = fileRef.current?.files?.[0];
      if (file) payload.append("form_fields[photo]", file);

      const res = await fetch(ENDPOINT, { method: "POST", body: payload });
      const result = await res.json().catch(() => null);
      if (!res.ok || result?.ok === false) throw new Error(result?.message || `HTTP ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
      if (HAS_TURNSTILE && window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
    }
  };

  const shouldShow = visible && (!hidden || open);

  return (
    <div
      className={`fixed bottom-24 right-4 z-50 md:bottom-8 md:right-6 transition-all duration-500 ${
        shouldShow ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {/* ── Expanded panel ── */}
      <div
        ref={panelRef}
        className={`absolute bottom-16 right-0 w-[22rem] overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-2xl transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        }`}
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-brand px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Free Quote</p>
            <p className="font-display text-base font-bold text-white leading-tight mt-0.5">Request a quote</p>
          </div>
          <button
            type="button" onClick={handleClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[70vh] overflow-y-auto overscroll-contain p-5">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 size={48} className="text-brand" />
              <p className="font-display text-xl font-semibold text-ink">We'll be in touch!</p>
              <p className="text-sm text-ink-soft">Expect a call within 1 business hour.</p>
              <button
                type="button"
                onClick={() => { setForm(EMPTY); setStatus("idle"); setFileName(""); handleClose(); }}
                className="mt-2 text-xs font-semibold text-brand hover:underline"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              <div className="grid grid-cols-2 gap-3">
                <Field id="f-name"  label="Name *"  value={form.name}  onChange={v => update("name", v)}  error={errors.name}  placeholder="Your name" />
                <Field id="f-phone" label="Phone *" value={form.phone} onChange={v => update("phone", v)} error={errors.phone} placeholder="04xx xxx xxx" type="tel" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field id="f-email"  label="Email *" value={form.email}  onChange={v => update("email", v)}  error={errors.email}  placeholder="you@email.com" type="email" />
                <Field id="f-suburb" label="Suburb *" value={form.suburb} onChange={v => update("suburb", v)} error={errors.suburb} placeholder="e.g. Glen Waverley" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FloatDropdown label="Property type" value={form.propertyType} options={FORM_OPTIONS.propertyTypes} onChange={v => update("propertyType", v)} />
                <FloatDropdown label="Service type"  value={form.serviceType}  options={FORM_OPTIONS.serviceTypes}  onChange={v => update("serviceType", v)} />
              </div>

              <FloatChips
                label="What's it for?"
                value={form.serviceFor}
                options={FORM_OPTIONS.serviceFor}
                onChange={v => update("serviceFor", v)}
              />

              {form.serviceFor === "Gate" ? (
                <FloatDropdown label="Gate type" value={form.gateType} options={FORM_OPTIONS.gateTypes} onChange={v => update("gateType", v)} />
              ) : (
                <FloatDropdown label="Garage door type" value={form.garageDoorType} options={FORM_OPTIONS.garageDoorTypes} onChange={v => update("garageDoorType", v)} />
              )}

              <div>
                <label htmlFor="f-message" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink-light">How can we help?</label>
                <textarea
                  id="f-message" rows={3} value={form.message}
                  onChange={e => update("message", e.target.value)}
                  placeholder="Describe the fault or what you need…"
                  className="w-full resize-none rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-light transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 hover:border-brand/30"
                />
              </div>

              {/* Photo upload */}
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-light">Photo (optional)</p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="group flex w-full items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 text-left transition-all hover:border-brand/30 hover:shadow-sm"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-transform group-hover:scale-110">
                    {fileName ? <FileImage size={15} /> : <Upload size={15} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-ink">
                      {fileName || "Upload a photo"}
                    </span>
                    <span className="block text-[11px] text-ink-light">JPG, PNG, HEIC or WebP</span>
                  </span>
                  {fileName && (
                    <span
                      role="button"
                      onClick={e => { e.stopPropagation(); if (fileRef.current) fileRef.current.value = ""; setFileName(""); }}
                      className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent hover:bg-accent/20"
                    >
                      <X size={12} />
                    </span>
                  )}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setFileName(e.target.files?.[0]?.name || "")} />
              </div>

              {/* Honeypot */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.company} onChange={e => update("company", e.target.value)} />

              {/* Turnstile */}
              {HAS_TURNSTILE ? (
                <div className="rounded-xl border border-border bg-surface-alt p-2">
                  <div ref={turnstileRef} className="cf-turnstile min-h-[65px]" />
                </div>
              ) : (
                <p className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
                  Add your Cloudflare Turnstile site key in .env.local before live submissions.
                </p>
              )}

              {status === "error" && (
                <div className="flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/5 px-3 py-2 text-xs text-accent">
                  <AlertCircle size={13} className="mt-0.5 shrink-0" />
                  <span>{submitError} {submitError?.includes("urgent") ? "" : `Call ${CONTACT.emergencyPhone} if urgent.`}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition-all hover:bg-brand/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting"
                  ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                  : "Request free quote"}
              </button>

              <p className="text-center text-[11px] text-ink-light">
                Or call us:{" "}
                <a href={CONTACT.phoneTel} className="font-semibold text-brand hover:underline">{CONTACT.phone}</a>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ── Circular FAB ── */}
      <button
        type="button"
        onClick={open ? handleClose : handleOpen}
        aria-label={open ? "Close quote form" : "Get a free quote"}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-lg transition-all duration-300 hover:bg-brand/90 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:ring-offset-2"
      >
        <span className={`absolute transition-all duration-300 ${open ? "rotate-45 opacity-100 scale-100" : "opacity-0 scale-75 rotate-0"}`}>
          <X size={20} />
        </span>
        <span className={`absolute transition-all duration-300 ${open ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
          <FileText size={20} />
        </span>
      </button>

      {/* Pulse ring — only when closed */}
      {!open && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand/40 animate-ping"
          aria-hidden="true"
          style={{ animationDuration: "2.5s" }}
        />
      )}
    </div>
  );
}
