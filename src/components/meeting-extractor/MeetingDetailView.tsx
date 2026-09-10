"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  formatDueDate,
  grepTranscript,
  personById,
  projectById,
  type AppMeeting,
  type BoardTask,
  type Decision,
  type GrepHit,
  type MeetingRecording,
  type MeetingTab,
  type Message,
  type RecordingSource,
} from "@/data/meeting-extractor";
import {
  Avatar,
  CalendarIcon,
  CheckCircleIcon,
  ChevronIcon,
  ClockIcon,
  DocIcon,
  FolderIcon,
  LeaveIcon,
  MeetIcon,
  MenuItem,
  MoreIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  SparkleIcon,
  StatusPill,
  TagIcon,
  TranscriptIcon,
  UploadIcon,
  VideoIcon,
  ZoomIcon,
} from "./ui";

const WAVE = [
  8, 12, 18, 14, 22, 28, 16, 24, 32, 20, 26, 14, 30, 18, 22, 36, 24, 16, 28, 12,
  20, 34, 18, 26, 14, 22, 30, 16, 24, 10, 18, 28, 20, 12, 24, 32, 16, 22, 14, 26,
  20, 18, 30, 12, 22, 16,
];

export default function MeetingDetailView({
  meeting,
  decisions,
  tasks,
  tab,
  recording,
  promptUpload = false,
  grepQuery,
  onGrepQuery,
  onTab,
  onBack,
  onCreateTask,
  onViewTask,
  onCreateFromGrep,
  onAddDecision,
  onUploadRecording,
  onCopyLink,
}: {
  meeting: AppMeeting;
  decisions: Decision[];
  tasks: BoardTask[];
  tab: MeetingTab;
  recording: MeetingRecording | null;
  promptUpload?: boolean;
  grepQuery: string;
  onGrepQuery: (value: string) => void;
  onTab: (tab: MeetingTab) => void;
  onBack: () => void;
  onCreateTask: (decision: Decision) => void;
  onViewTask: (task: BoardTask) => void;
  onCreateFromGrep: (hit: GrepHit) => void;
  onAddDecision: () => void;
  onUploadRecording: (file: File, source: RecordingSource) => void;
  onCopyLink: () => void;
}) {
  const [playing, setPlaying] = useState(true);
  const [headerMenu, setHeaderMenu] = useState(false);
  const meetingDecisions = decisions.filter((d) => d.meetingId === meeting.id);
  const hits = useMemo(
    () => grepTranscript(meeting.messages, grepQuery),
    [meeting.messages, grepQuery],
  );

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-meeting-menu]")) setHeaderMenu(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const tabs: { id: MeetingTab; label: string; count?: number }[] = [
    { id: "notes", label: "Notes" },
    { id: "transcript", label: "Transcript" },
    { id: "decisions", label: "Decisions", count: meetingDecisions.length },
  ];

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-6 pb-10 pt-4 lg:px-8">
        <p className="mb-3 flex items-center gap-2 text-[13px] text-[#8b919c]">
          <button type="button" onClick={onBack} className="hover:text-[#111827]">
            Meetings
          </button>
          <span>›</span>
          <span className="text-[#374151]">{meeting.title}</span>
        </p>

        <div className="mb-5">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h1 className="text-[28px] font-semibold tracking-[-0.04em]">
              {meeting.title}
            </h1>
            <div className="relative flex shrink-0 items-center gap-2" data-meeting-menu>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eceef2] bg-white text-[#6b7280]"
                aria-label="More"
                aria-expanded={headerMenu}
                onClick={() => setHeaderMenu((v) => !v)}
              >
                <MoreIcon />
              </button>
              {headerMenu && (
                <div className="absolute right-12 top-11 z-30 w-52 overflow-hidden rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-[0_12px_32px_rgba(16,24,40,0.12)]">
                  <MenuItem
                    onClick={() => {
                      setHeaderMenu(false);
                      onCopyLink();
                    }}
                  >
                    Copy meeting link
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setHeaderMenu(false);
                      document
                        .getElementById("upload-recording")
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  >
                    Upload recording
                  </MenuItem>
                </div>
              )}
              <button
                type="button"
                onClick={onBack}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#fecaca] bg-white px-3.5 text-[13px] font-medium text-[#ef4444]"
              >
                <LeaveIcon />
                Leave
              </button>
            </div>
          </div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px] text-[#6b7280]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              {meeting.when}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ZoomIcon />
              {meeting.location}
            </span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {meeting.attendeeIds.slice(0, 4).map((id) => {
              const person = personById(id);
              return (
                <span key={id} className="inline-flex items-center gap-2">
                  <Avatar person={person} />
                  <span className="hidden sm:block">
                    <span className="block text-[13px] font-semibold leading-none">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-[#8b919c]">
                      {id === meeting.hostId ? "Host" : person.role}
                    </span>
                  </span>
                </span>
              );
            })}
            {meeting.attendeeIds.length > 4 && (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f4] text-[11px] font-semibold text-[#5b6573]">
                +{meeting.attendeeIds.length - 4}
              </span>
            )}
          </div>
        </div>

        <RecordingBar
          meeting={meeting}
          recording={recording}
          playing={playing}
          promptUpload={promptUpload}
          onTogglePlay={() => setPlaying((v) => !v)}
          onUpload={onUploadRecording}
        />

        <div className="mb-5 flex gap-6 border-b border-[#eceef2]">
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTab(item.id)}
                className={`-mb-px inline-flex items-center gap-2 border-b-2 pb-3 text-[14px] font-medium ${
                  active
                    ? "border-[#7c5cf6] text-[#7c5cf6]"
                    : "border-transparent text-[#8b919c] hover:text-[#374151]"
                }`}
              >
                {item.id === "notes" && <DocIcon />}
                {item.id === "transcript" && <TranscriptIcon />}
                {item.id === "decisions" && (
                  <CheckCircleIcon filled={active} />
                )}
                {item.label}
                {item.count != null && (
                  <span className="text-[#8b919c]"> {item.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {tab === "notes" && <NotesTab meeting={meeting} />}
        {tab === "transcript" && (
          <TranscriptTab
            meeting={meeting}
            decisions={meetingDecisions}
            query={grepQuery}
            hits={hits}
            onQuery={onGrepQuery}
            onCreateFromGrep={onCreateFromGrep}
          />
        )}
        {tab === "decisions" && (
          <DecisionsTab
            decisions={meetingDecisions}
            tasks={tasks}
            onCreateTask={onCreateTask}
            onViewTask={onViewTask}
            onAddDecision={onAddDecision}
          />
        )}
    </div>
  );
}

function RecordingBar({
  meeting,
  recording,
  playing,
  promptUpload,
  onTogglePlay,
  onUpload,
}: {
  meeting: AppMeeting;
  recording: MeetingRecording | null;
  playing: boolean;
  promptUpload: boolean;
  onTogglePlay: () => void;
  onUpload: (file: File, source: RecordingSource) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<RecordingSource>("zoom");
  const live = Boolean(meeting.upcoming) && !recording;
  const sourceLabel =
    recording?.source === "google-meet" ? "Google Meet" : "Zoom";

  useEffect(() => {
    if (!promptUpload) return;
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [promptUpload, meeting.id]);

  const pickFile = (source: RecordingSource) => {
    sourceRef.current = source;
    inputRef.current?.click();
  };

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    onUpload(file, sourceRef.current);
  };

  return (
    <div className="mb-5 space-y-3">
      {recording?.kind === "video" && recording.url ? (
        <video
          src={recording.url}
          controls
          className="h-48 w-full rounded-2xl bg-black object-cover"
        />
      ) : (
        <div className="flex items-center gap-3 rounded-2xl bg-[#3a3d46] px-4 py-3 text-white">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium">
            <span
              className={`h-2 w-2 rounded-full ${live ? "bg-[#f43f5e]" : "bg-[#a78bfa]"}`}
            />
            {live ? "Recording" : recording ? `${sourceLabel} recording` : "No recording yet"}
          </span>
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
            aria-label={playing ? "Pause recording" : "Play recording"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex min-w-0 flex-1 items-end gap-[3px] overflow-hidden px-2">
            {WAVE.map((h, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full bg-white/80 ${playing && (live || recording) ? "opal-wave" : "opacity-40"}`}
                style={{ height: h, animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
          {recording?.kind === "audio" && recording.url ? (
            <audio src={recording.url} controls className="h-8 max-w-[160px]" />
          ) : (
            <>
              <span className="text-[12.5px] text-white/80">
                {recording ? recording.name : "06:03"}
              </span>
              <span className="text-[12.5px] text-white/55">1x</span>
            </>
          )}
        </div>
      )}

      <div
        id="upload-recording"
        ref={cardRef}
        className={`rounded-2xl border border-dashed p-4 ${
          promptUpload && !recording
            ? "border-[#7c5cf6] bg-[#f7f4ff] ring-4 ring-[#eee8ff]"
            : "border-[#ddd6fe] bg-[#faf8ff]"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-[14px] font-semibold">
              <UploadIcon />
              {recording ? "Replace recording" : "Upload a recording"}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#8b919c]">
              Import a Zoom or Google Meet video or audio file that was already
              recorded.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => pickFile("zoom")}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#111827] hover:border-[#ddd6fe]"
          >
            <ZoomIcon />
            Upload from Zoom
          </button>
          <button
            type="button"
            onClick={() => pickFile("google-meet")}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#111827] hover:border-[#ddd6fe]"
          >
            <MeetIcon />
            Upload from Google Meet
          </button>
        </div>
        {recording && (
          <p className="mt-3 truncate text-[12.5px] text-[#6b7280]">
            Attached: {recording.name} · {sourceLabel} · {recording.kind}
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="audio/*,video/*,.mp3,.mp4,.m4a,.wav,.mov,.webm,.m4v"
          className="hidden"
          onChange={onFile}
        />
      </div>
    </div>
  );
}

export function MeetingContext({
  meeting,
  onOpenBoard,
}: {
  meeting: AppMeeting;
  onOpenBoard: () => void;
}) {
  return (
    <aside className="hidden h-full w-[320px] shrink-0 flex-col overflow-y-auto border-l border-[#eceef2] bg-white px-5 py-5 lg:flex">
      <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-semibold">Meeting context</h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#8b919c]">
              Keep track of who was here and what this meeting is linked to.
            </p>
          </div>
          <span className="text-[#c5cad3]">
            <MoreIcon />
          </span>
        </div>

        <p className="mb-3 text-[13px] font-semibold">
          Attendees ({meeting.attendeeIds.length})
        </p>
        <ul className="space-y-3">
          {meeting.attendeeIds.map((id) => {
            const person = personById(id);
            return (
              <li key={id} className="flex items-center gap-3">
                <Avatar person={person} />
                <span>
                  <span className="block text-[13.5px] font-semibold leading-none">
                    {person.name}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-[#8b919c]">
                    {id === meeting.hostId ? `Host · ${person.role}` : person.role}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="my-5 border-t border-[#f0f1f4]" />
        <p className="mb-2 text-[13px] font-semibold">Linked project</p>
        <button
          type="button"
          onClick={onOpenBoard}
          className="flex w-full items-center gap-3 rounded-2xl border border-[#eceef2] px-3 py-3 text-left hover:bg-[#f7f8fa]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef0ff] text-[#6d4aff]">
            <FolderIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13.5px] font-semibold">
              {projectById(meeting.projectId).name}
            </span>
            <span className="block text-[12px] text-[#8b919c]">
              {projectById(meeting.projectId).subtitle}
            </span>
          </span>
          <span className="text-[#c5cad3]">
            <ChevronIcon />
          </span>
        </button>

        <div className="my-5 border-t border-[#f0f1f4]" />
        <p className="mb-3 text-[13px] font-semibold">Meeting details</p>
        <ul className="space-y-2.5 text-[13px] text-[#6b7280]">
          <li className="flex items-center gap-2.5">
            <CalendarIcon />
            {meeting.id === "product-weekly"
              ? "Mon, Sep 9, 2024"
              : meeting.when.split(" · ")[0]}
          </li>
          <li className="flex items-center gap-2.5">
            <ClockIcon />
            {meeting.timeRange} ({meeting.duration})
          </li>
          <li className="flex items-center gap-2.5">
            <VideoIcon />
            {meeting.location}
          </li>
          <li className="flex items-center gap-2.5">
            <TagIcon />
            {meeting.tags.join(", ")}
          </li>
        </ul>
    </aside>
  );
}

function NotesTab({ meeting }: { meeting: AppMeeting }) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
        Notes from this meeting
      </h2>
      <p className="mt-1 text-[13.5px] text-[#8b919c]">
        Capture the conversation, then turn follow-ups into tasks.
      </p>
      <div className="mt-5 space-y-5">
        {meeting.notes.map((block) => (
          <section
            key={block.heading}
            className="rounded-2xl border border-[#eceef2] bg-white p-5"
          >
            <h3 className="text-[14px] font-semibold">{block.heading}</h3>
            <ul className="mt-3 space-y-2">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[14px] leading-relaxed text-[#374151]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cf6]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function TranscriptTab({
  meeting,
  decisions,
  query,
  hits,
  onQuery,
  onCreateFromGrep,
}: {
  meeting: AppMeeting;
  decisions: Decision[];
  query: string;
  hits: GrepHit[];
  onQuery: (value: string) => void;
  onCreateFromGrep: (hit: GrepHit) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
            Meeting transcript
          </h2>
          <p className="mt-0.5 text-[13px] text-[#8b919c]">
            Grep the conversation for owners, dates, and action items.
          </p>
        </div>
        <label className="relative w-full sm:max-w-[280px]">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98a0ab]">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Grep tasks, owners, dates…"
            className="h-10 w-full rounded-full border border-[#e6e9ef] bg-[#fbfcfd] py-2 pl-10 pr-4 text-[13px] outline-none placeholder:text-[#b0b6bf] focus:border-[#c9d4ea] focus:ring-4 focus:ring-[#eee8ff]"
          />
        </label>
      </div>

      {hits.length > 0 && (
        <div className="mb-5 rounded-2xl border border-[#ece8ff] bg-[#f7f4ff] p-4">
          <p className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6d4aff]">
            <SparkleIcon />
            {hits.length} action item{hits.length === 1 ? "" : "s"} grepped from
            this transcript
          </p>
          <ul className="space-y-2">
            {hits.map((hit) => (
              <li
                key={hit.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-semibold">
                    {hit.suggestedTitle}
                  </p>
                  <p className="truncate text-[12px] text-[#8b919c]">
                    {personById(hit.speakerId).name}
                    {hit.dueDate ? ` · ${formatDueDate(hit.dueDate)}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onCreateFromGrep(hit)}
                  className="inline-flex h-8 items-center rounded-lg bg-[#111827] px-3 text-[12px] font-medium text-white"
                >
                  Create task
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-[22px] border border-[#eceef2] bg-white px-5">
        {meeting.messages.map((message) => (
          <TranscriptMessage
            key={message.id}
            message={message}
            decisions={decisions}
            query={query}
          />
        ))}
      </div>
    </div>
  );
}

function TranscriptMessage({
  message,
  decisions,
  query,
}: {
  message: Message;
  decisions: Decision[];
  query: string;
}) {
  const speaker = personById(message.speakerId);
  const linked = decisions.find((d) => d.sourceMessageId === message.id);
  return (
    <article className="border-t border-[#f0f1f4] py-4 first:border-t-0">
      <div className="flex items-start gap-3">
        <Avatar person={speaker} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[13.5px] font-semibold">{speaker.name}</span>
            <span className="text-[12px] text-[#9aa1ab]">{message.time}</span>
            {linked && (
              <span className="rounded-full bg-[#eee8ff] px-2 py-0.5 text-[11px] font-medium text-[#6d4aff]">
                Decision
              </span>
            )}
          </div>
          <p className="mt-1 text-[14px] leading-[1.55] text-[#374151]">
            {message.segments.map((segment, i) =>
              segment.type === "quote" ? (
                <mark
                  key={i}
                  className="rounded-[4px] bg-[#fde68a] px-[3px] py-[1px] text-inherit"
                >
                  {highlightQuery(segment.text, query)}
                </mark>
              ) : (
                <span key={i}>{highlightQuery(segment.text, query)}</span>
              ),
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

function DecisionsTab({
  decisions,
  tasks,
  onCreateTask,
  onViewTask,
  onAddDecision,
}: {
  decisions: Decision[];
  tasks: BoardTask[];
  onCreateTask: (decision: Decision) => void;
  onViewTask: (task: BoardTask) => void;
  onAddDecision: () => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
            Decisions from this meeting
          </h2>
          <p className="mt-0.5 text-[13.5px] text-[#8b919c]">
            Review, confirm, and turn decisions into work.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddDecision}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#374151]"
        >
          <PlusIcon />
          Add decision
        </button>
      </div>
      <ul className="space-y-3">
        {decisions.map((decision) => {
          const owner = personById(decision.ownerId);
          const linkedTask = tasks.find((t) => t.decisionId === decision.id);
          return (
            <li
              key={decision.id}
              className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-[#eceef2] bg-white px-4 py-4"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 text-[#7c5cf6]">
                  <CheckCircleIcon filled={decision.status === "confirmed"} />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold">{decision.title}</p>
                  <p className="mt-1 max-w-[52ch] text-[13.5px] leading-relaxed text-[#6b7280]">
                    {decision.summary}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[12.5px] text-[#6b7280]">
                    <span className="inline-flex items-center gap-1.5">
                      <Avatar person={owner} size="xs" />
                      {owner.name}
                    </span>
                    {decision.dueDate && (
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarIcon />
                        {formatDueDate(decision.dueDate, true)}
                      </span>
                    )}
                    <StatusPill status={decision.status} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    linkedTask ? onViewTask(linkedTask) : onCreateTask(decision)
                  }
                  className={`inline-flex h-9 items-center rounded-xl px-3.5 text-[13px] font-medium ${
                    decision.status === "confirmed"
                      ? "bg-[#111827] text-white hover:bg-black"
                      : "border border-[#eceef2] text-[#374151] hover:bg-[#f7f8fa]"
                  }`}
                >
                  Create task
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-[#c5cad3]"
                  aria-label="More"
                >
                  <MoreIcon />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function highlightQuery(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <span key={i} className="rounded-[3px] bg-[#dbeafe] text-[#1e3a8a]">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
