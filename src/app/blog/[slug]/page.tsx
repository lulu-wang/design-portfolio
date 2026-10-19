import type { Metadata } from "next";
import Image from "next/image";
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
    <main className="flex min-h-svh flex-col">
      <article className="flex-1 bg-[#F7F4EF] page-inset pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
        <Link
          href="/blog"
          className="arrow-link inline-flex items-center gap-2 text-[13px] text-foreground/50"
        >
          <Arrow className="h-2.5 rotate-180" /> All posts
        </Link>

        <div className="mt-10 max-w-3xl sm:mt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/45">
            {post.date}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.055em]">
            {post.title}
          </h1>
          <div className="mt-10 space-y-6 sm:mt-12">
            {post.body.map((paragraph) => (
              <RichText
                key={paragraph.slice(0, 40)}
                as="p"
                className="text-[16px] leading-[1.65] text-foreground/70 sm:text-[17px] [&_strong]:text-foreground"
              >
                {paragraph}
              </RichText>
            ))}
          </div>
          {post.images?.length ? (
            <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-5">
              {post.images.map((image) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ))}
            </div>
          ) : null}
        </div>
      </article>
      <Footer />
    </main>
  );
}
