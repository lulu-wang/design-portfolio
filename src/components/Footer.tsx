import Link from "next/link";
import { social } from "@/data/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] pb-10 pt-16 sm:pb-12 sm:pt-24">
      <div className="grid gap-12 md:grid-cols-[1.2fr_0.7fr_0.7fr] md:gap-16">
        <h2 className="font-display max-w-sm text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
          Building products with craft.
        </h2>

        <div>
          <h3 className="text-[13px] font-medium tracking-wide text-foreground/40">
            /Quick links
          </h3>
          <ul className="mt-5 space-y-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
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

      <p className="font-display mt-16 select-none text-[clamp(4.5rem,18vw,11rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-foreground">
        LULU
      </p>
    </footer>
  );
}
