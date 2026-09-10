"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calendarDays,
  currentUser,
  isoFromCalendarDay,
  meetingsOnDate,
  type AppMeeting,
  type MeetingTab,
} from "@/data/meeting-extractor";
import {
  AvatarStack,
  CalendarIcon,
  ChevronIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocIcon,
  MenuItem,
  PlusIcon,
  VideoIcon,
  ZoomIcon,
} from "./ui";

export default function MeetingsView({
  meetings,
  selectedDate,
  onSelectDate,
  onOpenMeeting,
  onNewMeeting,
  onCopyLink,
}: {
  meetings: AppMeeting[];
  selectedDate: string;
  onSelectDate: (iso: string) => void;
  onOpenMeeting: (
    id: string,
    tab?: MeetingTab,
    options?: { upload?: boolean },
  ) => void;
  onNewMeeting: () => void;
  onCopyLink: (meeting: AppMeeting) => void;
}) {
  const [menuId, setMenuId] = useState<string | null>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-meeting-menu]")) setMenuId(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuId(null);
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const dayMeetings = useMemo(
    () => meetingsOnDate(selectedDate),
    [selectedDate],
  );
  const upcoming =
    dayMeetings.find((m) => m.upcoming) ?? dayMeetings[0] ?? null;
  const recent = meetings.filter((m) => m.id !== upcoming?.id);
  const markedDays = new Set(meetings.map((m) => m.date));
  const awaiting = selectedDate === "2024-09-09" ? 2 : 0;

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-6 pb-10 pt-5 lg:px-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-[#111827]">
            Meetings
          </h1>
          <p className="mt-1 text-[18px] font-medium tracking-[-0.02em] text-[#111827]">
            Good morning, {currentUser.name.split(" ")[0]}{" "}
            <span aria-hidden>☀️</span>
          </p>
          <p className="mt-1 text-[13.5px] text-[#8b919c]">
            Here’s what’s on your schedule today.
          </p>
        </div>
        <button
          type="button"
          onClick={onNewMeeting}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-[#7c5cf6] px-4 text-[13.5px] font-medium text-white shadow-[0_8px_20px_rgba(124,92,246,0.28)] hover:bg-[#6d4ef0]"
        >
          <PlusIcon />
          New meeting
        </button>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,1fr)_minmax(260px,0.95fr)]">
        <section className="flex h-full min-w-0 flex-col rounded-[22px] bg-[#f3f1fb] p-5">
          {upcoming ? (
            <>
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="inline-flex h-7 items-center rounded-full bg-[#ece8ff] px-2.5 text-[12px] font-medium text-[#6d4aff]">
                  {upcoming.upcoming
                    ? `Up next · In ${upcoming.minutesUntil ?? 10} minutes`
                    : upcoming.dayLabel}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenMeeting(upcoming.id)}
                  className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#6b7280] hover:text-[#111827]"
                >
                  View details
                  <ChevronIcon />
                </button>
              </div>
              <h2 className="text-[22px] font-semibold tracking-[-0.03em]">
                {upcoming.title}
              </h2>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px] text-[#6b7280]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarIcon />
                  {upcoming.whenShort}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ZoomIcon />
                  {upcoming.location}
                </span>
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <AvatarStack
                  ids={upcoming.attendeeIds.slice(0, 3)}
                  extra={Math.max(upcoming.attendeeIds.length - 3, 0)}
                />
                <button
                  type="button"
                  onClick={() => onOpenMeeting(upcoming.id)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#111827] px-4 text-[13.5px] font-medium text-white hover:bg-black"
                >
                  <VideoIcon />
                  Join meeting
                </button>
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[180px] flex-col justify-center">
              <p className="text-[15px] font-semibold">No meetings this day</p>
              <p className="mt-1 text-[13px] text-[#8b919c]">
                Pick another date on the calendar to see what’s scheduled.
              </p>
            </div>
          )}
        </section>

        <section className="flex h-full min-w-0 flex-col rounded-[22px] border border-[#eceef2] bg-white p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-[14px] font-semibold">September 2024</p>
            <div className="flex items-center gap-1 text-[#8b919c]">
              <button
                type="button"
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#f7f8fa] hover:text-[#111827]"
                onClick={() => onSelectDate("2024-09-01")}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#f7f8fa] hover:text-[#111827]"
                onClick={() => onSelectDate("2024-09-30")}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-[11px] font-medium text-[#9aa1ab]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[13px]">
            {calendarDays.flatMap((week, wi) =>
              week.map((day, di) => {
                const faded =
                  (wi === 0 && day > 7) ||
                  (wi === calendarDays.length - 1 && day < 8);
                const iso = isoFromCalendarDay(day, faded, wi);
                const selected = iso === selectedDate;
                const marked = markedDays.has(iso);
                return (
                  <button
                    key={`${wi}-${di}`}
                    type="button"
                    onClick={() => onSelectDate(iso)}
                    className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                      selected
                        ? "bg-[#7c5cf6] font-semibold text-white"
                        : faded
                          ? "text-[#d0d4dc] hover:bg-[#f7f8fa]"
                          : "text-[#374151] hover:bg-[#f3f1fb]"
                    }`}
                  >
                    {day}
                    {marked && !selected && (
                      <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#7c5cf6]" />
                    )}
                  </button>
                );
              }),
            )}
          </div>
        </section>

        <section className="flex min-w-0 flex-col rounded-[22px] border border-[#eceef2] bg-white p-5">
          <p className="text-[14px] font-semibold text-[#111827]">Today</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[34px] font-semibold leading-none tracking-[-0.04em]">
                {selectedDate === "2024-09-09" ? 3 : dayMeetings.length}
              </p>
              <p className="mt-1 text-[13px] text-[#8b919c]">meetings today</p>
            </div>
            <div className="border-l border-[#eceef2] pl-4">
              <p className="text-[34px] font-semibold leading-none tracking-[-0.04em]">
                {awaiting}
              </p>
              <p className="mt-1 text-[13px] text-[#8b919c]">awaiting review</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              onOpenMeeting(upcoming?.id ?? "product-weekly", "notes")
            }
            className="mt-auto flex items-center justify-between rounded-2xl bg-[#f6f7fb] px-3.5 py-3 text-left hover:bg-[#eef0ff]"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#6d4aff] shadow-sm">
                <DocIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold">
                  Stay on top of your notes
                </span>
                <span className="block text-[12px] text-[#8b919c]">
                  Review and turn discussions into action.
                </span>
              </span>
            </span>
            <span className="shrink-0 text-[#c5cad3]">
              <ChevronIcon />
            </span>
          </button>
        </section>
      </div>

      <section className="mt-8 min-w-0">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">Recent meetings</h2>
          <button
            type="button"
            onClick={() => onSelectDate("2024-09-09")}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#7c5cf6]"
          >
            View all
            <ChevronIcon />
          </button>
        </div>
        <div className="rounded-[22px] border border-[#eceef2] bg-white">
          <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(140px,0.8fr)_minmax(120px,0.7fr)_minmax(110px,0.55fr)_56px] gap-3 px-5 py-3 text-[12px] font-medium text-[#8b919c] md:grid">
            <span>Meeting</span>
            <span>Date & time</span>
            <span>Participants</span>
            <span>Notes</span>
            <span className="text-right">Actions</span>
          </div>
          {recent.map((meeting, index) => (
            <div
              key={meeting.id}
              className="relative grid grid-cols-1 items-center gap-3 border-t border-[#f0f1f4] px-5 py-3.5 md:grid-cols-[minmax(0,1.5fr)_minmax(140px,0.8fr)_minmax(120px,0.7fr)_minmax(110px,0.55fr)_56px]"
            >
              <button
                type="button"
                onClick={() => onOpenMeeting(meeting.id)}
                className="flex min-w-0 items-center gap-3 text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f5f8] text-[#6b7280]">
                  <DocIcon />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold">
                    {meeting.title}
                  </span>
                  <span className="block truncate text-[12.5px] text-[#8b919c]">
                    {meeting.blurb}
                  </span>
                </span>
              </button>
              <p className="min-w-0 truncate text-[13px] text-[#6b7280]">
                {meeting.whenShort}
              </p>
              <AvatarStack
                ids={meeting.attendeeIds.slice(0, 3)}
                extra={meeting.extraAttendees}
                size="xs"
              />
              <button
                type="button"
                onClick={() => onOpenMeeting(meeting.id, "notes")}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#374151] hover:text-[#7c5cf6]"
              >
                <DocIcon />
                View notes
              </button>
              <div className="relative flex justify-end text-[#c5cad3]" data-meeting-menu>
                <button
                  type="button"
                  aria-label={`${meeting.title} actions`}
                  aria-expanded={menuId === meeting.id}
                  onClick={() =>
                    setMenuId((id) => (id === meeting.id ? null : meeting.id))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#f7f8fa]"
                >
                  ···
                </button>
                {menuId === meeting.id && (
                  <div
                    className={`absolute right-0 z-30 w-52 overflow-hidden rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-[0_12px_32px_rgba(16,24,40,0.12)] ${
                      index > recent.length - 3 ? "bottom-9" : "top-9"
                    }`}
                  >
                    <MenuItem
                      onClick={() => {
                        setMenuId(null);
                        onOpenMeeting(meeting.id);
                      }}
                    >
                      Open meeting
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuId(null);
                        onOpenMeeting(meeting.id, "notes");
                      }}
                    >
                      View notes
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuId(null);
                        onOpenMeeting(meeting.id, "transcript");
                      }}
                    >
                      View transcript
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuId(null);
                        onOpenMeeting(meeting.id, "decisions");
                      }}
                    >
                      View decisions
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuId(null);
                        onOpenMeeting(meeting.id, "notes", { upload: true });
                      }}
                    >
                      Upload recording
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuId(null);
                        onCopyLink(meeting);
                      }}
                    >
                      Copy meeting link
                    </MenuItem>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
