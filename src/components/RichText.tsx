import type { ReactNode } from "react";

/**
 * Renders light markup in copy strings:
 * **bold** and _italic_ (underscores).
 */
export default function RichText({
  children,
  as: Tag = "span",
  className,
}: {
  children: string;
  as?: "span" | "p" | "div";
  className?: string;
}) {
  const nodes = parseRichText(children);
  return <Tag className={className}>{nodes}</Tag>;
}

function parseRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Match **bold** or _italic_ (non-greedy, no nested same delimiter)
  const re = /(\*\*[^*]+\*\*|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={key++} className="italic text-foreground/80">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}
