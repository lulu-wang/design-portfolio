"use client";

import {
  personById,
  type SearchHit,
  type SearchHitKind,
} from "@/data/meeting-extractor";
import {
  Avatar,
  CheckCircleIcon,
  ChevronIcon,
  FolderIcon,
  MeetingsIcon,
  PageHeader,
  SearchIcon,
  TasksIcon,
  rowInteractive,
  typeScale,
} from "./ui";

const labels: Record<SearchHitKind, string> = {
  meeting: "Meetings",
  task: "Tasks",
  project: "Projects",
  person: "People",
  decision: "Decisions",
};

const order: SearchHitKind[] = [
  "meeting",
  "task",
  "project",
  "decision",
  "person",
];

export default function SearchResultsView({
  query,
  hits,
  onOpen,
}: {
  query: string;
  hits: SearchHit[];
  onOpen: (hit: SearchHit) => void;
}) {
  const grouped = order
    .map((kind) => ({ kind, items: hits.filter((hit) => hit.kind === kind) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <PageHeader
        title="Search"
        subtitle={`${hits.length} ${hits.length === 1 ? "result" : "results"} for “${query}”`}
      />

      {hits.length === 0 ? (
        <div className="mt-8 rounded-[8px] border border-[#e3e8ee] bg-white px-5 py-10 text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#eeedfe] text-[#635bff]">
            <SearchIcon />
          </span>
          <p className={`mt-3 ${typeScale.card}`}>No matches</p>
          <p className={`mt-1 ${typeScale.subtitle}`}>
            Try a meeting name, task, project, or teammate.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {grouped.map((group) => (
            <section key={group.kind}>
              <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#6a7383]">
                {labels[group.kind]}
              </h2>
              <ul className="space-y-1 rounded-[8px] border border-[#e3e8ee] bg-white p-1">
                {group.items.map((hit) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onClick={() => onOpen(hit)}
                      className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${rowInteractive}`}
                    >
                      <HitIcon hit={hit} />
                      <span className="min-w-0 flex-1">
                        <span className={`block min-w-0 break-words ${typeScale.card}`}>
                          {hit.title}
                        </span>
                        <span className="mt-0.5 block min-w-0 break-words text-[13px] text-[#6a7383]">
                          {hit.subtitle}
                        </span>
                      </span>
                      <span className="text-[#a3acb9]">
                        <ChevronIcon />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function HitIcon({ hit }: { hit: SearchHit }) {
  if (hit.kind === "person" && hit.personId) {
    return <Avatar person={personById(hit.personId)} size="sm" />;
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f6f9fc] text-[#6a7383]">
      {hit.kind === "meeting" && <MeetingsIcon />}
      {hit.kind === "task" && <TasksIcon />}
      {hit.kind === "project" && <FolderIcon />}
      {hit.kind === "decision" && <CheckCircleIcon />}
    </span>
  );
}
