import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { Note } from "@/data/notes";

export type { Note };

const file = path.join(process.cwd(), "data", "notes.json");

let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function readNotes(): Promise<Note[]> {
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

export async function addNote(input: {
  name: string;
  message: string;
}): Promise<Note> {
  const name = input.name.trim().slice(0, 40);
  const message = input.message.trim().slice(0, 280);
  if (!name || !message) {
    throw new Error("A name and a note are required.");
  }

  return enqueue(async () => {
    const notes = await readNotes();
    const note: Note = {
      id: randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };
    notes.unshift(note);
    await fs.mkdir(path.dirname(file), { recursive: true });
    const next = `${JSON.stringify(notes, null, 2)}\n`;
    const temporary = `${file}.${process.pid}.tmp`;
    await fs.writeFile(temporary, next);
    await fs.rename(temporary, file);
    return note;
  });
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
