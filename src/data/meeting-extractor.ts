export type DecisionStatus = "needs-review" | "confirmed" | "open";
export type TaskPriority = "high" | "medium" | "low";
export type BoardColumn = "todo" | "in-progress" | "done";
export type MeetingTab = "notes" | "transcript" | "decisions" | "tasks" | "files";
export type BoardView = "board" | "list" | "calendar" | "files";
export type RecordingSource = "zoom" | "google-meet";
export type MeetingRecording = {
  name: string;
  kind: "audio" | "video";
  source: RecordingSource;
  url: string;
  duration: string;
};

export type Person = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
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

export type MeetingNoteItem = {
  id: string;
  text: string;
  added?: boolean;
};

export type MeetingNoteBlock = {
  heading: string;
  items: MeetingNoteItem[];
};

export type MeetingFile = {
  id: string;
  meetingId: string;
  name: string;
  sizeLabel: string;
  type: string;
  url: string;
};

function noteItems(prefix: string, texts: string[]): MeetingNoteItem[] {
  return texts.map((text, i) => ({ id: `${prefix}-${i}`, text }));
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  locationType: RecordingSource;
  callUrl: string;
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

export function callLinkFor(id: string, type: RecordingSource) {
  const hash = [...id].reduce((n, char) => (n * 33 + char.charCodeAt(0)) >>> 0, 7);
  if (type === "google-meet") {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const slug = (offset: number, length: number) =>
      Array.from(
        { length },
        (_, i) => alphabet[(hash + offset + i * 7) % alphabet.length],
      ).join("");
    return `https://meet.google.com/${slug(0, 3)}-${slug(11, 4)}-${slug(23, 3)}`;
  }
  const room = String(81000000000 + (hash % 18999999999));
  return `https://zoom.us/j/${room}`;
}

export const people: Person[] = [
  {
    id: "alex",
    name: "Lulu Wang",
    initials: "LW",
    role: "Product",
    email: "lulu.wang@opal.app",
    photo: "/images/portrait.png",
    avatarBg: "#EDE9FE",
    avatarFg: "#6D28D9",
  },
  {
    id: "maya",
    name: "Maya Chen",
    initials: "MC",
    role: "Design",
    email: "maya.chen@opal.app",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    avatarBg: "#FCE7F3",
    avatarFg: "#BE185D",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    initials: "JL",
    role: "Engineering",
    email: "jordan.lee@opal.app",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    avatarBg: "#D1FAE5",
    avatarFg: "#047857",
  },
  {
    id: "taylor",
    name: "Taylor Kim",
    initials: "TK",
    role: "Marketing",
    email: "taylor.kim@opal.app",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    avatarBg: "#FEF3C7",
    avatarFg: "#B45309",
  },
  {
    id: "riley",
    name: "Riley Park",
    initials: "RP",
    role: "Product",
    email: "riley.park@opal.app",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    avatarBg: "#E0E7FF",
    avatarFg: "#5B21B6",
  },
  {
    id: "morgan",
    name: "Morgan Lee",
    initials: "ML",
    role: "Operations",
    email: "morgan.lee@opal.app",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    avatarBg: "#FFEDD5",
    avatarFg: "#C2410C",
  },
  {
    id: "priya",
    name: "Priya Shah",
    initials: "PS",
    role: "Engineering",
    email: "priya.shah@opal.app",
    photo: "https://randomuser.me/api/portraits/women/21.jpg",
    avatarBg: "#CCFBF1",
    avatarFg: "#0F766E",
  },
  {
    id: "chris",
    name: "Chris Nguyen",
    initials: "CN",
    role: "Design",
    email: "chris.nguyen@opal.app",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    avatarBg: "#FCE7F3",
    avatarFg: "#9D174D",
  },
  {
    id: "sam",
    name: "Sam Ortiz",
    initials: "SO",
    role: "Sales",
    email: "sam.ortiz@opal.app",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    avatarBg: "#DBEAFE",
    avatarFg: "#1D4ED8",
  },
  {
    id: "nina",
    name: "Nina Patel",
    initials: "NP",
    role: "Legal",
    email: "nina.patel@opal.app",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    avatarBg: "#EDE9FE",
    avatarFg: "#6D28D9",
  },
  {
    id: "owen",
    name: "Owen Blake",
    initials: "OB",
    role: "Data",
    email: "owen.blake@opal.app",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    avatarBg: "#FEF3C7",
    avatarFg: "#B45309",
  },
  {
    id: "hannah",
    name: "Hannah Cho",
    initials: "HC",
    role: "Customer Success",
    email: "hannah.cho@opal.app",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    avatarBg: "#DCFCE7",
    avatarFg: "#15803D",
  },
  {
    id: "diego",
    name: "Diego Alvarez",
    initials: "DA",
    role: "Engineering",
    email: "diego.alvarez@opal.app",
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
    avatarBg: "#E0E7FF",
    avatarFg: "#4338CA",
  },
  {
    id: "leah",
    name: "Leah Brooks",
    initials: "LB",
    role: "People",
    email: "leah.brooks@opal.app",
    photo: "https://randomuser.me/api/portraits/women/17.jpg",
    avatarBg: "#FFE4E6",
    avatarFg: "#BE123C",
  },
  {
    id: "kai",
    name: "Kai Nakamura",
    initials: "KN",
    role: "Finance",
    email: "kai.nakamura@opal.app",
    photo: "https://randomuser.me/api/portraits/men/28.jpg",
    avatarBg: "#FFEDD5",
    avatarFg: "#C2410C",
  },
  {
    id: "elena",
    name: "Elena Rossi",
    initials: "ER",
    role: "Product",
    email: "elena.rossi@opal.app",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    avatarBg: "#F3E8FF",
    avatarFg: "#7E22CE",
  },
];

export const currentUser = people[0];

export const currentUserProfile = {
  email: "lulu.wang@opal.app",
  title: "Product Manager",
  department: "Product",
  managerId: "maya",
  employeeId: "OP-1842",
  startDate: "January 12, 2022",
  location: "San Francisco, CA",
  timezone: "Pacific Time (PT)",
  workLocation: "HQ · 4th floor",
  calendar: "Google Calendar",
};

const ROLE_TITLES: Record<string, string> = {
  Product: "Product Manager",
  Design: "Product Designer",
  Engineering: "Software Engineer",
  Marketing: "Marketing Manager",
  Operations: "Operations Lead",
  Sales: "Account Executive",
  Legal: "Counsel",
  Data: "Data Analyst",
  "Customer Success": "Customer Success Manager",
  People: "People Partner",
  Finance: "Finance Analyst",
};

export function personDetails(person: Person) {
  if (person.id === currentUser.id) {
    return {
      title: currentUserProfile.title,
      department: currentUserProfile.department,
      location: currentUserProfile.location,
      timezone: currentUserProfile.timezone,
      startDate: currentUserProfile.startDate,
      workLocation: currentUserProfile.workLocation,
      employeeId: currentUserProfile.employeeId,
    };
  }
  const seed = [...person.id].reduce((n, char) => n + char.charCodeAt(0), 0);
  const starts = [
    "February 8, 2021",
    "June 14, 2022",
    "March 4, 2023",
    "September 19, 2023",
    "January 6, 2024",
  ];
  return {
    title: ROLE_TITLES[person.role] ?? person.role,
    department: person.role,
    location: "San Francisco, CA",
    timezone: "Pacific Time (PT)",
    startDate: starts[seed % starts.length],
    workLocation: "HQ · 4th floor",
    employeeId: `OP-${1800 + (seed % 800)}`,
  };
}

export type ProjectKind = "product" | "design" | "marketing";

export const projectKindMeta: Record<
  ProjectKind,
  { label: string; bg: string; fg: string; iconBg: string }
> = {
  product: {
    label: "Product",
    bg: "#f3f1fb",
    fg: "#5b3cc4",
    iconBg: "#ece8ff",
  },
  design: {
    label: "Design",
    bg: "#eef6f2",
    fg: "#0f766e",
    iconBg: "#d8efe6",
  },
  marketing: {
    label: "Marketing",
    bg: "#f7f1ea",
    fg: "#b45309",
    iconBg: "#f3e4d4",
  },
};

export type AppProject = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  kind: ProjectKind;
  createdOn: string;
  ownerId: string;
};

export const projects: AppProject[] = [
  {
    id: "launch",
    name: "Launch plan",
    subtitle: "Product · Beta",
    description: "Public beta date, environment, and launch checklist.",
    kind: "product",
    createdOn: "Jul 8, 2024",
    ownerId: "alex",
  },
  {
    id: "design",
    name: "Design system",
    subtitle: "Design · UI",
    description: "Component library, review, and beta UI polish.",
    kind: "design",
    createdOn: "Mar 2, 2024",
    ownerId: "maya",
  },
  {
    id: "gtm",
    name: "Go-to-market",
    subtitle: "Marketing · Launch",
    description: "Announcement, assets, and pricing page work.",
    kind: "marketing",
    createdOn: "Aug 19, 2024",
    ownerId: "taylor",
  },
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
    locationType: "zoom" as const,
    callUrl: callLinkFor("product-weekly", "zoom"),
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
        items: noteItems("pw-agenda", [
          "Lock the public beta date",
          "Confirm analytics scope for beta",
          "Pricing page and legal sign-off",
        ]),
      },
      {
        heading: "Summary",
        items: noteItems("pw-summary", [
          "Public beta is October 14 with core features and invite-only access.",
          "Analytics stays on the current stack through beta.",
          "Pricing copy and legal review are due October 10.",
        ]),
      },
      {
        heading: "Follow-ups",
        items: noteItems("pw-follow", [
          "Maya owns the launch checklist and invite-only copy.",
          "Jordan stands up the beta environment this week.",
          "Taylor drafts the announcement blog and marketing assets.",
        ]),
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
    locationType: "zoom" as const,
    callUrl: callLinkFor("design-review", "zoom"),
    tags: ["Design"],
    attendeeIds: ["maya", "alex", "taylor", "riley"],
    extraAttendees: 2,
    hostId: "maya",
    projectId: "design",
    date: "2024-09-09",
    notes: [
      {
        heading: "Notes",
        items: noteItems("dr-notes", [
          "Component library updates approved for the beta UI.",
          "Invite flow uses the new empty states.",
        ]),
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
    location: "Google Meet",
    locationType: "google-meet" as const,
    callUrl: callLinkFor("eng-sync", "google-meet"),
    tags: ["Engineering"],
    attendeeIds: ["jordan", "riley", "alex", "morgan"],
    extraAttendees: 2,
    hostId: "jordan",
    projectId: "launch",
    date: "2024-09-08",
    notes: [
      {
        heading: "Notes",
        items: noteItems("es-notes", [
          "Beta environment is the main sprint goal.",
          "No new scope after feature freeze.",
        ]),
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
    locationType: "zoom" as const,
    callUrl: callLinkFor("customer-interview", "zoom"),
    tags: ["Research"],
    attendeeIds: ["alex", "maya", "taylor"],
    extraAttendees: 0,
    hostId: "alex",
    projectId: "launch",
    date: "2024-09-06",
    notes: [
      {
        heading: "Notes",
        items: noteItems("ci-notes", [
          "Invite-only access matched what customers expected for beta.",
          "Pricing FAQs need a clearer comparison table.",
        ]),
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
    location: "Google Meet",
    locationType: "google-meet" as const,
    callUrl: callLinkFor("gtm", "google-meet"),
    tags: ["Marketing"],
    attendeeIds: ["taylor", "alex", "maya", "morgan"],
    extraAttendees: 1,
    hostId: "taylor",
    projectId: "gtm",
    date: "2024-09-05",
    notes: [
      {
        heading: "Notes",
        items: noteItems("gtm-notes", [
          "Announcement blog should publish the morning of launch.",
          "Social and email templates reuse the same beta framing.",
        ]),
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
    projectId: "gtm",
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
    projectId: "gtm",
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
    fromMeeting: true,
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
    projectId: "design",
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

export const prototypeToday = "2024-09-09";

export function isJoinableMeeting(
  meeting: Pick<AppMeeting, "date" | "upcoming">,
) {
  return Boolean(meeting.upcoming) || meeting.date > prototypeToday;
}

export function meetingParticipantIds(meeting: AppMeeting) {
  if (!meeting.extraAttendees) return meeting.attendeeIds;
  const used = new Set(meeting.attendeeIds);
  const extras = people
    .filter((person) => !used.has(person.id))
    .slice(0, meeting.extraAttendees)
    .map((person) => person.id);
  return [...meeting.attendeeIds, ...extras];
}

export function meetingById(id: string, list: AppMeeting[] = meetings) {
  return list.find((m) => m.id === id) ?? list[0];
}

export function meetingsOnDate(iso: string, list: AppMeeting[] = meetings) {
  return list.filter((m) => m.date === iso);
}

export const initialRecordings: Record<string, MeetingRecording> = {
  "product-weekly": {
    name: "Product Weekly · Sep 9.mp4",
    kind: "video",
    source: "zoom",
    url: "",
    duration: "58:12",
  },
  "design-review": {
    name: "Design Review · Sep 9.mp4",
    kind: "video",
    source: "zoom",
    url: "",
    duration: "44:08",
  },
  "eng-sync": {
    name: "Engineering Sync · Sep 6.m4a",
    kind: "audio",
    source: "google-meet",
    url: "",
    duration: "1:02:14",
  },
  "customer-interview": {
    name: "Customer Interview · Sep 4.m4a",
    kind: "audio",
    source: "zoom",
    url: "",
    duration: "28:40",
  },
  gtm: {
    name: "Go-to-Market Planning · Sep 5.mp4",
    kind: "video",
    source: "google-meet",
    url: "",
    duration: "54:03",
  },
};

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

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

export function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

export function calendarMonthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const startWeekday = (first.getUTCDay() + 6) % 7;
  const start = new Date(Date.UTC(year, month - 1, 1 - startWeekday));
  return Array.from({ length: 6 }, (_, week) =>
    Array.from({ length: 7 }, (_, weekday) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + week * 7 + weekday);
      const y = date.getUTCFullYear();
      const m = date.getUTCMonth() + 1;
      const d = date.getUTCDate();
      return {
        day: d,
        iso: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        outside: m !== month || y !== year,
      };
    }),
  );
}

export function projectById(id: string) {
  return projects.find((p) => p.id === id) ?? projects[0];
}

export function peopleOnProject(
  projectId: string,
  tasks: BoardTask[],
  meetings: AppMeeting[],
) {
  const ids = new Set<string>([projectById(projectId).ownerId]);
  tasks
    .filter((task) => task.projectId === projectId)
    .forEach((task) => task.assigneeIds.forEach((id) => ids.add(id)));
  meetings
    .filter((meeting) => meeting.projectId === projectId)
    .forEach((meeting) => meeting.attendeeIds.forEach((id) => ids.add(id)));
  return [...ids];
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
  return "Completed";
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

export function emptyTaskDraft(projectId = "launch"): TaskDraft {
  return {
    title: "",
    description: "",
    assigneeId: currentUser.id,
    status: "todo",
    dueDate: "2024-10-14",
    priority: "medium",
    projectId,
    meetingId: "",
    decisionId: "",
  };
}

export function draftFromDecision(
  decision: Decision,
  projectId: string,
): TaskDraft {
  return {
    title: decision.title,
    description: decision.summary,
    assigneeId: decision.ownerId,
    status: "todo",
    dueDate: decision.dueDate ?? "2024-10-14",
    priority: decision.id === "d1" ? "high" : "medium",
    projectId,
    meetingId: decision.meetingId,
    decisionId: decision.id,
  };
}

export function draftFromGrep(
  hit: GrepHit,
  meetingId: string,
  projectId: string,
): TaskDraft {
  return {
    title: hit.suggestedTitle,
    description: hit.snippet,
    assigneeId: hit.speakerId,
    status: "todo",
    dueDate: hit.dueDate ?? "2024-10-14",
    priority: "medium",
    projectId,
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

export function formatTime12(hhmm: string) {
  const [hour, minute] = hhmm.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function durationFromTimes(start: string, end: string) {
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);
  const minutes = endHour * 60 + endMin - (startHour * 60 + startMin);
  if (minutes <= 0) return "1 hour";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return hours === 1 ? "1 hour" : `${hours} hours`;
  return `${hours}h ${rest}m`;
}

const PLACEHOLDER_NOTE = "Notes will appear after the meeting.";

export function meetingFromForm(input: {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  locationType: RecordingSource;
  projectId: string;
  attendeeIds: string[];
  hostId: string;
}): AppMeeting {
  const [year, month, day] = input.date.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  const weekday = weekdays[date.getDay()];
  const monthLabel = months[month - 1];
  const startLabel = formatTime12(input.startTime);
  const endLabel = formatTime12(input.endTime);
  const location =
    input.locationType === "google-meet" ? "Google Meet" : "Zoom Meeting";
  return {
    id: input.id,
    title: input.title.trim(),
    blurb: "Newly scheduled meeting",
    when: `${weekday}, ${monthLabel} ${day}, ${year} · ${startLabel} – ${endLabel}`,
    whenShort: `${monthLabel} ${day}, ${startLabel} – ${endLabel}`,
    dayLabel: `${monthLabel} ${day}`,
    timeRange: `${startLabel} – ${endLabel}`,
    duration: durationFromTimes(input.startTime, input.endTime),
    location,
    locationType: input.locationType,
    callUrl: callLinkFor(input.id, input.locationType),
    tags: [],
    attendeeIds: input.attendeeIds,
    extraAttendees: 0,
    hostId: input.hostId,
    projectId: input.projectId,
    date: input.date,
    upcoming: input.date >= prototypeToday,
    notes: [
      {
        heading: "Notes",
        items: [
          { id: `${input.id}-placeholder`, text: PLACEHOLDER_NOTE },
        ],
      },
    ],
    messages: [],
  };
}

export function addNoteToMeeting(
  meeting: AppMeeting,
  heading: string,
  text: string,
): AppMeeting {
  const item = text.trim();
  const title = heading.trim() || "Your notes";
  if (!item) return meeting;
  const nextItem: MeetingNoteItem = {
    id: `n${Date.now()}`,
    text: item,
    added: true,
  };
  const notes = meeting.notes.map((block) => ({
    ...block,
    items: [...block.items],
  }));
  const index = notes.findIndex((block) => block.heading === title);
  if (index >= 0) {
    const block = notes[index];
    const items =
      block.items.length === 1 && block.items[0].text === PLACEHOLDER_NOTE
        ? [nextItem]
        : [...block.items, nextItem];
    notes[index] = { ...block, items };
  } else {
    notes.push({ heading: title, items: [nextItem] });
  }
  return { ...meeting, notes };
}

export function removeNoteFromMeeting(
  meeting: AppMeeting,
  noteId: string,
): AppMeeting {
  const notes = meeting.notes
    .map((block) => ({
      ...block,
      items: block.items.filter((item) => item.id !== noteId),
    }))
    .filter(
      (block) =>
        block.items.length > 0 || block.heading !== "Your notes",
    );
  return { ...meeting, notes };
}

export type SearchHitKind = "meeting" | "task" | "project" | "person" | "decision";

export type SearchHit = {
  id: string;
  kind: SearchHitKind;
  title: string;
  subtitle: string;
  meetingId?: string;
  taskId?: string;
  projectId?: string;
  personId?: string;
  tab?: MeetingTab;
};

export function searchWorkspace({
  query,
  meetings,
  tasks,
  decisions,
}: {
  query: string;
  meetings: AppMeeting[];
  tasks: BoardTask[];
  decisions: Decision[];
}): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];

  for (const meeting of meetings) {
    const notes = meeting.notes
      .flatMap((block) => block.items.map((item) => item.text))
      .join(" ");
    const transcript = meeting.messages.map(messageText).join(" ");
    const attendees = meeting.attendeeIds
      .map((id) => personById(id).name)
      .join(" ");
    const haystack = [
      meeting.title,
      meeting.blurb,
      meeting.location,
      meeting.tags.join(" "),
      projectById(meeting.projectId).name,
      notes,
      transcript,
      attendees,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) continue;
    hits.push({
      id: `meeting-${meeting.id}`,
      kind: "meeting",
      title: meeting.title,
      subtitle: `${meeting.whenShort} · ${projectById(meeting.projectId).name}`,
      meetingId: meeting.id,
      tab: notes.toLowerCase().includes(q)
        ? "notes"
        : transcript.toLowerCase().includes(q)
          ? "transcript"
          : "decisions",
    });
  }

  for (const task of tasks) {
    const owners = task.assigneeIds.map((id) => personById(id).name).join(" ");
    const project = projectById(task.projectId);
    const haystack = [task.title, task.description, owners, project.name]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) continue;
    hits.push({
      id: `task-${task.id}`,
      kind: "task",
      title: task.title,
      subtitle: `${project.name} · ${columnLabel(task.status)}`,
      taskId: task.id,
    });
  }

  for (const project of projects) {
    const haystack = [project.name, project.subtitle, project.description]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) continue;
    hits.push({
      id: `project-${project.id}`,
      kind: "project",
      title: project.name,
      subtitle: project.subtitle,
      projectId: project.id,
    });
  }

  for (const person of people) {
    const haystack = `${person.name} ${person.role} ${person.email}`.toLowerCase();
    if (!haystack.includes(q)) continue;
    const meeting = meetings.find((item) => item.attendeeIds.includes(person.id));
    hits.push({
      id: `person-${person.id}`,
      kind: "person",
      title: person.name,
      subtitle: person.role,
      personId: person.id,
      meetingId: meeting?.id,
    });
  }

  for (const decision of decisions) {
    const haystack = `${decision.title} ${decision.summary}`.toLowerCase();
    if (!haystack.includes(q)) continue;
    hits.push({
      id: `decision-${decision.id}`,
      kind: "decision",
      title: decision.title,
      subtitle: meetingById(decision.meetingId, meetings).title,
      meetingId: decision.meetingId,
      tab: "decisions",
    });
  }

  return hits;
}
