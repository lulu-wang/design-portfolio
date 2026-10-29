import Link from "next/link";
import { social } from "@/data/site";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/illustrations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="folio bg-white text-black">
      <div className="folio-wrap pb-16 pt-16 sm:pb-20 sm:pt-20">
        <h2 className="max-w-[820px] text-[clamp(2rem,4vw,2.75rem)] leading-[1.14]">
          Would you like to get in touch?
        </h2>
        <a
          href="mailto:lulu.wang25@gmail.com"
          className="mt-4 inline-block text-[16px] leading-[1.47] hover:opacity-60"
        >
          lulu.wang25@gmail.com
        </a>
        <div className="mt-12 h-px bg-black/15" />
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {pages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[16px] hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/LuluWangPMResume26.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-[16px] hover:opacity-60"
            >
              Resume
            </a>
          </nav>
          <ul className="flex gap-6">
            {social
              .filter((item) => item.label !== "Email")
              .map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[16px] hover:opacity-60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
