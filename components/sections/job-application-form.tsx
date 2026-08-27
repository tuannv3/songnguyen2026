"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { createJobApplication } from "@/lib/cms/actions/job-applications";

export function JobApplicationForm({
  positions,
  defaultPosition,
}: {
  positions: string[];
  defaultPosition?: string | null;
}) {
  const { dict } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");

    const result = await createJobApplication({
      applicantName: String(formData.get("name") ?? ""),
      applicantEmail: String(formData.get("email") ?? ""),
      applicantPhone: String(formData.get("phone") ?? ""),
      position: String(formData.get("position") ?? ""),
      message: String(formData.get("message") ?? ""),
    });

    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-2xl border border-primary/25 bg-primary/5 px-6 py-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
        <p className="font-serif-display text-lg text-ink">{dict.careers.successHeading}</p>
        <p className="max-w-sm text-sm text-ink/80">{dict.careers.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="application-name" className="text-sm font-medium text-ink">
          {dict.common.name} <span className="text-destructive">*</span>
        </label>
        <input
          id="application-name"
          name="name"
          type="text"
          required
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="application-email" className="text-sm font-medium text-ink">
          {dict.common.email} <span className="text-destructive">*</span>
        </label>
        <input
          id="application-email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="application-phone" className="text-sm font-medium text-ink">
          {dict.common.phone}
        </label>
        <input
          id="application-phone"
          name="phone"
          type="tel"
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="application-position" className="text-sm font-medium text-ink">
          {dict.careers.positionLabel}
        </label>
        <select
          id="application-position"
          name="position"
          defaultValue={defaultPosition ?? ""}
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        >
          <option value=""></option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
          <option value={dict.careers.positionOther}>{dict.careers.positionOther}</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="application-message" className="text-sm font-medium text-ink">
          {dict.common.message} <span className="text-destructive">*</span>
        </label>
        <textarea
          id="application-message"
          name="message"
          required
          rows={5}
          className="resize-none rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>

      {status === "error" ? <p className="text-sm text-destructive sm:col-span-2">{errorMessage}</p> : null}

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
