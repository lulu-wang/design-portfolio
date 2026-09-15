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
        <p className="animate-rise text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/40">
          /Notes
        </p>
        <h1 className="animate-rise mt-4 text-[clamp(3rem,10vw,6rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]">
          Blog
        </h1>
        <p
          className="page-subtitle animate-rise mt-8 max-w-3xl"
          style={{ animationDelay: "120ms" }}
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
                <span className="font-secondary text-lg font-normal tracking-[-0.01em] text-foreground transition-opacity group-hover:opacity-50 sm:text-xl md:text-[22px]">
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
