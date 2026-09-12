"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  columnLabel,
  currentUser,
  formatDueDate,
  grepTranscript,
  meetingParticipantIds,
  people,
  personById,
  projectById,
  statusLabel,
  type AppMeeting,
  type BoardTask,
  type Decision,
  type DecisionStatus,
  type GrepHit,
  type MeetingFile,
  type MeetingRecording,
  type MeetingTab,
  type Message,
  type RecordingSource,
} from "@/data/meeting-extractor";
import {
  Avatar,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronIcon,
  ClockIcon,
  DocIcon,
  FileRow,
  FileUploadButton,
  FilesIcon,
  FolderIcon,
  LeaveIcon,
  LinkIcon,
  MeetIcon,
  MeetingCallLink,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ParticipantsOverflow,
  PriorityPill,
  SearchIcon,
  SparkleIcon,
  StatusPill,
  TagIcon,
  TasksIcon,
  TrashIcon,
  TranscriptIcon,
  UploadIcon,
  ZoomIcon,
  cardInteractive,
  cardRadius,
  typeScale,
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
  onUpdateDecisionStatus,
  onAddNote,
  onRemoveNote,
  onUploadRecording,
  onUploadFile,
  files,
  onCopyLink,
}: {
  meeting: AppMeeting;
  decisions: Decision[];
  tasks: BoardTask[];
  tab: MeetingTab;
  recording: MeetingRecording | null;
  promptUpload?: boolean;
  grepQuery: string;
  files: MeetingFile[];
  onGrepQuery: (value: string) => void;
  onTab: (tab: MeetingTab) => void;
  onBack: () => void;
  onCreateTask: (decision: Decision) => void;
  onViewTask: (task: BoardTask) => void;
  onCreateFromGrep: (hit: GrepHit) => void;
  onAddDecision: (input: {
    title: string;
    summary: string;
    ownerId: string;
    dueDate: string | null;
    status: DecisionStatus;
  }) => void;
  onUpdateDecisionStatus: (id: string, status: DecisionStatus) => void;
  onAddNote: (heading: string, text: string) => void;
  onRemoveNote: (noteId: string) => void;
  onUploadRecording: (file: File, source: RecordingSource) => void;
  onUploadFile: (file: File) => void;
  onCopyLink: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const meetingDecisions = decisions.filter((d) => d.meetingId === meeting.id);
  const meetingTasks = tasks.filter((task) => task.meetingId === meeting.id);
  const hits = useMemo(
    () => grepTranscript(meeting.messages, grepQuery),
    [meeting.messages, grepQuery],
  );

  useEffect(() => {
    setPlaying(false);
  }, [meeting.id]);

  const tabs: { id: MeetingTab; label: string; count?: number }[] = [
    { id: "notes", label: "Notes" },
    { id: "transcript", label: "Transcript" },
    { id: "decisions", label: "Decisions", count: meetingDecisions.length },
    { id: "tasks", label: "Tasks", count: meetingTasks.length },
    { id: "files", label: "Files", count: files.length },
  ];

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <p className="mb-5 flex items-center gap-2 text-[13px] text-[#8b919c]">
          <button type="button" onClick={onBack} className="hover:text-[#111827]">
            Meetings
          </button>
          <span>›</span>
          <span className="min-w-0 truncate text-[#374151]">{meeting.title}</span>
        </p>

        <div className="mb-8 flex w-full min-w-0 flex-col">
          <h1 className={`${typeScale.pageTitle} w-full min-w-0 break-words`}>
            {meeting.title}
          </h1>
          <div className="mt-3 flex w-full flex-wrap items-center gap-2">
            <MeetingCallLink meeting={meeting} variant="button" />
            <button
              type="button"
              onClick={onCopyLink}
              className={`inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#374151] sm:h-10 sm:px-3.5 ${cardInteractive}`}
            >
              <LinkIcon />
              <span className="hidden sm:inline">Copy meeting link</span>
              <span className="sm:hidden">Copy</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#fecaca] bg-white px-3 text-[13px] font-medium text-[#ef4444] sm:h-10 sm:px-3.5"
            >
              <LeaveIcon />
              Leave
            </button>
          </div>
          <p className="mt-3 flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#6b7280]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              {meeting.when}
            </span>
          </p>
          <div className="mt-2">
            <MeetingCallLink meeting={meeting} />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {meetingParticipantIds(meeting)
              .slice(0, 4)
              .map((id) => {
              const person = personById(id);
              return (
                <span key={id} className="inline-flex min-w-0 items-center gap-2">
                  <Avatar person={person} />
                  <span className="hidden min-w-0 sm:block">
                    <span className={`block min-w-0 break-words leading-snug ${typeScale.card}`}>
                      {person.name}
                    </span>
                    <span className="mt-0.5 block min-w-0 break-words text-[11.5px] text-[#8b919c]">
                      {id === meeting.hostId ? "Host" : person.role}
                    </span>
                  </span>
                </span>
              );
            })}
            <ParticipantsOverflow meeting={meeting} shown={4} />
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

        <div className="mb-7 flex gap-5 overflow-x-auto border-b border-[#eceef2] sm:gap-6">
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTab(item.id)}
                className={`-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 pb-3 text-[14px] font-medium ${
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
                {item.id === "tasks" && <TasksIcon />}
                {item.id === "files" && <FilesIcon />}
                {item.label}
                {item.count != null && (
                  <span className="text-[#8b919c]"> {item.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {tab === "notes" && (
          <NotesTab
            meeting={meeting}
            onAddNote={onAddNote}
            onRemoveNote={onRemoveNote}
          />
        )}
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
            meeting={meeting}
            decisions={meetingDecisions}
            tasks={tasks}
            onCreateTask={onCreateTask}
            onViewTask={onViewTask}
            onAddDecision={onAddDecision}
            onUpdateDecisionStatus={onUpdateDecisionStatus}
          />
        )}
        {tab === "tasks" && (
          <MeetingTasksTab tasks={meetingTasks} onViewTask={onViewTask} />
        )}
        {tab === "files" && (
          <MeetingFilesTab
            meeting={meeting}
            files={files}
            tasks={meetingTasks}
            onUploadFile={onUploadFile}
            onViewTask={onViewTask}
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
  const live = false;
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
    <div className="mb-6 space-y-3">
      {recording?.kind === "video" && recording.url ? (
        <video
          src={recording.url}
          controls
          autoPlay={false}
          preload="none"
          className="h-48 w-full rounded-2xl bg-black object-cover"
        />
      ) : (
        <div className="flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-[#3a3d46] px-4 py-3 text-white">
          <span className="inline-flex shrink-0 items-center gap-2 text-[13px] font-medium">
            <span
              className={`h-2 w-2 rounded-full ${live ? "bg-[#f43f5e]" : "bg-[#a78bfa]"}`}
            />
            {live ? "Recording" : recording ? `${sourceLabel} recording` : "No recording yet"}
          </span>
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10"
            aria-label={playing ? "Pause recording" : "Play recording"}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex h-9 min-w-0 flex-1 items-end gap-[2px]">
            {WAVE.map((h, i) => (
              <span
                key={i}
                className={`min-w-0 flex-1 rounded-full bg-white/80 ${playing && (live || recording) ? "opal-wave" : "opacity-40"}`}
                style={{ height: h, animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
          {recording?.kind === "audio" && recording.url ? (
            <audio
              src={recording.url}
              controls
              preload="none"
              className="h-8 max-w-[160px] shrink-0"
            />
          ) : (
            <span className="inline-flex shrink-0 items-center gap-3 text-[12.5px]">
              <span className="text-white/80">
                {recording?.duration ?? (live ? "00:00" : "—")}
              </span>
              <span className="text-white/55">1x</span>
            </span>
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
            <p className={`inline-flex min-w-0 items-center gap-1.5 ${typeScale.card}`}>
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
            className={`inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#111827] ${cardInteractive}`}
          >
            <ZoomIcon />
            Upload from Zoom
          </button>
          <button
            type="button"
            onClick={() => pickFile("google-meet")}
            className={`inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#111827] ${cardInteractive}`}
          >
            <MeetIcon />
            Upload from Google Meet
          </button>
        </div>
          {recording && (
          <p className="mt-3 min-w-0 break-words text-[12.5px] text-[#6b7280]">
            Attached: {recording.name} · {sourceLabel} · {recording.kind}
            {recording.duration ? ` · ${recording.duration}` : ""}
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
  tasks,
  files,
  onOpenBoard,
  onViewTask,
  onUploadFile,
}: {
  meeting: AppMeeting;
  tasks: BoardTask[];
  files: MeetingFile[];
  onOpenBoard: () => void;
  onViewTask: (task: BoardTask) => void;
  onUploadFile: (file: File) => void;
}) {
  const meetingTasks = tasks.filter((task) => task.meetingId === meeting.id);
  return (
    <aside className="hidden h-full w-[320px] shrink-0 flex-col overflow-y-auto border-l border-[#eceef2] bg-white px-5 py-5 lg:flex">
      <div className="mb-6">
          <div>
        <h2 className={`${typeScale.section} break-words`}>Meeting context</h2>
            <p className={`mt-3 ${typeScale.subtitle}`}>
              Keep track of who was here and what this meeting is linked to.
            </p>
          </div>
        </div>

        <p className={`mb-3 ${typeScale.card}`}>
          Attendees ({meetingParticipantIds(meeting).length})
        </p>
        <ul className="space-y-3">
          {meetingParticipantIds(meeting).map((id) => {
            const person = personById(id);
            return (
              <li key={id} className="flex items-center gap-3">
                <Avatar person={person} />
                <span className="min-w-0">
                  <span className={`block min-w-0 break-words leading-snug ${typeScale.card}`}>
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
        <p className={`mb-2 ${typeScale.card}`}>Linked project</p>
        <button
          type="button"
          onClick={onOpenBoard}
          className={`flex w-full min-w-0 items-center gap-3 ${cardRadius} border border-[#eceef2] px-3.5 py-3 text-left ${cardInteractive}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef0ff] text-[#6d4aff]">
            <FolderIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block min-w-0 break-words ${typeScale.card}`}>
              {projectById(meeting.projectId).name}
            </span>
            <span className="mt-0.5 block min-w-0 break-words text-[12px] text-[#8b919c]">
              {projectById(meeting.projectId).subtitle}
            </span>
          </span>
          <span className="text-[#c5cad3]">
            <ChevronIcon />
          </span>
        </button>

        <div className="my-5 border-t border-[#f0f1f4]" />
        <p className={`mb-2 ${typeScale.card}`}>
          Tasks from this meeting ({meetingTasks.length})
        </p>
        {meetingTasks.length === 0 ? (
          <p className="text-[13px] leading-relaxed text-[#8b919c]">
            Tasks created from decisions will show up here.
          </p>
        ) : (
          <ul className="space-y-2">
            {meetingTasks.map((task) => (
              <li key={task.id}>
                <MeetingTaskCard
                  task={task}
                  compact
                  onOpen={() => onViewTask(task)}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="my-5 border-t border-[#f0f1f4]" />
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className={typeScale.card}>
            Files ({files.length})
          </p>
          <FileUploadButton
            onUpload={onUploadFile}
            label="Upload"
            variant="ghost"
          />
        </div>
        {files.length === 0 ? (
          <p className="text-[13px] leading-relaxed text-[#8b919c]">
            Upload a file to attach it to this meeting and every task created from it.
          </p>
        ) : (
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.id}>
                <FileRow file={file} />
              </li>
            ))}
          </ul>
        )}

        <div className="my-5 border-t border-[#f0f1f4]" />
        <p className={`mb-3 ${typeScale.card}`}>Meeting details</p>
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
          <li className="flex min-w-0 items-center gap-2.5">
            <MeetingCallLink meeting={meeting} />
          </li>
          <li className="flex min-w-0 items-start gap-2.5">
            <span className="mt-0.5 shrink-0">
              <TagIcon />
            </span>
            <span className="min-w-0 break-words">{meeting.tags.join(", ")}</span>
          </li>
        </ul>
    </aside>
  );
}

function NotesTab({
  meeting,
  onAddNote,
  onRemoveNote,
}: {
  meeting: AppMeeting;
  onAddNote: (heading: string, text: string) => void;
  onRemoveNote: (noteId: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [heading, setHeading] = useState("Your notes");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sections = useMemo(() => {
    const names = meeting.notes.map((block) => block.heading);
    if (!names.includes("Your notes")) names.push("Your notes");
    return names;
  }, [meeting.notes]);

  useEffect(() => {
    if (!sections.includes(heading)) setHeading(sections[0] ?? "Your notes");
  }, [heading, sections]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onAddNote(heading, text);
    setDraft("");
    inputRef.current?.focus();
  };

  return (
    <div>
      <h2 className={`${typeScale.section} break-words`}>
        Notes from this meeting
      </h2>
      <p className={`mt-3 ${typeScale.subtitle}`}>
        Capture the conversation, then turn follow-ups into tasks.
      </p>

      <form
        className="mt-6 rounded-2xl border border-[#eceef2] bg-white p-4"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label className="block">
          <span className={`mb-2 block ${typeScale.card}`}>
            Add a note
          </span>
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault();
                submit();
              }
            }}
            rows={3}
            placeholder="Write what you want to remember from this meeting…"
            className="w-full resize-none rounded-xl border border-[#eceef2] px-3.5 py-2.5 text-sm leading-6 text-[#111827] outline-none placeholder:text-[#b0b6bf] focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <label className="inline-flex min-w-[180px] items-center gap-2 text-[11px] font-medium text-[#8b919c]">
            <span className="shrink-0">Section</span>
            <span className="relative flex-1">
              <select
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="h-9 w-full appearance-none rounded-xl border border-[#eceef2] bg-white py-0 pl-3.5 pr-10 text-[13px] font-medium text-[#111827] outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
              >
                {sections.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b919c]">
                <ChevronDownIcon />
              </span>
            </span>
          </label>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#111827] px-3.5 text-[13px] font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PlusIcon />
            Add note
          </button>
        </div>
        <p className="mt-2 text-[12px] text-[#8b919c]">⌘ Enter to add</p>
      </form>

      <div className="mt-6 space-y-5">
        {meeting.notes.map((block) => (
          <section
            key={block.heading}
            className="rounded-2xl border border-[#eceef2] bg-white p-5"
          >
            <h3 className={`min-w-0 break-words ${typeScale.card}`}>
              {block.heading}
            </h3>
            <ul className="mt-3 space-y-2">
              {block.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2 text-sm leading-6 text-[#374151]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c5cf6]" />
                  <span className="min-w-0 flex-1 break-words">{item.text}</span>
                  {item.added && (
                    <button
                      type="button"
                      onClick={() => onRemoveNote(item.id)}
                      className="mt-0.5 shrink-0 rounded-lg p-1 text-[#8b919c] hover:bg-[#f7f8fa] hover:text-[#111827]"
                      aria-label="Remove note"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function MeetingFilesTab({
  meeting,
  files,
  tasks,
  onUploadFile,
  onViewTask,
}: {
  meeting: AppMeeting;
  files: MeetingFile[];
  tasks: BoardTask[];
  onUploadFile: (file: File) => void;
  onViewTask: (task: BoardTask) => void;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`${typeScale.section} break-words`}>
            Files from this meeting
          </h2>
          <p className={`mt-3 min-w-0 break-words ${typeScale.subtitle}`}>
            Upload decks, docs, or images. Anything you add here is available on
            tasks created from {meeting.title}.
          </p>
        </div>
        <FileUploadButton onUpload={onUploadFile} />
      </div>
      {files.length === 0 ? (
        <p className="rounded-2xl border border-[#eceef2] bg-white px-4 py-8 text-center text-[13.5px] text-[#8b919c]">
          No files yet. Upload a file to attach it to this meeting and its tasks.
        </p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id}>
              <FileRow file={file} />
            </li>
          ))}
        </ul>
      )}
      {tasks.length > 0 && (
        <section className="mt-8">
          <h3 className={typeScale.card}>
            Available on these tasks
          </h3>
          <p className="mt-2 text-[13px] leading-5 text-[#8b919c]">
            Open a task to download the same files.
          </p>
          <ul className="mt-4 space-y-2">
            {tasks.map((task) => (
              <li key={task.id}>
                <MeetingTaskCard task={task} onOpen={() => onViewTask(task)} />
              </li>
            ))}
          </ul>
        </section>
      )}
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
      <div className="mb-6">
        <h2 className={`${typeScale.section} w-full min-w-0 break-words`}>
          Meeting transcript
        </h2>
        <label className="relative mt-4 block w-full">
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
          <p className="mb-3 flex min-w-0 flex-wrap items-center gap-1.5 break-words text-[13px] font-semibold text-[#6d4aff]">
            <SparkleIcon />
            {hits.length} action item{hits.length === 1 ? "" : "s"} grepped from
            this transcript
          </p>
          <ul className="space-y-2">
            {hits.map((hit) => (
              <li
                key={hit.id}
            className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className={`min-w-0 break-words ${typeScale.card}`}>
                    {hit.suggestedTitle}
                  </p>
                  <p className="mt-0.5 min-w-0 break-words text-[12px] text-[#8b919c]">
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
            <span className={`min-w-0 break-words ${typeScale.card}`}>{speaker.name}</span>
            <span className="text-[12px] text-[#9aa1ab]">{message.time}</span>
            {linked && (
              <span className="rounded-full bg-[#eee8ff] px-2 py-0.5 text-[11px] font-medium text-[#6d4aff]">
                Decision
              </span>
            )}
          </div>
          <p className="mt-1 min-w-0 break-words text-[14px] leading-[1.55] text-[#374151]">
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

function emptyDecisionDraft(meeting: AppMeeting): {
  title: string;
  summary: string;
  ownerId: string;
  dueDate: string;
  status: DecisionStatus;
} {
  const attendees = meetingParticipantIds(meeting);
  const ownerId = attendees.includes(currentUser.id)
    ? currentUser.id
    : (attendees[0] ?? currentUser.id);
  return {
    title: "",
    summary: "",
    ownerId,
    dueDate: "",
    status: "open",
  };
}

function DecisionsTab({
  meeting,
  decisions,
  tasks,
  onCreateTask,
  onViewTask,
  onAddDecision,
  onUpdateDecisionStatus,
}: {
  meeting: AppMeeting;
  decisions: Decision[];
  tasks: BoardTask[];
  onCreateTask: (decision: Decision) => void;
  onViewTask: (task: BoardTask) => void;
  onAddDecision: (input: {
    title: string;
    summary: string;
    ownerId: string;
    dueDate: string | null;
    status: DecisionStatus;
  }) => void;
  onUpdateDecisionStatus: (id: string, status: DecisionStatus) => void;
}) {
  const [drafting, setDrafting] = useState(false);
  const [draft, setDraft] = useState(() => emptyDecisionDraft(meeting));
  const [statusMenuId, setStatusMenuId] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const owners = people.filter((person) =>
    meetingParticipantIds(meeting).includes(person.id),
  );
  if (owners.length === 0) owners.push(currentUser);
  const statuses: DecisionStatus[] = ["open", "needs-review", "confirmed"];

  useEffect(() => {
    setDrafting(false);
    setDraft(emptyDecisionDraft(meeting));
  }, [meeting.id]);

  useEffect(() => {
    if (drafting) titleRef.current?.focus();
  }, [drafting]);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-decision-status]")) setStatusMenuId(null);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const closeDraft = () => {
    setDrafting(false);
    setDraft(emptyDecisionDraft(meeting));
  };

  const saveDraft = () => {
    const title = draft.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }
    onAddDecision({
      title,
      summary: draft.summary.trim(),
      ownerId: draft.ownerId,
      dueDate: draft.dueDate || null,
      status: draft.status,
    });
    closeDraft();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`${typeScale.section} break-words`}>
            Decisions from this meeting
          </h2>
          <p className={`mt-3 ${typeScale.subtitle}`}>
            Review, confirm, and turn decisions into work.
          </p>
        </div>
        {!drafting && (
          <button
            type="button"
            onClick={() => setDrafting(true)}
            className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#374151] ${cardInteractive}`}
          >
            <PlusIcon />
            Add decision
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {drafting && (
          <li className="rounded-2xl border border-dashed border-[#d7dbe3] bg-[#fbfbfd] p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveDraft();
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-[22px] items-center rounded-full bg-[#eef0f3] px-2.5 text-[11.5px] font-medium text-[#5b6573]">
                  Draft
                </span>
                <button
                  type="button"
                  onClick={closeDraft}
                  className="text-[13px] font-medium text-[#8b919c] hover:text-[#111827]"
                >
                  Cancel
                </button>
              </div>
              <input
                ref={titleRef}
                value={draft.title}
                onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Decision title"
                className={`mt-3 w-full bg-transparent outline-none placeholder:text-[#c5cad3] ${typeScale.card}`}
              />
              <textarea
                value={draft.summary}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, summary: e.target.value }))
                }
                rows={2}
                placeholder="Add a short summary…"
                className="mt-2 w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-[#6b7280] outline-none placeholder:text-[#c5cad3]"
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <label className="relative inline-flex min-w-[148px] items-center">
                  <span className="sr-only">Owner</span>
                  <select
                    value={draft.ownerId}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, ownerId: e.target.value }))
                    }
                    className="h-9 w-full appearance-none rounded-xl border border-[#eceef2] bg-white py-0 pl-3 pr-9 text-[13px] font-medium text-[#111827] outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
                  >
                    {owners.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8b919c]">
                    <ChevronDownIcon />
                  </span>
                </label>
                <label className="relative inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#eceef2] bg-white px-3 text-[13px] font-medium text-[#374151]">
                  <CalendarIcon />
                  <span className={draft.dueDate ? "text-[#111827]" : "text-[#8b919c]"}>
                    {draft.dueDate ? formatDueDate(draft.dueDate, true) : "Due date"}
                  </span>
                  <input
                    type="date"
                    value={draft.dueDate}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, dueDate: e.target.value }))
                    }
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Due date"
                  />
                </label>
                <label className="relative inline-flex min-w-[132px] items-center">
                  <span className="sr-only">Status</span>
                  <select
                    value={draft.status}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        status: e.target.value as DecisionStatus,
                      }))
                    }
                    className="h-9 w-full appearance-none rounded-xl border border-[#eceef2] bg-white py-0 pl-3 pr-9 text-[13px] font-medium text-[#111827] outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabel(status)}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8b919c]">
                    <ChevronDownIcon />
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!draft.title.trim()}
                  className="ml-auto inline-flex h-9 items-center rounded-xl bg-[#111827] px-3.5 text-[13px] font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add decision
                </button>
              </div>
            </form>
          </li>
        )}
        {decisions.map((decision) => {
          const owner = personById(decision.ownerId);
          const linkedTask = tasks.find((t) => t.decisionId === decision.id);
          return (
            <li
              key={decision.id}
              className="relative rounded-2xl border border-[#eceef2] bg-white p-5"
            >
              {!linkedTask && (
                <button
                  type="button"
                  onClick={() => onCreateTask(decision)}
                  className="absolute right-4 top-4 z-10 inline-flex h-9 shrink-0 items-center rounded-xl bg-[#111827] px-3.5 text-[13px] font-medium text-white hover:bg-black"
                >
                  Create task
                </button>
              )}
              <div className={`flex min-w-0 items-start gap-3 ${linkedTask ? "" : "pr-[7.75rem]"}`}>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateDecisionStatus(
                      decision.id,
                      decision.status === "confirmed" ? "needs-review" : "confirmed",
                    )
                  }
                  className="mt-0.5 text-[#7c5cf6] hover:opacity-80"
                  aria-pressed={decision.status === "confirmed"}
                  aria-label={
                    decision.status === "confirmed"
                      ? "Send back to review"
                      : "Confirm decision"
                  }
                >
                  <CheckCircleIcon filled={decision.status === "confirmed"} />
                </button>
                <div className="min-w-0">
                  <p className={`min-w-0 break-words ${typeScale.card}`}>{decision.title}</p>
                  <p className="mt-1 min-w-0 break-words text-[13.5px] leading-relaxed text-[#6b7280]">
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
                    <div className="relative" data-decision-status>
                      <button
                        type="button"
                        onClick={() =>
                          setStatusMenuId((id) =>
                            id === decision.id ? null : decision.id,
                          )
                        }
                        className="rounded-full hover:opacity-80"
                        aria-expanded={statusMenuId === decision.id}
                        aria-haspopup="listbox"
                        aria-label="Change decision status"
                      >
                        <StatusPill status={decision.status} />
                      </button>
                      {statusMenuId === decision.id && (
                        <div className="absolute left-0 z-20 mt-1 w-40 overflow-hidden rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-lg">
                          {statuses.map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => {
                                onUpdateDecisionStatus(decision.id, status);
                                setStatusMenuId(null);
                              }}
                              className={`block w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa] ${
                                decision.status === status
                                  ? "font-medium text-[#111827]"
                                  : "text-[#374151]"
                              }`}
                            >
                              {statusLabel(status)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {linkedTask && (
                <div className="mt-3">
                  <MeetingTaskCard
                    task={linkedTask}
                    onOpen={() => onViewTask(linkedTask)}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MeetingTasksTab({
  tasks,
  onViewTask,
}: {
  tasks: BoardTask[];
  onViewTask: (task: BoardTask) => void;
}) {
  return (
    <div>
      <h2 className={`${typeScale.section} break-words`}>
        Tasks from this meeting
      </h2>
      <p className={`mt-3 ${typeScale.subtitle}`}>
        Work created from decisions and the transcript. Open a card to jump to the board.
      </p>
      {tasks.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-[#eceef2] bg-white px-4 py-8 text-center text-[13.5px] text-[#8b919c]">
          No tasks yet. Turn a decision into a task to add it here.
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <MeetingTaskCard task={task} onOpen={() => onViewTask(task)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MeetingTaskCard({
  task,
  compact = false,
  onOpen,
}: {
  task: BoardTask;
  compact?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex w-full items-start gap-3 ${cardRadius} border border-[#eceef2] bg-[#fbfcfd] text-left ${cardInteractive} ${
        compact ? "px-3 py-2.5" : "px-3.5 py-3"
      }`}
    >
      <span className="mt-0.5 shrink-0">
        <PriorityPill priority={task.priority} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block min-w-0 break-words ${typeScale.card}`}>
          {task.title}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#8b919c]">
          <span>{columnLabel(task.status)}</span>
          <span>·</span>
          <span>{formatDueDate(task.dueDate)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Avatar person={personById(task.assigneeIds[0])} size="xs" />
            {personById(task.assigneeIds[0]).name.split(" ")[0]}
          </span>
        </span>
      </span>
      <span className="mt-1 shrink-0 text-[#c5cad3]">
        <ChevronIcon />
      </span>
    </button>
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
