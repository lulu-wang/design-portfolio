import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Lulu Wang",
  description:
    "My thoughts, happenings and observations while living life",
};

export default function BlogPage() {
  return (
    <main className="page-wrap pt-28 sm:pt-32">
      <section className="pt-6 pb-12 sm:pb-16 md:pb-20">
        <h1 className="animate-rise font-title text-[clamp(2.35rem,5vw,4.15rem)] font-bold leading-[1.12] tracking-[-0.045em]">
          Blog
        </h1>
        <p
          className="page-subtitle animate-rise mt-6 max-w-3xl sm:mt-8"
          style={{ animationDelay: "80ms" }}
        >
          My thoughts, happenings and observations while living life
        </p>
      </section>

      <section className="pb-16 sm:pb-24">
        <ul>
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className="animate-rise border-t border-foreground/[0.08] last:border-b"
              style={{ animationDelay: `${80 + i * 50}ms` }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5 sm:py-6"
              >
                <span className="font-title text-lg font-bold tracking-[-0.03em] text-foreground transition-opacity group-hover:opacity-50 sm:text-xl md:text-[22px]">
                  {post.title}
                </span>
                <span className="shrink-0 text-sm text-foreground/40">
                  {post.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
