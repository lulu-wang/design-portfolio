export type DecisionStatus = "needs-review" | "confirmed" | "open";
export type TaskPriority = "high" | "medium" | "low";
export type BoardColumn = "todo" | "in-progress" | "done";
export type MeetingTab = "notes" | "transcript" | "decisions";
export type BoardView = "board" | "list" | "calendar" | "files";
export type RecordingSource = "zoom" | "google-meet";
export type MeetingRecording = {
  name: string;
  kind: "audio" | "video";
  source: RecordingSource;
  url: string;
};

export type Person = {
  id: string;
  name: string;
  initials: string;
  role: string;
  photo: string;
  avatarBg: string;
  avatarFg: string;
};

export type TranscriptSegment =
  | { type: "text"; text: string }
  | { type: "quote"; text: string; decisionId: string };

export type Message = {
  id: string;
  speakerId: string;
  time: string;
  segments: TranscriptSegment[];
};

export type Decision = {
  id: string;
  meetingId: string;
  title: string;
  summary: string;
  ownerId: string;
  dueDate: string | null;
  status: DecisionStatus;
  sourceMessageId: string;
  sourceQuote: string;
};

export type BoardTask = {
  id: string;
  title: string;
  description: string;
  status: BoardColumn;
  priority: TaskPriority;
  dueDate: string;
  assigneeIds: string[];
  projectId: string;
  meetingId?: string;
  decisionId?: string;
  fromMeeting: boolean;
};

export type TaskDraft = {
  title: string;
  description: string;
  assigneeId: string;
  status: BoardColumn;
  dueDate: string;
  priority: TaskPriority;
  projectId: string;
  meetingId: string;
  decisionId: string;
};

export type MeetingNoteBlock = {
  heading: string;
  items: string[];
};

export type AppMeeting = {
  id: string;
  title: string;
  blurb: string;
  when: string;
  whenShort: string;
  dayLabel: string;
  timeRange: string;
  duration: string;
  location: string;
  tags: string[];
  attendeeIds: string[];
  extraAttendees: number;
  hostId: string;
  projectId: string;
  notes: MeetingNoteBlock[];
  messages: Message[];
  date: string;
  upcoming?: boolean;
  minutesUntil?: number;
};

export type GrepHit = {
  id: string;
  messageId: string;
  speakerId: string;
  snippet: string;
  suggestedTitle: string;
  dueDate: string | null;
};

export const people: Person[] = [
  {
    id: "alex",
    name: "Alex Rivera",
    initials: "AR",
    role: "Product",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    avatarBg: "#DBEAFE",
    avatarFg: "#1D4ED8",
  },
  {
    id: "maya",
    name: "Maya Chen",
    initials: "MC",
    role: "Design",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    avatarBg: "#FCE7F3",
    avatarFg: "#BE185D",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    initials: "JL",
    role: "Engineering",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    avatarBg: "#D1FAE5",
    avatarFg: "#047857",
  },
  {
    id: "taylor",
    name: "Taylor Kim",
    initials: "TK",
    role: "Marketing",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    avatarBg: "#FEF3C7",
    avatarFg: "#B45309",
  },
  {
    id: "riley",
    name: "Riley Park",
    initials: "RP",
    role: "Product",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    avatarBg: "#E0E7FF",
    avatarFg: "#5B21B6",
  },
  {
    id: "morgan",
    name: "Morgan Lee",
    initials: "ML",
    role: "Operations",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    avatarBg: "#FFEDD5",
    avatarFg: "#C2410C",
  },
];

export const currentUser = people[0];

export const projects = [
  { id: "launch", name: "Launch plan", subtitle: "Product · 12 tasks" },
];

export const productWeeklyMessages: Message[] = [
  {
    id: "m1",
    speakerId: "alex",
    time: "10:02 AM",
    segments: [
      {
        type: "text",
        text: "Thanks for jumping on. Let's lock the public beta date today so marketing and engineering can move.",
      },
    ],
  },
  {
    id: "m2",
    speakerId: "maya",
    time: "10:04 AM",
    segments: [
      {
        type: "text",
        text: "Design review wrapped last week. If we keep scope to core features, October 14 is realistic.",
      },
    ],
  },
  {
    id: "m3",
    speakerId: "alex",
    time: "10:06 AM",
    segments: [
      { type: "text", text: "Great. " },
      {
        type: "quote",
        text: "We will launch the public beta on October 14, 2024, with core features and invite-only access.",
        decisionId: "d1",
      },
      { type: "text", text: " Maya, can you own the launch checklist?" },
    ],
  },
  {
    id: "m4",
    speakerId: "maya",
    time: "10:07 AM",
    segments: [
      {
        type: "text",
        text: "Yes — I'll take the October 14 launch. I'll confirm invite-only copy and the checklist by end of week.",
      },
    ],
  },
  {
    id: "m5",
    speakerId: "jordan",
    time: "10:09 AM",
    segments: [
      {
        type: "text",
        text: "Engineering can hit that if we freeze Friday. I'll set up the production environment and deploy the latest build this week.",
      },
    ],
  },
  {
    id: "m6",
    speakerId: "riley",
    time: "10:11 AM",
    segments: [
      {
        type: "text",
        text: "Are we swapping analytics before beta, or holding? Switching now would slip the date.",
      },
    ],
  },
  {
    id: "m7",
    speakerId: "jordan",
    time: "10:12 AM",
    segments: [
      {
        type: "quote",
        text: "We'll keep the current analytics stack for the beta phase and revisit after we have usage data.",
        decisionId: "d2",
      },
    ],
  },
  {
    id: "m8",
    speakerId: "taylor",
    time: "10:14 AM",
    segments: [
      {
        type: "text",
        text: "I'll prepare the launch blog post and start marketing assets this week so we can review before freeze.",
      },
    ],
  },
  {
    id: "m9",
    speakerId: "alex",
    time: "10:16 AM",
    segments: [
      { type: "text", text: "Pricing still needs a hard date. " },
      {
        type: "quote",
        text: "Complete pricing review and legal sign-off by October 10, 2024.",
        decisionId: "d3",
      },
      { type: "text", text: " I'll own that with ops." },
    ],
  },
  {
    id: "m10",
    speakerId: "morgan",
    time: "10:18 AM",
    segments: [
      {
        type: "text",
        text: "I can help with legal review. Let's also make sure QA tests sign-up, invite, and project creation before the 14th.",
      },
    ],
  },
  {
    id: "m11",
    speakerId: "alex",
    time: "10:21 AM",
    segments: [
      {
        type: "text",
        text: "Perfect. Capture these as tasks in Launch plan so nothing lives only in the notes.",
      },
    ],
  },
];

export const meetings: AppMeeting[] = [
  {
    id: "product-weekly",
    title: "Product Weekly",
    blurb: "Beta launch, analytics, and pricing.",
    when: "Mon, Sep 9, 2024 · 10:00 AM – 11:00 AM (1 hour)",
    whenShort: "Today · 10:00 AM – 11:00 AM (1 hour)",
    dayLabel: "Today",
    timeRange: "10:00 AM – 11:00 AM",
    duration: "1 hour",
    location: "Zoom Meeting",
    tags: ["Product", "Launch", "Beta"],
    attendeeIds: ["alex", "maya", "jordan", "taylor", "riley", "morgan"],
    extraAttendees: 2,
    hostId: "alex",
    projectId: "launch",
    date: "2024-09-09",
    upcoming: true,
    minutesUntil: 10,
    notes: [
      {
        heading: "Agenda",
        items: [
          "Lock the public beta date",
          "Confirm analytics scope for beta",
          "Pricing page and legal sign-off",
        ],
      },
      {
        heading: "Summary",
        items: [
          "Public beta is October 14 with core features and invite-only access.",
          "Analytics stays on the current stack through beta.",
          "Pricing copy and legal review are due October 10.",
        ],
      },
      {
        heading: "Follow-ups",
        items: [
          "Maya owns the launch checklist and invite-only copy.",
          "Jordan stands up the beta environment this week.",
          "Taylor drafts the announcement blog and marketing assets.",
        ],
      },
    ],
    messages: productWeeklyMessages,
  },
  {
    id: "design-review",
    title: "Design Review",
    blurb: "UI updates and component library",
    when: "Mon, Sep 9, 2024 · 9:00 AM – 9:45 AM",
    whenShort: "Today, 9:00 AM – 9:45 AM",
    dayLabel: "Today",
    timeRange: "9:00 AM – 9:45 AM",
    duration: "45 min",
    location: "Zoom Meeting",
    tags: ["Design"],
    attendeeIds: ["maya", "alex", "taylor", "riley"],
    extraAttendees: 2,
    hostId: "maya",
    projectId: "launch",
    date: "2024-09-09",
    notes: [
      {
        heading: "Notes",
        items: [
          "Component library updates approved for the beta UI.",
          "Invite flow uses the new empty states.",
        ],
      },
    ],
    messages: [
      {
        id: "dr1",
        speakerId: "maya",
        time: "9:04 AM",
        segments: [
          {
            type: "text",
            text: "We signed off on the beta UI. I'll send the final design review notes after this.",
          },
        ],
      },
    ],
  },
  {
    id: "eng-sync",
    title: "Engineering Sync",
    blurb: "Sprint progress and blockers",
    when: "Sun, Sep 8, 2024 · 2:00 PM – 3:00 PM",
    whenShort: "Yesterday, 2:00 PM – 3:00 PM",
    dayLabel: "Yesterday",
    timeRange: "2:00 PM – 3:00 PM",
    duration: "1 hour",
    location: "Zoom Meeting",
    tags: ["Engineering"],
    attendeeIds: ["jordan", "riley", "alex", "morgan"],
    extraAttendees: 2,
    hostId: "jordan",
    projectId: "launch",
    date: "2024-09-08",
    notes: [
      {
        heading: "Notes",
        items: [
          "Beta environment is the main sprint goal.",
          "No new scope after feature freeze.",
        ],
      },
    ],
    messages: [
      {
        id: "es1",
        speakerId: "jordan",
        time: "2:08 PM",
        segments: [
          {
            type: "text",
            text: "We'll stand up the production environment this week so QA can start core flows.",
          },
        ],
      },
    ],
  },
  {
    id: "customer-interview",
    title: "Customer Interview",
    blurb: "Feedback on new onboarding flow",
    when: "Fri, Sep 6, 2024 · 10:00 AM – 10:30 AM",
    whenShort: "Sep 6, 10:00 AM – 10:30 AM",
    dayLabel: "Sep 6",
    timeRange: "10:00 AM – 10:30 AM",
    duration: "30 min",
    location: "Zoom Meeting",
    tags: ["Research"],
    attendeeIds: ["alex", "maya", "taylor"],
    extraAttendees: 0,
    hostId: "alex",
    projectId: "launch",
    date: "2024-09-06",
    notes: [
      {
        heading: "Notes",
        items: [
          "Invite-only access matched what customers expected for beta.",
          "Pricing FAQs need a clearer comparison table.",
        ],
      },
    ],
    messages: [
      {
        id: "ci1",
        speakerId: "alex",
        time: "10:12 AM",
        segments: [
          {
            type: "text",
            text: "They asked for invite-only beta access and clearer pricing FAQs before they would share it internally.",
          },
        ],
      },
    ],
  },
  {
    id: "gtm",
    title: "Go-to-Market Planning",
    blurb: "Launch strategy and next steps",
    when: "Thu, Sep 5, 2024 · 1:00 PM – 2:00 PM",
    whenShort: "Sep 5, 1:00 PM – 2:00 PM",
    dayLabel: "Sep 5",
    timeRange: "1:00 PM – 2:00 PM",
    duration: "1 hour",
    location: "Zoom Meeting",
    tags: ["Marketing"],
    attendeeIds: ["taylor", "alex", "maya", "morgan"],
    extraAttendees: 1,
    hostId: "taylor",
    projectId: "launch",
    date: "2024-09-05",
    notes: [
      {
        heading: "Notes",
        items: [
          "Announcement blog should publish the morning of launch.",
          "Social and email templates reuse the same beta framing.",
        ],
      },
    ],
    messages: [
      {
        id: "gtm1",
        speakerId: "taylor",
        time: "1:20 PM",
        segments: [
          {
            type: "text",
            text: "I'll draft the launch blog and marketing templates once the beta date is confirmed.",
          },
        ],
      },
    ],
  },
];

export const initialDecisions: Decision[] = [
  {
    id: "d1",
    meetingId: "product-weekly",
    title: "Launch beta on October 14",
    summary:
      "We will launch the public beta on October 14, 2024, with core features and invite-only access.",
    ownerId: "maya",
    dueDate: "2024-10-14",
    status: "confirmed",
    sourceMessageId: "m3",
    sourceQuote:
      "We will launch the public beta on October 14, 2024, with core features and invite-only access.",
  },
  {
    id: "d2",
    meetingId: "product-weekly",
    title: "Keep the current analytics stack",
    summary:
      "We will continue using our current analytics stack for the beta phase and revisit after we have usage data.",
    ownerId: "jordan",
    dueDate: null,
    status: "needs-review",
    sourceMessageId: "m7",
    sourceQuote:
      "We'll keep the current analytics stack for the beta phase and revisit after we have usage data.",
  },
  {
    id: "d3",
    meetingId: "product-weekly",
    title: "Finalize pricing by October 10",
    summary:
      "Complete pricing review and legal sign-off by October 10, 2024.",
    ownerId: "alex",
    dueDate: "2024-10-10",
    status: "open",
    sourceMessageId: "m9",
    sourceQuote:
      "Complete pricing review and legal sign-off by October 10, 2024.",
  },
];

export const initialTasks: BoardTask[] = [
  {
    id: "t1",
    title: "Launch beta on October 14",
    description:
      "We will launch the public beta on October 14, 2024, with core features and invite-only access.",
    status: "todo",
    priority: "high",
    dueDate: "2024-10-14",
    assigneeIds: ["maya"],
    projectId: "launch",
    meetingId: "product-weekly",
    decisionId: "d1",
    fromMeeting: true,
  },
  {
    id: "t2",
    title: "Prepare launch blog post",
    description:
      "Draft and review the announcement blog post before launch.",
    status: "todo",
    priority: "medium",
    dueDate: "2024-10-11",
    assigneeIds: ["taylor"],
    projectId: "launch",
    meetingId: "product-weekly",
    fromMeeting: false,
  },
  {
    id: "t3",
    title: "Create marketing assets",
    description: "Design social media posts and email template.",
    status: "todo",
    priority: "medium",
    dueDate: "2024-10-10",
    assigneeIds: ["taylor"],
    projectId: "launch",
    fromMeeting: false,
  },
  {
    id: "t4",
    title: "Finalize pricing page copy",
    description: "Update pricing copy and FAQs based on final decisions.",
    status: "todo",
    priority: "low",
    dueDate: "2024-10-09",
    assigneeIds: ["alex"],
    projectId: "launch",
    meetingId: "product-weekly",
    decisionId: "d3",
    fromMeeting: false,
  },
  {
    id: "t5",
    title: "Build beta environment",
    description: "Set up production environment and deploy latest build.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-10-08",
    assigneeIds: ["jordan", "riley"],
    projectId: "launch",
    fromMeeting: false,
  },
  {
    id: "t6",
    title: "QA and test core flows",
    description: "Test key user flows (sign up, invite, project creation).",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-10-11",
    assigneeIds: ["morgan"],
    projectId: "launch",
    fromMeeting: false,
  },
  {
    id: "t7",
    title: "Complete design review",
    description: "Final design review with stakeholders.",
    status: "done",
    priority: "low",
    dueDate: "2024-10-05",
    assigneeIds: ["maya"],
    projectId: "launch",
    meetingId: "design-review",
    fromMeeting: false,
  },
];

export const calendarDays = [
  [26, 27, 28, 29, 30, 31, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 1, 2, 3, 4, 5, 6],
];

export function personById(id: string) {
  return people.find((p) => p.id === id) ?? people[0];
}

export function meetingById(id: string) {
  return meetings.find((m) => m.id === id) ?? meetings[0];
}

export function meetingsOnDate(iso: string) {
  return meetings.filter((m) => m.date === iso);
}

export function isoFromCalendarDay(
  day: number,
  faded: boolean,
  weekIndex: number,
) {
  if (weekIndex === 0 && faded) {
    return `2024-08-${String(day).padStart(2, "0")}`;
  }
  if (weekIndex === calendarDays.length - 1 && faded) {
    return `2024-10-${String(day).padStart(2, "0")}`;
  }
  return `2024-09-${String(day).padStart(2, "0")}`;
}

export function projectById(id: string) {
  return projects.find((p) => p.id === id) ?? projects[0];
}

export function messageText(message: Message) {
  return message.segments.map((s) => s.text).join("");
}

export function formatDueDate(iso: string, withYear = false) {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const label = `${months[(month ?? 1) - 1]} ${day}`;
  return withYear ? `${label}, ${year}` : label;
}

export function statusLabel(status: DecisionStatus) {
  if (status === "needs-review") return "Needs review";
  if (status === "confirmed") return "Confirmed";
  return "Open";
}

export function columnLabel(status: BoardColumn) {
  if (status === "todo") return "To do";
  if (status === "in-progress") return "In progress";
  return "Done";
}

export function priorityLabel(priority: TaskPriority) {
  if (priority === "high") return "High";
  if (priority === "medium") return "Medium";
  return "Low";
}

export function clipTitle(text: string, max = 56) {
  const tidy = text.replace(/[.,;:]+$/, "").trim();
  if (tidy.length <= max) return tidy;
  const slice = tidy.slice(0, max);
  const atWord = slice.lastIndexOf(" ");
  return `${(atWord > 24 ? slice.slice(0, atWord) : slice).trim()}…`;
}

export function titleFromTranscript(text: string) {
  const cleaned = text.replace(/^["“]|["”]$/g, "").trim();
  const cue = cleaned.match(
    /(?:let'?s|we should|we can|we will|i'll|i will|need to|propose(?:ing)?|confirm)\s+([^.?!]+)/i,
  );
  const raw = cue?.[1]
    ? cue[1].replace(/\s+and whether[\s\S]*$/i, "").trim()
    : (cleaned.split(/[.!?]/)[0] ?? cleaned);
  const titled = raw.charAt(0).toUpperCase() + raw.slice(1);
  return clipTitle(titled);
}

export function grepTranscript(messages: Message[], query = ""): GrepHit[] {
  const q = query.trim().toLowerCase();
  const action =
    /\b(i'll|i will|we'll|we will|let's|need to|we should|i can own|i'll take|i'll set|i'll prepare|i'll confirm)\b/i;
  const hits: GrepHit[] = [];

  for (const message of messages) {
    const snippet = messageText(message);
    if (q && !snippet.toLowerCase().includes(q)) continue;
    if (!q && !action.test(snippet)) continue;
    const suggestedTitle = titleFromTranscript(snippet) || clipTitle(snippet);
    if (!q && suggestedTitle.length < 18) continue;
    hits.push({
      id: `${message.id}-grep`,
      messageId: message.id,
      speakerId: message.speakerId,
      snippet,
      suggestedTitle: titleFromTranscript(snippet) || clipTitle(snippet),
      dueDate: dueDateFromText(snippet),
    });
  }
  return hits;
}

export function dueDateFromText(text: string) {
  const month =
    /(?:january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2}/i;
  const match = text.match(month);
  if (!match) return null;
  const parsed = Date.parse(`${match[0]}, 2024`);
  if (Number.isNaN(parsed)) return null;
  const date = new Date(parsed);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `2024-${m}-${d}`;
}

export function emptyTaskDraft(): TaskDraft {
  return {
    title: "",
    description: "",
    assigneeId: currentUser.id,
    status: "todo",
    dueDate: "2024-10-14",
    priority: "medium",
    projectId: "launch",
    meetingId: "",
    decisionId: "",
  };
}

export function draftFromDecision(decision: Decision): TaskDraft {
  return {
    title: decision.title,
    description: decision.summary,
    assigneeId: decision.ownerId,
    status: "todo",
    dueDate: decision.dueDate ?? "2024-10-14",
    priority: decision.id === "d1" ? "high" : "medium",
    projectId: "launch",
    meetingId: decision.meetingId,
    decisionId: decision.id,
  };
}

export function draftFromGrep(hit: GrepHit, meetingId: string): TaskDraft {
  return {
    title: hit.suggestedTitle,
    description: hit.snippet,
    assigneeId: hit.speakerId,
    status: "todo",
    dueDate: hit.dueDate ?? "2024-10-14",
    priority: "medium",
    projectId: "launch",
    meetingId,
    decisionId: "",
  };
}

export function draftFromTask(task: BoardTask): TaskDraft {
  return {
    title: task.title,
    description: task.description,
    assigneeId: task.assigneeIds[0] ?? currentUser.id,
    status: task.status,
    dueDate: task.dueDate,
    priority: task.priority,
    projectId: task.projectId,
    meetingId: task.meetingId ?? "product-weekly",
    decisionId: task.decisionId ?? "",
  };
}

export function taskFieldsFromDraft(draft: TaskDraft) {
  return {
    title: draft.title.trim(),
    description: draft.description.trim(),
    status: draft.status,
    priority: draft.priority,
    dueDate: draft.dueDate,
    assigneeIds: [draft.assigneeId],
    projectId: draft.projectId,
    meetingId: draft.meetingId || undefined,
    decisionId: draft.decisionId || undefined,
    fromMeeting: Boolean(draft.decisionId || draft.meetingId),
  };
}
