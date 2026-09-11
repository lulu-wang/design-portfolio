"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-wrap pt-28 sm:pt-32">
      <section className="flex min-h-[50vh] flex-col items-start justify-center py-16 sm:min-h-[55vh] sm:py-24">
        <h1 className="max-w-xl text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl">
          Something went wrong
        </h1>
        <p className="font-secondary mt-6 max-w-md text-base leading-[29px] text-muted sm:mt-8">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6 sm:mt-10">
          <button type="button" onClick={reset} className="pill-btn">
            Try again
          </button>
          <Link
            href="/"
            className="text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
          >
            Back home →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
