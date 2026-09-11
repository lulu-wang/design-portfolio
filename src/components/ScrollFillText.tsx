"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const COPY =
  "From research to launch. Clear, human digital products built to stay simple, feel considered, and hold up in real use, driven by craft, structured systems, and intentional design.";

export default function ScrollFillText() {
  const pin = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const update = () => {
    const el = pin.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    if (total <= 0) {
      setProgress(1);
      return;
    }
    setProgress(Math.min(1, Math.max(0, -rect.top / total)));
  };

  useLenis(update);
  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const words = COPY.split(" ");
  const filled = progress * (words.length + 2);

  return (
    <section ref={pin} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6 sm:px-10">
        <p className="max-w-[40rem] text-center text-[1.35rem] font-medium leading-[1.45] tracking-[-0.03em] sm:text-2xl sm:leading-[1.4] md:max-w-[46rem] md:text-[2rem] md:leading-[1.35]">
          {words.map((word, i) => {
            const t = Math.min(1, Math.max(0, filled - i));
            const opacity = 0.12 + t * 0.88;
            return (
              <span
                key={`${word}-${i}`}
                className="transition-colors duration-150"
                style={{ color: `rgba(10, 10, 10, ${opacity})` }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
