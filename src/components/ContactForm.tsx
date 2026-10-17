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
    <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-foreground/50">Name</span>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full bg-[#EFEAE3] px-4 py-3 text-base outline-none transition-colors placeholder:text-foreground/35 focus:bg-[#E7E1D8]"
            placeholder="Enter your name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-sm text-foreground/50">Email</span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full bg-[#EFEAE3] px-4 py-3 text-base outline-none transition-colors placeholder:text-foreground/35 focus:bg-[#E7E1D8]"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-foreground/50">Your Project</span>
        <textarea
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-y bg-[#EFEAE3] px-4 py-3 text-base outline-none placeholder:text-foreground/35 focus:bg-[#E7E1D8]"
          placeholder="Tell me about your project"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="pill-btn">
          Submit
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
