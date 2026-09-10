"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  currentUser,
  draftFromDecision,
  draftFromGrep,
  draftFromTask,
  emptyTaskDraft,
  initialDecisions,
  initialTasks,
  meetingById,
  meetings,
  personById,
  taskFieldsFromDraft,
  columnLabel,
  type BoardColumn,
  type BoardTask,
  type BoardView,
  type Decision,
  type GrepHit,
  type MeetingRecording,
  type MeetingTab,
  type RecordingSource,
  type TaskDraft,
} from "@/data/meeting-extractor";
import CreateTaskPanel from "./CreateTaskPanel";
import MeetingDetailView, { MeetingContext } from "./MeetingDetailView";
import MeetingsView from "./MeetingsView";
import TaskBoardView from "./TaskBoardView";
import {
  Avatar,
  BellIcon,
  BrandMark,
  CloseIcon,
  HomeIcon,
  KCommandIcon,
  MeetingsIcon,
  PeopleIcon,
  PlusIcon,
  ProjectsIcon,
  SearchIcon,
  SettingsIcon,
  SidebarToggleIcon,
  SparkIcon,
  SparkleIcon,
  TasksIcon,
} from "./ui";

type NavId = "home" | "meetings" | "tasks";
type Screen = "home" | "meeting" | "tasks";
type Toast = { id: number; text: string };

export default function MeetingExtractorApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [nav, setNav] = useState<NavId>("meetings");
  const [screen, setScreen] = useState<Screen>("home");
  const [meetingId, setMeetingId] = useState("product-weekly");
  const [meetingTab, setMeetingTab] = useState<MeetingTab>("decisions");
  const [boardView, setBoardView] = useState<BoardView>("board");
  const [selectedDate, setSelectedDate] = useState("2024-09-09");
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);
  const [tasks, setTasks] = useState<BoardTask[]>(initialTasks);
  const [promptUpload, setPromptUpload] = useState(false);
  const [recordings, setRecordings] = useState<Record<string, MeetingRecording>>(
    {},
  );
  const [navQuery, setNavQuery] = useState("");
  const [grepQuery, setGrepQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"create" | "edit">("create");
  const [taskDraft, setTaskDraft] = useState<TaskDraft | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const toastId = useRef(0);

  const meeting = meetingById(meetingId);

  const toast = useCallback((text: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const closePanel = () => {
    setPanelOpen(false);
    setEditingTaskId(null);
    setTaskDraft(null);
  };

  const goHome = () => {
    setNav("home");
    setScreen("home");
    setPromptUpload(false);
    closePanel();
  };

  const goMeetings = () => {
    setNav("meetings");
    setScreen("home");
    setPromptUpload(false);
    closePanel();
  };

  const goTasks = () => {
    setNav("tasks");
    setScreen("tasks");
    setBoardView("board");
  };

  const openMeeting = (
    id: string,
    tab: MeetingTab = "decisions",
    options?: { upload?: boolean },
  ) => {
    setMeetingId(id);
    setMeetingTab(tab);
    setNav("meetings");
    setScreen("meeting");
    setPromptUpload(Boolean(options?.upload));
    closePanel();
  };

  const openCreate = (draft: TaskDraft) => {
    setTaskDraft(draft);
    setPanelMode("create");
    setEditingTaskId(null);
    setNav("tasks");
    setScreen("tasks");
    setPanelOpen(true);
  };

  const openEditTask = (task: BoardTask) => {
    setTaskDraft(draftFromTask(task));
    setEditingTaskId(task.id);
    setPanelMode("edit");
    setNav("tasks");
    setScreen("tasks");
    setPanelOpen(true);
  };

  const savePanel = () => {
    if (!taskDraft) return;
    const fields = taskFieldsFromDraft(taskDraft);
    if (!fields.title) {
      toast("Task title can’t be empty");
      return;
    }
    if (panelMode === "edit" && editingTaskId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTaskId ? { ...t, ...fields } : t)),
      );
      closePanel();
      toast("Task updated");
      return;
    }
    const next: BoardTask = {
      id: `t${Date.now()}`,
      ...fields,
    };
    setTasks((prev) => [next, ...prev]);
    closePanel();
    setNav("tasks");
    setScreen("tasks");
    toast(`Task added from ${meetingById(fields.meetingId ?? meetingId).title}`);
  };

  const deleteTask = () => {
    if (!editingTaskId) return;
    setTasks((prev) => prev.filter((t) => t.id !== editingTaskId));
    closePanel();
    toast("Task deleted");
  };

  const moveTask = (id: string, status: BoardColumn) => {
    const task = tasks.find((item) => item.id === id);
    if (!task || task.status === status) return;
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    if (editingTaskId === id) {
      setTaskDraft((prev) => (prev ? { ...prev, status } : prev));
    }
    toast(`Moved to ${columnLabel(status)}`);
  };

  const addDecision = () => {
    const id = `d${Date.now()}`;
    const next: Decision = {
      id,
      meetingId,
      title: "New decision",
      summary: "Add a short summary, then turn it into a task.",
      ownerId: currentUser.id,
      dueDate: "2024-10-14",
      status: "open",
      sourceMessageId: "",
      sourceQuote: "",
    };
    setDecisions((prev) => [...prev, next]);
    toast("Decision added");
  };

  const filteredTasks = filterTasks(tasks, navQuery);
  const showHome = screen === "home";
  const showMeeting = screen === "meeting";
  const showTasks = screen === "tasks";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="mde-app flex h-dvh w-full overflow-hidden bg-[#f6f7fb] text-[#111827]">
      <aside
        className={`flex h-full shrink-0 flex-col bg-[#0e0f13] text-white transition-[width] duration-200 ${
          sidebarOpen ? "w-[232px]" : "w-[72px]"
        }`}
      >
        <div className={`flex items-center py-5 ${sidebarOpen ? "justify-between px-4" : "flex-col gap-3 px-2"}`}>
          <Link
            href="/"
            className="flex items-center gap-2.5"
            title="Exit prototype"
          >
            <BrandMark />
            {sidebarOpen && (
              <span className="text-[16px] font-semibold tracking-[-0.02em]">
                Opal
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9aa0b3] hover:bg-white/5 hover:text-white"
            aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
            aria-expanded={sidebarOpen}
          >
            <SidebarToggleIcon />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          <NavButton
            icon={<HomeIcon />}
            label="Home"
            collapsed={!sidebarOpen}
            active={nav === "home" && showHome}
            onClick={goHome}
          />
          <NavButton
            icon={<MeetingsIcon />}
            label="Meetings"
            collapsed={!sidebarOpen}
            active={nav === "meetings"}
            onClick={goMeetings}
          />
          <NavButton
            icon={<TasksIcon />}
            label="Tasks"
            collapsed={!sidebarOpen}
            active={nav === "tasks"}
            onClick={goTasks}
          />
          <NavButton
            icon={<ProjectsIcon />}
            label="Projects"
            collapsed={!sidebarOpen}
            active={false}
            onClick={goTasks}
          />
          <NavButton icon={<SparkIcon />} label="AI" collapsed={!sidebarOpen} />
          <NavButton
            icon={<PeopleIcon />}
            label="People"
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<SettingsIcon />}
            label="Settings"
            collapsed={!sidebarOpen}
          />
        </nav>

        <div className={`px-3 pb-3 ${sidebarOpen ? "" : "px-2"}`}>
          {sidebarOpen && (
            <div className="rounded-2xl bg-[#1a1c24] p-3.5">
              <p className="inline-flex items-center gap-1 text-[12px] font-medium text-[#c4b5fd]">
                <SparkleIcon />
                Get more from Opal
              </p>
              <p className="mt-1 text-[12px] leading-snug text-[#9aa0b3]">
                Higher limits, team features and more.
              </p>
              <span className="mt-3 inline-flex h-8 items-center rounded-lg bg-[#7c5cf6] px-3 text-[12px] font-medium">
                Upgrade
              </span>
            </div>
          )}
          <div
            className={`mt-3 flex items-center py-1 ${
              sidebarOpen ? "justify-between px-1" : "justify-center"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Avatar person={currentUser} size="sm" />
              {sidebarOpen && (
                <span className="text-[13px] font-medium">
                  {currentUser.name.split(" ")[0]}
                </span>
              )}
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#eceef2] bg-white px-5">
          <label className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98a0ab]">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              placeholder={
                showTasks
                  ? "Search meetings, notes, tasks, projects…"
                  : "Search meetings, notes, tasks, people…"
              }
              className="h-10 w-full rounded-full border border-[#eceef2] bg-[#f7f8fb] py-2 pl-10 pr-16 text-[13px] outline-none placeholder:text-[#b0b6bf] focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <KCommandIcon />
            </span>
          </label>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f7f8fa]"
            aria-label="Notifications"
            onClick={() => toast("You’re all caught up")}
          >
            <BellIcon />
          </button>
          {showMeeting ? (
            <button
              type="button"
              onClick={() => toast("New meeting is a preview in this prototype")}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-[#111827] px-3 text-[13px] font-medium text-white"
            >
              <PlusIcon />
              New meeting
            </button>
          ) : (
            <Avatar person={currentUser} />
          )}
        </header>

        <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {showHome && (
              <MeetingsView
                meetings={meetings}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onOpenMeeting={(id, tab, options) =>
                  openMeeting(id, tab ?? "decisions", options)
                }
                onNewMeeting={() =>
                  toast("New meeting is a preview in this prototype")
                }
                onCopyLink={(item) =>
                  toast(`Link copied for ${item.title}`)
                }
              />
            )}
            {showMeeting && (
              <MeetingDetailView
                meeting={meeting}
                decisions={decisions}
                tasks={tasks}
                tab={meetingTab}
                recording={recordings[meeting.id] ?? null}
                promptUpload={promptUpload}
                grepQuery={grepQuery}
                onGrepQuery={setGrepQuery}
                onTab={setMeetingTab}
                onBack={goMeetings}
                onCreateTask={(decision) => {
                  const existing = tasks.find((t) => t.decisionId === decision.id);
                  if (existing) openEditTask(existing);
                  else openCreate(draftFromDecision(decision));
                }}
                onViewTask={openEditTask}
                onCreateFromGrep={(hit: GrepHit) =>
                  openCreate(draftFromGrep(hit, meeting.id))
                }
                onAddDecision={addDecision}
                onCopyLink={() => toast(`Link copied for ${meeting.title}`)}
                onUploadRecording={(file, source: RecordingSource) => {
                  const kind = file.type.startsWith("video") ? "video" : "audio";
                  const url = URL.createObjectURL(file);
                  setRecordings((prev) => {
                    const previous = prev[meeting.id];
                    if (previous?.url) URL.revokeObjectURL(previous.url);
                    return {
                      ...prev,
                      [meeting.id]: { name: file.name, kind, source, url },
                    };
                  });
                  setPromptUpload(false);
                  toast(
                    `Uploaded ${source === "google-meet" ? "Google Meet" : "Zoom"} recording`,
                  );
                }}
              />
            )}
            {showTasks && (
              <TaskBoardView
                tasks={filteredTasks}
                boardView={boardView}
                activeTaskId={editingTaskId}
                onBoardView={setBoardView}
                onAddTask={() => openCreate(emptyTaskDraft())}
                onEditTask={openEditTask}
                onMoveTask={moveTask}
              />
            )}
          </div>

          {showMeeting && !panelOpen && (
            <MeetingContext
              meeting={meeting}
              onOpenBoard={() => {
                goTasks();
                closePanel();
              }}
            />
          )}

          {panelOpen && taskDraft && (
            <CreateTaskPanel
              mode={panelMode}
              decision={
                decisions.find((d) => d.id === taskDraft.decisionId) ?? null
              }
              draft={taskDraft}
              onChange={(patch) =>
                setTaskDraft((prev) => (prev ? { ...prev, ...patch } : prev))
              }
              onClose={closePanel}
              onSubmit={savePanel}
              onDelete={panelMode === "edit" ? deleteTask : undefined}
            />
          )}
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-7 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-[#111827] shadow-[0_12px_40px_rgba(15,23,42,0.16)] ring-1 ring-[#eceef2]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce7] text-[#15803d]">
              ✓
            </span>
            {item.text}
            <button
              type="button"
              className="ml-1 text-[#9aa1ab]"
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== item.id))
              }
              aria-label="Dismiss"
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  collapsed?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  const clickable = Boolean(onClick);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      title={label}
      className={`flex h-10 items-center gap-3 rounded-xl text-[13.5px] font-medium ${
        collapsed ? "justify-center px-0" : "px-3"
      } ${
        active
          ? "bg-[#2b2540] text-white"
          : clickable
            ? "text-[#9aa0b3] hover:bg-white/5 hover:text-white"
            : "cursor-default text-[#5b6170]"
      }`}
    >
      {icon}
      {!collapsed && label}
    </button>
  );
}

function filterTasks(tasks: BoardTask[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return tasks;
  return tasks.filter((task) => {
    const owners = task.assigneeIds.map((id) => personById(id).name).join(" ");
    return (
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q) ||
      owners.toLowerCase().includes(q)
    );
  });
}
