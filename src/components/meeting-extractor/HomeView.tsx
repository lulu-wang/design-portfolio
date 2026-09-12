"use client";

import {
  currentUser,
  formatDueDate,
  peopleOnProject,
  projectById,
  projectKindMeta,
  projects,
  type AppMeeting,
  type BoardTask,
  type Decision,
} from "@/data/meeting-extractor";
import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronIcon,
  MeetingCallLink,
  PageHeader,
  PriorityPill,
  ProjectKindGlyph,
  TasksIcon,
  cardInteractive,
  cardMuted,
  cardRadius,
  cardSurface,
  rowInteractive,
  typeScale,
} from "./ui";

export default function HomeView({
  meetings,
  tasks,
  decisions,
  onOpenMeeting,
  onOpenTask,
  onOpenProject,
  onOpenProjects,
  onOpenMeetings,
  onOpenTasks,
}: {
  meetings: AppMeeting[];
  tasks: BoardTask[];
  decisions: Decision[];
  onOpenMeeting: (id: string) => void;
  onOpenTask: (task: BoardTask) => void;
  onOpenProject: (id: string) => void;
  onOpenProjects: () => void;
  onOpenMeetings: () => void;
  onOpenTasks: () => void;
}) {
  const today = "2024-09-09";
  const myTasks = tasks.filter((task) =>
    task.assigneeIds.includes(currentUser.id),
  );
  const openMine = myTasks.filter((task) => task.status !== "done");
  const todayMeetings = meetings.filter((meeting) => meeting.date === today);
  const reviewCount = decisions.filter(
    (decision) => decision.status !== "confirmed",
  ).length;
  const upcoming = [...meetings]
    .filter((meeting) => meeting.date >= today)
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.timeRange.localeCompare(b.timeRange),
    );
  const nextTasks = [...openMine].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  );
  const projectCards = projects.map((project) => {
    const items = tasks.filter((task) => task.projectId === project.id);
    const done = items.filter((task) => task.status === "done").length;
    const people = peopleOnProject(project.id, tasks, meetings);
    return { project, items, done, people };
  });

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <PageHeader
        title={`Good morning, ${currentUser.name.split(" ")[0]}`}
        subtitle="Your work for today, across meetings, tasks, and projects."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Meetings today"
          value={todayMeetings.length}
          hint="Sep 9, 2024"
          tone="blue"
          onClick={onOpenMeetings}
        />
        <StatCard
          label="My open tasks"
          value={openMine.length}
          hint="Assigned to you"
          tone="green"
          onClick={onOpenTasks}
        />
        <StatCard
          label="Needs review"
          value={reviewCount}
          hint="Open decisions"
          tone="peach"
          onClick={() =>
            onOpenMeeting(
              todayMeetings[0]?.id ?? meetings[0]?.id ?? "product-weekly",
            )
          }
        />
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <section className={`${cardMuted} border border-[#eceef2] p-6 text-left sm:p-7`}>
          <div className="mb-5 flex items-center justify-between gap-2">
            <h2 className={typeScale.section}>Upcoming meetings</h2>
            <button
              type="button"
              onClick={onOpenMeetings}
              className={`inline-flex shrink-0 items-center gap-1 text-[#6b7280] hover:text-[#111827] ${typeScale.button}`}
            >
              Calendar
              <ChevronIcon />
            </button>
          </div>
          <ul className="space-y-2">
            {upcoming.length === 0 && (
              <li className={`rounded-2xl px-5 py-6 ${typeScale.subtitle}`}>
                No upcoming meetings on the calendar.
              </li>
            )}
            {upcoming.map((meeting) => {
              const linked = tasks.filter(
                (task) => task.meetingId === meeting.id,
              );
              return (
                <li key={meeting.id}>
                  <div
                    className={`flex w-full items-start justify-between gap-4 px-5 py-5 text-left ${rowInteractive}`}
                  >
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
                      <button
                        type="button"
                        onClick={() => onOpenMeeting(meeting.id)}
                        className={`block w-full min-w-0 break-words text-left leading-snug ${typeScale.card}`}
                      >
                        {meeting.title}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenMeeting(meeting.id)}
                        className="flex w-full min-w-0 items-start justify-start gap-1.5 text-left text-[13px] leading-4 text-[#8b919c] hover:text-[#111827]"
                      >
                        <span className="mt-px shrink-0">
                          <CalendarIcon />
                        </span>
                        <span className="min-w-0 break-words">
                          {meeting.whenShort}
                        </span>
                      </button>
                      <MeetingCallLink meeting={meeting} />
                      {linked.length > 0 && (
                        <p className={`w-full text-left ${typeScale.meta} leading-4`}>
                          {linked.length}{" "}
                          {linked.length === 1 ? "task" : "tasks"} involved
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenMeeting(meeting.id)}
                      className="mt-0.5 shrink-0 text-[#c5cad3]"
                      aria-label={`Open ${meeting.title}`}
                    >
                      <ChevronIcon />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={`${cardSurface} p-5`}>
          <div className="mb-5 flex items-center justify-between gap-2">
            <h2 className={typeScale.section}>My tasks</h2>
            <button
              type="button"
              onClick={onOpenTasks}
              className={`inline-flex items-center gap-1 text-[#6b7280] hover:text-[#111827] ${typeScale.button}`}
            >
              All tasks
              <ChevronIcon />
            </button>
          </div>
          <ul className="space-y-1">
            {nextTasks.length === 0 && (
              <li className={`rounded-2xl px-3 py-5 ${typeScale.subtitle}`}>
                You’re clear. Nothing assigned to you right now.
              </li>
            )}
            {nextTasks.map((task) => (
              <li key={task.id}>
                <button
                  type="button"
                  onClick={() => onOpenTask(task)}
                  className={`flex w-full min-w-0 items-center gap-3 px-3 py-3 text-left ${rowInteractive}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className={`block min-w-0 break-words ${typeScale.card}`}>
                      {task.title}
                    </span>
                    <span className={`mt-1 block min-w-0 break-words ${typeScale.meta}`}>
                      {projectById(task.projectId).name} ·{" "}
                      {formatDueDate(task.dueDate)}
                    </span>
                  </span>
                  <PriorityPill priority={task.priority} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6">
        <div className="mb-5 flex items-center justify-between gap-2">
          <h2 className={typeScale.section}>Projects</h2>
          <button
            type="button"
            onClick={onOpenProjects}
            className={`inline-flex items-center gap-1 text-[#6b7280] hover:text-[#111827] ${typeScale.button}`}
          >
            View all
            <ChevronIcon />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projectCards.map(({ project, items, done, people }) => {
            const theme = projectKindMeta[project.kind];
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onOpenProject(project.id)}
                className={`${cardSurface} ${cardInteractive} p-5 text-left`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg md:h-10 md:w-10 md:rounded-xl"
                    style={{ background: theme.iconBg, color: theme.fg }}
                  >
                    <ProjectKindGlyph kind={project.kind} />
                  </span>
                  <span
                    className="inline-flex h-7 items-center rounded-full px-2.5 text-[13px] font-medium"
                    style={{ background: theme.iconBg, color: theme.fg }}
                  >
                    {theme.label}
                  </span>
                </span>
                <span className={`mt-4 block min-w-0 break-words ${typeScale.section}`}>{project.name}</span>
                <span className={`mt-1 block min-w-0 break-words ${typeScale.subtitle}`}>
                  Created {project.createdOn} · {people.length} people
                </span>
                <span
                  className={`mt-4 flex items-center justify-between ${typeScale.meta}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <TasksIcon />
                    {items.length} tasks
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircleIcon />
                    {done} done
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  tone,
  onClick,
}: {
  label: string;
  value: number;
  hint: string;
  tone: "green" | "blue" | "peach";
  onClick: () => void;
}) {
  const surfaces: Record<typeof tone, string> = {
    green: `${cardRadius} border border-[#e6f6e8] bg-[#e6f6e8]`,
    blue: `${cardRadius} border border-[#ecf4fb] bg-[#ecf4fb]`,
    peach: `${cardRadius} border border-[#fcf6f0] bg-[#fcf6f0]`,
  };
  const labels: Record<typeof tone, string> = {
    green: "text-[#5f8f72]",
    blue: "text-[#6e9acd]",
    peach: "text-[#c48a62]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-0 break-words px-6 py-6 text-left ${surfaces[tone]} ${cardInteractive}`}
    >
      <p className={`text-[13px] font-medium leading-5 ${labels[tone]}`}>{label}</p>
      <p className={`mt-3 ${typeScale.stat}`}>{value}</p>
      <p className={`mt-2 text-[12px] leading-5 ${labels[tone]} opacity-80`}>{hint}</p>
    </button>
  );
}
