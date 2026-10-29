"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function linkClass(active: boolean) {
  return `relative text-[16px] font-normal text-black transition-opacity duration-200 hover:opacity-60 ${
    active
      ? "after:absolute after:left-1/2 after:top-[calc(100%+7px)] after:h-px after:w-4 after:-translate-x-1/2 after:bg-black"
      : ""
  }`;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
      <header className="fixed inset-x-0 top-0 z-50 bg-white">
        <div className="folio-wrap flex h-[4.5rem] items-center justify-between md:h-[5.5rem]">
          <Link href="/" className="text-[16px] font-normal text-black">
            Lulu Wang
          </Link>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(isActivePath(pathname, item.href))}
                aria-current={
                  isActivePath(pathname, item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <span className="relative block h-3.5 w-3.5" aria-hidden>
                <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 rotate-45 bg-black" />
                <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 -rotate-45 bg-black" />
              </span>
            ) : (
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                <span className="block h-px w-full bg-black" />
                <span className="block h-px w-full bg-black" />
                <span className="block h-px w-full bg-black" />
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
            className={`fixed inset-0 z-40 flex min-h-dvh w-screen flex-col bg-white pt-[4.5rem] transition-[opacity,visibility] duration-300 md:hidden ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-8 px-8 pb-24"
              aria-label="Primary"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[28px] font-normal text-black ${
                    isActivePath(pathname, item.href) ? "underline underline-offset-8" : ""
                  }`}
                  aria-current={
                    isActivePath(pathname, item.href) ? "page" : undefined
                  }
                  tabIndex={open ? 0 : -1}
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
