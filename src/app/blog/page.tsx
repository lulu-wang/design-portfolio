import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Lulu Wang",
  description: "My thoughts, happenings and observations while living life",
};

export default function BlogPage() {
  return (
    <main className="flex min-h-svh flex-col">
      <section className="flex-1 bg-[#F7F4EF] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24">
        <h1 className="font-display text-[clamp(3.2rem,8vw,7rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em]">
          Blog
        </h1>
        <p className="mt-6 max-w-4xl text-[16px] leading-relaxed text-foreground/60 sm:text-[18px]">
          Thoughts, happenings, and observations while living life.
        </p>

        <ul className="mt-14 sm:mt-16">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-8"
              >
                <span className="font-display text-[clamp(1.7rem,3vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#7C5CF6]">
                  {post.title}
                </span>
                <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/40">
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
