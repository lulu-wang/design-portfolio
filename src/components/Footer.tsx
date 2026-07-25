import { social } from "@/data/site";

export default function Footer() {
  return (
    <footer className="pb-12 pt-16 sm:pb-14 sm:pt-24">
      <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-14">
        {social.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="text-[13px] font-bold tracking-widest text-foreground transition-opacity hover:opacity-50 sm:text-sm md:text-base"
          >
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
