import Link from "next/link";
import { social } from "@/data/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/LuluWangPMResume26.pdf", external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/[0.06] pb-12 pt-20 sm:pb-16 sm:pt-28">
      <div className="grid gap-14 md:grid-cols-[1.2fr_0.7fr_0.7fr] md:items-start md:gap-20">
        <div>
          <p className="font-display text-[2.05rem] font-semibold tracking-[-0.04em] sm:text-[2.4rem]">
            Lulu Wang
          </p>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted sm:text-[17px]">
            Building products with craft.
          </p>
        </div>

        <div>
          <h3 className="font-display text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            Links
          </h3>
          <ul className="mt-6 space-y-3.5">
            {links.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-secondary text-[16px] text-foreground sm:text-[17px]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    scroll={!item.href.includes("#")}
                    className="font-secondary text-[16px] text-foreground sm:text-[17px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            Contact
          </h3>
          <ul className="mt-6 space-y-3.5">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="color-hover text-[16px] text-foreground/70 sm:text-[17px]"
                  style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
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
