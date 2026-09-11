"use client";

import Link from "next/link";
import { useActionState } from "react";
import { unlockOpalPrototype } from "./actions";

export default function UnlockForm() {
  const [state, formAction, pending] = useActionState(unlockOpalPrototype, null);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#fdfcfb] px-5">
      <form action={formAction} className="w-full max-w-sm">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/40">
          Protected prototype
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">
          Opal
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          This web app is password protected. Enter the password to open the
          prototype.
        </p>
        <label className="mt-8 block">
          <span className="text-[13px] font-medium text-foreground/50">
            Password
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            required
            className="mt-2 h-12 w-full rounded-full border border-black/[0.08] bg-white px-4 text-[15px] outline-none focus:border-black/30"
          />
        </label>
        {state?.error ? (
          <p className="mt-3 text-[13px] text-[#b42318]" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink text-[15px] font-medium text-background disabled:opacity-60"
        >
          {pending ? "Opening…" : "Open prototype"}
        </button>
        <Link
          href="/projects"
          className="mt-6 inline-block text-[13px] text-foreground/45 transition-opacity hover:opacity-70"
        >
          Back to projects
        </Link>
      </form>
    </main>
  );
}
