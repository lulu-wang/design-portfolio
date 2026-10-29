import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — Lulu Wang",
};

export default function NotFound() {
  return (
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap flex-1 py-16 sm:py-24">
        <h1 className="text-[28px] leading-[1.3]">Page not found</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.47]">
          This page doesn’t exist, or it’s been moved.
        </p>
        <Link href="/" className="mt-8 inline-block text-[16px] underline underline-offset-4">
          Back home
        </Link>
      </section>
      <Footer />
    </main>
  );
}
