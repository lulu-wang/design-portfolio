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
        <h1 className="font-title max-w-xl text-[clamp(2.35rem,5vw,4.15rem)] font-bold leading-[1.12] tracking-[-0.045em]">
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
            className="text-sm text-foreground/50 transition-opacity hover:opacity-70"
          >
            Back home →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
