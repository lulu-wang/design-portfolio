"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import {
  columnLabel,
  currentUser,
  formatDueDate,
  people,
  personById,
  projectById,
  projects,
  type AppMeeting,
  type BoardColumn,
  type BoardTask,
  type BoardView,
  type MeetingFile,
  type TaskPriority,
} from "@/data/meeting-extractor";
import {
  Avatar,
  AvatarStack,
  BoardIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  FileRow,
  FilesIcon,
  GripIcon,
  ListIcon,
  PlusIcon,
  PriorityPill,
  cardRadius,
  typeScale,
} from "./ui";

const listGrid =
  "grid grid-cols-[minmax(180px,1.4fr)_minmax(118px,0.7fr)_minmax(132px,0.8fr)_minmax(118px,0.75fr)_minmax(148px,0.9fr)_minmax(140px,0.9fr)] items-center gap-3";

const columns: BoardColumn[] = ["todo", "in-progress", "done"];
const priorityRank: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};
const statusShort: Record<BoardColumn, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Completed",
};

export default function TaskBoardView({
  tasks,
  files = [],
  meetings = [],
  boardView,
  activeTaskId,
  projectName,
  projectSubtitle,
  showProjectOnCards = false,
  onBoardView,
  onAddTask,
  onEditTask,
  onMoveTask,
  onBackToProjects,
}: {
  tasks: BoardTask[];
  files?: MeetingFile[];
  meetings?: AppMeeting[];
  boardView: BoardView;
  activeTaskId?: string | null;
  projectName: string;
  projectSubtitle: string;
  showProjectOnCards?: boolean;
  onBoardView: (view: BoardView) => void;
  onAddTask: () => void;
  onEditTask: (task: BoardTask) => void;
  onMoveTask: (taskId: string, status: BoardColumn) => void;
  onBackToProjects?: () => void;
}) {
  const filters = useTaskFilters(tasks);
  const tabs: { id: BoardView; label: string; icon: typeof BoardIcon }[] = [
    { id: "board", label: "Board", icon: BoardIcon },
    { id: "list", label: "List", icon: ListIcon },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
    { id: "files", label: "Files", icon: FilesIcon },
  ];

  useEffect(() => {
    if (!activeTaskId) return;
    document
      .getElementById(`task-card-${activeTaskId}`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeTaskId, boardView]);

  return (
    <div className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-4 pb-8 sm:px-6 lg:px-8 ${showProjectOnCards ? "pt-5" : "pt-4"}`}>
      {!showProjectOnCards && (
        <p className="mb-3 text-[13px] text-[#6a7383]">
          <button
            type="button"
            onClick={onBackToProjects}
            className="hover:text-[#0a2540]"
          >
            Projects
          </button>
          <span className="mx-1">›</span>
          <span className="text-[#425466]">{projectName}</span>
        </p>
      )}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={`${typeScale.pageTitle} min-w-0 break-words`}>
            {projectName}
          </h1>
          <p className={`mt-2 ${typeScale.subtitle}`}>
            {projectSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddTask}
            className="inline-flex h-10 items-center gap-1.5 rounded-md bg-[#635bff] px-4 text-[13px] font-medium text-white hover:bg-[#5851ea]"
          >
            <PlusIcon />
            Add task
          </button>
        </div>
      </div>

      <div className="mb-5 flex gap-5 overflow-x-auto border-b border-[#e3e8ee]">
        {tabs.map((item) => {
          const active = boardView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onBoardView(item.id)}
              className={`-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 pb-3 text-[13px] font-medium ${
                active
                  ? "border-[#635bff] text-[#0a2540]"
                  : "border-transparent text-[#6a7383] hover:text-[#425466]"
              }`}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </div>

      {boardView === "board" && (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-30 mb-4 flex shrink-0 flex-wrap items-center gap-2">
            <TaskFilterControls filters={filters} menuAlign="left" />
            {filters.hasFilters && (
              <button
                type="button"
                onClick={filters.clearFilters}
                className="inline-flex h-9 items-center rounded-full px-3.5 text-[13px] font-medium text-[#635bff] hover:bg-[#f0efff] hover:text-[#5851ea]"
              >
                Clear filters
              </button>
            )}
          </div>
          {filters.rows.length === 0 ? (
            <div className="rounded-[8px] border border-[#e3e8ee] bg-white px-5 py-10 text-center">
              <p className="text-[14px] text-[#6a7383]">
                {filters.hasFilters
                  ? "No tasks match these filters."
                  : "No tasks yet."}
              </p>
            </div>
          ) : (
            <BoardColumns
              tasks={filters.rows}
              activeTaskId={activeTaskId}
              showProject={showProjectOnCards}
              onEditTask={onEditTask}
              onMoveTask={onMoveTask}
            />
          )}
        </div>
      )}

      {boardView === "list" && (
        <TaskListView
          filters={filters}
          activeTaskId={activeTaskId}
          onEditTask={onEditTask}
        />
      )}

      {boardView === "calendar" && (
        <BoardCalendar tasks={tasks} onEditTask={onEditTask} />
      )}

      {boardView === "files" && (
        <BoardFiles tasks={tasks} files={files} meetings={meetings} />
      )}
    </div>
  );
}

type PriorityFilter = "all" | TaskPriority;
type StatusFilter = "all" | BoardColumn;
type ProjectFilter = "all" | string;
type AssigneeFilter = "all" | string;
type DeadlineSort = "oldest" | "newest";
type FilterMenu = "priority" | "deadline" | "status" | "project" | "assignee" | null;

type TaskFilters = ReturnType<typeof useTaskFilters>;

function useTaskFilters(tasks: BoardTask[]) {
  const [priority, setPriority] = useState<PriorityFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [project, setProject] = useState<ProjectFilter>("all");
  const [assignee, setAssignee] = useState<AssigneeFilter>("all");
  const [deadline, setDeadline] = useState<DeadlineSort>("oldest");
  const [menu, setMenu] = useState<FilterMenu>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-list-filter]")) setMenu(null);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const projectOptions = projects.filter((item) =>
    tasks.some((task) => task.projectId === item.id),
  );
  const assigneeOptions = people.filter((person) =>
    tasks.some((task) => task.assigneeIds.includes(person.id)),
  ).sort((a, b) => {
    if (a.id === currentUser.id) return -1;
    if (b.id === currentUser.id) return 1;
    return a.name.localeCompare(b.name);
  });

  const rows = useMemo(() => {
    const next = tasks.filter((task) => {
      if (assignee !== "all" && !task.assigneeIds.includes(assignee)) {
        return false;
      }
      if (priority !== "all" && task.priority !== priority) return false;
      if (project !== "all" && task.projectId !== project) return false;
      return true;
    });
    next.sort((a, b) =>
      deadline === "newest"
        ? b.dueDate.localeCompare(a.dueDate) || a.title.localeCompare(b.title)
        : a.dueDate.localeCompare(b.dueDate) || a.title.localeCompare(b.title),
    );
    return next;
  }, [tasks, assignee, priority, project, deadline]);

  const listRows = useMemo(
    () =>
      status === "all"
        ? rows
        : rows.filter((task) => task.status === status),
    [rows, status],
  );

  const hasFilters = assignee !== "all" || priority !== "all" || project !== "all";
  const hasListFilters = hasFilters || status !== "all";

  const clearFilters = () => {
    setAssignee("all");
    setPriority("all");
    setStatus("all");
    setProject("all");
    setDeadline("oldest");
    setMenu(null);
  };

  const toggle = (id: FilterMenu) =>
    setMenu((current) => (current === id ? null : id));

  return {
    assignee,
    setAssignee,
    priority,
    setPriority,
    status,
    setStatus,
    project,
    setProject,
    deadline,
    setDeadline,
    menu,
    toggle,
    closeMenu: () => setMenu(null),
    projectOptions,
    assigneeOptions,
    rows,
    listRows,
    hasFilters,
    hasListFilters,
    clearFilters,
  };
}

function TaskFilterControls({
  filters,
  menuAlign = "right",
  showStatusFilter = false,
}: {
  filters: TaskFilters;
  menuAlign?: "left" | "right";
  showStatusFilter?: boolean;
}) {
  return (
    <>
      <ListFilter
        label="Priority"
        open={filters.menu === "priority"}
        active={filters.priority !== "all"}
        align={menuAlign}
        onToggle={() => filters.toggle("priority")}
        options={[
          { id: "all", label: "All priorities" },
          { id: "high", label: "High" },
          { id: "medium", label: "Medium" },
          { id: "low", label: "Low" },
        ]}
        value={filters.priority}
        onChange={(value) => {
          filters.setPriority(value as PriorityFilter);
          filters.closeMenu();
        }}
      />
      <ListFilter
        label="Deadline"
        open={filters.menu === "deadline"}
        active={filters.deadline === "newest"}
        align={menuAlign}
        onToggle={() => filters.toggle("deadline")}
        options={[
          { id: "oldest", label: "Oldest" },
          { id: "newest", label: "Most recent" },
        ]}
        value={filters.deadline}
        onChange={(value) => {
          filters.setDeadline(value as DeadlineSort);
          filters.closeMenu();
        }}
      />
      {showStatusFilter && (
        <ListFilter
          label="Status"
          open={filters.menu === "status"}
          active={filters.status !== "all"}
          align={menuAlign}
          onToggle={() => filters.toggle("status")}
          options={[
            { id: "all", label: "All statuses" },
            { id: "todo", label: "To do" },
            { id: "in-progress", label: "In progress" },
            { id: "done", label: "Completed" },
          ]}
          value={filters.status}
          onChange={(value) => {
            filters.setStatus(value as StatusFilter);
            filters.closeMenu();
          }}
        />
      )}
      <ListFilter
        label="Assignee"
        open={filters.menu === "assignee"}
        active={filters.assignee !== "all"}
        align={menuAlign}
        onToggle={() => filters.toggle("assignee")}
        options={[
          { id: "all", label: "All assignees" },
          ...filters.assigneeOptions.map((person) => ({
            id: person.id,
            label:
              person.id === currentUser.id
                ? `${person.name.split(" ")[0]} (me)`
                : person.name,
          })),
        ]}
        value={filters.assignee}
        onChange={(value) => {
          filters.setAssignee(value);
          filters.closeMenu();
        }}
      />
      <ListFilter
        label="Project"
        open={filters.menu === "project"}
        active={filters.project !== "all"}
        align={menuAlign}
        onToggle={() => filters.toggle("project")}
        options={[
          { id: "all", label: "All projects" },
          ...filters.projectOptions.map((item) => ({
            id: item.id,
            label: item.name,
          })),
        ]}
        value={filters.project}
        onChange={(value) => {
          filters.setProject(value);
          filters.closeMenu();
        }}
      />
    </>
  );
}

function TaskListView({
  filters,
  activeTaskId,
  onEditTask,
}: {
  filters: TaskFilters;
  activeTaskId?: string | null;
  onEditTask: (task: BoardTask) => void;
}) {
  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto rounded-[8px] border border-[#e3e8ee] bg-white">
      <div className="min-w-[960px]">
        <div className={`${listGrid} items-center px-5 py-3`}>
          <span className={typeScale.label}>Task</span>
          <TaskFilterControls filters={filters} showStatusFilter />
        </div>
        {filters.listRows.length === 0 ? (
          <div className="border-t border-[#e6ebf1] px-5 py-10 text-center">
            <p className="text-[14px] text-[#6a7383]">
              {filters.hasListFilters
                ? "No tasks match these filters."
                : "No tasks yet."}
            </p>
            {filters.hasListFilters && (
              <button
                type="button"
                onClick={filters.clearFilters}
                className="mt-3 text-[13px] font-medium text-[#635bff] hover:text-[#5851ea]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          filters.listRows.map((task) => (
            <button
              key={task.id}
              id={`task-card-${task.id}`}
              type="button"
              onClick={() => onEditTask(task)}
              className={`${listGrid} w-full border-t border-[#e6ebf1] px-5 py-3.5 text-left ${
                task.id === activeTaskId
                  ? "bg-[#f7f5ff]"
                  : "hover:bg-[#f6f9fc]"
              }`}
            >
              <span className={`min-w-0 break-words ${typeScale.card}`}>
                {task.title}
              </span>
              <span className="flex justify-end">
                <PriorityPill priority={task.priority} />
              </span>
              <span className="text-right text-[13px] leading-5 text-[#6a7383]">
                {formatDueDate(task.dueDate)}
              </span>
              <span className="text-right text-[13px] leading-5 text-[#6a7383]">
                {columnLabel(task.status)}
              </span>
              <span className="flex min-w-0 items-center justify-end gap-2">
                <AvatarStack ids={task.assigneeIds.slice(0, 2)} size="xs" compact />
                <span className="min-w-0 truncate text-[13px] leading-5 text-[#425466]">
                  {task.assigneeIds
                    .map((id) => personById(id).name.split(" ")[0])
                    .join(", ")}
                </span>
              </span>
              <span className="min-w-0 truncate text-right text-[13px] leading-5 text-[#425466]">
                {projectById(task.projectId).name}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function ListFilter({
  label,
  open,
  active,
  value,
  options,
  align = "right",
  onToggle,
  onChange,
}: {
  label: string;
  open: boolean;
  active: boolean;
  value: string;
  options: { id: string; label: string }[];
  align?: "left" | "right";
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  const selected = options.find((option) => option.id === value);
  const display =
    active && selected && selected.id !== "all" ? selected.label : label;
  const emphasized = active || open;

  return (
    <div
      className={`relative flex min-w-0 ${align === "left" ? "justify-start" : "justify-end"}`}
      data-list-filter
    >
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex h-9 max-w-full min-w-0 items-center gap-1 rounded-full px-3.5 text-[13px] font-medium shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${
          emphasized
            ? "bg-[#efeafb] text-[#5851ea] ring-1 ring-[#e0d8f6]"
            : "bg-white text-[#425466] ring-1 ring-[#e3e8ee] hover:bg-[#f0efff] hover:text-[#0a2540]"
        }`}
      >
        <span className="min-w-0 truncate">{display}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div
          className={`absolute top-full z-30 mt-2 w-48 overflow-hidden rounded-[18px] bg-white py-1.5 shadow-[0_12px_40px_rgba(15,23,42,0.12)] ring-1 ring-[#e3e8ee] ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          {options.map((option) => {
            const isSelected = option.id === value;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange(option.id)}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13px] ${
                  isSelected
                    ? "bg-[#f0efff] font-medium text-[#5851ea]"
                    : "text-[#425466] hover:bg-[#f6f9fc]"
                }`}
              >
                {option.label}
                {isSelected && (
                  <span className="text-[#635bff]">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BoardFiles({
  tasks,
  files,
  meetings,
}: {
  tasks: BoardTask[];
  files: MeetingFile[];
  meetings: AppMeeting[];
}) {
  const meetingIds = new Set(
    tasks.map((task) => task.meetingId).filter((id): id is string => Boolean(id)),
  );
  const related = files.filter((file) => meetingIds.has(file.meetingId));
  const grouped = meetings
    .filter((meeting) => related.some((file) => file.meetingId === meeting.id))
    .map((meeting) => {
      const taskCount = tasks.filter(
        (task) => task.meetingId === meeting.id,
      ).length;
      return {
        meeting,
        items: related.filter((file) => file.meetingId === meeting.id),
        taskCount,
      };
    });

  if (related.length === 0) {
    return (
      <p className="rounded-2xl border border-[#e3e8ee] bg-white p-5 text-sm text-[#6a7383]">
        No files on related meetings yet. Open a meeting and upload a file to
        see it here.
      </p>
    );
  }

  return (
    <div className="min-h-0 space-y-5 overflow-y-auto">
      {grouped.map(({ meeting, items, taskCount }) => (
        <section
          key={meeting.id}
          className="rounded-[8px] border border-[#e3e8ee] bg-white p-5"
        >
          <h2 className={`min-w-0 break-words ${typeScale.section}`}>{meeting.title}</h2>
          <p className="mt-2 text-[12px] leading-5 text-[#6a7383]">
            {meeting.whenShort}
            {" · "}
            available on {taskCount} {taskCount === 1 ? "task" : "tasks"} from
            this meeting
          </p>
          <ul className="mt-4 space-y-2">
            {items.map((file) => (
              <li key={file.id}>
                <FileRow file={file} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function BoardCalendar({
  tasks,
  onEditTask,
}: {
  tasks: BoardTask[];
  onEditTask: (task: BoardTask) => void;
}) {
  const [selected, setDue] = useState(tasks[0]?.dueDate ?? "2024-10-14");
  const weeks = [
    [30, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 1, 2, 3],
  ];
  const dueDates = new Set(tasks.map((t) => t.dueDate));
  const dayTasks = tasks.filter((t) => t.dueDate === selected);

  return (
    <div className="grid min-h-0 min-w-0 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <section className="min-w-0 rounded-[8px] border border-[#e3e8ee] bg-white p-5">
        <p className={`mb-3 ${typeScale.section}`}>October 2024</p>
        <div className="grid grid-cols-7 text-center text-[11px] font-medium text-[#8898aa]">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d} className="py-1">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[13px]">
          {weeks.flatMap((week, wi) =>
            week.map((day, di) => {
              const faded = (wi === 0 && day > 7) || (wi === 4 && day < 8);
              const iso = faded
                ? wi === 0
                  ? `2024-09-${String(day).padStart(2, "0")}`
                  : `2024-11-${String(day).padStart(2, "0")}`
                : `2024-10-${String(day).padStart(2, "0")}`;
              const selectedDay = iso === selected;
              const marked = dueDates.has(iso);
              return (
                <button
                  key={`${wi}-${di}`}
                  type="button"
                  onClick={() => setDue(iso)}
                  className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                    selectedDay
                      ? "bg-[#635bff] font-semibold text-white"
                      : faded
                        ? "text-[#c1c9d2] hover:bg-[#f6f9fc]"
                        : "text-[#425466] hover:bg-[#f6f9fc]"
                  }`}
                >
                  {day}
                  {marked && !selectedDay && (
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#635bff]" />
                  )}
                </button>
              );
            }),
          )}
        </div>
      </section>
      <ul className="min-h-0 min-w-0 space-y-2 overflow-y-auto p-0.5">
        {dayTasks.length === 0 && (
          <li className="rounded-2xl border border-[#e3e8ee] bg-white p-5 text-[14px] text-[#6a7383]">
            No tasks due on {formatDueDate(selected)}.
          </li>
        )}
        {dayTasks.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => onEditTask(task)}
              className={`flex w-full items-center justify-between gap-3 ${cardRadius} border border-[#e3e8ee] bg-white px-4 py-3 text-left transition-colors hover:border-[#635bff] hover:shadow-[inset_0_0_0_1.5px_#635bff] active:border-[#635bff] active:shadow-[inset_0_0_0_1.5px_#635bff] focus-visible:border-[#635bff] focus-visible:shadow-[inset_0_0_0_1.5px_#635bff] focus-visible:outline-none`}
            >
              <span className="min-w-0">
                <span className={`block min-w-0 break-words ${typeScale.card}`}>
                  {task.title}
                </span>
                <span className="mt-0.5 block min-w-0 break-words text-[12.5px] text-[#6a7383]">
                </span>
              </span>
              <PriorityPill priority={task.priority} size="lg" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BoardColumns({
  tasks,
  activeTaskId,
  showProject,
  onEditTask,
  onMoveTask,
}: {
  tasks: BoardTask[];
  activeTaskId?: string | null;
  showProject?: boolean;
  onEditTask: (task: BoardTask) => void;
  onMoveTask: (taskId: string, status: BoardColumn) => void;
}) {
  const [over, setOver] = useState<BoardColumn | null>(null);

  const dropOn = (column: BoardColumn, event: DragEvent) => {
    event.preventDefault();
    setOver(null);
    const id = event.dataTransfer.getData("text/task-id");
    if (id) onMoveTask(id, column);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 gap-4 overflow-x-auto pb-1">
      {columns.map((column) => {
        const items = tasks
          .filter((t) => t.status === column)
          .sort(
            (a, b) => priorityRank[a.priority] - priorityRank[b.priority],
          );
        const highlighted = over === column;
        return (
          <section
            key={column}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setOver(column);
            }}
            onDragLeave={() => setOver((current) => (current === column ? null : current))}
            onDrop={(event) => dropOn(column, event)}
            className={`flex min-h-0 w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl p-3.5 pb-2.5 transition-colors xl:w-auto xl:min-w-[320px] xl:flex-1 ${
              highlighted ? "bg-[#e8eaee]" : "bg-[#f6f9fc]"
            }`}
          >
            <div className="mb-3">
              <h2 className={`inline-flex min-w-0 flex-wrap items-baseline gap-x-3 ${typeScale.card}`}>
                {columnLabel(column)}
                <span className="font-medium text-[#6a7383]">{items.length}</span>
              </h2>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto px-0.5 pt-0.5">
              <div className="flex min-h-[120px] flex-1 flex-col gap-3 pb-1.5">
              {items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  active={task.id === activeTaskId}
                  showProject={showProject}
                  onEdit={() => onEditTask(task)}
                  onMove={(status) => onMoveTask(task.id, status)}
                />
              ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function TaskCard({
  task,
  active,
  showProject,
  onEdit,
  onMove,
}: {
  task: BoardTask;
  active: boolean;
  showProject?: boolean;
  onEdit: () => void;
  onMove: (status: BoardColumn) => void;
}) {
  const dragged = useRef(false);
  const accents: Record<BoardTask["priority"], string> = {
    high: "border-l-[#e11d48] bg-[#fff8fa]",
    medium: "border-l-[#f59e0b] bg-white",
    low: "border-l-[#22c55e] bg-white",
  };

  return (
    <article
      id={`task-card-${task.id}`}
      draggable
      onDragStart={(event) => {
        dragged.current = true;
        event.dataTransfer.setData("text/task-id", task.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          dragged.current = false;
        }, 0);
      }}
      onClick={() => {
        if (dragged.current) return;
        onEdit();
      }}
      className={`cursor-pointer ${cardRadius} border border-l-4 bg-white p-3.5 text-left transition-colors ${
        active
          ? "border-[#635bff] border-l-[#635bff] shadow-[inset_0_0_0_1.5px_#635bff]"
          : `shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${accents[task.priority]} border-[#e3e8ee] hover:border-[#635bff] hover:border-l-[#635bff] hover:shadow-[inset_0_0_0_1.5px_#635bff]`
      }`}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <PriorityPill priority={task.priority} size="lg" />
        <span
          className="inline-flex cursor-grab text-[#a3acb9] active:cursor-grabbing"
          title="Drag to another column"
          aria-hidden
        >
          <GripIcon />
        </span>
      </div>
      <p className="flex min-w-0 items-start gap-2 break-words text-[15px] font-semibold leading-snug text-[#0a2540]">
        {task.status === "done" && (
          <span className="mt-0.5 text-[#16a34a]">
            <CheckIcon />
          </span>
        )}
        {task.title}
      </p>
      {showProject && (
        <p className="mt-2 min-w-0 break-words text-[12px] font-medium text-[#6a7383]">
          {projectById(task.projectId).name}
        </p>
      )}
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#6a7383]">
        {task.description}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="inline-flex">
          {task.assigneeIds.map((id, i) => (
            <span
              key={id}
              className="rounded-full ring-2 ring-white"
              style={{ marginLeft: i === 0 ? 0 : -6 }}
            >
              <Avatar person={personById(id)} size="xs" />
            </span>
          ))}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] text-[#6a7383]">
          <CalendarIcon />
          {formatDueDate(task.dueDate)}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {columns.map((column) => {
          const current = task.status === column;
          return (
            <button
              key={column}
              type="button"
              title={`Move to ${columnLabel(column)}`}
              onClick={(event) => {
                event.stopPropagation();
                if (!current) onMove(column);
              }}
              className={`h-7 rounded-lg px-1 text-[10px] font-semibold ${
                current
                  ? "bg-[#635bff] text-white"
                  : "bg-[#f6f9fc] text-[#6a7383] hover:bg-[#eeedfe] hover:text-[#635bff]"
              }`}
            >
              {statusShort[column]}
            </button>
          );
        })}
      </div>
    </article>
  );
}
