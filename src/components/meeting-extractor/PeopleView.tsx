"use client";

import { useMemo, useState } from "react";
import {
  columnLabel,
  people,
  personById,
  personDetails,
  projectById,
  type AppMeeting,
  type BoardTask,
  type Person,
} from "@/data/meeting-extractor";
import {
  Avatar,
  CalendarIcon,
  cardSurface,
  ChevronIcon,
  FolderIcon,
  SearchIcon,
  TasksIcon,
  cardInteractive,
  rowInteractive,
  typeScale,
} from "./ui";

export default function PeopleView({
  person,
  meetings,
  tasks,
  onOpenPerson,
  onBack,
  onOpenMeeting,
  onOpenTask,
  onOpenProject,
}: {
  person: Person | null;
  meetings: AppMeeting[];
  tasks: BoardTask[];
  onOpenPerson: (id: string) => void;
  onBack: () => void;
  onOpenMeeting: (id: string) => void;
  onOpenTask: (task: BoardTask) => void;
  onOpenProject: (id: string) => void;
}) {
  if (person) {
    return (
      <PersonDetail
        person={person}
        meetings={meetings}
        tasks={tasks}
        onBack={onBack}
        onOpenMeeting={onOpenMeeting}
        onOpenTask={onOpenTask}
        onOpenProject={onOpenProject}
      />
    );
  }
  return <PeopleDirectory onOpenPerson={onOpenPerson} />;
}

function PeopleDirectory({
  onOpenPerson,
}: {
  onOpenPerson: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter((person) => {
      const details = personDetails(person);
      return (
        person.name.toLowerCase().includes(q) ||
        person.email.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q) ||
        details.title.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="mb-7 min-w-0">
        <h1 className={`${typeScale.pageTitle} inline-flex min-w-0 flex-wrap items-baseline gap-x-3.5 break-words`}>
          People
          <span className="text-[15px] font-medium leading-none text-[#8b919c]">
            {people.length} people
          </span>
        </h1>
      </div>
      <label className="relative mb-5 block w-full">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98a0ab]">
          <SearchIcon />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, role, or email…"
          className="h-10 w-full rounded-full border border-[#eceef2] bg-white py-2 pl-10 pr-4 text-[13px] outline-none placeholder:text-[#b0b6bf] focus:border-[#ddd6fe] focus:ring-4 focus:ring-[#eee8ff]"
        />
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {matches.map((person) => {
          const details = personDetails(person);
          return (
            <button
              key={person.id}
              type="button"
              onClick={() => onOpenPerson(person.id)}
              className={`${cardSurface} ${cardInteractive} flex items-center gap-3 p-4 text-left`}
            >
              <Avatar person={person} />
              <span className="min-w-0 flex-1">
                <span className={`block min-w-0 break-words ${typeScale.card}`}>
                  {person.name}
                </span>
                <span className={`mt-0.5 block min-w-0 break-words ${typeScale.meta}`}>
                  {details.title} · {person.role}
                </span>
                <span className={`mt-0.5 block min-w-0 break-words ${typeScale.meta}`}>
                  {person.email}
                </span>
              </span>
              <span className="text-[#c5cad3]">
                <ChevronIcon />
              </span>
            </button>
          );
        })}
      </div>
      {matches.length === 0 && (
        <p className={`mt-8 ${typeScale.subtitle}`}>
          No one matches “{query.trim()}”.
        </p>
      )}
    </div>
  );
}

function PersonDetail({
  person,
  meetings,
  tasks,
  onBack,
  onOpenMeeting,
  onOpenTask,
  onOpenProject,
}: {
  person: Person;
  meetings: AppMeeting[];
  tasks: BoardTask[];
  onBack: () => void;
  onOpenMeeting: (id: string) => void;
  onOpenTask: (task: BoardTask) => void;
  onOpenProject: (id: string) => void;
}) {
  const details = personDetails(person);
  const theirMeetings = meetings.filter((meeting) =>
    meeting.attendeeIds.includes(person.id),
  );
  const theirTasks = tasks.filter((task) =>
    task.assigneeIds.includes(person.id),
  );
  const projectIds = [
    ...new Set([
      ...theirTasks.map((task) => task.projectId),
      ...theirMeetings.map((meeting) => meeting.projectId),
    ]),
  ];
  const manager =
    person.id === "alex" ? personById("maya") : personById("alex");

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <p className="mb-3 flex items-center gap-2 text-[13px] text-[#8b919c]">
        <button type="button" onClick={onBack} className="hover:text-[#111827]">
          People
        </button>
        <span>›</span>
        <span className="text-[#374151]">{person.name}</span>
      </p>
      <section className={`${cardSurface} flex items-center gap-4 p-5`}>
        <Avatar person={person} size="lg" />
        <div className="min-w-0">
          <h1 className={`${typeScale.pageTitle} break-words`}>{person.name}</h1>
          <p className={`mt-1 min-w-0 break-words ${typeScale.meta}`}>
            {details.title} · {details.department}
          </p>
          <p className={`mt-0.5 min-w-0 break-words ${typeScale.meta}`}>{person.email}</p>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className={`${cardSurface} p-5`}>
          <h2 className={typeScale.section}>Profile</h2>
          <dl className="mt-3 divide-y divide-[#f0f1f4]">
            <InfoRow label="Full name" value={person.name} />
            <InfoRow label="Email" value={person.email} />
            <InfoRow label="Title" value={details.title} />
            <InfoRow label="Department" value={details.department} />
            <InfoRow label="Employee ID" value={details.employeeId} />
            <InfoRow label="Manager" value={manager.name} />
            <InfoRow label="Start date" value={details.startDate} />
            <InfoRow label="Location" value={details.location} />
            <InfoRow label="Timezone" value={details.timezone} />
            <InfoRow label="Office" value={details.workLocation} />
          </dl>
        </section>

        <div className="space-y-4">
          <section className={`${cardSurface} p-5`}>
            <h2 className={typeScale.section}>Projects</h2>
            <ul className="mt-3 space-y-1">
              {projectIds.length === 0 && (
                <li className={typeScale.subtitle}>No linked projects yet.</li>
              )}
              {projectIds.map((id) => {
                const project = projectById(id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onOpenProject(id)}
                      className={`flex w-full min-w-0 items-center gap-2 px-2.5 py-2 text-left ${rowInteractive}`}
                    >
                      <FolderIcon />
                      <span className="min-w-0 flex-1">
                        <span className={`block min-w-0 break-words ${typeScale.card}`}>
                          {project.name}
                        </span>
                        <span className={`block min-w-0 break-words ${typeScale.meta}`}>
                          {project.subtitle}
                        </span>
                      </span>
                      <ChevronIcon />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={`${cardSurface} p-5`}>
            <h2 className={typeScale.section}>Meetings</h2>
            <ul className="mt-3 space-y-1">
              {theirMeetings.length === 0 && (
                <li className={typeScale.subtitle}>No meetings on the calendar.</li>
              )}
              {theirMeetings.map((meeting) => (
                <li key={meeting.id}>
                  <button
                    type="button"
                    onClick={() => onOpenMeeting(meeting.id)}
                    className={`flex w-full min-w-0 items-center gap-2 px-2.5 py-2 text-left ${rowInteractive}`}
                  >
                    <CalendarIcon />
                    <span className="min-w-0 flex-1">
                      <span className={`block min-w-0 break-words ${typeScale.card}`}>
                        {meeting.title}
                      </span>
                      <span className={`block ${typeScale.meta}`}>
                        {meeting.whenShort}
                      </span>
                    </span>
                    <ChevronIcon />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${cardSurface} p-5`}>
            <h2 className={typeScale.section}>Tasks</h2>
            <ul className="mt-3 space-y-1">
              {theirTasks.length === 0 && (
                <li className={typeScale.subtitle}>No tasks assigned.</li>
              )}
              {theirTasks.map((task) => (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => onOpenTask(task)}
                    className={`flex w-full min-w-0 items-center gap-2 px-2.5 py-2 text-left ${rowInteractive}`}
                  >
                    <TasksIcon />
                    <span className="min-w-0 flex-1">
                      <span className={`block min-w-0 break-words ${typeScale.card}`}>
                        {task.title}
                      </span>
                      <span className={`block ${typeScale.meta}`}>
                        {projectById(task.projectId).name} · {columnLabel(task.status)}
                      </span>
                    </span>
                    <ChevronIcon />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-1 py-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-3">
      <dt className={typeScale.meta}>{label}</dt>
      <dd className="min-w-0 break-words text-[13px] font-medium text-[#111827]">{value}</dd>
    </div>
  );
}
