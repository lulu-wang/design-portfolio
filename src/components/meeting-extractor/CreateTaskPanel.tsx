"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  columnLabel,
  formatDueDate,
  meetingById,
  people,
  personById,
  projects,
  type AppMeeting,
  type BoardColumn,
  type Decision,
  type MeetingFile,
  type TaskDraft,
  type TaskPriority,
} from "@/data/meeting-extractor";
import {
  Avatar,
  CalendarIcon,
  ChevronDownIcon,
  CloseIcon,
  FolderIcon,
  FileRow,
  FileUploadButton,
  PriorityPill,
  TrashIcon,
} from "./ui";

export default function CreateTaskPanel({
  mode = "create",
  decision,
  draft,
  meetings,
  files = [],
  onChange,
  onClose,
  onSubmit,
  onDelete,
  onUploadFile,
}: {
  mode?: "create" | "edit";
  decision: Decision | null;
  draft: TaskDraft;
  meetings: AppMeeting[];
  files?: MeetingFile[];
  overlay?: boolean;
  onChange: (patch: Partial<TaskDraft>) => void;
  onClose: () => void;
  onSubmit: () => void;
  onDelete?: () => void;
  onUploadFile?: (file: File) => void;
}) {
  const [openField, setOpenField] = useState<
    null | "assignee" | "status" | "priority" | "project" | "meeting" | "decision"
  >(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) return;
      const target = event.target as HTMLElement;
      if (!target.closest("[data-menu]")) setOpenField(null);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const assignee = personById(draft.assigneeId);
  const project =
    projects.find((p) => p.id === draft.projectId) ?? projects[0];
  const meeting = meetingById(draft.meetingId, meetings);
  const statuses: BoardColumn[] = ["todo", "in-progress", "done"];
  const priorities: TaskPriority[] = ["high", "medium", "low"];
  const relatedFiles = files.filter((file) => file.meetingId === draft.meetingId);

  return (
    <aside
      ref={panelRef}
      className="absolute inset-y-0 right-0 z-40 flex h-full w-[min(100%,320px)] flex-col overflow-hidden border-l border-[#eceef2] bg-white shadow-[-16px_0_40px_rgba(15,23,42,0.18)]"
    >
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-10">
          <div className="flex items-start gap-3">
            <input
              value={draft.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Task title"
              className="min-w-0 flex-1 overflow-hidden bg-transparent text-[18px] font-semibold leading-snug tracking-[-0.02em] outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f7f8fa]"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b7280]">
            {draft.description || "Add a description for this task."}
          </p>

          <div className="mt-5 divide-y divide-[#f0f1f4] border-y border-[#f0f1f4]">
            <FieldRow label="Assignee">
              <div className="relative" data-menu>
                <button
                  type="button"
                  onClick={() =>
                    setOpenField((v) => (v === "assignee" ? null : "assignee"))
                  }
                  className="flex w-full items-center justify-end gap-2"
                >
                  <Avatar person={assignee} size="xs" />
                  <span className="min-w-0 truncate text-[13.5px] font-medium">
                    {assignee.name}
                  </span>
                  <ChevronDownIcon />
                </button>
                {openField === "assignee" && (
                  <Dropdown>
                    {people.map((person) => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => {
                          onChange({ assigneeId: person.id });
                          setOpenField(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[#f7f8fa]"
                      >
                        <Avatar person={person} size="xs" />
                        <span className="text-[13px]">{person.name}</span>
                      </button>
                    ))}
                  </Dropdown>
                )}
              </div>
            </FieldRow>

            <FieldRow label="Due date">
              <label className="relative flex cursor-pointer items-center justify-end gap-2">
                <CalendarIcon />
                <span className="text-[13.5px] font-medium">
                  {formatDueDate(draft.dueDate)}
                </span>
                <ChevronDownIcon />
                <input
                  type="date"
                  value={draft.dueDate}
                  onChange={(e) => {
                    if (e.target.value) onChange({ dueDate: e.target.value });
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  aria-label="Due date"
                />
              </label>
            </FieldRow>

            <FieldRow label="Priority">
              <div className="relative" data-menu>
                <button
                  type="button"
                  onClick={() =>
                    setOpenField((v) => (v === "priority" ? null : "priority"))
                  }
                  className="flex w-full items-center justify-end gap-2"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      draft.priority === "high"
                        ? "bg-[#e11d48]"
                        : draft.priority === "medium"
                          ? "bg-[#f59e0b]"
                          : "bg-[#22c55e]"
                    }`}
                  />
                  <span className="text-[13.5px] font-medium capitalize">
                    {draft.priority}
                  </span>
                  <ChevronDownIcon />
                </button>
                {openField === "priority" && (
                  <Dropdown>
                    {priorities.map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => {
                          onChange({ priority });
                          setOpenField(null);
                        }}
                        className="flex w-full items-center px-3 py-2 hover:bg-[#f7f8fa]"
                      >
                        <PriorityPill priority={priority} />
                      </button>
                    ))}
                  </Dropdown>
                )}
              </div>
            </FieldRow>

            <FieldRow label="Status">
              <div className="relative" data-menu>
                <button
                  type="button"
                  onClick={() =>
                    setOpenField((v) => (v === "status" ? null : "status"))
                  }
                  className="flex w-full items-center justify-end gap-2"
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-[#d1d5db]" />
                  <span className="text-[13.5px] font-medium">
                    {columnLabel(draft.status)}
                  </span>
                  <ChevronDownIcon />
                </button>
                {openField === "status" && (
                  <Dropdown>
                    {statuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          onChange({ status });
                          setOpenField(null);
                        }}
                        className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa]"
                      >
                        {columnLabel(status)}
                      </button>
                    ))}
                  </Dropdown>
                )}
              </div>
            </FieldRow>

            <FieldRow label="Project">
              <div className="relative" data-menu>
                <button
                  type="button"
                  onClick={() =>
                    setOpenField((v) => (v === "project" ? null : "project"))
                  }
                  className="flex w-full items-center justify-end gap-2"
                >
                  <FolderIcon />
                  <span className="text-[13.5px] font-medium">
                    {project.name}
                  </span>
                  <ChevronDownIcon />
                </button>
                {openField === "project" && (
                  <Dropdown>
                    {projects.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onChange({ projectId: item.id });
                          setOpenField(null);
                        }}
                        className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa]"
                      >
                        {item.name}
                      </button>
                    ))}
                  </Dropdown>
                )}
              </div>
            </FieldRow>

            {decision || draft.decisionId ? (
              <FieldRow label="Linked decision">
                <span className="block truncate text-right text-[13.5px] font-medium">
                  {decision?.title ?? "None"}
                </span>
              </FieldRow>
            ) : (
              <FieldRow label="Linked meeting">
                <div className="relative" data-menu>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenField((v) => (v === "meeting" ? null : "meeting"))
                    }
                    className="flex w-full items-center justify-end gap-2"
                  >
                    <CalendarIcon />
                    <span className="text-[13.5px] font-medium">
                      {draft.meetingId ? meeting.title : "None"}
                    </span>
                    <ChevronDownIcon />
                  </button>
                  {openField === "meeting" && (
                    <Dropdown>
                      <button
                        type="button"
                        onClick={() => {
                          onChange({ meetingId: "" });
                          setOpenField(null);
                        }}
                        className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa]"
                      >
                        None
                      </button>
                      {meetings.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onChange({
                              meetingId: item.id,
                              projectId: item.projectId,
                            });
                            setOpenField(null);
                          }}
                          className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#f7f8fa]"
                        >
                          {item.title}
                        </button>
                      ))}
                    </Dropdown>
                  )}
                </div>
              </FieldRow>
            )}
          </div>

          <label className="mt-5 block">
            <p className="mb-2 text-[11px] font-medium text-[#8b919c]">
              Description
            </p>
            <textarea
              value={draft.description}
              onChange={(e) => onChange({ description: e.target.value })}
              rows={4}
              className="w-full resize-none rounded-xl border border-[#eceef2] px-3 py-2.5 text-[13.5px] leading-relaxed outline-none focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
            />
          </label>

          {draft.meetingId ? (
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[11px] font-medium text-[#8b919c]">
                  Files from {meeting.title}
                </p>
                {onUploadFile && (
                  <FileUploadButton
                    onUpload={onUploadFile}
                    label="Upload"
                    variant="ghost"
                  />
                )}
              </div>
              {relatedFiles.length === 0 ? (
                <p className="rounded-xl border border-[#eceef2] bg-[#fbfcfd] px-3 py-3 text-[13px] leading-5 text-[#8b919c]">
                  No files yet. Upload one to share it with every task from this
                  meeting.
                </p>
              ) : (
                <ul className="space-y-2">
                  {relatedFiles.map((file) => (
                    <li key={file.id}>
                      <FileRow file={file} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[#eef0f4] bg-white px-5 py-4">
          {mode === "edit" && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-[13px] font-medium text-[#6b7280] hover:bg-[#f7f8fa]"
            >
              <TrashIcon />
              Delete task
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center rounded-xl border border-[#e6e9ef] px-4 text-[13px] font-medium text-[#374151] hover:bg-[#f7f8fa]"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex h-10 items-center rounded-xl bg-[#111827] px-4 text-[13px] font-medium text-white hover:bg-black"
          >
            {mode === "edit" ? "Save changes" : "Create task"}
          </button>
        </div>
    </aside>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[108px_minmax(0,1fr)] items-center gap-3 py-3.5">
      <span className="text-[11px] font-medium text-[#8b919c]">{label}</span>
      <div className="min-w-0 text-[#111827]">{children}</div>
    </div>
  );
}

function Dropdown({ children }: { children: ReactNode }) {
  return (
    <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-[#e6e9ef] bg-white py-1 shadow-lg">
      {children}
    </div>
  );
}
