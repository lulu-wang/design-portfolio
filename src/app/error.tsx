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
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <section className="flex min-h-[50vh] flex-col items-start justify-center py-16 sm:min-h-[55vh] sm:py-24">
        <h1 className="max-w-xl text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
          Something went wrong
        </h1>
        <p className="font-secondary mt-6 max-w-md text-base leading-[29px] text-[#5c5c5c] sm:mt-8">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6 sm:mt-10">
          <button
            type="button"
            onClick={reset}
            className="bg-foreground px-9 py-4 text-[13px] font-bold tracking-widest text-background transition-opacity hover:opacity-80"
          >
            TRY AGAIN
          </button>
          <Link
            href="/"
            className="text-sm font-bold tracking-widest transition-opacity hover:opacity-60"
          >
            Back home →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
