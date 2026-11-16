import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import type { Note } from "@/data/notes";

export type { Note };

const file = path.join(process.cwd(), "data", "notes.json");
const blobPath = "notes.json";

let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readNotes(): Promise<Note[]> {
  if (blobEnabled()) {
    const stored = await readBlob();
    if (stored) return stored.notes;
  }
  return readFile();
}

export async function addNote(input: {
  name: string;
  message: string;
}): Promise<Note> {
  const name = input.name.trim().slice(0, 40);
  const message = input.message.trim().slice(0, 280);
  if (!name || !message) {
    throw new Error("A name and a note are required.");
  }

  const note: Note = {
    id: randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  if (blobEnabled()) {
    await saveBlob(note);
    return note;
  }

  await enqueue(() => saveFile(note));
  return note;
}

async function readBlob(): Promise<{ notes: Note[]; etag: string } | null> {
  const result = await get(blobPath, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const parsed = JSON.parse(await new Response(result.stream).text()) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("The notes file is not a list.");
  }
  return { notes: parsed.filter(isNote), etag: result.blob.etag };
}

async function saveBlob(note: Note) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const current = await readBlob();
    const notes = current ? [...current.notes] : await readFile();
    notes.unshift(note);
    try {
      await put(blobPath, `${JSON.stringify(notes, null, 2)}\n`, {
        access: "private",
        allowOverwrite: true,
        contentType: "application/json",
        ...(current ? { ifMatch: current.etag } : {}),
      });
      return;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError) continue;
      throw error;
    }
  }
  throw new Error("Could not save the note.");
}

async function readFile(): Promise<Note[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error("The notes file is not a list.");
    }
    return parsed.filter(isNote);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

async function saveFile(note: Note) {
  const notes = await readFile();
  notes.unshift(note);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const next = `${JSON.stringify(notes, null, 2)}\n`;
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, next);
  await fs.rename(temporary, file);
}

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== "object") return false;
  const note = value as Partial<Note>;
  return (
    typeof note.id === "string" &&
    typeof note.name === "string" &&
    typeof note.message === "string" &&
    typeof note.createdAt === "string"
  );
}
