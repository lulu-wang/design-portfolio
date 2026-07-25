import type { Metadata } from "next";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — Lulu Wang",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <EmptyState
        title="404"
        description="This page doesn’t exist — or it’s been moved somewhere quieter."
        actionLabel="Back home"
        actionHref="/"
      />
      <Footer />
    </main>
  );
}
