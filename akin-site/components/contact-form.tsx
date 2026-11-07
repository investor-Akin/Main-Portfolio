"use client";

import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import { budgetBands, contact, profile, projectTypes } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const whatsappNumber = profile.phoneHref.replace(/[^\d]/g, "");

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const read = (data: FormData) => ({
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    type: String(data.get("type") ?? projectTypes[0]),
    budget: String(data.get("budget") ?? budgetBands[4]),
    message: String(data.get("message") ?? "").trim(),
  });

  /** Validate on submit and return the values, or null when something is wrong. */
  const validate = (data: FormData) => {
    const values = read(data);
    const next: Errors = {};

    if (values.name.length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = "Please add an email address I can reply to.";
    if (values.message.length < 10)
      next.message = "A sentence or two about the project helps.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      field?.focus();
      setStatus("Some details need fixing before this can send.");
      return null;
    }

    return values;
  };

  const asText = (values: ReturnType<typeof read>) =>
    [
      `Hi Akin, I found your portfolio.`,
      ``,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project: ${values.type}`,
      `Budget: ${values.budget}`,
      ``,
      values.message,
    ].join("\n");

  const onWhatsApp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = validate(new FormData(form));
    if (!values) return;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(asText(values))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("Opened WhatsApp with your message. Send it there and I will reply.");
  };

  const onEmail = () => {
    const form = formRef.current;
    if (!form) return;
    const values = validate(new FormData(form));
    if (!values) return;

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `New project: ${values.type}`,
    )}&body=${encodeURIComponent(asText(values))}`;
    setStatus("Opened your email app with the details filled in.");
  };

  const fieldClass =
    "w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/45 transition-colors focus:border-orange-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink";
  const labelClass =
    "block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55";

  return (
    <form
      ref={formRef}
      id="contact-form"
      onSubmit={onWhatsApp}
      noValidate
      className="scroll-mt-28 rounded-[24px] border border-ink/10 bg-cream p-6 shadow-[0_24px_60px_-40px_rgba(30,29,27,0.45)] sm:p-7"
    >
      <h3 className="font-display text-xl font-extrabold tracking-[-0.02em]">
        Start a project
      </h3>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
        {contact.formNote}
      </p>

      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Ada Obi"
            className={`mt-1.5 ${fieldClass}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[11.5px] text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@company.com"
            className={`mt-1.5 ${fieldClass}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-[11.5px] text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>
            Project type
          </label>
          <select id="type" name="type" className={`mt-1.5 ${fieldClass}`}>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue={budgetBands[4]}
            className={`mt-1.5 ${fieldClass}`}
          >
            {budgetBands.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3.5">
        <label htmlFor="message" className={labelClass}>
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="A short sentence on the project, the deadline and anything already in place."
          className={`mt-1.5 resize-y ${fieldClass}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-[11.5px] text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="submit"
          className="group inline-flex flex-1 items-center justify-between gap-3 rounded-full bg-orange py-2 pl-5 pr-2 text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="size-4" aria-hidden="true" />
            Send on WhatsApp
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" strokeWidth={2.4} aria-hidden="true" />
          </span>
        </button>

        <button
          type="button"
          onClick={onEmail}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-white"
        >
          <Mail className="size-4" aria-hidden="true" />
          Email instead
        </button>
      </div>

      <p aria-live="polite" className="mt-3 min-h-4 text-[11.5px] text-muted">
        {status}
      </p>
    </form>
  );
}
