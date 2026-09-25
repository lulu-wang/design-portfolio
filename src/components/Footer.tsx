import { social } from "@/data/site";

export default function Footer() {
  return (
    <footer className="pb-12 pt-12 sm:pb-16 sm:pt-16">
      <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        {social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="color-hover font-secondary !font-bold text-[16px] text-foreground sm:text-[17px]"
              style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
            >
              {item.label === "Email" ? "lulu.wang25@gmail.com" : item.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
