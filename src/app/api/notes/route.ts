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
    const missing =
      error instanceof Error &&
      error.message === "A name and a note are required.";
    return NextResponse.json(
      { error: missing ? error.message : "Could not save the note." },
      { status: missing ? 400 : 500 },
    );
  }
}
