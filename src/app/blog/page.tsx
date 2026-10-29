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
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap flex-1 py-14 sm:py-20">
        <h1 className="text-[28px] leading-[1.3]">Blog</h1>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.47]">
          Thoughts, happenings, and observations while living life.
        </p>

        <ul className="mt-12 max-w-3xl">
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-black/10">
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-2 py-6 hover:opacity-60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="text-[24px] leading-[1.3]">{post.title}</span>
                <span className="shrink-0 text-[16px]">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
