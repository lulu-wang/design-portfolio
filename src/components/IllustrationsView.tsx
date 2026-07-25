"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import {
  illustrations,
  galleryTabs,
  type Illustration,
  type GalleryCategory,
} from "@/data/illustrations";

function Tile({
  item,
  onOpen,
}: {
  item: Illustration;
  onOpen: () => void;
}) {
  // Tall phone mockups — slight inset so they don't dominate the masonry
  const compactPreview =
    item.id === "d08" || item.id === "d09" || item.id === "d10";

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
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </button>
  );
}

function useColumnCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else if (window.matchMedia("(min-width: 640px)").matches) setCount(2);
      else setCount(1);
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

export default function IllustrationsView() {
  const [tab, setTab] = useState<GalleryCategory>("illustrations");
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
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      {/* Hero */}
      <section className="pt-12 sm:pt-14 md:pt-20">
        <h1 className="animate-rise text-[2.75rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          Gallery
        </h1>
        <p
          className="font-secondary animate-rise mt-8 max-w-2xl text-base leading-[29px] text-muted sm:mt-10"
          style={{ animationDelay: "120ms" }}
        >
          A personal archive of studies, editorial work, and visual experiments
          across illustration, photography, and design.
        </p>
      </section>

      {/* Horizontal category tabs */}
      <nav
        className="mt-10 flex gap-8 overflow-x-auto sm:mt-12 sm:gap-12"
        aria-label="Gallery categories"
      >
        {galleryTabs.map((t) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 border-b-2 pb-3 text-[13px] font-bold uppercase tracking-[0.18em] transition-colors ${
                selected
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
              aria-pressed={selected}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* Masonry — full-bleed, no gaps */}
      <section className="pb-10 pt-8 sm:pt-10">
        {filtered.length === 0 ? (
          <div className="py-20 sm:py-24">
            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Nothing here yet
            </h2>
            <p className="font-secondary mt-4 max-w-md text-base leading-[29px] text-[#5c5c5c]">
              This collection is empty for now. Check back soon, or explore the
              Illustrations tab.
            </p>
          </div>
        ) : (
          <div
            key={`${tab}-${columnCount}`}
            className="animate-rise -mx-5 grid grid-cols-1 sm:-mx-6 sm:grid-cols-2 md:-mx-10 lg:grid-cols-3"
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col">
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

      <Footer />

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
