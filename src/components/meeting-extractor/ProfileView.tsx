"use client";

import { useState } from "react";
import {
  currentUser,
  currentUserProfile,
  personById,
} from "@/data/meeting-extractor";
import { Avatar, PageHeader, typeScale } from "./ui";

export default function ProfileView({
  onSave,
}: {
  onSave: (text: string) => void;
}) {
  const manager = personById(currentUserProfile.managerId);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <PageHeader
        title="Profile"
        subtitle="Your account, personal details, and employee information."
      />

      <section className="mt-6 flex min-w-0 items-center gap-4 rounded-[22px] border border-[#eceef2] bg-white p-5">
        <Avatar person={currentUser} size="lg" />
        <div className="min-w-0">
          <p className={`${typeScale.pageTitle} break-words`}>
            {currentUser.name}
          </p>
          <p className={`mt-0.5 min-w-0 break-words ${typeScale.subtitle}`}>
            {currentUserProfile.title} · {currentUserProfile.department}
          </p>
          <p className={`mt-0.5 min-w-0 break-words ${typeScale.subtitle}`}>
            {currentUserProfile.email}
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-[22px] border border-[#eceef2] bg-white p-5">
        <h2 className={`${typeScale.section} break-words`}>Personal information</h2>
        <dl className="mt-3 divide-y divide-[#f0f1f4]">
          <InfoRow label="Full name" value={currentUser.name} />
          <InfoRow label="Email" value={currentUserProfile.email} />
          <InfoRow label="Location" value={currentUserProfile.location} />
          <InfoRow label="Timezone" value={currentUserProfile.timezone} />
        </dl>
      </section>

      <section className="mt-5 rounded-[22px] border border-[#eceef2] bg-white p-5">
        <h2 className={`${typeScale.section} break-words`}>Employee information</h2>
        <dl className="mt-3 divide-y divide-[#f0f1f4]">
          <InfoRow label="Employee ID" value={currentUserProfile.employeeId} />
          <InfoRow label="Department" value={currentUserProfile.department} />
          <InfoRow label="Title" value={currentUserProfile.title} />
          <InfoRow label="Manager" value={manager.name} />
          <InfoRow label="Start date" value={currentUserProfile.startDate} />
          <InfoRow label="Office" value={currentUserProfile.workLocation} />
        </dl>
      </section>

      <section className="mt-5 rounded-[22px] border border-[#eceef2] bg-white p-5">
        <h2 className={`${typeScale.section} break-words`}>Account settings</h2>
        <p className={`mt-1.5 ${typeScale.subtitle}`}>
          Choose how Opal notifies you. Calendar is connected to{" "}
          {currentUserProfile.calendar}.
        </p>
        <div className="mt-4 divide-y divide-[#f0f1f4] border-y border-[#f0f1f4]">
          <ToggleRow
            label="Email notifications"
            hint="Digest and mention emails"
            on={emailAlerts}
            onToggle={() => setEmailAlerts((v) => !v)}
          />
          <ToggleRow
            label="Desktop notifications"
            hint="Alerts while Opal is open"
            on={desktopAlerts}
            onToggle={() => setDesktopAlerts((v) => !v)}
          />
          <ToggleRow
            label="Meeting reminders"
            hint="10 minutes before a meeting"
            on={meetingReminders}
            onToggle={() => setMeetingReminders((v) => !v)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onSave("Preferences saved")}
            className="inline-flex h-10 items-center rounded-xl bg-[#111827] px-4 text-[13px] font-medium text-white hover:bg-black"
          >
            Save preferences
          </button>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-1 py-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-3">
      <dt className={`min-w-0 break-words ${typeScale.meta}`}>{label}</dt>
      <dd className="min-w-0 break-words text-[13.5px] font-medium text-[#111827]">{value}</dd>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  on,
  onToggle,
}: {
  label: string;
  hint: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 py-3.5">
      <div className="min-w-0">
        <p className={`min-w-0 break-words ${typeScale.card}`}>{label}</p>
        <p className={`min-w-0 break-words ${typeScale.meta}`}>{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-[#7c5cf6]" : "bg-[#e5e7eb]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-[left] ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
