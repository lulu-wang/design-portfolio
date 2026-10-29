"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { useGalleryChrome } from "@/components/GalleryChrome";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { arcfellSummary } from "@/data/arcfell";
import { flipnoteOriginalUrl, flipnoteSummary } from "@/data/flipnote";
import {
  illustrations,
  visibleGalleryTabs,
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
    <article className="grid items-center gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:items-start md:gap-14">
      <Link href={href} className="block w-full">
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </Link>
      <div>
        <h2 className="text-[24px] leading-[1.3]">
          <Link href={href} className="hover:opacity-60">
            {title}
          </Link>
        </h2>
        <p className="mt-3 max-w-xl text-[16px] leading-[1.47]">{summary}</p>
        <p className="mt-3 text-[16px] leading-[1.47] text-black/60">{eyebrow}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px]">
          <Link href={href} className="underline underline-offset-4 hover:opacity-60">
            Read
          </Link>
          {originalHref ? (
            <a
              href={originalHref}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:opacity-60"
            >
              Original
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Tile({
  item,
  onOpen,
}: {
  item: Illustration;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden bg-black/10 text-left"
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        width={item.width}
        height={item.height}
        className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
  const { setGalleryPaper } = useGalleryChrome();
  const comics = tab === "comics";
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

  useLayoutEffect(() => {
    setGalleryPaper(comics);
  }, [comics, setGalleryPaper]);

  useLayoutEffect(() => {
    return () => setGalleryPaper(false);
  }, [setGalleryPaper]);

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
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap pb-8 pt-14 sm:pt-20">
        <h1 className="text-[28px] leading-[1.3]">Gallery</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.47]">
          Studies, editorial work, and visual experiments across illustration,
          sketches, photography, design, and comics.
        </p>
        <nav className="mt-8 flex gap-8 overflow-x-auto" aria-label="Gallery categories">
          {visibleGalleryTabs.map((t) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 pb-1 text-[16px] ${
                  selected
                    ? "after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-4 after:-translate-x-1/2 after:bg-black"
                    : "hover:opacity-60"
                }`}
                aria-pressed={selected}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </section>

      <section className="folio-wrap flex-1 pb-16">
        {tab === "comics" ? (
          <div className="flex flex-col gap-16 py-6 sm:gap-20">
            <ComicEntry
              href="/illustrations/flipnote"
              image="/images/flipnote/page-01.jpg"
              imageAlt="First page of Flipnote, a DSi comic about Alek"
              imageWidth={1071}
              imageHeight={1386}
              eyebrow="Comic · Flipnote on DSi · 2020"
              title="Alek & Tain"
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
          <div className="py-16">
            <h2 className="text-[23px] leading-[1.3]">Nothing here yet</h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.47]">
              This collection is empty for now. Check back soon, or explore the
              Illustrations tab.
            </p>
          </div>
        ) : (
          <div
            key={`${tab}-${columnCount}`}
            className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4"
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex min-w-0 flex-col gap-3 lg:gap-4">
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
