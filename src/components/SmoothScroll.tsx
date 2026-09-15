"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollToHash() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const timers: number[] = [];

    const go = () => {
      if (cancelled) return;
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (!el || !lenis) {
        attempts += 1;
        if (attempts < 30) timers.push(window.setTimeout(go, 50));
        return;
      }
      lenis.resize();
      lenis.scrollTo(el, { offset: -96, immediate: true });
    };

    timers.push(window.setTimeout(go, 50), window.setTimeout(go, 300));
    window.addEventListener("hashchange", go);
    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("hashchange", go);
    };
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/prototypes")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.25,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoRaf: true,
      }}
    >
      <ScrollToHash />
      {children}
    </ReactLenis>
  );
}
