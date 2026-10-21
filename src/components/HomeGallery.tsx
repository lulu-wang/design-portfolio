"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Illustration } from "@/data/illustrations";

function useColumnCount() {
  const [count, setCount] = useState(2);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setCount(3);
      else setCount(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function buildColumns(items: Illustration[], columnCount: number) {
  const cols: Illustration[][] = Array.from({ length: columnCount }, () => []);
  const heights = Array.from({ length: columnCount }, () => 0);

  for (const item of items) {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    cols[shortest].push(item);
    heights[shortest] += item.height / item.width;
  }

  return cols;
}

function alignedSplit(items: Illustration[]) {
  const landscape = items.filter((item) => item.height < item.width);
  const portrait = items.filter((item) => item.height >= item.width);
  if (landscape.length === 0 || portrait.length !== 1) return null;

  const stackRatio = landscape.reduce((sum, item) => sum + item.height / item.width, 0);
  const portraitRatio = portrait[0].height / portrait[0].width;
  return { landscape, portrait: portrait[0], stackRatio, portraitRatio };
}

function Tile({ item, sizes }: { item: Illustration; sizes: string }) {
  return (
    <Link
      href={`/illustrations?tab=${item.category}`}
      className="group relative block overflow-hidden bg-[#2A2A2A]"
      aria-label={`${item.category === "photography" ? "Photography" : "Illustration"}, ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        width={item.width}
        height={item.height}
        className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes={sizes}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </Link>
  );
}

export default function HomeGallery({ items }: { items: Illustration[] }) {
  const columnCount = useColumnCount();
  const columns = useMemo(
    () => buildColumns(items, columnCount),
    [items, columnCount],
  );
  const split = useMemo(() => alignedSplit(items), [items]);

  if (split) {
    return (
      <div
        className="grid items-start"
        style={{
          gridTemplateColumns: `${split.portraitRatio}fr ${split.stackRatio}fr`,
        }}
      >
        <div className="flex min-w-0 flex-col">
          {split.landscape.map((item) => (
            <Tile key={item.id} item={item} sizes="54vw" />
          ))}
        </div>
        <Tile item={split.portrait} sizes="46vw" />
      </div>
    );
  }

  return (
    <div key={columnCount} className="grid grid-cols-2 lg:grid-cols-3">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex min-w-0 flex-col">
          {col.map((item) => (
            <Tile
              key={item.id}
              item={item}
              sizes="(max-width: 1023px) 50vw, 33vw"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
