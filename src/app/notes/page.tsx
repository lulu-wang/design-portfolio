import type { Metadata } from "next";
import Footer from "@/components/Footer";
import NotesBoard from "@/components/NotesBoard";
import { readNotes } from "@/data/notes-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notes — Lulu Wang",
  description: "Leave a note.",
};

export default async function NotesPage() {
  const notes = await readNotes();

  return (
    <main className="flex min-h-svh flex-col bg-white">
      <section className="page-inset flex-1 bg-white pb-20 pt-28 sm:pb-24 sm:pt-32">
        <h1 className="sr-only">Notes</h1>
        <NotesBoard initialNotes={notes} />
      </section>
      <Footer light />
    </main>
  );
}
