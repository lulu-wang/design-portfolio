import type { ReactNode } from "react";
import {
  personById,
  priorityLabel,
  statusLabel,
  type DecisionStatus,
  type Person,
  type TaskPriority,
} from "@/data/meeting-extractor";

export function Avatar({
  person,
  size = "md",
}: {
  person: Person | ReturnType<typeof personById>;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg"
      ? "h-10 w-10 text-[13px]"
      : size === "sm"
        ? "h-7 w-7 text-[10px]"
        : size === "xs"
          ? "h-6 w-6 text-[9px]"
          : "h-8 w-8 text-[11px]";
  return (
    <span
      className={`relative inline-flex ${dim} shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold`}
      style={{ background: person.avatarBg, color: person.avatarFg }}
    >
      <span className="pointer-events-none select-none">{person.initials}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.photo}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ background: person.avatarBg }}
      />
    </span>
  );
}

export function AvatarStack({
  ids,
  extra = 0,
  size = "sm",
}: {
  ids: string[];
  extra?: number;
  size?: "xs" | "sm";
}) {
  return (
    <span className="inline-flex items-center">
      {ids.map((id, i) => (
        <span
          key={id}
          className="rounded-full ring-2 ring-white"
          style={{ marginLeft: i === 0 ? 0 : -8, zIndex: ids.length - i }}
        >
          <Avatar person={personById(id)} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span
          className={`ml-[-8px] inline-flex ${size === "xs" ? "h-6 w-6 text-[9px]" : "h-7 w-7 text-[10px]"} items-center justify-center rounded-full bg-[#eef0f4] font-semibold text-[#5b6573] ring-2 ring-white`}
        >
          +{extra}
        </span>
      )}
    </span>
  );
}

export function StatusPill({ status }: { status: DecisionStatus }) {
  const styles: Record<DecisionStatus, string> = {
    "needs-review": "bg-[#fdecc8] text-[#9a6b16]",
    confirmed: "bg-[#eee8ff] text-[#6d4aff]",
    open: "bg-[#eef0f3] text-[#5b6573]",
  };
  return (
    <span
      className={`inline-flex h-[22px] shrink-0 items-center rounded-full px-2.5 text-[11.5px] font-medium ${styles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}

export function PriorityPill({
  priority,
  size = "sm",
}: {
  priority: TaskPriority;
  size?: "sm" | "lg";
}) {
  const styles: Record<TaskPriority, string> = {
    high: "bg-[#fce7f3] text-[#e11d48]",
    medium: "bg-[#fef3c7] text-[#b45309]",
    low: "bg-[#dcfce7] text-[#15803d]",
  };
  const dots: Record<TaskPriority, string> = {
    high: "bg-[#e11d48]",
    medium: "bg-[#d97706]",
    low: "bg-[#16a34a]",
  };
  const large = size === "lg";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-semibold ${
        large
          ? "h-7 gap-1.5 px-2.5 text-[12.5px]"
          : "h-[22px] px-2.5 text-[11.5px] font-medium"
      } ${styles[priority]}`}
    >
      {large && (
        <span className={`h-1.5 w-1.5 rounded-full ${dots[priority]}`} />
      )}
      {priorityLabel(priority)}
    </span>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#7c5cf6] text-white ${className}`}
    >
      <OpalGem />
    </span>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-medium text-[#6b7280]">{children}</p>
  );
}

export function MenuItem({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full px-3.5 py-2 text-left text-[13px] text-[#374151] hover:bg-[#f7f8fa]"
    >
      {children}
    </button>
  );
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[16px] font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f7f8fa]"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Icon({
  children,
  size = 18,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function stroke(props: { strokeWidth?: number } = {}) {
  return {
    stroke: "currentColor",
    strokeWidth: props.strokeWidth ?? 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export function OpalGem() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 10.2 12 21l7-10.8L12 3Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M5 10.2h14" stroke="#fff" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <Icon>
      <circle cx="11" cy="11" r="6.5" {...stroke()} />
      <path d="M16 16.5 20 20.5" {...stroke()} />
    </Icon>
  );
}

export function BellIcon() {
  return (
    <Icon>
      <path
        d="M6 9.5a6 6 0 1 1 12 0c0 4 1.4 5.6 1.4 5.6H4.6S6 13.5 6 9.5Z"
        {...stroke()}
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" {...stroke()} />
    </Icon>
  );
}

export function HomeIcon() {
  return (
    <Icon>
      <path d="M4 11 12 4l8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8Z" {...stroke()} />
      <path d="M10 20.5V13h4v7.5" {...stroke()} />
    </Icon>
  );
}

export function MeetingsIcon() {
  return (
    <Icon>
      <rect x="4" y="6" width="16" height="14" rx="2.5" {...stroke()} />
      <path d="M8 4v4M16 4v4M4 10h16" {...stroke()} />
    </Icon>
  );
}

export function TasksIcon() {
  return (
    <Icon>
      <rect x="5" y="4" width="14" height="16" rx="2.5" {...stroke()} />
      <path d="M8.5 9.5h7M8.5 13h7" {...stroke()} />
    </Icon>
  );
}

export function ProjectsIcon() {
  return (
    <Icon>
      <path
        d="M3.5 8.5V18A1.5 1.5 0 0 0 5 19.5h14a1.5 1.5 0 0 0 1.5-1.5V10A1.5 1.5 0 0 0 19 8.5h-7.2L9.5 6H5A1.5 1.5 0 0 0 3.5 7.5v1Z"
        {...stroke()}
      />
    </Icon>
  );
}

export function SparkIcon() {
  return (
    <Icon>
      <path
        d="M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z"
        {...stroke()}
      />
    </Icon>
  );
}

export function PeopleIcon() {
  return (
    <Icon>
      <circle cx="9" cy="8" r="3" {...stroke()} />
      <path d="M4 18.5c.6-3 2.6-4.5 5-4.5s4.4 1.5 5 4.5" {...stroke()} />
      <circle cx="16.5" cy="8.5" r="2.3" {...stroke()} />
      <path d="M15.2 14.2c2.2.3 3.8 1.6 4.3 4.3" {...stroke()} />
    </Icon>
  );
}

export function SettingsIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="3" {...stroke()} />
      <path
        d="M12 4.5v1.6M12 17.9v1.6M4.5 12h1.6M17.9 12h1.6M6.4 6.4l1.1 1.1M16.5 16.5l1.1 1.1M6.4 17.6l1.1-1.1M16.5 7.5l1.1-1.1"
        {...stroke()}
      />
    </Icon>
  );
}

export function PlusIcon() {
  return (
    <Icon size={14}>
      <path d="M12 5v14M5 12h14" {...stroke({ strokeWidth: 2 })} />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon size={16}>
      <path d="M6 6l12 12M18 6 6 18" {...stroke()} />
    </Icon>
  );
}

export function GripIcon() {
  return (
    <Icon size={16}>
      <circle cx="9" cy="7" r="1.15" fill="currentColor" />
      <circle cx="15" cy="7" r="1.15" fill="currentColor" />
      <circle cx="9" cy="12" r="1.15" fill="currentColor" />
      <circle cx="15" cy="12" r="1.15" fill="currentColor" />
      <circle cx="9" cy="17" r="1.15" fill="currentColor" />
      <circle cx="15" cy="17" r="1.15" fill="currentColor" />
    </Icon>
  );
}

export function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="18" r="1.5" />
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <Icon size={16}>
      <path d="M9 5l7 7-7 7" {...stroke()} />
    </Icon>
  );
}

export function ChevronLeftIcon() {
  return (
    <Icon size={16}>
      <path d="M15 5l-7 7 7 7" {...stroke()} />
    </Icon>
  );
}

export function ChevronRightIcon() {
  return (
    <Icon size={16}>
      <path d="M9 5l7 7-7 7" {...stroke()} />
    </Icon>
  );
}

export function SidebarToggleIcon() {
  return (
    <Icon size={16}>
      <rect x="4" y="5" width="16" height="14" rx="2.2" {...stroke()} />
      <path d="M9 5v14" {...stroke()} />
    </Icon>
  );
}

export function ChevronDownIcon() {
  return (
    <Icon size={16}>
      <path d="M6 9l6 6 6-6" {...stroke()} />
    </Icon>
  );
}

export function CalendarIcon() {
  return (
    <Icon size={16}>
      <rect x="4" y="6" width="16" height="14" rx="2.5" {...stroke({ strokeWidth: 1.7 })} />
      <path d="M8 4v4M16 4v4M4 10h16" {...stroke({ strokeWidth: 1.7 })} />
    </Icon>
  );
}

export function VideoIcon() {
  return (
    <Icon size={16}>
      <rect x="3.5" y="7" width="12" height="10" rx="2" {...stroke()} />
      <path d="M15.5 10.5 20.5 8v8l-5-2.5v-3Z" {...stroke()} />
    </Icon>
  );
}

export function UploadIcon() {
  return (
    <Icon size={16}>
      <path d="M12 16V5" {...stroke()} />
      <path d="M8 8.5 12 4.5 16 8.5" {...stroke()} />
      <path d="M5 19.5h14" {...stroke()} />
    </Icon>
  );
}

export function MeetIcon() {
  return (
    <Icon size={16}>
      <rect x="3.5" y="6.5" width="11" height="11" rx="2.2" {...stroke()} />
      <path d="M14.5 10.2 20 8v8l-5.5-2.2v-3.6Z" {...stroke()} />
    </Icon>
  );
}

export function CheckIcon() {
  return (
    <Icon size={14}>
      <path d="M5 12.5 9.5 17 19 7.5" {...stroke({ strokeWidth: 2 })} />
    </Icon>
  );
}

export function DocIcon() {
  return (
    <Icon size={16}>
      <path
        d="M7 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        {...stroke({ strokeWidth: 1.6 })}
      />
      <path d="M14 3.5V9h5.5" {...stroke({ strokeWidth: 1.6 })} />
    </Icon>
  );
}

export function TranscriptIcon() {
  return (
    <Icon size={16}>
      <path d="M8 7h12M8 12h12M8 17h9" {...stroke()} />
      <circle cx="4.2" cy="7" r="1.1" fill="currentColor" />
      <circle cx="4.2" cy="12" r="1.1" fill="currentColor" />
      <circle cx="4.2" cy="17" r="1.1" fill="currentColor" />
    </Icon>
  );
}

export function FolderIcon() {
  return (
    <Icon size={16}>
      <path
        d="M3.5 8.5V18A1.5 1.5 0 0 0 5 19.5h14a1.5 1.5 0 0 0 1.5-1.5V10A1.5 1.5 0 0 0 19 8.5h-7.2L9.5 6H5A1.5 1.5 0 0 0 3.5 7.5v1Z"
        {...stroke({ strokeWidth: 1.6 })}
      />
    </Icon>
  );
}

export function PauseIcon() {
  return (
    <Icon size={14}>
      <path d="M8 6v12M16 6v12" {...stroke({ strokeWidth: 2.2 })} />
    </Icon>
  );
}

export function PlayIcon() {
  return (
    <Icon size={14}>
      <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
    </Icon>
  );
}

export function LeaveIcon() {
  return (
    <Icon size={14}>
      <path d="M10 7V5.5A1.5 1.5 0 0 1 11.5 4h7A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 10 18.5V17" {...stroke()} />
      <path d="M4 12h10M7 9l-3 3 3 3" {...stroke()} />
    </Icon>
  );
}

export function BoardIcon() {
  return (
    <Icon size={16}>
      <rect x="4" y="5" width="5" height="14" rx="1.2" {...stroke()} />
      <rect x="10.5" y="5" width="4" height="9" rx="1.2" {...stroke()} />
      <rect x="16" y="5" width="4" height="6" rx="1.2" {...stroke()} />
    </Icon>
  );
}

export function ListIcon() {
  return (
    <Icon size={16}>
      <path d="M8 7h12M8 12h12M8 17h12" {...stroke()} />
      <circle cx="4.2" cy="7" r="1.1" fill="currentColor" />
      <circle cx="4.2" cy="12" r="1.1" fill="currentColor" />
      <circle cx="4.2" cy="17" r="1.1" fill="currentColor" />
    </Icon>
  );
}

export function FilesIcon() {
  return (
    <Icon size={16}>
      <path d="M7 4.5h6l5 5V19A1.5 1.5 0 0 1 16.5 20.5h-9A1.5 1.5 0 0 1 6 19V6A1.5 1.5 0 0 1 7 4.5Z" {...stroke()} />
      <path d="M13 4.5V10h5" {...stroke()} />
    </Icon>
  );
}

export function ZoomIcon() {
  return (
    <Icon size={16}>
      <rect x="3.5" y="7" width="17" height="10" rx="2.5" {...stroke()} />
      <circle cx="10" cy="12" r="2.2" {...stroke()} />
      <path d="M14.5 10.5 18 9v6l-3.5-1.5v-3Z" {...stroke()} />
    </Icon>
  );
}

export function TagIcon() {
  return (
    <Icon size={16}>
      <path d="M4 12.5V7a2 2 0 0 1 2-2h5.5L20 14.5 13.5 21 4 12.5Z" {...stroke()} />
      <circle cx="8.2" cy="8.2" r="1" fill="currentColor" />
    </Icon>
  );
}

export function ClockIcon() {
  return (
    <Icon size={16}>
      <circle cx="12" cy="12" r="8" {...stroke()} />
      <path d="M12 8v5l3 2" {...stroke()} />
    </Icon>
  );
}

export function TrashIcon() {
  return (
    <Icon size={16}>
      <path d="M5 7h14M9 7V5h6v2M8 7l.8 12h6.4L16 7" {...stroke()} />
    </Icon>
  );
}

export function KCommandIcon() {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-[#e6e9ef] bg-white px-1 text-[11px] font-medium text-[#8b919c]">
      ⌘K
    </span>
  );
}

export function SparkleIcon() {
  return (
    <Icon size={14}>
      <path
        d="M12 3l1.2 4.6L18 9l-4.8 1.4L12 15l-1.2-4.6L6 9l4.8-1.4L12 3Z"
        fill="currentColor"
      />
    </Icon>
  );
}

export function CheckCircleIcon({ filled = false }: { filled?: boolean }) {
  return (
    <Icon size={18}>
      {filled ? (
        <>
          <circle cx="12" cy="12" r="8" fill="#7c5cf6" />
          <path d="M8.5 12.2 11 14.7 16 9.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <circle cx="12" cy="12" r="8" {...stroke({ strokeWidth: 1.6 })} />
      )}
    </Icon>
  );
}
