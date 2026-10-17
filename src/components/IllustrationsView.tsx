"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import Arrow from "@/components/Arrow";
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
      <Link
        href={href}
        className="mx-auto block w-full max-w-[280px] md:mx-0 md:max-w-none"
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
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
          {eyebrow}
        </p>
        <div className="mt-3 md:mt-4">
          <h2 className="font-display text-[clamp(1.65rem,2.8vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.045em] md:text-[clamp(2.2rem,4vw,3.6rem)] md:font-extrabold md:uppercase md:leading-[0.88] md:tracking-[-0.05em]">
            <Link href={href}>{title}</Link>
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground/65 sm:text-[16px] md:mt-4">
            {summary}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={href}
            className="arrow-link inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em]"
          >
            Read
            <Arrow className="h-2.5" />
          </Link>
          {originalHref ? (
            <a
              href={originalHref}
              target="_blank"
              rel="noreferrer"
              className="arrow-link inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-foreground/50"
            >
              Original
              <Arrow className="h-2.5" />
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
      className="group relative block w-full overflow-hidden bg-[#2A2A2A] text-left"
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
    <main className={`flex flex-col ${comics ? "" : "bg-[#2A2A2A]"}`}>
      <section
        className={`px-5 pb-12 pt-32 sm:px-8 sm:pb-14 sm:pt-36 lg:px-12 lg:pb-16 ${
          comics ? "bg-[#F7F4EF]" : "bg-[#2A2A2A] text-[#F7F4EF]"
        }`}
      >
        <h1 className="font-display text-[clamp(3.2rem,8vw,7rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em]">
          Gallery
        </h1>
        <p
          className={`mt-6 max-w-4xl text-[16px] leading-relaxed sm:text-[18px] ${
            comics ? "text-foreground/60" : "text-[#F7F4EF]/65"
          }`}
        >
          Studies, editorial work, and visual experiments across illustration,
          sketches, photography, design, and comics.
        </p>
        <nav className="mt-10 flex gap-6 overflow-x-auto sm:gap-10" aria-label="Gallery categories">
          {visibleGalleryTabs.map((t) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`min-h-11 shrink-0 text-left text-[12px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  selected
                    ? comics
                      ? "text-foreground"
                      : "text-[#F7F4EF]"
                    : comics
                      ? "text-foreground/35 hover:text-foreground"
                      : "text-[#F7F4EF]/40 hover:text-[#F7F4EF]"
                }`}
                aria-pressed={selected}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </section>

      <section className={comics ? undefined : "bg-[#2A2A2A]"}>
        {tab === "comics" ? (
          <div className="flex flex-col gap-16 px-5 py-12 sm:gap-20 sm:px-8 sm:py-16 lg:gap-24 lg:px-12 lg:py-20">
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
          <div className="bg-[#2A2A2A] px-5 py-20 text-[#F7F4EF] sm:px-8 sm:py-24 lg:px-12">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.04em]">
              Nothing here yet
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#F7F4EF]/60">
              This collection is empty for now. Check back soon, or explore the
              Illustrations tab.
            </p>
          </div>
        ) : (
          <div
            key={`${tab}-${columnCount}`}
            className="grid grid-cols-2 lg:grid-cols-3"
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
