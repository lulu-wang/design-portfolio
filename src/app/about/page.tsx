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
    category: "Tools",
    items: [
      "Figma",
      "ProtoPie",
      "Framer",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe After Effects",
      "Procreate",
    ],
  },
  {
    category: "Engineering",
    items: [
      "HTML / CSS",
      "JavaScript / TypeScript",
      "React / Next.js",
      "Python",
      "Java",
      "C++",
      "C#",
      "PHP/Hack",
      "Swift/Objective-C",
      "Unity",
      "Firebase",
      "Fullstack mobile and web development",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="page-wrap pt-28 sm:pt-32">
      <section className="relative grid gap-12 pb-20 pt-6 sm:gap-14 sm:pb-24 md:grid-cols-[minmax(0,380px)_1fr] md:items-start md:gap-16 md:pb-28 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
        <div className="animate-rise relative z-10 grid gap-3">
          <div className="overflow-hidden rounded-[28px]">
            <Image
              src="/images/about-01.jpg"
              alt="Lulu Wang photographing in San Francisco"
              width={2000}
              height={1334}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-[28px]">
            <Image
              src="/images/about-02.jpg"
              alt="Lulu Wang with cherry blossoms"
              width={920}
              height={1150}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
        </div>

        <div className="animate-rise relative z-10 md:pt-4" style={{ animationDelay: "120ms" }}>
          <h1 className="mt-0 font-display text-[clamp(2.35rem,5vw,4.15rem)] font-semibold leading-[1.12] tracking-[-0.045em]">
            I&rsquo;m{" "}
            <span className="name-mark">Lulu Wang</span>.
          </h1>

          <p className="page-subtitle mt-8 max-w-2xl sm:mt-10">
            I&rsquo;m a product designer with a background in digital art,
            graphic design, and software engineering.
          </p>

          <div className="page-subtitle mt-8 max-w-2xl space-y-6 md:max-w-3xl">
            <p>
              Before transitioning into product design, I spent more than four
              years as a software engineer creating user-centered products and
              features for Meta (Monetization, Messenger) and Microsoft (Azure,
              Xbox).
            </p>
            <p>
              I&rsquo;m interested in building products that challenge the
              boundaries of digital experiences and bridge technology with
              creativity. My interests include learning from different cultures
              while traveling, exploring different art styles, discovering
              beautiful new animations and films, and trying new sports like
              skiing, and recently, tennis and golf :)
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <h2 className="section-label">
          Capabilities
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-10 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.03em] md:text-[1.15rem]">
                {group.category}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-reading text-base leading-snug text-foreground/70 md:text-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 pb-4">
        <h2 className="section-label">
          Let&rsquo;s talk
        </h2>
        <p className="page-subtitle mt-4 max-w-2xl md:max-w-3xl">
          Have a project in mind, a role to discuss, or simply want to say hello?
          Reach me at{" "}
          <a
            href="mailto:lulu.wang25@gmail.com"
            className="color-hover text-foreground"
            style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
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
