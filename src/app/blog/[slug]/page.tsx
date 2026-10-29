import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <article className="folio-wrap flex-1 py-14 sm:py-20">
        <Link href="/blog" className="text-[16px] hover:opacity-60">
          All posts
        </Link>

        <div className="mt-10 max-w-[40rem]">
          <p className="text-[16px] leading-[1.47]">{post.date}</p>
          <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.65rem)] font-normal leading-[1.15]">
            {post.title}
          </h1>
          <div className="mt-8 space-y-5">
            {post.body.map((paragraph) => (
              <RichText
                key={paragraph.slice(0, 40)}
                as="p"
                className="text-[16px] leading-[1.47]"
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
