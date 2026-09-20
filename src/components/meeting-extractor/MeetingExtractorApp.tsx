"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  columnLabel,
  currentUser,
  draftFromDecision,
  draftFromGrep,
  draftFromTask,
  emptyTaskDraft,
  initialDecisions,
  initialRecordings,
  initialTasks,
  meetingById,
  meetingFromForm,
  addNoteToMeeting,
  removeNoteFromMeeting,
  meetings as seedMeetings,
  personById,
  projectById,
  searchWorkspace,
  taskFieldsFromDraft,
  formatFileSize,
  type AppMeeting,
  type BoardColumn,
  type BoardTask,
  type BoardView,
  type Decision,
  type DecisionStatus,
  type GrepHit,
  type MeetingFile,
  type MeetingRecording,
  type MeetingTab,
  type RecordingSource,
  type SearchHit,
  type TaskDraft,
} from "@/data/meeting-extractor";
import CreateMeetingView from "./CreateMeetingView";
import CreateTaskPanel from "./CreateTaskPanel";
import HomeView from "./HomeView";
import MeetingDetailView, { MeetingContext } from "./MeetingDetailView";
import MeetingsView from "./MeetingsView";
import PeopleView from "./PeopleView";
import ProfileView from "./ProfileView";
import ProjectsView from "./ProjectsView";
import SearchResultsView from "./SearchResultsView";
import TaskBoardView from "./TaskBoardView";
import {
  Avatar,
  BellIcon,
  BrandMark,
  CloseIcon,
  HomeIcon,
  KCommandIcon,
  MeetingsIcon,
  MenuIcon,
  PeopleIcon,
  PlusIcon,
  ProjectsIcon,
  SearchIcon,
  SettingsIcon,
  SidebarToggleIcon,
  SparkleIcon,
  TasksIcon,
} from "./ui";

type NavId = "home" | "meetings" | "tasks" | "projects" | "people" | "profile";
type Screen =
  | "home"
  | "meetings"
  | "meeting"
  | "tasks"
  | "projects"
  | "people"
  | "create-meeting"
  | "profile";
type Toast = { id: number; text: string };

export default function MeetingExtractorApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [nav, setNav] = useState<NavId>("meetings");
  const [screen, setScreen] = useState<Screen>("meetings");
  const [meetingId, setMeetingId] = useState("product-weekly");
  const [meetingTab, setMeetingTab] = useState<MeetingTab>("decisions");
  const [boardView, setBoardView] = useState<BoardView>("board");
  const [selectedDate, setSelectedDate] = useState("2024-09-09");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [personId, setPersonId] = useState<string | null>(null);
  const [meetingList, setMeetingList] = useState<AppMeeting[]>(seedMeetings);
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);
  const [tasks, setTasks] = useState<BoardTask[]>(initialTasks);
  const [promptUpload, setPromptUpload] = useState(false);
  const [recordings, setRecordings] = useState<Record<string, MeetingRecording>>(
    initialRecordings,
  );
  const [files, setFiles] = useState<MeetingFile[]>([]);
  const [navQuery, setNavQuery] = useState("");
  const [grepQuery, setGrepQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"create" | "edit">("create");
  const [taskDraft, setTaskDraft] = useState<TaskDraft | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const toastId = useRef(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const meeting = meetingById(meetingId, meetingList);
  const selectedProject = selectedProjectId
    ? projectById(selectedProjectId)
    : null;

  const toast = useCallback((text: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  useEffect(() => {
    const onToast = (event: Event) => {
      const text = (event as CustomEvent<string>).detail;
      if (text) toast(text);
    };
    window.addEventListener("opal-toast", onToast);
    return () => window.removeEventListener("opal-toast", onToast);
  }, [toast]);

  const closePanel = () => {
    setPanelOpen(false);
    setEditingTaskId(null);
    setTaskDraft(null);
  };

  const closeMobileSidebar = () => {
    if (window.matchMedia("(max-width: 767px)").matches) setSidebarOpen(false);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      if (mq.matches) setSidebarOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goHome = () => {
    setNav("home");
    setScreen("home");
    setNavQuery("");
    setPromptUpload(false);
    setPersonId(null);
    closePanel();
  };

  const goProfile = () => {
    setNav("profile");
    setScreen("profile");
    setNavQuery("");
    setPromptUpload(false);
    closePanel();
  };

  const goMeetings = () => {
    setNav("meetings");
    setScreen("meetings");
    setPromptUpload(false);
    closePanel();
  };

  const goTasks = () => {
    setNav("tasks");
    setScreen("tasks");
    setSelectedProjectId(null);
    setBoardView("board");
  };

  const goProjects = () => {
    setNav("projects");
    setScreen("projects");
    setSelectedProjectId(null);
    setPersonId(null);
    closePanel();
  };

  const goPeople = () => {
    setNav("people");
    setScreen("people");
    setPersonId(null);
    setNavQuery("");
    setPromptUpload(false);
    closePanel();
  };

  const openPerson = (id: string) => {
    setNav("people");
    setScreen("people");
    setPersonId(id);
    setNavQuery("");
    setPromptUpload(false);
    closePanel();
  };

  const openProject = (id: string) => {
    setNav("projects");
    setSelectedProjectId(id);
    setScreen("tasks");
    setBoardView("board");
  };

  const goCreateMeeting = () => {
    setNav("meetings");
    setScreen("create-meeting");
    setPromptUpload(false);
    closePanel();
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

  const openCreate = (draft: TaskDraft, options?: { stayOnMeeting?: boolean }) => {
    setTaskDraft(draft);
    setPanelMode("create");
    setEditingTaskId(null);
    if (!options?.stayOnMeeting) {
      if (nav !== "projects") {
        setNav("tasks");
        setSelectedProjectId(null);
      }
      setScreen("tasks");
    }
    setPanelOpen(true);
  };

  const openEditTask = (task: BoardTask) => {
    setTaskDraft(draftFromTask(task));
    setEditingTaskId(task.id);
    setPanelMode("edit");
    setPanelOpen(true);
  };

  const showTaskOnBoard = (task: BoardTask) => {
    setPanelOpen(false);
    setTaskDraft(null);
    setEditingTaskId(task.id);
    setNav("tasks");
    setSelectedProjectId(null);
    setScreen("tasks");
    setBoardView("board");
    setNavQuery("");
    setPromptUpload(false);
    setPersonId(null);
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
    const from = meetingById(fields.meetingId ?? meetingId, meetingList).title;
    if (screen === "people") {
      closePanel();
      toast(`Task added from ${from}`);
      return;
    }
    if (fields.decisionId || screen === "meeting") {
      showTaskOnBoard(next);
      toast(`Task added from ${from}`);
      return;
    }
    closePanel();
    setNav("tasks");
    setScreen("tasks");
    toast(`Task added from ${from}`);
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

  const addDecision = (input: {
    title: string;
    summary: string;
    ownerId: string;
    dueDate: string | null;
    status: DecisionStatus;
  }) => {
    const title = input.title.trim();
    if (!title) {
      toast("Decision title can’t be empty");
      return;
    }
    const next: Decision = {
      id: `d${Date.now()}`,
      meetingId,
      title,
      summary: input.summary.trim(),
      ownerId: input.ownerId,
      dueDate: input.dueDate,
      status: input.status,
      sourceMessageId: "",
      sourceQuote: "",
    };
    setDecisions((prev) => [...prev, next]);
    toast("Decision added");
  };

  const updateDecisionStatus = (id: string, status: DecisionStatus) => {
    const current = decisions.find((decision) => decision.id === id);
    if (!current || current.status === status) return;
    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === id ? { ...decision, status } : decision,
      ),
    );
    toast(
      status === "confirmed"
        ? "Decision confirmed"
        : status === "needs-review"
          ? "Sent back to review"
          : "Marked as open",
    );
  };

  const addNote = (heading: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMeetingList((prev) =>
      prev.map((item) =>
        item.id === meetingId ? addNoteToMeeting(item, heading, trimmed) : item,
      ),
    );
    toast("Note added");
  };

  const removeNote = (noteId: string) => {
    setMeetingList((prev) =>
      prev.map((item) =>
        item.id === meetingId ? removeNoteFromMeeting(item, noteId) : item,
      ),
    );
    toast("Note removed");
  };

  const uploadMeetingFile = (file: File, forMeetingId = meetingId) => {
    if (!forMeetingId) {
      toast("Link a meeting before attaching a file");
      return;
    }
    const url = URL.createObjectURL(file);
    const next: MeetingFile = {
      id: `f${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      meetingId: forMeetingId,
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      type: file.type.split("/")[1]?.toUpperCase() || "FILE",
      url,
    };
    setFiles((prev) => [next, ...prev]);
    toast(`${file.name} attached`);
  };

  const filteredTasks = filterTasks(
    selectedProjectId
      ? tasks.filter((task) => task.projectId === selectedProjectId)
      : tasks,
    navQuery,
  );
  const searchHits = useMemo(
    () =>
      searchWorkspace({
        query: navQuery,
        meetings: meetingList,
        tasks,
        decisions,
      }),
    [navQuery, meetingList, tasks, decisions],
  );
  const showSearch = navQuery.trim().length > 0;
  const showHome = screen === "home";
  const showMeetings = screen === "meetings";
  const showMeeting = screen === "meeting";
  const showTasks = screen === "tasks";
  const showProjects = screen === "projects";
  const showPeople = screen === "people";
  const showCreateMeeting = screen === "create-meeting";
  const showProfile = screen === "profile";
  const selectedPerson = personId ? personById(personId) : null;

  const openSearchHit = (hit: SearchHit) => {
    setNavQuery("");
    if (hit.kind === "task" && hit.taskId) {
      const task = tasks.find((item) => item.id === hit.taskId);
      if (task) showTaskOnBoard(task);
      return;
    }
    if (hit.kind === "project" && hit.projectId) {
      openProject(hit.projectId);
      return;
    }
    if (hit.kind === "person" && hit.personId) {
      openPerson(hit.personId);
      return;
    }
    if (hit.meetingId) openMeeting(hit.meetingId, hit.tab ?? "decisions");
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
        return;
      }
      if (event.key === "Escape") {
        if (navQuery) {
          setNavQuery("");
          return;
        }
        closePanel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navQuery]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="mde-app flex h-dvh w-full overflow-hidden bg-[#f6f9fc] text-[#0a2540]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`flex h-full flex-col border-r border-[#e3e8ee] bg-white text-[#0a2540] max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[220px] max-md:overflow-hidden max-md:transition-transform max-md:duration-200 ${
          sidebarOpen ? "max-md:translate-x-0" : "max-md:hidden"
        } md:relative md:flex md:shrink-0 md:transition-[width] md:duration-200 ${
          sidebarOpen ? "md:w-[220px]" : "md:w-[64px]"
        }`}
      >
        <div className={`flex items-center py-4 ${sidebarOpen ? "justify-between px-3" : "flex-col gap-3 px-1.5"}`}>
          <button
            type="button"
            onClick={() => {
              goHome();
              closeMobileSidebar();
            }}
            className="flex items-center gap-2.5"
            title="Home"
          >
            <BrandMark />
            {sidebarOpen && (
              <span className="text-[15px] font-medium tracking-[-0.02em] text-[#0a2540]">
                Opal
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#6a7383] hover:bg-[#f6f9fc] hover:text-[#0a2540]"
            aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
            aria-expanded={sidebarOpen}
          >
            <span className="md:hidden">
              <CloseIcon />
            </span>
            <span className="hidden md:inline">
              <SidebarToggleIcon />
            </span>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-2.5">
          <NavButton
            icon={<HomeIcon />}
            label="Home"
            collapsed={!sidebarOpen}
            active={nav === "home"}
            onClick={() => {
              goHome();
              closeMobileSidebar();
            }}
          />
          <NavButton
            icon={<MeetingsIcon />}
            label="Meetings"
            collapsed={!sidebarOpen}
            active={nav === "meetings"}
            onClick={() => {
              goMeetings();
              closeMobileSidebar();
            }}
          />
          <NavButton
            icon={<TasksIcon />}
            label="Tasks"
            collapsed={!sidebarOpen}
            active={nav === "tasks"}
            onClick={() => {
              goTasks();
              closeMobileSidebar();
            }}
          />
          <NavButton
            icon={<ProjectsIcon />}
            label="Projects"
            collapsed={!sidebarOpen}
            active={nav === "projects"}
            onClick={() => {
              goProjects();
              closeMobileSidebar();
            }}
          />
          <NavButton
            icon={<PeopleIcon />}
            label="People"
            collapsed={!sidebarOpen}
            active={nav === "people"}
            onClick={() => {
              goPeople();
              closeMobileSidebar();
            }}
          />
          <NavButton
            icon={<SettingsIcon />}
            label="Settings"
            collapsed={!sidebarOpen}
            active={nav === "profile"}
            onClick={() => {
              goProfile();
              closeMobileSidebar();
            }}
          />
        </nav>

        <div className={`px-2.5 pb-3 ${sidebarOpen ? "" : "px-1.5"}`}>
          {sidebarOpen ? (
            <div className="flex w-full flex-col rounded-[8px] border border-[#e3e8ee] bg-[#f6f9fc] p-3.5">
              <p className="flex min-w-0 items-start gap-1.5 text-[13px] font-medium leading-5 text-[#0a2540]">
                <span className="mt-0.5 shrink-0 text-[#635bff]">
                  <SparkleIcon />
                </span>
                <span className="min-w-0 break-words">Get more from Opal</span>
              </p>
              <p className="mt-1.5 min-w-0 break-words text-[12px] leading-[1.45] text-[#6a7383]">
                Higher limits, team features and more.
              </p>
              <button
                type="button"
                onClick={() => toast("Upgrade would start here")}
                className="mt-3 flex h-8 w-full cursor-pointer items-center justify-center rounded-md bg-[#635bff] text-[12.5px] font-medium text-white hover:bg-[#5851ea]"
              >
                Upgrade
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => toast("Upgrade would start here")}
              className="flex h-9 w-full items-center justify-center rounded-md bg-[#635bff] text-white hover:bg-[#5851ea]"
              title="Upgrade"
            >
              <SparkleIcon />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              goProfile();
              closeMobileSidebar();
            }}
            className={`mt-3 flex w-full items-center py-1 ${
              sidebarOpen ? "justify-between px-1" : "justify-center"
            } rounded-md hover:bg-[#f6f9fc] ${
              nav === "profile" ? "bg-[#f6f9fc]" : ""
            }`}
            title="Profile and account settings"
          >
            <span className="inline-flex items-center gap-2">
              <Avatar person={currentUser} size="sm" />
              {sidebarOpen && (
                <span className="text-[13px] font-medium">
                  {currentUser.name.split(" ")[0]}
                </span>
              )}
            </span>
          </button>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-[#e3e8ee] bg-white px-3 sm:gap-3 sm:px-5">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#6a7383] hover:bg-[#f6f9fc] md:hidden"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </button>
          <label className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8898aa]">
              <SearchIcon />
            </span>
            <input
              ref={searchRef}
              type="search"
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchHits[0]) {
                  e.preventDefault();
                  openSearchHit(searchHits[0]);
                }
              }}
              placeholder="Search meetings, notes, tasks, people…"
              className="h-9 w-full rounded-md border border-[#e3e8ee] bg-[#f6f9fc] py-2 pl-10 pr-12 text-[13px] text-[#0a2540] outline-none placeholder:text-[#8898aa] focus:border-[#635bff] focus:ring-2 focus:ring-[#eeedfe] sm:pr-16"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 sm:block">
              <KCommandIcon />
            </span>
          </label>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#6a7383] hover:bg-[#f6f9fc]"
            aria-label="Notifications"
            onClick={() => toast("You’re all caught up")}
          >
            <BellIcon />
          </button>
          {!showCreateMeeting && (
            <button
              type="button"
              onClick={goCreateMeeting}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-[#635bff] px-2.5 text-[13px] font-medium text-white hover:bg-[#5851ea] sm:px-3"
              aria-label="New meeting"
            >
              <PlusIcon />
              <span className="hidden sm:inline">New meeting</span>
            </button>
          )}
        </header>

        <div className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {showSearch ? (
              <SearchResultsView
                query={navQuery.trim()}
                hits={searchHits}
                onOpen={openSearchHit}
              />
            ) : (
              <>
            {showHome && (
              <HomeView
                meetings={meetingList}
                tasks={tasks}
                decisions={decisions}
                onOpenMeeting={(id, tab) => openMeeting(id, tab ?? "decisions")}
                onOpenTask={showTaskOnBoard}
                onOpenProject={openProject}
                onOpenProjects={goProjects}
                onOpenMeetings={goMeetings}
                onOpenTasks={goTasks}
              />
            )}
            {showMeetings && (
              <MeetingsView
                meetings={meetingList}
                tasks={tasks}
                decisions={decisions}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onOpenMeeting={(id, tab, options) =>
                  openMeeting(id, tab ?? "decisions", options)
                }
                onOpenTasks={goTasks}
                onCopyLink={(item) => toast(`Link copied for ${item.title}`)}
              />
            )}
            {showCreateMeeting && (
              <CreateMeetingView
                onCancel={goMeetings}
                onCreate={(input) => {
                  const id = `m${Date.now()}`;
                  const next = meetingFromForm({
                    ...input,
                    id,
                    hostId: currentUser.id,
                  });
                  setMeetingList((prev) => [next, ...prev]);
                  setSelectedDate(next.date);
                  toast(`${next.title} added`);
                  openMeeting(id);
                }}
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
                  if (existing) showTaskOnBoard(existing);
                  else
                    openCreate(draftFromDecision(decision, meeting.projectId), {
                      stayOnMeeting: true,
                    });
                }}
                onViewTask={showTaskOnBoard}
                onCreateFromGrep={(hit: GrepHit) =>
                  openCreate(draftFromGrep(hit, meeting.id, meeting.projectId), {
                    stayOnMeeting: true,
                  })
                }
                onAddDecision={addDecision}
                onUpdateDecisionStatus={updateDecisionStatus}
                onAddNote={addNote}
                onRemoveNote={removeNote}
                files={files.filter((file) => file.meetingId === meeting.id)}
                onUploadFile={uploadMeetingFile}
                onCopyLink={() => toast(`Link copied for ${meeting.title}`)}
                onUploadRecording={(file, source: RecordingSource) => {
                  const kind = file.type.startsWith("video") ? "video" : "audio";
                  const url = URL.createObjectURL(file);
                  setRecordings((prev) => {
                    const previous = prev[meeting.id];
                    if (previous?.url) URL.revokeObjectURL(previous.url);
                    return {
                      ...prev,
                      [meeting.id]: {
                        name: file.name,
                        kind,
                        source,
                        url,
                        duration: "Uploaded",
                      },
                    };
                  });
                  setPromptUpload(false);
                  toast(
                    `Uploaded ${source === "google-meet" ? "Google Meet" : "Zoom"} recording`,
                  );
                }}
              />
            )}
            {showProjects && (
              <ProjectsView
                tasks={tasks}
                meetings={meetingList}
                onOpenProject={openProject}
              />
            )}
            {showPeople && (
              <PeopleView
                person={selectedPerson}
                meetings={meetingList}
                tasks={tasks}
                onOpenPerson={openPerson}
                onBack={goPeople}
                onOpenMeeting={(id) => openMeeting(id)}
                onOpenTask={showTaskOnBoard}
                onOpenProject={openProject}
              />
            )}
            {showTasks && (
              <TaskBoardView
                tasks={filteredTasks}
                files={files}
                meetings={meetingList}
                boardView={boardView}
                activeTaskId={editingTaskId}
                projectName={selectedProject?.name ?? "All tasks"}
                projectSubtitle={
                  selectedProject?.description ??
                  "Tasks across every project. Assign a project when you create or edit."
                }
                showProjectOnCards={!selectedProjectId}
                onBoardView={setBoardView}
                onAddTask={() =>
                  openCreate(emptyTaskDraft(selectedProjectId ?? "launch"))
                }
                onEditTask={openEditTask}
                onMoveTask={moveTask}
                onBackToProjects={goProjects}
              />
            )}
            {showProfile && <ProfileView onSave={toast} />}
              </>
            )}
          </div>

          {showMeeting && !showSearch && (
            <MeetingContext
              meeting={meeting}
              tasks={tasks}
              files={files.filter((file) => file.meetingId === meeting.id)}
              onOpenBoard={() => openProject(meeting.projectId)}
              onViewTask={showTaskOnBoard}
              onUploadFile={uploadMeetingFile}
            />
          )}

          {panelOpen && taskDraft && (
            <>
              <button
                type="button"
                className="absolute inset-0 z-30 bg-black/30"
                aria-label="Close task panel"
                onClick={closePanel}
              />
              <CreateTaskPanel
                mode={panelMode}
                decision={
                  decisions.find((d) => d.id === taskDraft.decisionId) ?? null
                }
                draft={taskDraft}
                meetings={meetingList}
                files={files}
                onUploadFile={(file) =>
                  uploadMeetingFile(file, taskDraft.meetingId)
                }
                onChange={(patch) =>
                  setTaskDraft((prev) => (prev ? { ...prev, ...patch } : prev))
                }
                onClose={closePanel}
                onSubmit={savePanel}
                onDelete={panelMode === "edit" ? deleteTask : undefined}
              />
            </>
          )}
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-7 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-[13px] font-medium text-[#0a2540] shadow-[0_8px_24px_rgba(10,37,64,0.08)] ring-1 ring-[#e3e8ee]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d6f6e1] text-[#0d9488]">
              ✓
            </span>
            {item.text}
            <button
              type="button"
              className="ml-1 text-[#8898aa]"
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
      className={`flex h-9 min-w-0 items-center gap-2.5 rounded-md text-[13px] font-medium ${
        collapsed ? "justify-center px-0" : "px-2.5"
      } ${
        active
          ? "bg-[#f6f9fc] text-[#0a2540]"
          : clickable
            ? "text-[#6a7383] hover:bg-[#f6f9fc] hover:text-[#0a2540]"
            : "cursor-default text-[#a3acb9]"
      }`}
    >
      {icon}
      {!collapsed && <span className="min-w-0 truncate">{label}</span>}
    </button>
  );
}

function filterTasks(tasks: BoardTask[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return tasks;
  return tasks.filter((task) => {
    const owners = task.assigneeIds.map((id) => personById(id).name).join(" ");
    const project = projectById(task.projectId).name;
    return (
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q) ||
      owners.toLowerCase().includes(q) ||
      project.toLowerCase().includes(q)
    );
  });
}
