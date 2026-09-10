"use client";

import { usePathname } from "next/navigation";

export default function SiteGrain() {
  const pathname = usePathname();
  if (pathname.startsWith("/prototypes")) return null;
  return <div className="site-grain" aria-hidden />;
}
