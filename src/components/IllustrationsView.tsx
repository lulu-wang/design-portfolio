"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { arcfellSummary } from "@/data/arcfell";
import { flipnoteOriginalUrl, flipnoteSummary } from "@/data/flipnote";
import {
  illustrations,
  galleryTabs,
  type Illustration,
  type GalleryCategory,
} from "@/data/illustrations";

function ComicEntry({
  href,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  eyebrow,
  title,
  summary,
  originalHref,
}: {
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  eyebrow: string;
  title: string;
  summary: string;
  originalHref?: string;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-14">
      <Link
        href={href}
        className="mx-auto w-full max-w-[280px] bg-white shadow-[0_18px_50px_rgba(22,22,22,0.08)] ring-1 ring-black/[0.06]"
      >
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-full"
          sizes="280px"
        />
      </Link>
      <div className="max-w-xl">
        <p className="font-display text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
          {eyebrow}
        </p>
        <h2 className="page-heading mt-3 text-[clamp(1.45rem,2.2vw,1.85rem)]">
          <Link href={href}>{title}</Link>
        </h2>
        <p className="mt-3 max-w-xl font-reading text-[15px] font-medium leading-relaxed text-muted">
          {summary}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={href} className="pill-btn">
            Read
          </Link>
          {originalHref ? (
            <a
              href={originalHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white px-6 py-[0.85rem] font-secondary text-[0.9rem] font-semibold tracking-[-0.02em] text-foreground transition hover:border-[#7C5CF6] hover:text-[#7C5CF6]"
            >
              Original Link
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Tile({
  item,
  onOpen,
}: {
  item: Illustration;
  onOpen: () => void;
}) {
  // Tall phone mockups — slight inset so they don't dominate the masonry
  const compactPreview =
    item.id === "d08" || item.id === "d09" || item.id === "d10" || item.id === "d12";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block w-full overflow-hidden text-left ${
        compactPreview ? "px-5 py-5 sm:px-6 sm:py-6" : ""
      }`}
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        width={item.width}
        height={item.height}
        className={`h-auto w-full transition-transform duration-500 group-hover:scale-[1.02] ${
          compactPreview ? "object-contain" : "object-cover"
        }`}
        sizes="(max-width: 1023px) 50vw, 33vw"
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </button>
  );
}

function useColumnCount() {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else setCount(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

/** Distribute items into columns by shortest height. */
function buildColumns(items: Illustration[], columnCount: number) {
  const cols: Illustration[][] = Array.from({ length: columnCount }, () => []);
  const heights = Array.from({ length: columnCount }, () => 0);

  for (const item of items) {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    cols[shortest].push(item);
    heights[shortest] += item.height / item.width;
  }

  return cols;
}

export default function IllustrationsView({
  initialTab = "illustrations",
}: {
  initialTab?: GalleryCategory;
}) {
  const [tab, setTab] = useState<GalleryCategory>(initialTab);
  const [activeId, setActiveId] = useState<string | null>(null);
  const columnCount = useColumnCount();

  const filtered = useMemo(
    () => illustrations.filter((i) => i.category === tab),
    [tab],
  );

  const columns = useMemo(
    () => buildColumns(filtered, columnCount),
    [filtered, columnCount],
  );

  useEffect(() => {
    setActiveId(null);
  }, [tab]);

  const activeIndex = useMemo(
    () => (activeId ? filtered.findIndex((i) => i.id === activeId) : -1),
    [activeId, filtered],
  );
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;

  const open = (item: Illustration) => setActiveId(item.id);
  const close = () => setActiveId(null);
  const prev = () => {
    if (activeIndex < 0 || filtered.length === 0) return;
    const i = (activeIndex - 1 + filtered.length) % filtered.length;
    setActiveId(filtered[i].id);
  };
  const next = () => {
    if (activeIndex < 0 || filtered.length === 0) return;
    const i = (activeIndex + 1) % filtered.length;
    setActiveId(filtered[i].id);
  };

  return (
    <main className="pt-28 sm:pt-32">
      {/* Hero */}
      <section className="page-wrap pt-6">
        <h1 className="page-heading animate-rise text-[clamp(2.35rem,5vw,4.15rem)]">
          Gallery
        </h1>
        <p
          className="page-subtitle animate-rise mt-6 max-w-2xl sm:mt-8 md:max-w-3xl"
          style={{ animationDelay: "80ms" }}
        >
          Studies, editorial work, and visual experiments across illustration,
          sketches, photography and modeling, design, and comics.
        </p>
      </section>

      {/* Horizontal category tabs */}
      <nav className="page-wrap mt-10 sm:mt-12" aria-label="Gallery categories">
        <div className="flex gap-8 overflow-x-auto pb-px sm:gap-12">
          {galleryTabs.map((t) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`min-h-11 shrink-0 border-b-2 pb-3 pt-2 text-left font-display text-[13px] font-medium uppercase tracking-[0.14em] transition-colors sm:min-h-0 sm:pt-0 ${
                  selected
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted hover:text-[#7C5CF6]"
                }`}
                aria-pressed={selected}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Masonry — edge-to-edge, no side inset */}
      <section className="w-full pb-10 pt-8 sm:pt-10">
        {tab === "comics" ? (
          <div className="page-wrap flex flex-col gap-16 py-8 sm:gap-20 sm:py-12">
            <ComicEntry
              href="/illustrations/flipnote"
              image="/images/flipnote/page-01.jpg"
              imageAlt="First page of Flipnote, a DSi comic about Alek"
              imageWidth={1071}
              imageHeight={1386}
              eyebrow="Comic · Flipnote on DSi · 2020"
              title="Alek & Tain - Flipnote Manga"
              summary={flipnoteSummary}
              originalHref={flipnoteOriginalUrl}
            />
            <ComicEntry
              href="/illustrations/arcfell"
              image="/images/arcfell/page-01.jpg"
              imageAlt="First page of Arcfell"
              imageWidth={1200}
              imageHeight={1553}
              eyebrow="Comic · Adobe Photoshop · 2018"
              title="Arcfell"
              summary={arcfellSummary}
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="page-wrap py-20 sm:py-24">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Nothing here yet
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              This collection is empty for now. Check back soon, or explore the
              Illustrations tab.
            </p>
          </div>
        ) : (
          <div
            key={`${tab}-${columnCount}`}
            className="animate-rise grid w-full grid-cols-2 lg:grid-cols-3"
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex min-w-0 flex-col">
                {col.map((item) => (
                  <Tile
                    key={item.id}
                    item={item}
                    onOpen={() => open(item)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="page-wrap">
        <Footer />
      </div>

      {active && (
        <Lightbox
          item={active}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </main>
  );
}
