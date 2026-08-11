"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";

export function InquiryForm({
  showSubject = false,
  showCompany = true,
}: {
  showSubject?: boolean;
  showCompany?: boolean;
}) {
  const { dict } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-primary/25 bg-primary/5 px-6 py-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
        <p className="max-w-sm text-sm text-ink/80">{dict.common.sentSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-ink">
          {dict.common.name} <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-ink">
          {dict.common.email} <span className="text-destructive">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium text-ink">
          {dict.common.phone}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      {showCompany ? (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-company" className="text-sm font-medium text-ink">
            {dict.common.company}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
          />
        </div>
      ) : null}

      {showSubject ? (
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="contact-subject" className="text-sm font-medium text-ink">
            {dict.common.subject}
          </label>
          <select
            id="contact-subject"
            name="subject"
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
          >
            {dict.contact.subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          {dict.common.message} <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="resize-none rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {status === "sending" ? dict.common.sending : dict.common.submit}
      </button>
    </form>
  );
}
