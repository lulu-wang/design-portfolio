"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calendarMonthGrid,
  currentUser,
  formatDueDate,
  monthNames,
  parseIsoDate,
  prototypeToday,
  projectById,
  shiftMonth,
  type AppMeeting,
  type BoardTask,
  type Decision,
  type MeetingTab,
} from "@/data/meeting-extractor";
import {
  ParticipantsPopover,
  CalendarIcon,
  ChevronDownIcon,
  ChevronIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocIcon,
  MeetingCallLink,
  TasksIcon,
  MenuItem,
  PageHeader,
  cardInteractive,
  cardRadius,
  typeScale,
} from "./ui";

export default function MeetingsView({
  meetings,
  tasks,
  decisions,
  selectedDate,
  onSelectDate,
  onOpenMeeting,
  onOpenTasks,
  onCopyLink,
}: {
  meetings: AppMeeting[];
  tasks: BoardTask[];
  decisions: Decision[];
  selectedDate: string;
  onSelectDate: (iso: string) => void;
  onOpenMeeting: (
    id: string,
    tab?: MeetingTab,
    options?: { upload?: boolean },
  ) => void;
  onOpenTasks: () => void;
  onCopyLink: (meeting: AppMeeting) => void;
}) {
  const [menuId, setMenuId] = useState<string | null>(null);
  const selectedParts = parseIsoDate(selectedDate);
  const [view, setView] = useState({
    year: selectedParts.year,
    month: selectedParts.month,
  });
  const [calendarMenu, setCalendarMenu] = useState<null | "month" | "year">(
    null,
  );

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-meeting-menu]")) setMenuId(null);
      if (!target.closest("[data-calendar-menu]")) setCalendarMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuId(null);
        setCalendarMenu(null);
      }
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const dayMeetings = useMemo(() => {
    return meetings
      .filter((meeting) => meeting.date === selectedDate)
      .sort((a, b) => meetingStartMinutes(a) - meetingStartMinutes(b));
  }, [meetings, selectedDate]);
  const upcoming =
    dayMeetings.find((m) => m.upcoming) ?? dayMeetings[0] ?? null;
  const weeks = useMemo(
    () => calendarMonthGrid(view.year, view.month),
    [view.year, view.month],
  );
  const markedDays = new Set(meetings.map((m) => m.date));
  const dayUnconfirmed = decisions.filter((decision) => {
    const meeting = meetings.find((item) => item.id === decision.meetingId);
    return meeting?.date === selectedDate && decision.status !== "confirmed";
  });
  const awaiting = dayUnconfirmed.length;
  const reviewMeetingId = dayUnconfirmed[0]?.meetingId;
  const goToday = () => {
    const { year, month } = parseIsoDate(prototypeToday);
    setView({ year, month });
    onSelectDate(prototypeToday);
  };
  const selectDate = (iso: string) => {
    const { year, month } = parseIsoDate(iso);
    setView({ year, month });
    onSelectDate(iso);
  };
  const onToday =
    selectedDate === prototypeToday &&
    view.year === selectedParts.year &&
    view.month === selectedParts.month;
  const years = useMemo(
    () => Array.from({ length: 11 }, (_, index) => 2020 + index),
    [],
  );
  const upcomingProject = upcoming ? projectById(upcoming.projectId) : null;
  const upcomingTasks = upcoming
    ? tasks.filter((task) => task.meetingId === upcoming.id)
    : [];

  return (
    <div className="@container min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <PageHeader
        title="Meetings"
        subtitle={`Good morning, ${currentUser.name.split(" ")[0]}. Here’s what’s on your schedule today.`}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 @min-[760px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <section className="flex h-full min-w-0 flex-col rounded-[22px] border border-[#eceef2] bg-white p-7">
          {upcoming ? (
            <>
              <div className="mb-5 flex min-w-0 items-center justify-between gap-2">
                <span className="inline-flex h-6 min-w-0 max-w-[70%] items-center truncate rounded-full bg-[#ece8ff] px-2.5 text-[11px] font-medium text-[#6d4aff]">
                  {upcoming.upcoming
                    ? `Up next · In ${upcoming.minutesUntil ?? 10} minutes`
                    : upcoming.dayLabel}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenMeeting(upcoming.id)}
                  className={`inline-flex shrink-0 items-center gap-1 text-[#6b7280] hover:text-[#111827] ${typeScale.button}`}
                >
                  View details
                  <ChevronIcon />
                </button>
              </div>
              <h2 className={`min-w-0 break-words text-[24px] font-semibold tracking-[-0.02em] text-[#111827]`}>
                {upcoming.title}
              </h2>
              <p className="mt-4 text-sm leading-5 text-[#6b7280]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarIcon />
                  {upcoming.whenShort}
                </span>
              </p>
              <div className="mt-2">
                <MeetingCallLink meeting={upcoming} />
              </div>
              {upcomingProject && (
                <p className="mt-3 text-sm leading-5 text-[#6b7280]">
                  <span className="font-medium text-[#111827]">
                    {upcomingProject.name}
                  </span>
                  {upcomingTasks.length > 0
                    ? ` · ${upcomingTasks.length} ${
                        upcomingTasks.length === 1 ? "task" : "tasks"
                      } involved`
                    : " · No tasks linked yet"}
                </p>
              )}
              {upcomingTasks.length > 0 && (
                <p className="mt-2 whitespace-normal break-words text-sm leading-5 text-[#6b7280]">
                  {upcomingTasks
                    .slice(0, 2)
                    .map((task) => task.title)
                    .join(" · ")}
                  {upcomingTasks.length > 2
                    ? ` · +${upcomingTasks.length - 2} more`
                    : ""}
                </p>
              )}
              <div className="mt-auto flex flex-nowrap items-center justify-between gap-5 pt-6 sm:gap-6">
                <ParticipantsPopover meeting={upcoming} shown={3} compact />
                <MeetingCallLink meeting={upcoming} variant="button" />
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[180px] flex-col justify-center">
              <p className={typeScale.card}>No meetings this day</p>
              <p className={`mt-1 ${typeScale.subtitle}`}>
                Pick another date on the calendar to see what’s scheduled.
              </p>
            </div>
          )}
        </section>

        <section className="@container flex h-full min-w-0 flex-col rounded-[22px] border border-[#eceef2] bg-white p-5">
          <div className="mb-3 flex items-center gap-2 px-1">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              <div className="relative shrink-0" data-calendar-menu>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={calendarMenu === "month"}
                  onClick={() =>
                    setCalendarMenu((current) =>
                      current === "month" ? null : "month",
                    )
                  }
                  className={`inline-flex items-center gap-1 whitespace-nowrap hover:text-[#7c5cf6] ${typeScale.section}`}
                >
                  {monthNames[view.month - 1]}
                  <ChevronDownIcon />
                </button>
                {calendarMenu === "month" && (
                  <div className="absolute left-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-lg">
                    {monthNames.map((name, index) => {
                      const month = index + 1;
                      const selected = month === view.month;
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            setView((current) => ({ ...current, month }));
                            setCalendarMenu(null);
                          }}
                          className={`flex w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa] ${
                            selected
                              ? "font-medium text-[#111827]"
                              : "text-[#374151]"
                          }`}
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="relative shrink-0" data-calendar-menu>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={calendarMenu === "year"}
                  onClick={() =>
                    setCalendarMenu((current) =>
                      current === "year" ? null : "year",
                    )
                  }
                  className={`inline-flex items-center gap-1 whitespace-nowrap hover:text-[#7c5cf6] ${typeScale.section}`}
                >
                  {view.year}
                  <ChevronDownIcon />
                </button>
                {calendarMenu === "year" && (
                  <div className="absolute left-0 top-full z-30 mt-2 max-h-64 w-28 overflow-y-auto rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-lg">
                    {years.map((year) => {
                      const selected = year === view.year;
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => {
                            setView((current) => ({ ...current, year }));
                            setCalendarMenu(null);
                          }}
                          className={`flex w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa] ${
                            selected
                              ? "font-medium text-[#111827]"
                              : "text-[#374151]"
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-0.5 text-[#8b919c]">
              <button
                type="button"
                onClick={goToday}
                className={`mr-1 hidden rounded-lg px-2 py-1 text-[12px] font-medium @[560px]:inline ${
                  onToday
                    ? "text-[#c5cad3]"
                    : "text-[#7c5cf6] hover:bg-[#f7f4ff] hover:text-[#6d4ef0]"
                }`}
              >
                Today
              </button>
              <button
                type="button"
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#f7f8fa] hover:text-[#111827]"
                onClick={() => setView((current) => shiftMonth(current.year, current.month, -1))}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#f7f8fa] hover:text-[#111827]"
                onClick={() => setView((current) => shiftMonth(current.year, current.month, 1))}
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
            {weeks.flatMap((week, wi) =>
              week.map((cell, di) => {
                const selected = cell.iso === selectedDate;
                const marked = markedDays.has(cell.iso);
                const isToday = cell.iso === prototypeToday;
                return (
                  <button
                    key={`${wi}-${di}`}
                    type="button"
                    onClick={() => selectDate(cell.iso)}
                    className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                      selected
                        ? "bg-[#7c5cf6] font-semibold text-white"
                        : cell.outside
                          ? "text-[#d0d4dc] hover:bg-[#f7f8fa]"
                          : isToday
                            ? "font-semibold text-[#7c5cf6] hover:bg-[#f7f4ff]"
                            : "text-[#374151] hover:bg-[#f4f5f8]"
                    }`}
                  >
                    {cell.day}
                    {marked && !selected && (
                      <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#7c5cf6]" />
                    )}
                  </button>
                );
              }),
            )}
          </div>
        </section>

        <section className="flex h-full min-w-0 flex-col rounded-[22px] border border-[#eceef2] bg-white p-5">
          <button
            type="button"
            onClick={goToday}
            className={`text-left hover:text-[#7c5cf6] ${typeScale.section}`}
          >
            Today
          </button>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className={typeScale.stat}>
                {dayMeetings.length}
              </p>
              <p className={`mt-2 ${typeScale.label}`}>
                {selectedDate === prototypeToday
                  ? "meetings today"
                  : "meetings this day"}
              </p>
            </div>
            <div className="border-l border-[#eceef2] pl-4">
              {reviewMeetingId ? (
                <button
                  type="button"
                  onClick={() => onOpenMeeting(reviewMeetingId, "decisions")}
                  className="text-left hover:text-[#7c5cf6]"
                >
                  <p className={typeScale.stat}>{awaiting}</p>
                  <p className={`mt-2 ${typeScale.label}`}>awaiting review</p>
                </button>
              ) : (
                <>
                  <p className={typeScale.stat}>{awaiting}</p>
                  <p className={`mt-2 ${typeScale.label}`}>awaiting review</p>
                </>
              )}
            </div>
          </div>
          <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onOpenTasks}
            className={`flex w-full items-center justify-between ${cardRadius} border border-transparent bg-[#f4f5f8] px-3.5 py-3 text-left ${cardInteractive}`}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#6d4aff] shadow-sm">
                <TasksIcon />
              </span>
              <span className="min-w-0">
                <span className={`block min-w-0 break-words ${typeScale.card}`}>
                  View tasks
                </span>
                <span className={`mt-1 block min-w-0 break-words ${typeScale.meta}`}>
                  See what’s assigned and move work forward.
                </span>
              </span>
            </span>
            <span className="shrink-0 text-[#c5cad3]">
              <ChevronIcon />
            </span>
          </button>
          </div>
        </section>
      </div>

      <section className="mt-8 min-w-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className={typeScale.section}>
            {selectedDate === prototypeToday
              ? "Today's meetings"
              : `Meetings on ${formatDueDate(selectedDate)}`}
          </h2>
        </div>
        <div className="min-w-0 overflow-x-auto rounded-[22px] border border-[#eceef2] bg-white">
          <div className="min-w-[760px]">
          <div className={`grid grid-cols-[minmax(220px,1.6fr)_minmax(160px,1fr)_minmax(110px,0.7fr)_minmax(120px,0.55fr)_56px] gap-3 px-6 py-3 font-medium ${typeScale.label}`}>
            <span>Meeting</span>
            <span>Date & time</span>
            <span>Participants</span>
            <span>Notes</span>
            <span className="text-right">Actions</span>
          </div>
          {dayMeetings.length === 0 ? (
            <p className="border-t border-[#f0f1f4] px-6 py-10 text-center text-[14px] text-[#6b7280]">
              No meetings on {formatDueDate(selectedDate)}.
            </p>
          ) : (
          dayMeetings.map((meeting, index) => (
            <div
              key={meeting.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenMeeting(meeting.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenMeeting(meeting.id);
                }
              }}
              className="relative grid cursor-pointer grid-cols-[minmax(220px,1.6fr)_minmax(160px,1fr)_minmax(110px,0.7fr)_minmax(120px,0.55fr)_56px] items-center gap-3 border-t border-[#f0f1f4] px-6 py-4 hover:bg-[#f4f5f8]"
            >
              <div className="min-w-0 px-1 py-1">
                <p className="min-w-0 break-words text-[14px] font-semibold leading-5 text-[#111827]">
                  {meeting.title}
                </p>
                <p className="mt-1 min-w-0 break-words text-[12px] leading-5 text-[#8b919c]">
                  {meeting.blurb}
                </p>
              </div>
              <div className="min-w-0">
                <p className="min-w-0 whitespace-normal break-words text-[13px] leading-5 text-[#8b919c]">
                  {meeting.whenShort}
                </p>
                <div className="mt-1.5 min-w-0">
                  <MeetingCallLink meeting={meeting} />
                </div>
              </div>
              <div
                onClick={(event) => event.stopPropagation()}
                className="min-w-0"
              >
                <ParticipantsPopover meeting={meeting} shown={3} size="xs" />
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenMeeting(meeting.id, "notes");
                }}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-[#374151] hover:bg-[#eceef2] hover:text-[#111827] ${typeScale.button}`}
              >
                <DocIcon />
                View notes
              </button>
              <div className="relative flex justify-end text-[#c5cad3]" data-meeting-menu>
                <button
                  type="button"
                  aria-label={`${meeting.title} actions`}
                  aria-expanded={menuId === meeting.id}
                  onClick={(event) => {
                    event.stopPropagation();
                    setMenuId((id) => (id === meeting.id ? null : meeting.id));
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#eceef2]"
                >
                  ···
                </button>
                {menuId === meeting.id && (
                  <div
                    onClick={(event) => event.stopPropagation()}
                    className={`absolute right-0 z-30 w-52 overflow-hidden rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-[0_12px_32px_rgba(16,24,40,0.12)] ${
                      index > dayMeetings.length - 3 ? "bottom-9" : "top-9"
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
          ))
          )}
          </div>
        </div>
      </section>
    </div>
  );
}

function meetingStartMinutes(meeting: AppMeeting) {
  const match = meeting.timeRange.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const suffix = match[3].toUpperCase();
  if (suffix === "PM" && hours !== 12) hours += 12;
  if (suffix === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}
