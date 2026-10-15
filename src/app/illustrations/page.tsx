import type { Metadata } from "next";
import IllustrationsView from "@/components/IllustrationsView";
import { galleryTabs, type GalleryCategory } from "@/data/illustrations";

export const metadata: Metadata = {
  title: "Gallery — Lulu Wang",
  description:
    "A personal archive of illustrations, sketches, photography and modeling, design, and comics by Lulu Wang.",
};

export default async function IllustrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const { tab } = await searchParams;
  const requested = Array.isArray(tab) ? tab[0] : tab;
  const initialTab = galleryTabs.some((item) => item.id === requested)
    ? (requested as GalleryCategory)
    : "illustrations";

  return <IllustrationsView initialTab={initialTab} />;
}
