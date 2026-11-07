import { social } from "@/data/site";

export default function Footer({ light = false }: { light?: boolean }) {
  return (
    <footer
      className={`page-inset py-14 sm:py-16 ${
        light ? "bg-white text-foreground" : "bg-[#2A2A2A] text-[#F7F4EF]"
      }`}
    >
      <ul className="flex flex-row flex-wrap items-center gap-x-8 gap-y-3">
        <li>
          <a
            href="mailto:lulu.wang25@gmail.com"
            className={`color-hover text-[15px] ${light ? "text-foreground" : "text-white"}`}
            style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
          >
            lulu.wang25@gmail.com
          </a>
        </li>
        {social
          .filter((item) => item.label !== "Email")
          .map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`text-[15px] ${light ? "text-foreground/55" : "text-white/70"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </footer>
  );
}
