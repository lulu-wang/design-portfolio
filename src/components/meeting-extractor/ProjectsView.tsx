"use client";

import {
  peopleOnProject,
  personById,
  projectKindMeta,
  projects,
  type AppMeeting,
  type BoardTask,
} from "@/data/meeting-extractor";
import {
  AvatarStack,
  CheckCircleIcon,
  ChevronIcon,
  PageHeader,
  ProjectKindGlyph,
  TasksIcon,
  cardInteractive,
  cardSurface,
  typeScale,
} from "./ui";

export default function ProjectsView({
  tasks,
  meetings,
  onOpenProject,
}: {
  tasks: BoardTask[];
  meetings: AppMeeting[];
  onOpenProject: (id: string) => void;
}) {
  const cards = projects.map((project) => {
    const items = tasks.filter((task) => task.projectId === project.id);
    const done = items.filter((task) => task.status === "done").length;
    const doing = items.filter((task) => task.status === "in-progress").length;
    const progress = items.length ? Math.round((done / items.length) * 100) : 0;
    const people = peopleOnProject(project.id, tasks, meetings);
    const owner = personById(project.ownerId);
    const theme = projectKindMeta[project.kind];
    return { project, items, done, doing, progress, people, owner, theme };
  });

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <PageHeader
        title="Projects"
        subtitle="Open a project to see its tasks and assign work from the board."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {cards.map(
          ({ project, items, done, doing, progress, people, owner, theme }) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpenProject(project.id)}
              className={`${cardSurface} ${cardInteractive} flex flex-col p-5 text-left`}
            >
              <span className="flex items-start justify-between gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
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
                {project.description}
              </span>
              <span className={`mt-4 flex flex-wrap gap-x-4 gap-y-1 ${typeScale.meta}`}>
                <span>Created {project.createdOn}</span>
                <span>Led by {owner.name.split(" ")[0]}</span>
              </span>
              <span className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#f0f1f4]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${progress}%`, background: theme.fg }}
                />
              </span>
              <span className="mt-4 flex items-end justify-between gap-3">
                <span className={`flex flex-col gap-1 ${typeScale.meta}`}>
                  <span className="inline-flex items-center gap-1.5">
                    <TasksIcon />
                    {items.length} {items.length === 1 ? "task" : "tasks"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircleIcon />
                    {done} done · {doing} in progress
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <AvatarStack
                    ids={people.slice(0, 3)}
                    extra={Math.max(people.length - 3, 0)}
                    size="xs"
                  />
                  <span className="text-[#c5cad3]">
                    <ChevronIcon />
                  </span>
                </span>
              </span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
