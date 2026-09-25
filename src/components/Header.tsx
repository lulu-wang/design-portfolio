"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/LuluWangPMResume26.pdf", external: true },
];

const desktopNav = nav.filter((item) => item.href !== "/");

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navClass(active: boolean, extra = "") {
  return `font-secondary font-medium tracking-[-0.01em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    active ? "text-foreground" : "text-muted hover:text-foreground"
  } ${extra}`.trim();
}

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onNavClick = (href: string) => {
    setOpen(false);
    if (!href.includes("#")) return;
    const [path, hash] = href.split("#");
    if (pathname !== path) return;
    window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      lenis?.resize();
      lenis?.scrollTo(el, { offset: -96 });
    }, 50);
  };

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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:pt-6 md:bg-background md:px-0 md:pt-0">
        <div className="pointer-events-auto mx-auto flex h-12 w-[min(92vw,268px)] items-center justify-between rounded-full bg-ink pl-5 pr-1.5 text-background shadow-[0_10px_30px_rgba(80,60,40,0.1)] md:hidden">
          <Link
            href="/"
            className="font-display text-[16px] font-semibold tracking-[-0.03em] text-background"
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

        <div className="page-wrap pointer-events-none hidden items-center justify-between md:flex md:h-[4.75rem]">
          <Link
            href="/"
            className="pointer-events-auto font-display text-[16px] font-semibold tracking-[-0.03em] text-foreground"
          >
            Lulu Wang
          </Link>
          <nav
            className="pointer-events-auto flex items-center gap-5 lg:gap-8"
            aria-label="Primary"
          >
            {desktopNav.map((item) => {
              const className = navClass(
                !item.external && isActivePath(pathname, item.href),
                "text-[14px]",
              );
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={!item.href.includes("#")}
                  className={className}
                  onClick={() => onNavClick(item.href)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal={open}
            aria-label="Navigation menu"
            inert={!open ? true : undefined}
            className={`fixed inset-0 z-40 flex min-h-dvh w-screen flex-col bg-background md:hidden transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-7 px-8 pb-24 pt-24 sm:gap-9"
              aria-label="Primary"
            >
              {nav.map((item, i) => {
                const className = navClass(
                  !item.external && isActivePath(pathname, item.href),
                  `text-3xl tracking-[-0.02em] transition-[opacity,transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-5xl ${
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`,
                );
                const style = { transitionDelay: open ? `${80 + i * 60}ms` : "0ms" };
                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={className}
                      style={style}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? 0 : -1}
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={className}
                    style={style}
                    scroll={!item.href.includes("#")}
                    onClick={() => onNavClick(item.href)}
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
