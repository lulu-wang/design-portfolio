import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Lulu Wang",
  description: "Get in touch with Lulu Wang about a project, role, or hello.",
};

export default function ContactPage() {
  return (
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap grid flex-1 items-start gap-12 py-16 sm:py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <h1 className="text-[28px] leading-[1.3]">Get in touch!</h1>
          <p className="mt-4 max-w-md text-[16px] leading-[1.47]">
            Have a product idea, a role to discuss, or just want to say hello?
            Drop me an email.
          </p>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
