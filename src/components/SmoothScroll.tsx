"use client";

import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";

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
        lerp: 0.08,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.1,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
