import Link from "next/link";
import { social } from "@/data/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/[0.08] pb-10 pt-16 sm:pb-12 sm:pt-24">
      <div className="grid gap-12 md:grid-cols-[1.2fr_0.7fr_0.7fr] md:items-start md:gap-16">
        <div>
          <p className="font-title text-[1.85rem] font-bold tracking-[-0.03em] sm:text-[2.2rem]">
            Lulu Wang
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
            Building products with craft.
          </p>
        </div>

        <div>
          <h3 className="font-title text-[13px] font-bold tracking-[-0.02em] text-foreground/40">
            Links
          </h3>
          <ul className="mt-5 space-y-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  scroll={!item.href.includes("#")}
                  className="text-sm text-foreground/70 transition-opacity hover:opacity-60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-title text-[13px] font-bold tracking-[-0.02em] text-foreground/40">
            Contact
          </h3>
          <ul className="mt-5 space-y-3">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-sm text-foreground/70 transition-opacity hover:opacity-60"
                >
                  {item.label === "Email" ? "lulu.wang25@gmail.com" : item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
