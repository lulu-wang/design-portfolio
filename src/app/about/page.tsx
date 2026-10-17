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
    <main className="flex flex-col">
      <section className="bg-[#F7F4EF] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
          About
        </p>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="grid gap-3 lg:col-span-5">
            <Image
              src="/images/about-01.jpg"
              alt="Lulu Wang photographing in San Francisco"
              width={2000}
              height={1334}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <Image
              src="/images/about-02.jpg"
              alt="Lulu Wang with cherry blossoms"
              width={920}
              height={1150}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <h1 className="font-display text-[clamp(3rem,6vw,5.4rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em]">
              Lulu Wang
            </h1>
            <p className="mt-8 max-w-4xl text-[17px] leading-relaxed text-foreground/70 sm:text-[18px]">
              Product designer with a background in digital art, graphic design,
              and software engineering.
            </p>
            <div className="mt-8 max-w-4xl space-y-6 text-[16px] leading-relaxed text-foreground/65 sm:text-[17px]">
              <p>
                I immigrated from China to Canada to the US. I&rsquo;ve been doing
                art and creative media since I was 11.
              </p>
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
        </div>
      </section>

      <section className="bg-[#F6E7DC] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <h2 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em]">
          Capabilities
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-10 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/50">
                {group.category}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] leading-snug text-foreground/75 sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 bg-[#F7F4EF] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <h2 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em]">
          Let&rsquo;s talk
        </h2>
        <p className="mt-6 max-w-4xl text-[16px] leading-relaxed text-foreground/65 sm:text-[18px]">
          Have a project in mind, a role to discuss, or simply want to say hello?
        </p>
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}
