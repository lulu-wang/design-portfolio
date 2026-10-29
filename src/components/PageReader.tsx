"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";
export type ReaderPage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  number: number;
  part?: number;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M11 3.5 6 9l5 5.5" : "M7 3.5 12 9l-5 5.5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PageReader({
  pages,
  label = "Comic pages, read left to right",
}: {
  pages: ReaderPage[];
  label?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const drag = useRef({ active: false, startX: 0, scroll: 0 });
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const lenis = useLenis();

  const setPage = useCallback((next: number) => {
    const i = Math.max(0, Math.min(pages.length - 1, next));
    indexRef.current = i;
    setIndex(i);
    return i;
  }, [pages.length]);

  const scrollToIndex = useCallback((next: number, behavior: ScrollBehavior = "smooth") => {
    const el = scroller.current;
    if (!el) return;
    const i = setPage(next);
    const page = el.querySelector<HTMLElement>(`[data-index="${i}"]`);
    if (!page) return;
    el.scrollTo({
      left: page.offsetLeft - (el.clientWidth - page.offsetWidth) / 2,
      behavior,
    });
  }, [setPage]);

  const syncFromScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    el.querySelectorAll<HTMLElement>("[data-index]").forEach((page) => {
      const mid = page.offsetLeft + page.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = Number(page.dataset.index);
      }
    });
    if (best !== indexRef.current) {
      indexRef.current = best;
      setIndex(best);
    }
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromScroll);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [syncFromScroll]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= max - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) {
        if (!lenis) return;
        e.preventDefault();
        lenis.scrollTo(lenis.scroll + e.deltaY, { immediate: true });
        return;
      }
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(indexRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(indexRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(pages.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length, scrollToIndex]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scroll: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!drag.current.active || !el) return;
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    syncFromScroll();
  };

  const current = pages[index];
  const atStart = index <= 0;
  const atEnd = index >= pages.length - 1;

  return (
    <div className="relative">
      <div className="page-wrap mb-4 flex items-center justify-between gap-4">
        <p className="text-[16px] text-black/60">
          {current?.part ? (
            <>
              Part {current.part}
              <span className="mx-2 text-black/30">·</span>
            </>
          ) : null}
          <span className="tabular-nums">
            {String(current?.number ?? 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
          </span>
        </p>
        <p className="hidden text-[16px] text-black/50 sm:block">
          Scroll sideways, or use the arrow keys
        </p>
      </div>

      <div className="relative">
        <div
          ref={scroller}
          data-lenis-prevent
          className={`page-reader ${dragging ? "is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          tabIndex={0}
          role="region"
          aria-label={label}
        >
          {pages.map((page, i) => (
            <figure key={page.src} data-index={i} className="page-reader-sheet">
              {Math.abs(i - index) <= 2 ? (
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={page.width}
                  height={page.height}
                  draggable={false}
                  priority={i === index}
                  className="pointer-events-none h-full w-full select-none object-contain"
                  sizes="(max-width: 768px) 86vw, 640px"
                />
              ) : null}
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-[0_6px_20px_rgba(17,17,17,0.12)] ring-1 ring-black/5 transition disabled:pointer-events-none disabled:opacity-0 sm:left-5"
          aria-label="Previous page"
          disabled={atStart}
          onClick={() => scrollToIndex(index - 1)}
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-[0_6px_20px_rgba(17,17,17,0.12)] ring-1 ring-black/5 transition disabled:pointer-events-none disabled:opacity-0 sm:right-5"
          aria-label="Next page"
          disabled={atEnd}
          onClick={() => scrollToIndex(index + 1)}
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div className="page-wrap mt-4" aria-hidden>
        <div className="mx-auto h-px w-full max-w-[220px] bg-black/15">
          <div
            className="h-px bg-black transition-[width] duration-300"
            style={{ width: `${((index + 1) / pages.length) * 100}%` }}
          />
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Page {current?.number ?? 1} of {pages.length}
        {current?.part ? `, part ${current.part}` : ""}
      </p>
    </div>
  );
}
