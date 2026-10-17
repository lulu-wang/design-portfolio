import { social } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] px-5 py-14 text-[#F7F4EF] sm:px-8 sm:py-16 lg:px-12">
      <ul className="flex flex-row flex-wrap items-center gap-x-8 gap-y-3">
        <li>
          <a
            href="mailto:lulu.wang25@gmail.com"
            className="color-hover text-[15px] text-white"
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
                className="text-[15px] text-white/70"
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </footer>
  );
}
