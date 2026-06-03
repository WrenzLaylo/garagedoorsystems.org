import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileImage,
  Loader2,
  Phone,
  ShieldCheck,
  Upload,
  Wrench,
  X,
} from "lucide-react";
import { CONTACT, BUSINESS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { trackCall, trackEvent } from "../../utils/analytics";

interface Props {
  onCall: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  propertyType: string;
  serviceType: string;
  serviceFor: string;
  garageDoorType: string;
  gateType: string;
  message: string;
  company: string;
}

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<keyof FormValues, string>>;

const ENDPOINT = import.meta.env.VITE_QUOTE_FORM_ENDPOINT || "/quote-submit.php";
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const TURNSTILE_PLACEHOLDER = "replace-with-cloudflare-turnstile-site-key";
const HAS_TURNSTILE = Boolean(TURNSTILE_KEY && TURNSTILE_KEY !== TURNSTILE_PLACEHOLDER);

// Keep the same Elementor-compatible payload style used by the other AGG Doors sites.
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

const EMPTY_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  suburb: "",
  propertyType: "",
  serviceType: "",
  serviceFor: "Garage Door",
  garageDoorType: "",
  gateType: "",
  message: "",
  company: "",
};

function validate(form: FormValues): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.suburb.trim()) errors.suburb = "Suburb is required";
  return errors;
}

/* ---------- Dropdown ---------- */
interface DropdownProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string;
}

function Dropdown({ label, value, options, onChange, error }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const id = useRef(`dd-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const item = listRef.current?.children[focused] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  const select = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setFocused(value ? Math.max(options.indexOf(value), 0) : 0);
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, options.length - 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(options[focused]); return; }
    if (e.key === "Home") { e.preventDefault(); setFocused(0); return; }
    if (e.key === "End") { e.preventDefault(); setFocused(options.length - 1); }
  };

  const listId = `${id.current}-list`;

  return (
    <div className="relative" ref={ref}>
      <label className="mb-1.5 block text-xs font-semibold text-ink" id={`${id.current}-label`}>
        {label}
      </label>
      <button
        type="button"
        onClick={() => { setFocused(value ? Math.max(options.indexOf(value), 0) : 0); setOpen((v) => !v); }}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id.current}-label`}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${id.current}-opt-${focused}` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id.current}-err` : undefined}
        className={`flex w-full items-center justify-between rounded-xl border bg-surface-raised px-4 py-3 text-left text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/20 ${
          error ? "border-accent" : "border-border hover:border-brand/40 hover:shadow-sm"
        }`}
      >
        <span className={value ? "text-ink" : "text-ink-light"}>{value || "Select..."}</span>
        <ChevronDown
          size={18}
          className={`text-ink-light transition-transform duration-300 ${open ? "rotate-180 text-brand" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={`${id.current}-label`}
          className="absolute z-30 mt-1.5 max-h-56 w-full overflow-auto rounded-xl border border-border bg-surface-raised py-1 shadow-xl animate-fade-in-scale"
          style={{ transformOrigin: "top" }}
        >
          {options.map((option, i) => (
            <li
              key={option}
              id={`${id.current}-opt-${i}`}
              role="option"
              aria-selected={value === option}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 ${
                i === focused ? "bg-brand/8 text-brand" : "text-ink-soft hover:bg-surface-alt"
              }`}
              onMouseEnter={() => setFocused(i)}
              onClick={() => select(option)}
            >
              {option}
              {value === option ? <Check size={16} className="text-brand" aria-hidden="true" /> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p id={`${id.current}-err`} className="mt-1 text-xs text-accent" role="alert">{error}</p> : null}
    </div>
  );
}

/* ---------- Chips ---------- */
interface ChipsProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

function Chips({ label, value, options, onChange }: ChipsProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-ink">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active
                  ? "border-brand bg-brand/10 text-brand shadow-sm"
                  : "border-border bg-surface-raised text-ink-soft hover:border-brand/40 hover:text-brand hover:shadow-sm"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Input Field ---------- */
interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

function InputField({ id, label, value, onChange, error, type = "text", placeholder }: InputFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full rounded-xl border bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-light transition-all duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 focus:shadow-sm ${
          error ? "border-accent" : "border-border hover:border-brand/30"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1 flex items-center gap-1 text-xs text-accent" role="alert">
          <AlertCircle size={12} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Main Contact ---------- */
export default function Contact({ onCall }: Props) {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Math.floor(Date.now() / 1000));
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!HAS_TURNSTILE) return;

    if (!document.querySelector("script[data-turnstile]")) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-turnstile", "true");
      document.head.appendChild(script);
    }

    const interval = window.setInterval(() => {
      if (window.turnstile && turnstileRef.current && widgetId.current === null) {
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_KEY,
          theme: "light",
          callback: () => setSubmitError(""),
          "expired-callback": () => setSubmitError("Please complete the spam protection check again."),
          "error-callback": () => setSubmitError("Spam protection could not load. Please refresh and try again."),
        });
        window.clearInterval(interval);
      }
    }, 300);

    return () => window.clearInterval(interval);
  }, []);

  const update = (key: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const dt = new DataTransfer();
      dt.items.add(file);
      if (fileRef.current) fileRef.current.files = dt.files;
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    if (fileRef.current) fileRef.current.value = "";
    setFileName("");
  };

  const resetTurnstile = () => {
    if (HAS_TURNSTILE && window.turnstile && widgetId.current) {
      window.turnstile.reset(widgetId.current);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.company) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setSubmitError("Please complete the required fields.");
      return;
    }

    if (!HAS_TURNSTILE) {
      setStatus("error");
      setSubmitError("Spam protection is not configured yet. Add the Cloudflare Turnstile site key before live submissions.");
      return;
    }

    const token = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value;
    if (!token) {
      setStatus("error");
      setSubmitError("Please complete the spam protection check before sending.");
      return;
    }

    setStatus("submitting");

    try {
      const payload = new FormData();
      payload.append("action", ELEMENTOR.action);
      payload.append("post_id", ELEMENTOR.post_id);
      payload.append("form_id", ELEMENTOR.form_id);
      payload.append("queried_id", ELEMENTOR.queried_id);
      payload.append("form_fields[name]", form.name);
      payload.append("form_fields[email]", form.email);
      payload.append("form_fields[phone]", form.phone);
      payload.append("form_fields[suburb]", form.suburb);
      payload.append("form_fields[property_type]", form.propertyType);
      payload.append("form_fields[service_type]", form.serviceType);
      payload.append("form_fields[service_for]", form.serviceFor);
      payload.append("form_fields[door_type]", form.serviceFor === "Gate" ? form.gateType : form.garageDoorType);
      payload.append("form_fields[message]", form.message);
      payload.append("form_fields[source]", "garagedoorsystems.org");
      payload.append("form_fields[brand]", `${BUSINESS.name} by ${BUSINESS.parenBrand}`);
      payload.append("company", form.company);
      payload.append("_form_started_at", String(formStartedAt));
      payload.append("cf-turnstile-response", token);

      const file = fileRef.current?.files?.[0];
      if (file) payload.append("form_fields[photo]", file);

      const response = await fetch(ENDPOINT, { method: "POST", body: payload });
      const result = await response.json().catch(() => null);
      if (!response.ok || (result && result.ok === false)) {
        throw new Error(result?.message || `HTTP ${response.status}`);
      }

      setStatus("success");
      trackEvent("quote_form_submit", { service: form.serviceType || "unknown", source: "garagedoorsystems.org" });
      setForm(EMPTY_FORM);
      setFileName("");
      if (fileRef.current) fileRef.current.value = "";
      setFormStartedAt(Math.floor(Date.now() / 1000));
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
      setFormStartedAt(Math.floor(Date.now() / 1000));
      resetTurnstile();
    }
  };

  return (
    <section id="contact" className="section bg-surface-alt">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        {/* Left column */}
        <ScrollReveal direction="left">
          <span className="eyebrow mb-4">Get a Quote</span>
          <h2 className="h-section">Request Your Free Quote.</h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Tell us about the garage door system you need — supply, install, repair,
            automation, maintenance or emergency help. Prefer to talk? Call us any time.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href={CONTACT.emergencyTel}
              onClick={() => trackCall("emergency")}
              className="group flex items-center gap-3 rounded-2xl border border-accent/15 bg-surface-raised p-4 shadow-card transition-all duration-300 hover:border-accent/30 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-ink-light">
                  24/7 emergency
                </span>
                <span className="font-display text-lg font-bold text-ink transition-colors duration-200 group-hover:text-accent">{CONTACT.emergencyPhone}</span>
              </span>
            </a>
            <a
              href={CONTACT.phoneTel}
              onClick={() => { onCall(); trackCall("business"); }}
              className="group flex items-center gap-3 rounded-2xl border border-brand/10 bg-surface-raised p-4 shadow-card transition-all duration-300 hover:border-brand/25 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-ink-light">
                  Business hours
                </span>
                <span className="font-display text-lg font-bold text-ink transition-colors duration-200 group-hover:text-brand">{CONTACT.phone}</span>
              </span>
            </a>
          </div>

          <p className="mt-6 text-sm text-ink-light">
            {CONTACT.address} | {CONTACT.hours}
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 shadow-card transition-all duration-300 hover:shadow-card-hover">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <ClipboardCheck size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  What helps us quote faster
                </h3>
                <p className="text-sm text-ink-light">A few details can save a callback.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-ink-soft">
              {[
                { icon: Camera, text: "Upload a photo of the door, motor, remote, track, or warning light." },
                { icon: Wrench, text: "Tell us if it is stuck, noisy, off track, damaged, or only opening halfway." },
                { icon: ShieldCheck, text: "We will confirm repair-first options before recommending replacement." },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="group/tip flex gap-3 rounded-2xl border border-border bg-surface-alt p-4 transition-all duration-200 hover:border-brand/20 hover:bg-brand/[0.02]"
                >
                  <Icon className="mt-0.5 shrink-0 text-brand transition-transform duration-200 group-hover/tip:scale-110" size={18} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right column — Form */}
        <ScrollReveal direction="right" className="lg:pl-2">
          {status === "success" ? (
            <div className="card flex flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="relative">
                <CheckCircle2 size={56} className="text-brand" />
                <div className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-brand/30" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink">Thanks, we have it.</h3>
              <p className="max-w-sm text-sm text-ink-soft leading-relaxed">
                We will be in touch shortly. For urgent issues, call {CONTACT.emergencyPhone}.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn-primary mt-2">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
              {/* Progress bar for submitting */}
              {status === "submitting" && (
                <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-2xl">
                  <div className="h-full w-full origin-left animate-shimmer" style={{
                    background: "linear-gradient(90deg, transparent, #1B4D8F, transparent)",
                  }} />
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField id="name" label="Name" placeholder="Your name" value={form.name} onChange={(v) => update("name", v)} error={errors.name} />
                <InputField id="phone" label="Phone" placeholder="04xx xxx xxx" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField id="email" label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
                <InputField id="suburb" label="Suburb" placeholder="e.g. Glen Waverley" value={form.suburb} onChange={(v) => update("suburb", v)} error={errors.suburb} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Dropdown
                  label="Property type"
                  value={form.propertyType}
                  options={FORM_OPTIONS.propertyTypes}
                  onChange={(value) => update("propertyType", value)}
                />
                <Dropdown
                  label="Service type"
                  value={form.serviceType}
                  options={FORM_OPTIONS.serviceTypes}
                  onChange={(value) => update("serviceType", value)}
                />
              </div>

              <Chips
                label="What's it for?"
                value={form.serviceFor}
                options={FORM_OPTIONS.serviceFor}
                onChange={(value) => update("serviceFor", value)}
              />

              {form.serviceFor === "Gate" ? (
                <Dropdown
                  label="Gate type"
                  value={form.gateType}
                  options={FORM_OPTIONS.gateTypes}
                  onChange={(value) => update("gateType", value)}
                />
              ) : (
                <Dropdown
                  label="Garage door type"
                  value={form.garageDoorType}
                  options={FORM_OPTIONS.garageDoorTypes}
                  onChange={(value) => update("garageDoorType", value)}
                />
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink" htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-light transition-all duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 resize-none hover:border-brand/30"
                  placeholder="Describe the fault or what you need..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              {/* Photo upload with drag-and-drop */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Photo (optional)</label>
                <div
                  className={`drop-zone rounded-2xl p-3 transition-all duration-300 ${dragOver ? "drag-over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-surface-raised px-4 py-3 text-left transition-all duration-200 hover:shadow-sm"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-200 group-hover:scale-110">
                        {fileName ? <FileImage size={18} /> : <Upload size={18} />}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {fileName || "Upload a photo of the door or opener"}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-light">
                          JPG, PNG, HEIC, or WebP helps us quote faster.
                        </span>
                      </span>
                    </button>
                    {fileName ? (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 px-4 py-3 text-sm font-semibold text-accent transition-all duration-200 hover:bg-accent/10 hover:shadow-sm"
                      >
                        <X size={16} /> Remove
                      </button>
                    ) : null}
                  </div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />

              {/* Turnstile */}
              {HAS_TURNSTILE ? (
                <div className="rounded-xl border border-border bg-surface-alt p-2 transition-colors hover:border-brand/20">
                  <div ref={turnstileRef} className="cf-turnstile min-h-[65px]" />
                </div>
              ) : (
                <p className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
                  Add your Cloudflare Turnstile site key in .env.local before live submissions.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-accent w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Request free quote"
                )}
              </button>

              {status === "error" ? (
                <div className="flex items-start gap-2 rounded-xl border border-accent/20 bg-accent/5 p-3 text-sm text-accent">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{submitError || "Something went wrong."} Please call {CONTACT.emergencyPhone} if urgent.</span>
                </div>
              ) : null}
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
