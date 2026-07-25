import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Lulu Wang",
  description:
    "Product designer with a background in digital art, graphic design and software engineering.",
};

const skills = [
  {
    category: "Design",
    items: [
      "Product Design",
      "UX / UI Design",
      "Interaction Design",
      "Visual Design",
      "Design Systems",
      "Prototyping",
    ],
  },
  {
    category: "Research",
    items: [
      "User Interviews",
      "Usability Testing",
      "Competitive Analysis",
      "Persona Development",
      "Journey Mapping",
      "Survey Design",
    ],
  },
  {
    category: "Tools & Engineering",
    items: [
      "Figma",
      "ProtoPie",
      "Framer",
      "HTML / CSS",
      "JavaScript / TypeScript",
      "React / Next.js",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      {/* Bio */}
      <section className="grid gap-16 pb-20 pt-12 sm:gap-14 sm:pb-24 sm:pt-14 md:grid-cols-[minmax(0,280px)_1fr] md:items-start md:gap-16 md:pb-28 md:pt-20 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
        <div className="animate-rise mx-auto w-full max-w-[260px] md:mx-0 md:max-w-none">
          <div className="overflow-hidden">
            <Image
              src="/images/portrait.png"
              alt="Illustrated portrait of Lulu Wang"
              width={640}
              height={800}
              className="aspect-[4/5] w-full object-cover"
              priority
            />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.18em] text-muted">
                Background
              </dt>
              <dd className="mt-2 text-sm font-medium">
                Design &amp; Engineering
              </dd>
            </div>
            <div>
              <dt className="text-[13px] font-bold uppercase tracking-[0.18em] text-muted">
                Practice
              </dt>
              <dd className="mt-2 text-sm font-medium">
                Product &amp; UX Design
              </dd>
            </div>
          </dl>
        </div>

        <div className="animate-rise md:pt-4" style={{ animationDelay: "120ms" }}>
          <h1 className="text-[2.4rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl">
            I&rsquo;m Lulu Wang.
          </h1>

          <p className="font-secondary mt-8 text-lg leading-[1.5] text-foreground sm:mt-10 sm:text-xl">
            I&rsquo;m a{" "}
            <span className="hl bg-lavender">product designer</span> with a
            background in{" "}
            <span className="hl bg-[#fadadd]">digital art</span>, graphic
            design, and{" "}
            <span className="hl bg-lavender">software engineering</span>.
          </p>

          <div className="font-secondary mt-8 space-y-6 text-base leading-[29px] text-[#5c5c5c]">
            <p>
              After more than four years as a software engineer building
              user-centered products, I began my journey in{" "}
              <span className="hl bg-[#fadadd]">product design</span>.
            </p>
            <p>
              I&rsquo;m interested in building products that challenge the
              boundaries of digital experiences and bridge technology with{" "}
              <span className="hl bg-lavender">creativity</span>. Outside work,
              I&rsquo;m an avid traveler, maker of art, and enjoy skiing and
              volleyball.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="pb-20 sm:pb-28">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Capabilities
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-8">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-muted">
                {group.category}
              </h3>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-secondary text-base leading-snug text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="pb-4">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Get in touch
        </h2>
        <p className="font-secondary mt-6 max-w-2xl text-base leading-[29px] text-[#5c5c5c]">
          Have a project in mind, a role to discuss, or simply want to say hello?
          Reach me at{" "}
          <a
            href="mailto:lulu.wang25@gmail.com"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            lulu.wang25@gmail.com
          </a>
          .
        </p>

        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
