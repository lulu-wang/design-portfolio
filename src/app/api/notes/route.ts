import { NextResponse } from "next/server";
import { addNote, readNotes } from "@/data/notes-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const notes = await readNotes();
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json(
      { error: "Could not load notes." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: { name?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name : "";
  const message = typeof body.message === "string" ? body.message : "";

  try {
    const note = await addNote({ name, message });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    const text =
      error instanceof Error ? error.message : "Could not save the note.";
    const status = text === "A name and a note are required." ? 400 : 500;
    return NextResponse.json({ error: text }, { status });
  }
}
