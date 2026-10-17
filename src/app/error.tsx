"use client";

import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col">
      <section className="bg-[#F7F4EF] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
          Error
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em]">
          Something went wrong
        </h1>
        <p className="mt-6 max-w-4xl text-[16px] leading-relaxed text-foreground/60">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <button type="button" onClick={reset} className="pill-btn">
            Try again
          </button>
          <Link href="/" className="arrow-link inline-flex items-center gap-2 text-[15px]">
            Back home <Arrow className="h-2.5" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
