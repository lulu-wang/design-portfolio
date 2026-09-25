import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import RichText from "@/components/RichText";
import { getPost, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog — Lulu Wang" };
  return {
    title: `${post.title} — Lulu Wang`,
    description: post.body[0]?.replace(/\*\*|_/g, "") ?? post.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="page-wrap pt-24 sm:pt-28">
      <section className="pt-4 sm:pt-6 md:pt-8">
        <Link
          href="/blog"
          className="arrow-link color-hover inline-flex items-center gap-2 text-sm text-muted"
          style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
        >
          <Arrow className="h-2.5 rotate-180" /> All posts
        </Link>

        <div className="mt-10 max-w-3xl sm:mt-12">
          <h1 className="page-heading animate-rise text-[clamp(2.35rem,5vw,4.15rem)]">
            {post.title}
          </h1>
          <p className="animate-rise mt-5 text-[12px] uppercase tracking-[0.08em] text-foreground/35 sm:mt-6">
            {post.date}
          </p>
          <div className="mt-10 space-y-5 pb-16 sm:mt-12 sm:pb-24">
            {post.body.map((paragraph) => (
              <RichText
                key={paragraph.slice(0, 40)}
                as="p"
                className="font-reading text-[15px] leading-[1.55] text-foreground/65 md:text-base md:leading-[1.6] [&_strong]:text-foreground"
              >
                {paragraph}
              </RichText>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
