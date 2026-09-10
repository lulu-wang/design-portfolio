"use client";

import { useRef, useState, type DragEvent } from "react";
import {
  columnLabel,
  formatDueDate,
  personById,
  type BoardColumn,
  type BoardTask,
  type BoardView,
} from "@/data/meeting-extractor";
import {
  Avatar,
  BoardIcon,
  CalendarIcon,
  CheckIcon,
  FilesIcon,
  GripIcon,
  ListIcon,
  MoreIcon,
  PlusIcon,
  PriorityPill,
  SparkleIcon,
} from "./ui";

const columns: BoardColumn[] = ["todo", "in-progress", "done"];
const statusShort: Record<BoardColumn, string> = {
  todo: "To do",
  "in-progress": "Doing",
  done: "Done",
};

export default function TaskBoardView({
  tasks,
  boardView,
  activeTaskId,
  onBoardView,
  onAddTask,
  onEditTask,
  onMoveTask,
}: {
  tasks: BoardTask[];
  boardView: BoardView;
  activeTaskId?: string | null;
  onBoardView: (view: BoardView) => void;
  onAddTask: () => void;
  onEditTask: (task: BoardTask) => void;
  onMoveTask: (taskId: string, status: BoardColumn) => void;
}) {
  const tabs: { id: BoardView; label: string; icon: typeof BoardIcon }[] = [
    { id: "board", label: "Board", icon: BoardIcon },
    { id: "list", label: "List", icon: ListIcon },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
    { id: "files", label: "Files", icon: FilesIcon },
  ];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-6 pb-6 pt-4 sm:px-8">
      <p className="mb-3 text-[13px] text-[#8b919c]">
        Projects <span className="mx-1">›</span>
        <span className="text-[#374151]">Launch plan</span>
      </p>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.04em]">
            Launch plan
          </h1>
          <p className="mt-1 text-[13.5px] text-[#8b919c]">
            Turn decisions into action.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eceef2] bg-white text-[#6b7280]"
            aria-label="More"
          >
            <MoreIcon />
          </button>
          <button
            type="button"
            onClick={onAddTask}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#7c5cf6] px-4 text-[13.5px] font-medium text-white hover:bg-[#6d4ef0]"
          >
            <PlusIcon />
            Add task
          </button>
        </div>
      </div>

      <div className="mb-5 flex gap-5 border-b border-[#eceef2]">
        {tabs.map((item) => {
          const active = boardView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onBoardView(item.id)}
              className={`-mb-px inline-flex items-center gap-1.5 border-b-2 pb-3 text-[13.5px] font-medium ${
                active
                  ? "border-[#7c5cf6] text-[#111827]"
                  : "border-transparent text-[#8b919c] hover:text-[#374151]"
              }`}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </div>

      {boardView === "board" && (
        <BoardColumns
          tasks={tasks}
          activeTaskId={activeTaskId}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onMoveTask={onMoveTask}
        />
      )}

      {boardView === "list" && (
        <ul className="space-y-2 overflow-y-auto">
          {tasks.map((task) => (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => onEditTask(task)}
                className="flex w-full items-center gap-3 rounded-2xl border border-[#eceef2] bg-white px-4 py-3 text-left hover:border-[#ddd6fe]"
              >
                <PriorityPill priority={task.priority} size="lg" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">
                    {task.title}
                  </span>
                  <span className="text-[12.5px] text-[#8b919c]">
                    {columnLabel(task.status)} · {formatDueDate(task.dueDate)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {boardView === "calendar" && (
        <BoardCalendar tasks={tasks} onEditTask={onEditTask} />
      )}

      {boardView === "files" && (
        <p className="rounded-2xl border border-[#eceef2] bg-white p-5 text-[14px] text-[#6b7280]">
          No files attached yet. Tasks created from meetings keep the source
          transcript as context.
        </p>
      )}
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
      <section className="rounded-[22px] border border-[#eceef2] bg-white p-4">
        <p className="mb-3 text-[14px] font-semibold">October 2024</p>
        <div className="grid grid-cols-7 text-center text-[11px] font-medium text-[#9aa1ab]">
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
                      ? "bg-[#7c5cf6] font-semibold text-white"
                      : faded
                        ? "text-[#d0d4dc] hover:bg-[#f7f8fa]"
                        : "text-[#374151] hover:bg-[#f3f1fb]"
                  }`}
                >
                  {day}
                  {marked && !selectedDay && (
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#7c5cf6]" />
                  )}
                </button>
              );
            }),
          )}
        </div>
      </section>
      <ul className="min-w-0 space-y-2 overflow-y-auto">
        {dayTasks.length === 0 && (
          <li className="rounded-2xl border border-[#eceef2] bg-white p-5 text-[14px] text-[#6b7280]">
            No tasks due on {formatDueDate(selected)}.
          </li>
        )}
        {dayTasks.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => onEditTask(task)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#eceef2] bg-white px-4 py-3 text-left hover:border-[#ddd6fe]"
            >
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-semibold">
                  {task.title}
                </span>
                <span className="text-[12.5px] text-[#8b919c]">
                  {columnLabel(task.status)}
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
  onAddTask,
  onEditTask,
  onMoveTask,
}: {
  tasks: BoardTask[];
  activeTaskId?: string | null;
  onAddTask: () => void;
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
    <div className="flex min-h-0 min-w-0 flex-1 gap-4 overflow-auto pb-2">
      {columns.map((column) => {
        const items = tasks.filter((t) => t.status === column);
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
            className={`flex w-[280px] min-w-[260px] shrink-0 flex-col rounded-2xl p-1 transition-colors ${
              highlighted ? "bg-[#f3f1fb]" : ""
            }`}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-[14px] font-semibold text-[#111827]">
                {columnLabel(column)}{" "}
                <span className="font-medium text-[#8b919c]">{items.length}</span>
              </h2>
              <button
                type="button"
                onClick={onAddTask}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8b919c] hover:bg-white hover:text-[#111827]"
                aria-label={`Add ${columnLabel(column).toLowerCase()} task`}
              >
                <PlusIcon />
              </button>
            </div>
            <div className="flex min-h-[120px] min-w-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
              {items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  active={task.id === activeTaskId}
                  onEdit={() => onEditTask(task)}
                  onMove={(status) => onMoveTask(task.id, status)}
                />
              ))}
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
  onEdit,
  onMove,
}: {
  task: BoardTask;
  active: boolean;
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
      className={`cursor-pointer rounded-2xl border border-l-4 bg-white p-3.5 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors ${
        accents[task.priority]
      } ${
        active
          ? "border-[#7c5cf6] ring-2 ring-[#eee8ff]"
          : "border-[#eceef2] hover:border-[#ddd6fe]"
      }`}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <PriorityPill priority={task.priority} size="lg" />
        <span
          className="inline-flex cursor-grab text-[#c5cad3] active:cursor-grabbing"
          title="Drag to another column"
          aria-hidden
        >
          <GripIcon />
        </span>
      </div>
      <p className="flex items-start gap-2 text-[14px] font-semibold leading-snug text-[#111827]">
        {task.status === "done" && (
          <span className="mt-0.5 text-[#16a34a]">
            <CheckIcon />
          </span>
        )}
        {task.title}
      </p>
      {task.fromMeeting && (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#eee8ff] px-2 py-0.5 text-[11.5px] font-medium text-[#6d4aff]">
          <SparkleIcon />
          From meeting
        </span>
      )}
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#6b7280]">
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
        <span className="inline-flex items-center gap-1 text-[12px] text-[#6b7280]">
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
              className={`h-7 rounded-lg text-[11px] font-semibold ${
                current
                  ? "bg-[#111827] text-white"
                  : "bg-[#f4f5f8] text-[#6b7280] hover:bg-[#ece8ff] hover:text-[#6d4aff]"
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
