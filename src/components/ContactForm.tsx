"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:lulu.wang25@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-y border-b border-black/15 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-muted/50 focus:border-foreground"
          placeholder="What would you like to talk about?"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-foreground px-9 py-4 text-[13px] font-bold tracking-widest text-background transition-opacity hover:opacity-80"
        >
          SEND MESSAGE
        </button>
        {sent && (
          <p className="font-secondary text-sm text-muted">
            Opening your email client…
          </p>
        )}
      </div>
    </form>
  );
}
