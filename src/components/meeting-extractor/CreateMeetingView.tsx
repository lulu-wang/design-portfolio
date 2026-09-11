"use client";

import { useMemo, useState } from "react";
import {
  currentUser,
  people,
  personById,
  projects,
  type RecordingSource,
} from "@/data/meeting-extractor";
import {
  Avatar,
  CalendarIcon,
  CloseIcon,
  FolderIcon,
  MeetIcon,
  PageHeader,
  SearchIcon,
  ZoomIcon,
  rowInteractive,
} from "./ui";

export default function CreateMeetingView({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (input: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    locationType: RecordingSource;
    projectId: string;
    attendeeIds: string[];
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2024-09-09");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("15:00");
  const [locationType, setLocationType] = useState<RecordingSource>("zoom");
  const [projectId, setProjectId] = useState(projects[0].id);
  const [attendeeIds, setAttendeeIds] = useState<string[]>([currentUser.id]);
  const [inviteQuery, setInviteQuery] = useState("");

  const matches = useMemo(() => {
    const q = inviteQuery.trim().toLowerCase();
    return people.filter((person) => {
      if (attendeeIds.includes(person.id)) return false;
      if (!q) return true;
      return (
        person.name.toLowerCase().includes(q) ||
        person.email.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q)
      );
    });
  }, [inviteQuery, attendeeIds]);

  const addAttendee = (id: string) => {
    setAttendeeIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setInviteQuery("");
  };

  const removeAttendee = (id: string) => {
    if (id === currentUser.id) return;
    setAttendeeIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <p className="mb-3 flex items-center gap-2 text-[13px] text-[#8b919c]">
        <button type="button" onClick={onCancel} className="hover:text-[#111827]">
          Meetings
        </button>
        <span>›</span>
        <span className="text-[#374151]">New meeting</span>
      </p>
      <PageHeader
        title="Create meeting"
        subtitle="Add it to the calendar, generate a call link, and invite anyone in the org."
      />

      <form
        className="mt-6 max-w-2xl space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          onCreate({
            title,
            date,
            startTime,
            endTime,
            locationType,
            projectId,
            attendeeIds,
          });
        }}
      >
        <label className="block">
          <span className="mb-2 block text-[13px] font-medium text-[#6b7280]">
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Weekly"
            className="h-11 w-full rounded-xl border border-[#eceef2] bg-white px-3.5 text-[14px] outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-[#6b7280]">
              Date
            </span>
            <span className="relative flex h-11 items-center gap-2 rounded-xl border border-[#eceef2] bg-white px-3.5">
              <CalendarIcon />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-full w-full bg-transparent text-[14px] outline-none"
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-[#6b7280]">
              Start
            </span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#eceef2] bg-white px-3.5 text-[14px] outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-[#6b7280]">
              End
            </span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#eceef2] bg-white px-3.5 text-[14px] outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
            />
          </label>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-medium text-[#6b7280]">Call link</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLocationType("zoom")}
              className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-3.5 text-[13.5px] font-medium ${
                locationType === "zoom"
                  ? "border-[#ddd6fe] bg-[#f7f4ff] text-[#111827]"
                  : "border-[#eceef2] bg-white text-[#6b7280]"
              }`}
            >
              <ZoomIcon />
              Zoom
            </button>
            <button
              type="button"
              onClick={() => setLocationType("google-meet")}
              className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-3.5 text-[13.5px] font-medium ${
                locationType === "google-meet"
                  ? "border-[#ddd6fe] bg-[#f7f4ff] text-[#111827]"
                  : "border-[#eceef2] bg-white text-[#6b7280]"
              }`}
            >
              <MeetIcon />
              Google Meet
            </button>
          </div>
          <p className="mt-2 text-[12.5px] text-[#8b919c]">
            A {locationType === "google-meet" ? "Google Meet" : "Zoom"} link will be
            generated when you create the meeting.
          </p>
        </div>

        <label className="block">
          <span className="mb-2 block text-[13px] font-medium text-[#6b7280]">
            Project
          </span>
          <span className="relative flex h-11 items-center gap-2 rounded-xl border border-[#eceef2] bg-white px-3.5">
            <FolderIcon />
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="h-full w-full bg-transparent text-[14px] outline-none"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        <div>
          <p className="mb-2 text-[13px] font-medium text-[#6b7280]">
            Invite people
          </p>
          <div className="rounded-2xl border border-[#eceef2] bg-white p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {attendeeIds.map((id) => {
                const person = personById(id);
                const locked = id === currentUser.id;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f1fb] py-1 pl-1 pr-2 text-[12.5px] font-medium"
                  >
                    <Avatar person={person} size="xs" />
                    {person.name}
                    {locked ? " (you)" : ""}
                    {!locked && (
                      <button
                        type="button"
                        onClick={() => removeAttendee(id)}
                        className="text-[#8b919c] hover:text-[#111827]"
                        aria-label={`Remove ${person.name}`}
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
            <label className="relative block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98a0ab]">
                <SearchIcon />
              </span>
              <input
                value={inviteQuery}
                onChange={(e) => setInviteQuery(e.target.value)}
                placeholder={`Search ${people.length} people in Opal…`}
                className="h-10 w-full rounded-xl border border-[#eceef2] bg-[#fbfcfd] py-2 pl-10 pr-3 text-[13.5px] outline-none placeholder:text-[#b0b6bf] focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
              />
            </label>
            {inviteQuery.trim() && matches.length === 0 ? (
              <p className="mt-2 px-1 py-2 text-[13px] text-[#8b919c]">
                No one matches “{inviteQuery.trim()}”.
              </p>
            ) : matches.length === 0 ? (
              <p className="mt-2 px-1 py-2 text-[13px] text-[#8b919c]">
                Everyone in the org is already invited.
              </p>
            ) : (
              <ul className="mt-2 max-h-56 overflow-y-auto rounded-xl border border-[#eceef2]">
                {matches.map((person) => (
                  <li key={person.id}>
                    <button
                      type="button"
                      onClick={() => addAttendee(person.id)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left ${rowInteractive}`}
                    >
                      <Avatar person={person} size="xs" />
                      <span className="min-w-0 flex-1">
                        <span className="block min-w-0 break-words text-[13.5px] font-medium">
                          {person.name}
                        </span>
                        <span className="block min-w-0 break-words text-[12px] text-[#8b919c]">
                          {person.role} · {person.email}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center rounded-xl border border-[#e6e9ef] px-4 text-[13px] font-medium text-[#374151] hover:bg-[#f7f8fa]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex h-10 items-center rounded-xl bg-[#111827] px-4 text-[13px] font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create meeting
          </button>
        </div>
      </form>
    </div>
  );
}
