"use client";
import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const err: Record<string, string> = {};
    if (name.length < 2 || name.length > 80) err.name = "Please enter your name (2–80 characters).";
    if (!EMAIL_RE.test(email) || email.length > 120) err.email = "Please enter a valid email address.";
    if (message.length < 10 || message.length > 1500) err.message = "Message must be 10–1500 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const subject = encodeURIComponent(`Sky Ball message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setDone(true);
  }
  const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2";
  return (
    <form onSubmit={onSubmit} noValidate className="max-w-lg space-y-4">
      {(["name", "email"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={k} className="mb-1 block font-semibold capitalize">{k}</label>
          <input id={k} name={k} type={k === "email" ? "email" : "text"} maxLength={120} className={field} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-e` : undefined} />
          {errors[k] && <p id={`${k}-e`} role="alert" className="mt-1 text-sm text-red-700">{errors[k]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-1 block font-semibold">Message</label>
        <textarea id="message" name="message" rows={5} maxLength={1500} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-e" : undefined} />
        {errors.message && <p id="message-e" role="alert" className="mt-1 text-sm text-red-700">{errors.message}</p>}
      </div>
      <button type="submit" className="btn">Open in my email app</button>
      {done && <p role="status" className="text-sm">Your email app should open with the message ready to send. If nothing opened, write to {to} directly.</p>}
    </form>
  );
}
