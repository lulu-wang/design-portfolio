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
    <footer className="border-t border-foreground/[0.08] pb-12 pt-20 sm:pb-16 sm:pt-28">
      <div className="grid gap-14 md:grid-cols-[1.2fr_0.7fr_0.7fr] md:items-start md:gap-20">
        <div>
          <p className="font-title text-[2.2rem] font-bold tracking-[-0.03em] sm:text-[2.65rem]">
            Lulu Wang
          </p>
          <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-muted sm:text-[18px]">
            Building products with craft.
          </p>
        </div>

        <div>
          <h3 className="font-title text-[15px] font-bold tracking-[-0.02em] text-foreground/40 sm:text-[16px]">
            Links
          </h3>
          <ul className="mt-6 space-y-3.5">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  scroll={!item.href.includes("#")}
                  className="text-[16px] text-foreground/70 transition-opacity hover:opacity-60 sm:text-[17px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-title text-[15px] font-bold tracking-[-0.02em] text-foreground/40 sm:text-[16px]">
            Contact
          </h3>
          <ul className="mt-6 space-y-3.5">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-[16px] text-foreground/70 transition-opacity hover:opacity-60 sm:text-[17px]"
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
