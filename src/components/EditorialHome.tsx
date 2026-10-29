import Footer from "@/components/Footer";
import FolioProjects from "@/components/FolioProjects";

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4 fill-current"
    >
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.48h4.52V24H.24V8.48zM8.34 8.48h4.33v2.12h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24H8.34V8.48z" />
    </svg>
  );
}

export default function EditorialHome() {
  return (
    <main className="folio bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap pb-6 pt-16 sm:pt-24 lg:pt-28">
        <h1 className="max-w-[840px] text-[clamp(2.15rem,4.4vw,3.75rem)] leading-[1.06]">
          A product designer with a passion to create and update products to
          make life easier and more meaningful.
        </h1>
        <a
          href="https://www.linkedin.com/in/luluwang25"
          target="_blank"
          rel="noreferrer"
          aria-label="Lulu Wang on LinkedIn"
          className="mt-14 inline-flex items-center gap-4 text-black hover:opacity-60 sm:mt-16"
        >
          <span className="block h-[2px] w-[92px] bg-black sm:w-[150px]" />
          <LinkedInIcon />
        </a>
      </section>

      <section className="folio-wrap py-14 sm:py-16 lg:py-[60px]">
        <FolioProjects />
      </section>

      <Footer />
    </main>
  );
}
