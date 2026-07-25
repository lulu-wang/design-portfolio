import type { Metadata } from "next";
import IllustrationsView from "@/components/IllustrationsView";

export const metadata: Metadata = {
  title: "Gallery — Lulu Wang",
  description:
    "A personal archive of illustrations, photography, and design by Lulu Wang.",
};

export default function IllustrationsPage() {
  return <IllustrationsView />;
}
