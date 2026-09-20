"use client";

import Link from "next/link";
import { useActionState } from "react";
import { unlockOpalPrototype } from "./actions";

export default function UnlockForm() {
  const [state, formAction, pending] = useActionState(unlockOpalPrototype, null);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f6f9fc] px-5">
      <form action={formAction} className="w-full max-w-sm">
        <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#6a7383]">
          Protected prototype
        </p>
        <h1 className="mt-3 text-[28px] font-medium tracking-[-0.03em] text-[#0a2540]">
          Opal
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-[#425466]">
          This web app is password protected. Enter the password to open the
          prototype.
        </p>
        <label className="mt-8 block">
          <span className="text-[13px] font-medium text-[#0a2540]">
            Password
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            required
            className="mt-2 h-10 w-full rounded-md border border-[#e3e8ee] bg-white px-3 text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#eeedfe]"
          />
        </label>
        {state?.error ? (
          <p className="mt-3 text-[13px] text-[#df1b41]" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-md bg-[#635bff] text-[14px] font-medium text-white hover:bg-[#5851ea] disabled:opacity-60"
        >
          {pending ? "Opening…" : "Open prototype"}
        </button>
        <Link
          href="/projects/opal"
          className="mt-6 inline-block text-[13px] text-[#6a7383] transition-opacity hover:text-[#0a2540]"
        >
          Back to project
        </Link>
      </form>
    </main>
  );
}
