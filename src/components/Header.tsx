"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const nav = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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

  if (pathname.startsWith("/prototypes")) return null;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-6">
        <div className="pointer-events-auto flex h-12 w-[min(92vw,268px)] items-center justify-between rounded-full bg-ink pl-5 pr-1.5 text-background shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <Link
            href="/"
            className="font-display text-[17px] font-semibold tracking-tight text-background"
            onClick={() => setOpen(false)}
          >
            Lulu
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <span className="relative block h-3 w-3" aria-hidden>
                <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-foreground" />
                <span className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-foreground" />
              </span>
            ) : (
              <span className="flex flex-col items-center gap-[3px]" aria-hidden>
                <span className="block h-[3px] w-[3px] rounded-full bg-foreground" />
                <span className="block h-[3px] w-[3px] rounded-full bg-foreground" />
                <span className="block h-[3px] w-[3px] rounded-full bg-foreground" />
              </span>
            )}
          </button>
        </div>
      </header>

      {mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal={open}
            aria-label="Navigation menu"
            inert={!open ? true : undefined}
            className={`fixed inset-0 z-40 flex min-h-dvh w-screen flex-col bg-background transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-7 px-8 pb-24 pt-24 sm:gap-9"
              aria-label="Primary"
            >
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-display text-4xl font-extrabold uppercase tracking-tight transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-6xl ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-foreground/35 hover:text-foreground"
                  } ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
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
