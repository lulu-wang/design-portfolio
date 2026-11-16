"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Screen = { src: string; alt: string };

const flows: Record<string, string[]> = {
  pace: [
    "/images/projects/pace/01-home.png",
    "/images/projects/pace/02-monthly-plan.png",
    "/images/projects/pace/03-activity.png",
    "/images/projects/pace/04-transaction.png",
    "/images/projects/pace/05-goals.png",
    "/images/projects/pace/06-new-goal.png",
    "/images/projects/pace/07-insights.png",
  ],
  "alma-healthcare": [
    "/images/projects/alma-healthcare/01-welcome.png",
    "/images/projects/alma-healthcare/02-symptoms.png",
    "/images/projects/alma-healthcare/03-choose-care.png",
    "/images/projects/alma-healthcare/04-booked.png",
    "/images/projects/alma-healthcare/05-no-visits.png",
    "/images/projects/alma-healthcare/06-messages.png",
    "/images/projects/alma-healthcare/07-lab-results.png",
    "/images/projects/alma-healthcare/08-medication.png",
    "/images/projects/alma-healthcare/09-menu.png",
  ],
  "canada-online-tutoring": [
    "/images/projects/canada-online-tutoring/home-phone.jpg",
    "/images/projects/canada-online-tutoring/program-phone.jpg",
    "/images/projects/canada-online-tutoring/menu-phone.jpg",
  ],
  "path-learning": [
    "/images/projects/path-learning/hifi/01-splash.png",
    "/images/projects/path-learning/hifi/02-signup.png",
    "/images/projects/path-learning/hifi/03-login.png",
    "/images/projects/path-learning/hifi/04-syllabus.png",
    "/images/projects/path-learning/hifi/05-search.png",
    "/images/projects/path-learning/hifi/06-schedule.png",
    "/images/projects/path-learning/hifi/07-assignment.png",
    "/images/projects/path-learning/hifi/08-lesson.png",
    "/images/projects/path-learning/hifi/09-mentor.png",
    "/images/projects/path-learning/hifi/10-menu.png",
  ],
  pulsefit: [
    "/images/projects/pulsefit/final/01.png",
    "/images/projects/pulsefit/final/11.png",
    "/images/projects/pulsefit/final/12.png",
    "/images/projects/pulsefit/final/13.png",
    "/images/projects/pulsefit/final/15.png",
    "/images/projects/pulsefit/final/22.png",
    "/images/projects/pulsefit/final/23.png",
    "/images/projects/pulsefit/final/16.png",
    "/images/projects/pulsefit/final/14.png",
    "/images/projects/pulsefit/final/24.png",
    "/images/projects/pulsefit/final/25.png",
    "/images/projects/pulsefit/final/17.png",
    "/images/projects/pulsefit/final/20.png",
    "/images/projects/pulsefit/final/21.png",
  ],
  "netflix-community": [
    "/images/projects/netflix-community/phone/01-title.png",
    "/images/projects/netflix-community/phone/02-hub.png",
    "/images/projects/netflix-community/phone/03-circle.png",
    "/images/projects/netflix-community/phone/04-thread.png",
    "/images/projects/netflix-community/phone/05-compose.png",
    "/images/projects/netflix-community/phone/06-prompt.png",
    "/images/projects/netflix-community/phone/07-share.png",
    "/images/projects/netflix-community/phone/08-collection.png",
    "/images/projects/netflix-community/phone/09-collections.png",
  ],
};

function screensFor(slug: string, labeled: Screen[]): Screen[] {
  const srcs = flows[slug];
  if (!srcs?.length) return labeled;
  const alts = new Map(labeled.map((screen) => [screen.src, screen.alt]));
  return srcs.map((src) => ({ src, alt: alts.get(src) ?? "" }));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Device({
  screens,
  index,
  lift,
  label,
  sunk,
  onClick,
  onPointerDown,
}: {
  screens: Screen[];
  index: number;
  lift: number;
  label: string;
  sunk: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPointerDown: () => void;
}) {
  const [pair, setPair] = useState({ from: index, to: index });

  useEffect(() => {
    setPair((prev) => (prev.to === index ? prev : { from: prev.to, to: index }));
  }, [index]);

  const layers =
    pair.from === pair.to
      ? [screens[pair.to]]
      : [screens[pair.from], screens[pair.to]];

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onPointerDown={onPointerDown}
      className="w-[44%] max-w-[240px] cursor-pointer border-0 bg-transparent p-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
      style={{ transform: `translate3d(0, ${lift}px, 0) scale(${sunk ? 0.97 : 1})` }}
    >
      <div className="rounded-[1.55rem] bg-[#F7F4EF] p-[6px] shadow-[0_22px_48px_rgba(0,0,0,0.32)] ring-1 ring-black/10">
        <div className="relative aspect-[393/852] overflow-hidden rounded-[1.15rem] bg-white">
          {layers.map((screen) => {
            const incoming = screen.src === screens[pair.to]?.src && pair.from !== pair.to;
            return (
              <Image
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                fill
                draggable={false}
                className={`object-cover object-top ${incoming ? "screen-in" : ""}`}
                sizes="240px"
              />
            );
          })}
        </div>
      </div>
    </button>
  );
}

export function InteractivePhones({
  slug,
  screens,
}: {
  slug: string;
  screens: Screen[];
}) {
  const flow = screensFor(slug, screens);
  const count = flow.length;
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, index: 0, moved: false, holding: false });
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hot, setHot] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pressed, setPressed] = useState<"left" | "right" | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || dragging || paused || !inView || count < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced, dragging, paused, inView, count]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || count < 2) return;
    drag.current = { x: event.clientX, index: active, moved: false, holding: true };
    setDragging(true);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    if (event.pointerType === "mouse") {
      setTilt({ x: py * -7, y: px * 9 });
    }
    if (count < 2 || !drag.current.holding) return;
    const dx = event.clientX - drag.current.x;
    if (Math.abs(dx) <= 16) return;
    drag.current.moved = true;
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const steps = Math.round(dx / 64);
    if (steps === 0) return;
    const next = (drag.current.index - steps) % count;
    setActive((next + count) % count);
  }

  function onPointerUp() {
    drag.current.holding = false;
    setDragging(false);
    setPressed(null);
    window.requestAnimationFrame(() => {
      drag.current.moved = false;
    });
  }

  function onPointerLeave() {
    drag.current.holding = false;
    setHot(false);
    setDragging(false);
    setPressed(null);
    setPaused(false);
    setTilt({ x: 0, y: 0 });
  }

  function onDeviceClick(event: React.MouseEvent<HTMLButtonElement>, delta: number) {
    event.preventDefault();
    event.stopPropagation();
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setActive((current) => (current + delta + count) % count);
    setPaused(true);
  }

  function onDotClick(event: React.MouseEvent<HTMLButtonElement>, index: number) {
    event.preventDefault();
    event.stopPropagation();
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setActive(index);
    setPaused(true);
  }

  const right = count > 1 ? (active + 1) % count : 0;

  return (
    <div
      ref={rootRef}
      className="flex h-full min-h-[22rem] touch-pan-y flex-col items-center justify-center px-5 py-8 [perspective:1400px] sm:px-8 sm:py-10 lg:min-h-[34rem]"
      onPointerEnter={() => setHot(true)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
    >
      <div
        className="flex w-full items-center justify-center gap-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-5"
        style={{
          transform: reduced
            ? undefined
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <Device
          screens={flow}
          index={active}
          lift={hot ? -8 : 0}
          label="Previous screen"
          sunk={pressed === "left"}
          onPointerDown={() => setPressed("left")}
          onClick={(event) => onDeviceClick(event, -1)}
        />
        {count > 1 ? (
          <Device
            screens={flow}
            index={right}
            lift={hot ? 12 : 0}
            label="Next screen"
            sunk={pressed === "right"}
            onPointerDown={() => setPressed("right")}
            onClick={(event) => onDeviceClick(event, 1)}
          />
        ) : null}
      </div>
      {count > 1 ? (
        <div className="mt-5 flex items-center gap-1" role="group" aria-label="Screens">
          {flow.map((screen, index) => (
            <button
              key={screen.src}
              type="button"
              aria-label={`Show screen ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onPointerDown={() => setPressed(null)}
              onClick={(event) => onDotClick(event, index)}
              className="cursor-pointer border-0 bg-transparent p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  index === active ? "w-4 bg-white" : "w-1.5 bg-white/35"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function InteractiveStill({
  src,
  alt,
  photo,
}: {
  src: string;
  alt: string;
  photo: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hot, setHot] = useState(false);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - box.left) / box.width - 0.5,
      y: (event.clientY - box.top) / box.height - 0.5,
    });
    setHot(true);
  }

  function onPointerLeave() {
    setHot(false);
    setOffset({ x: 0, y: 0 });
  }

  if (photo) {
    return (
      <div
        className="relative h-full min-h-[22rem] overflow-hidden lg:absolute lg:inset-0 lg:min-h-0"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <Image
          src={src}
          alt={alt}
          fill
          draggable={false}
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: reduced
              ? undefined
              : `scale(1.08) translate(${offset.x * -5}%, ${offset.y * -5}%)`,
          }}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-full min-h-[18rem] items-center justify-center px-6 py-8 [perspective:1200px] sm:px-10 sm:py-12 lg:min-h-[34rem]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="w-full overflow-hidden rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.32)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: reduced
            ? undefined
            : `rotateX(${offset.y * -6}deg) rotateY(${offset.x * 8}deg) translateY(${hot ? -8 : 0}px)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          draggable={false}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 90vw, 40vw"
        />
      </div>
    </div>
  );
}
