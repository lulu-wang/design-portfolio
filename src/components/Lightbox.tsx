"use client";

import Image from "next/image";
import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { Illustration } from "@/data/illustrations";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M17 6L9 14l8 8" : "M11 6l8 8-8 8"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: Illustration;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoomed(false);
  }, [item.id]);

  useEffect(() => {
    if (!zoomed || !stageRef.current) return;
    const el = stageRef.current;
    requestAnimationFrame(() => {
      el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
      el.scrollTop = Math.max(0, (el.scrollHeight - el.clientHeight) / 2);
    });
  }, [zoomed, item.id]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else onClose();
      }
      if (!zoomed && e.key === "ArrowLeft") onPrev();
      if (!zoomed && e.key === "ArrowRight") onNext();
      if (e.key === "+" || e.key === "=") setZoomed(true);
      if (e.key === "-") setZoomed(false);
    },
    [onClose, onPrev, onNext, zoomed],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  const filename = item.image.split("/").pop() || `${item.id}.png`;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? "Zoom out" : "Zoom to 200%"}
            className="bg-black/50 px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white/85 backdrop-blur-sm transition-colors hover:text-white"
          >
            {zoomed ? "100%" : "200%"}
          </button>
          <a
            href={item.image}
            download={filename}
            aria-label={`Download ${item.title}`}
            className="bg-black/50 px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white/85 backdrop-blur-sm transition-colors hover:text-white"
          >
            Download
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pointer-events-auto p-2 text-white/70 transition-colors hover:text-white"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <path
              d="M6 6l14 14M20 6L6 20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {!zoomed && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous"
            className="absolute left-1 top-1/2 z-20 -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white sm:left-3"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next"
            className="absolute right-1 top-1/2 z-20 -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white sm:right-3"
          >
            <Chevron dir="right" />
          </button>
        </>
      )}

      <div
        ref={stageRef}
        className={`relative z-10 h-full w-full ${
          zoomed ? "overflow-auto" : "overflow-hidden"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {zoomed ? (
          <div className="flex min-h-full min-w-full items-center justify-center">
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Zoom out to fit"
              className="relative block h-[192dvh] w-[196vw] cursor-zoom-out border-0 bg-transparent p-0"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                priority
                sizes="196vw"
                unoptimized
              />
            </button>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-1">
            <button
              type="button"
              onClick={() => setZoomed(true)}
              aria-label="Zoom to 200%"
              className="relative block h-[96dvh] w-[96vw] cursor-zoom-in border-0 bg-transparent p-0 sm:h-[97dvh] sm:w-[97vw]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                priority
                sizes="97vw"
              />
            </button>
          </div>
        )}
      </div>

      {!zoomed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-2 text-center text-white sm:pb-3">
          <h2 className="text-sm font-medium tracking-tight sm:text-base">
            {item.title}
          </h2>
          <p className="mt-0.5 text-[13px] tracking-wide text-white/55">
            {item.medium}
            <span className="mx-2 text-white/30">·</span>
            {item.date}
          </p>
        </div>
      )}
    </div>,
    document.body,
  );
}
