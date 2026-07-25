"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const nav = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "GALLERY", href: "/illustrations" },
  { label: "ABOUT", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="relative z-50 bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6 md:px-10 md:py-8">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight text-foreground"
          >
            LW.
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex md:gap-10 lg:gap-12"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display text-sm tracking-widest transition-colors md:text-[15px] ${
                  isActive(item.href)
                    ? "font-bold text-foreground"
                    : "font-medium text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span className="flex h-[14px] w-[22px] flex-col justify-between" aria-hidden>
              <span className="block h-[1.5px] w-full bg-black" />
              <span className="block h-[1.5px] w-full bg-black" />
              <span className="block h-[1.5px] w-full bg-black" />
            </span>
          </button>
        </div>
      </header>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[9999] flex min-h-dvh w-screen flex-col md:hidden"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Link
                href="/"
                className="font-display text-2xl font-bold tracking-tight text-black"
                onClick={() => setOpen(false)}
              >
                LW.
              </Link>
              <button
                type="button"
                className="relative -mr-2 flex h-11 w-11 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <span className="relative block h-[14px] w-[22px]" aria-hidden>
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-black" />
                  <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-black" />
                </span>
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-8 px-8 pb-24"
              aria-label="Mobile"
            >
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`animate-rise font-display text-4xl uppercase tracking-tight sm:text-5xl ${
                    isActive(item.href)
                      ? "font-bold text-black"
                      : "font-medium text-black/45"
                  }`}
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
