"use client";

import { useState, type FormEvent } from "react";

const field =
  "mt-2 w-full border border-black bg-white px-3 py-3 text-[16px] text-black outline-none placeholder:text-black/40";

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
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block text-[16px]">
        Email
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          placeholder="Your email"
          autoComplete="email"
        />
      </label>
      <label className="block text-[16px]">
        Name
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
          placeholder="Your name"
          autoComplete="name"
        />
      </label>
      <label className="block text-[16px]">
        Message
        <textarea
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y`}
          placeholder="Write your message here..."
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="bg-black px-4 py-2.5 text-[16px] font-semibold text-white transition-opacity hover:opacity-80"
        >
          Send email
        </button>
        {sent && (
          <p className="text-[16px] text-black/60">Opening your email client…</p>
        )}
      </div>
    </form>
  );
}
