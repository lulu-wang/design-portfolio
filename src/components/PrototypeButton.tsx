import Link from "next/link";
import Arrow from "./Arrow";

export default function PrototypeButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/prototypes/meeting-decision-extractor"
      className={`group flex items-center justify-between gap-4 rounded-full bg-ink px-5 py-4 text-background transition-opacity hover:opacity-90 sm:px-6 ${className}`}
    >
      <span className="min-w-0 text-left">
        <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-background/45">
          Live web app
        </span>
        <span className="mt-1 block font-display text-lg font-extrabold tracking-tight sm:text-xl">
          Opal — Meeting notes
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-4 py-2 text-[13px] font-medium text-foreground">
        Open
        <Arrow className="h-2.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
