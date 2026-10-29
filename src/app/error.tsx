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
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap flex-1 py-16 sm:py-24">
        <h1 className="text-[28px] leading-[1.3]">Something went wrong</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.47]">
          An unexpected error occurred. You can try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={reset}
            className="bg-black px-4 py-2.5 text-[16px] font-semibold text-white hover:opacity-80"
          >
            Try again
          </button>
          <Link href="/" className="text-[16px] underline underline-offset-4">
            Back home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
