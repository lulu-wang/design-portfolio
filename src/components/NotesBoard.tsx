"use client";

import { useState } from "react";
import type { Note } from "@/data/notes";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatNoteDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function Plus() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0"
    >
      <path
        d="M6.75 5.25H12V6.75H6.75V12H5.25V6.75H0V5.25H5.25V0H6.75V5.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function NotesBoard({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canPost = name.trim().length > 0 && message.trim().length > 0 && !saving;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPost) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = (await response.json()) as Note & { error?: string };
      if (!response.ok || !data.id) {
        setError(data.error || "Could not post the note.");
        return;
      }
      const saved = await fetch("/api/notes", { cache: "no-store" });
      const list = (await saved.json()) as Note[] | { error?: string };
      if (!saved.ok || !Array.isArray(list)) {
        setNotes((current) => [data, ...current]);
      } else {
        setNotes(list);
      }
      setName("");
      setMessage("");
      setOpen(false);
    } catch {
      setError("Could not post the note.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-[820px] grid-cols-1 gap-3 sm:grid-cols-2">
      {open ? (
        <form
          onSubmit={onSubmit}
          className="flex min-h-[148px] flex-col border border-black/15 bg-[#f3f3f3] p-4"
        >
          <label htmlFor="note-message" className="sr-only">
            Your note
          </label>
          <textarea
            id="note-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Say something..."
            maxLength={280}
            rows={3}
            autoFocus
            className="min-h-[72px] w-full flex-1 resize-none bg-transparent text-[15px] leading-relaxed text-foreground outline-none placeholder:text-foreground/40"
          />
          <div className="mt-auto flex items-center gap-3 pt-3">
            <label htmlFor="note-name" className="sr-only">
              Your name
            </label>
            <input
              id="note-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              maxLength={40}
              required
              className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground/70 outline-none placeholder:text-foreground/40"
            />
            <button
              type="submit"
              disabled={!canPost}
              className="shrink-0 bg-foreground px-4 py-2 text-[15px] text-background transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {saving ? "Posting" : "Post"}
            </button>
          </div>
          {error ? (
            <p className="pt-2 text-[13px] text-foreground/60">{error}</p>
          ) : null}
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-[148px] w-full items-start gap-2 border border-black/10 bg-[#f3f3f3] p-4 text-left text-[15px] text-foreground/45 transition-colors hover:text-foreground"
        >
          <Plus />
          New note
        </button>
      )}

      {notes.map((note) => (
        <article
          key={note.id}
          className="group relative flex min-h-[148px] flex-col border border-black/10 bg-[#f3f3f3] p-4"
        >
          <p className="flex-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-foreground">
            {note.message}
          </p>
          <div className="relative mt-auto min-w-0 pt-3">
            <p className="truncate text-[13px] text-foreground/45 sm:group-hover:pr-28">
              {note.name}
            </p>
            <time
              dateTime={note.createdAt}
              className="absolute right-0 top-3 text-[13px] text-foreground/45 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100"
            >
              {formatNoteDate(note.createdAt)}
            </time>
          </div>
        </article>
      ))}
    </div>
  );
}
