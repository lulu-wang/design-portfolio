import type { Metadata } from "next";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — Lulu Wang",
};

export default function NotFound() {
  return (
    <main className="page-wrap pt-28 sm:pt-32">
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
