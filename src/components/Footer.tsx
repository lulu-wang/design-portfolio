import Link from "next/link";
import { social } from "@/data/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/about#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/[0.08] pb-10 pt-16 sm:pb-12 sm:pt-24">
      <div className="grid gap-12 md:grid-cols-[1.2fr_0.7fr_0.7fr] md:items-start md:gap-16">
        <div>
          <h2 className="font-secondary max-w-sm text-lg font-normal leading-[1.4] tracking-[-0.01em] text-foreground/55 sm:text-xl">
            Building products with craft.
          </h2>
          <p className="font-display mt-8 select-none text-[clamp(2.5rem,9vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-foreground/80">
            LULU
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-medium tracking-wide text-foreground/40">
            /Quick links
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
          <h3 className="text-[13px] font-medium tracking-wide text-foreground/40">
            /Contact
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
