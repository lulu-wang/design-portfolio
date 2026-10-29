import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Lulu Wang",
  description:
    "Product designer with a background in digital art, graphic design and software engineering.",
};

export default function AboutPage() {
  return (
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap grid items-start gap-10 py-16 sm:py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <Image
          src="/images/about-01.jpg"
          alt="Lulu Wang photographing in San Francisco"
          width={2000}
          height={1334}
          priority
          className="h-auto w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="md:pt-2">
          <h1 className="text-[28px] leading-[1.3]">About me</h1>
          <div className="mt-4 space-y-4 text-[16px] leading-[1.47]">
            <p>
              A product designer with a background in digital art, graphic
              design, and software engineering, based in California. Previously
              an engineer at Meta and Microsoft.
            </p>
            <p>
              I immigrated from China to Canada to the US. I&rsquo;ve been doing
              art and creative media since I was 11. Before product design, I
              spent more than four years building user-centered products at Meta
              (Monetization, Messenger) and Microsoft (Azure, Xbox).
            </p>
            <p>
              I&rsquo;m interested in products that challenge the boundaries of
              digital experiences and bridge technology with creativity.
            </p>
          </div>
        </div>
      </section>

      <section className="folio-wrap pb-20 sm:pb-28">
        <div className="mx-auto max-w-[824px]">
          <h2 className="text-[28px] leading-[1.3]">
            What I do when I&rsquo;m not working
          </h2>
          <p className="mt-4 text-[16px] italic leading-[1.47]">
            If you can&rsquo;t find me at my computer, I&rsquo;m learning from
            different cultures while traveling, exploring art, films, and
            animation, or trying a new sport — skiing, and recently tennis and
            golf.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
