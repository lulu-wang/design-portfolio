export type Tag = { label: string; variant: "outline" | "solid" | "lavender" };

export type Persona = {
  name: string;
  role: string;
  quote: string;
  goals: string[];
  frustrations: string[];
};

export type CaseMediaItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  statusBar?: "light" | "dark";
};

export type CaseStudy = {
  tagline: string;
  /** Optional external presentation link shown in the hero description */
  presentation?: {
    label: string;
    href: string;
  };
  meta: {
    role: string;
    timeline: string;
    team: string;
    platform: string;
    tools: string[];
  };
  overview: string;
  problem?: {
    statement: string;
    points: string[];
  };
  goals?: string;
  research?: {
    intro: string;
    methods: { title: string; description: string }[];
    insights: { stat: string; label: string }[];
    persona?: Persona;
    personas?: Persona[];
    quotes?: string[];
  };
  define?: {
    intro: string;
    steps: string[];
    timeline: string[];
  };
  ia?: {
    intro: string;
    flow: string[];
    sitemap?: string[];
  };
  wireframes?: {
    lowFi: string;
    /** @deprecated Prefer `images` for real wireframe exports */
    lowFiVariants?: ("list" | "detail" | "dashboard")[];
    hiFi: string;
    /** Large wireframe gallery — Onur-style mass presentation */
    images?: CaseMediaItem[];
    layout?: "masonry" | "phones" | "full" | "pair" | "stack";
  };
  /** Onboarding quiz — bridges research insights to personalized plan */
  onboarding?: {
    intro: string;
    insights?: { title: string; description: string }[];
    quotes?: string[];
    images: CaseMediaItem[];
    layout?: "masonry" | "phones" | "full" | "pair" | "stack";
  };
  branding?: {
    intro: string;
    colors: { name: string; hex: string; role: string }[];
    typefaces: { name: string; role: string; weights?: string }[];
    typography: string;
    palette: string;
    messaging?: string;
  };
  /** Final / high-fidelity design gallery */
  visuals?: {
    images: CaseMediaItem[];
    layout?: "masonry" | "phones" | "full" | "pair" | "stack";
    tone?: "muted" | "dark" | "plain";
    /** Smaller phones with more space between frames */
    roomy?: boolean;
    heading?: string;
    title?: string;
    intro?: string;
    label?: string;
    banner?: CaseMediaItem;
    /** Extra galleries after the primary set (e.g. TV after phone) */
    galleries?: {
      heading?: string;
      images: CaseMediaItem[];
      layout?: "masonry" | "phones" | "full" | "pair" | "stack";
      tone?: "muted" | "dark" | "plain";
      roomy?: boolean;
    }[];
  };
  solution?: {
    intro: string;
    features: { title: string; description: string }[];
  };
  testing?: {
    intro: string;
    findings: string[];
    iterations: string[];
  };
  outcomes?: { stat: string; label: string }[];
  reflection?: string;
  conclusion?: {
    challenges: string[];
    learnings: string[];
    nextSteps: string[];
    proud: string;
  };
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  image: string;
  /** Optional pair of mobile screens shown in iPhone frames on project covers */
  previewScreens?: { src: string; alt: string }[];
  tags: Tag[];
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "opal",
    name: "Opal",
    description:
      "A desktop workspace that transcribes meetings, captures decisions, and turns them into assigned work for product, design, and engineering.",
    image: "/images/project-opal-cover.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Design", variant: "solid" },
      { label: "Desktop", variant: "lavender" },
    ],
    caseStudy: {
      tagline:
        "A desktop workspace for product teams that turns meeting recordings into a shared transcript, captured decisions, and assigned tasks.",
      presentation: {
        label: "live prototype",
        href: "/prototypes/opal",
      },
      meta: {
        role: "Product Designer & Developer",
        timeline: "Prototype · 2026",
        team: "Solo designer-developer",
        platform: "Desktop web",
        tools: ["Figma", "Cursor", "Next.js"],
      },
      overview:
        "Opal started from a gap I kept hitting as a **software engineer**: there was no clean way to summarize a meeting from everyone’s point of view, or to turn a decision into a task without a tedious multi-step process. Notes went into docs, recaps went out over email, and tickets were created somewhere else — so the record of the meeting was **scattered**. I designed and built a single desktop workspace that records and transcribes meetings with AI, attaches tasks to those decisions, and lets engineering, design, and product share one dashboard instead of three follow-up rituals.",
      problem: {
        statement:
          "Meeting follow-through is a **multi-tool chore** — notes, email recaps, and tickets never land in one place.",
        points: [
          "**Notes, email, and tasks splinter.** People capture the meeting in a doc, send a recap, then recreate the work in a tracker. Nothing is the source of truth.",
          "**No shared summary.** There isn’t a streamlined way to see the discussion from all contributors’ perspectives — engineering, design, and product each leave with a different version.",
          "**Decisions don’t become work.** Turning what was agreed into an assigned task takes too many steps, so the administrative burden sits on whoever cares enough to do it by hand.",
        ],
      },
      goals:
        "Cut that overhead with **one tool**: AI transcription of recordings, tasks created from decisions, a central dashboard to manage them, and a way to assign work to projects and the people across functions who own it.",
      research: {
        intro:
          "I framed both the **user problem** (scattered notes, unpaid admin work) and the **business problem** (teams stay misaligned because follow-through is expensive). The design had to serve cross-functional contributors — designers, PMs, and developers — not a single role’s note-taking habit. I used my own engineering workflow as the brief, then looked at how existing boards and meeting tools split the same loop apart.",
        methods: [
          {
            title: "Problem framing",
            description:
              "Wrote the user and business jobs from firsthand experience: reduce administrative overhead, and make **eng / design / product** look at the same record after a call.",
          },
          {
            title: "Flow + competitive boards",
            description:
              "Sketched the path from recording → transcript → decision → task. Modeled the task surface after **Jira-style boards**, because that’s where the work already tried to live — just not connected to the meeting.",
          },
          {
            title: "Feature mapping",
            description:
              "Listed what a product contributor actually needs to stay productive: daily meetings, a home dashboard, projects, people, files, and more than one way to see tasks. The hard part was **not** adding everything — it was naming the set.",
          },
        ],
        insights: [
          { stat: "3", label: "places work used to scatter" },
          { stat: "3", label: "task views for different working styles" },
          { stat: "1", label: "live prototype built in Cursor" },
        ],
        quotes: [
          "We take notes in a doc, send an email recap, then recreate the tasks in another tool.",
          "There’s no one place that holds what everyone heard in the meeting.",
          "Turning a decision into a ticket is a multi-step chore.",
        ],
        persona: {
          name: "Alex Rivera",
          role: "32 · Product Manager · San Francisco",
          quote:
            "I leave a meeting sure we decided something, and two days later the notes are in a doc, the recap is in email, and the tickets still aren’t filed.",
          goals: [
            "Keep engineering, design, and product looking at the same record",
            "Turn a decision into an assigned task without leaving the meeting",
          ],
          frustrations: [
            "Notes, email follow-ups, and the task tracker are three different jobs",
            "No shared summary from everyone who was in the room",
          ],
        },
      },
      define: {
        intro:
          "The process was linear on purpose: **frame → lo-fi in Figma → moodboard → hi-fi → working prototype in Cursor**, then iterate on what the first build was missing. I collaborated with ChatGPT on visual direction while I locked structure myself, so AI helped explore look, not invent the IA.",
        steps: [
          "Frame the user and business problem from engineering work",
          "Lo-fi the flow in Figma; model the board after Jira",
          "Moodboard + ChatGPT for visual direction, then hi-fi and a Cursor prototype",
        ],
        timeline: [
          "Figma lo-fi: meetings desktop, decisions list, Jira-like task board",
          "Moodboard with ChatGPT: purple brand, pastel glance cards, work-tool rail",
          "Cursor prototype, then a second pass for People, Home, projects, files, search",
        ],
      },
      ia: {
        intro:
          "The rail is the product: **Home, Meetings, Tasks, Projects, People, Settings**. Home is the central dashboard. Meetings is the daily breakdown — up next, calendar, today’s table. Tasks needed **board, list, and calendar** so different contributors can use the same work. Global search sits above all of it, because finding a meeting, task, project, or file should not depend on remembering which tab it lives in. People exists so engineering, design, and product are named in the system, not only in the recap email.",
        sitemap: [
          "Home → glance cards, upcoming meetings, my tasks, projects",
          "Meetings → daily breakdown: up next, calendar, today’s table",
          "Meeting → recording, AI notes / transcript, decisions, linked tasks, files",
          "Tasks → board, list, and calendar — assign to people and projects",
          "Projects · People · Search → the rest of the workspace, not a second tool",
        ],
        flow: [
          "Record the meeting",
          "Read the AI transcript",
          "Create a task from a decision",
          "Assign it to a project",
          "Find it again in search",
        ],
      },
      wireframes: {
        lowFi:
          "I sketched **low-fidelity wireframes in Figma** before any color: a dark sidebar for the jobs, a three-up meetings canvas (next event, calendar, today’s counts), and a table of the day underneath. That layout was the contract for “scan today, join what’s next, open notes.” **Decisions** sat on the meeting itself — owner, status, create task — so a call could become work without leaving the room. The **task board** was modeled on **Jira** so the destination for a decision would feel familiar. Hi-fi kept this skeleton and filled it — real calendar, people, Join meeting as the one solid action.",
        layout: "full",
        images: [
          {
            src: "/images/projects/opal/wireframe-meetings.png",
            alt: "Low-fidelity desktop wireframe of Opal’s meetings home, with a dark sidebar, up-next meeting card, calendar, today stats, and a table of today’s meetings",
            caption:
              "Figma lo-fi — meetings as the day’s home: up next, calendar, today, then the table",
            width: 1024,
            height: 728,
          },
          {
            src: "/images/projects/opal/wireframe-decisions.png",
            alt: "Low-fidelity desktop wireframe of Opal meeting decisions, with a dark sidebar, a list of decisions with status chips and create-task actions, and a labeled meeting-context rail for attendees, linked project, files, and meeting details",
            caption:
              "Figma lo-fi — decisions on the meeting: owner, status, and create task in one list",
            width: 1024,
            height: 728,
          },
          {
            src: "/images/projects/opal/wireframe-tasks.png",
            alt: "Low-fidelity desktop wireframe of Opal’s all-tasks board, with to-do, in-progress, and completed columns, an assignee on each card, and status buttons",
            caption:
              "Figma lo-fi — Jira-like board: to do, in progress, completed, with status on the card",
            width: 1024,
            height: 728,
          },
          {
            src: "/images/projects/opal/moodboard.jpg",
            alt: "Opal moodboard combining pastel glance cards, meeting notes with a recording bar, calendar and meeting list, account settings, and a meeting detail card",
            caption:
              "Moodboard, explored with ChatGPT — purple brand, pastel glances, recording over notes",
            width: 1024,
            height: 827,
          },
        ],
        hiFi:
          "Hi-fidelity started as Figma mockups, then I used **Cursor** to build a working prototype. Meetings keeps the wireframe’s three-up scan. Home is the central dashboard the first build didn’t have. Tasks ship as **board, list, and calendar**, because one view would have locked the product to one kind of contributor. The live prototype is the demo — including AI-transcribed notes that can become assigned work.",
      },
      branding: {
        intro:
          "After the lo-fi, I built a **visual style moodboard** and used ChatGPT to explore directions: consumer notes apps (pastel glance cards, lilac calendars) against serious work software (black rail, white settings, named people on a meeting card). Opal is the overlap — gem-colored enough to feel like a product, structured enough to sit next to a Jira-like board all day.",
        colors: [
          { name: "Rail", hex: "#0E0F13", role: "Sidebar, primary buttons" },
          { name: "Opal", hex: "#7C5CF6", role: "Brand, selected nav, today on the calendar" },
          { name: "Canvas", hex: "#F4F5F8", role: "App background" },
          { name: "Glance mint", hex: "#E6F6E8", role: "Open tasks at a glance" },
          { name: "Glance peach", hex: "#FCF6F0", role: "Needs review — work that is waiting" },
        ],
        typefaces: [
          {
            name: "Inter",
            role: "UI, tables, and meeting titles — dense enough for a desktop work surface",
            weights: "Regular, Medium, Semibold",
          },
        ],
        typography:
          "Titles are large and tight, like the wireframe’s **Good Morning, Alex**. Body copy stays small and cool-gray so a day’s table can hold names, times, and notes without shouting. Purple is reserved for selection and “up next” — never for every chip.",
        palette:
          "The moodboard’s **purple** became the brand mark and the calendar’s today state, not a wash over the whole UI. **Black rail / white canvas** came from the lo-fi and from the settings reference — it keeps the product feeling like software, not a notes toy. Glance cards stay **pastel and separate** (blue, mint, peach) so Home can be read in one pass, the way the phone mockup counted meetings, notes, and time.",
        messaging:
          "“Good morning, Alex.” “Here’s what’s on your schedule today.” “Join meeting.” The product talks like a desk, not a coach.",
      },
      visuals: {
        layout: "full",
        tone: "muted",
        images: [
          {
            src: "/images/projects/opal/hifi-meetings.png",
            alt: "Opal meetings desktop with an up-next Product Weekly card, September calendar, today stats, and a table of today’s meetings",
            caption: "Meetings — the daily breakdown the first prototype was missing",
            width: 2400,
            height: 1500,
          },
          {
            src: "/images/projects/opal/hifi-home.png",
            alt: "Opal home desktop with pastel glance cards for meetings, tasks, and review, plus upcoming meetings and projects",
            caption: "Home — the central dashboard, added after the first Cursor build",
            width: 2400,
            height: 1500,
          },
          {
            src: "/images/projects/opal/hifi-tasks.png",
            alt: "Opal tasks board with To do, In progress, and Completed columns, each card showing an assignee and due date",
            caption: "Tasks — Jira-like board, with list and calendar for other working styles",
            width: 2400,
            height: 1500,
          },
        ],
      },
      solution: {
        intro:
          "One loop instead of three tools: **record and transcribe, make the decision a task, manage it on a dashboard, assign it to a project and a person.**",
        features: [
          {
            title: "AI notes that become work",
            description:
              "Recordings transcribe into notes on the meeting. A decision can become a task there — no doc, no recap email, no second tracker to re-type it into.",
          },
          {
            title: "A home dashboard and a daily breakdown",
            description:
              "Home is the glance across meetings, tasks, and projects. Meetings is today: up next, calendar, and a table of the rest. Join and notes stay attached to the event.",
          },
          {
            title: "Board, list, and calendar",
            description:
              "Different contributors organize work differently. The task surface ships three views so a designer, a PM, and a developer can all use the same board.",
          },
          {
            title: "People, projects, files, and search",
            description:
              "Work is assigned to projects and to named people across functions. Files sit on the meeting. Global search finds a meeting, task, project, or file without hunting tabs.",
          },
        ],
      },
      testing: {
        intro:
          "The first Cursor prototype was useful and incomplete. I treated the gaps as a second design pass, not as polish.",
        findings: [
          "**People was missing**, so contributors across engineering, design, and product had no home in the product.",
          "**Meeting actions were redundant** — too many ways to start or open the same thing.",
          "The first build didn’t yet have a **daily meeting breakdown**, a **central home**, **project organization**, or **file attachments**.",
        ],
        iterations: [
          "Added People, Home, a daily meetings canvas, projects, and files.",
          "Shipped **board, list, and calendar** on tasks so the board wasn’t the only mental model.",
          "Added **global search** for meetings, tasks, projects, and files.",
        ],
      },
      outcomes: [
        { stat: "1", label: "working prototype from Figma into Cursor" },
        { stat: "3", label: "task views for different contributors" },
        { stat: "2", label: "design passes after the first build" },
      ],
      reflection:
        "Two challenges sat on top of the product ones. Guiding **Cursor** meant rewriting prompts until they were modular and explicit — interactions, hover states, responsive layout, visual consistency — or the generation drifted. And I had to map the **exact feature set** a product contributor needs to stay productive, without turning the rail into a junk drawer. If I had more time I would thicken the design system, go deeper on AI-assisted project management (permissions, org-wide workspaces, an analytics home for completion trends), and **cut sub-menus** so the hierarchy stays concise.",
      conclusion: {
        challenges: [
          "Steering Cursor with modular, explicit prompts when generation missed interactions or visual consistency.",
          "Naming the feature set a contributor actually needs — then noticing People, Home, and files were still missing.",
          "Keeping board, list, and calendar as one task system instead of three products.",
        ],
        learnings: [
          "AI is useful for transcription and for exploring a moodboard; the IA still has to be decided by hand.",
          "A first prototype is a diagnostic: redundant buttons and a missing People tab were clearer in the build than in Figma.",
          "Search and multiple task views are how cross-functional teams share one tool without sharing one working style.",
        ],
        nextSteps: [
          "Expand design system guidelines, and reduce sub-menus for a more minimal hierarchy.",
          "Granular team permissions and organization-wide workspaces.",
          "A fuller analytics dashboard on Home for performance and task-completion trends.",
        ],
        proud:
          "Building the **working prototype** — Figma to Cursor — so the demo is the product: record, transcribe, task, assign, search, instead of a slide of the idea.",
      },
    },
  },
  {
    slug: "path-learning",
    name: "Path Learning",
    description:
      "A mobile learning app that replaces tutorial watching with illustrated skill paths, hands-on assignments, and feedback from AI and mentors.",
    image: "/images/project-path-learning.png",
    previewScreens: [
      {
        src: "/images/projects/path-learning/screens/04-interests.png",
        alt: "Path Learning onboarding — Choose Your Interests with searchable skill chips",
      },
      {
        src: "/images/projects/path-learning/screens/05-choose-skill.png",
        alt: "Path Learning home — What do you want to learn, Photography skill selected",
      },
    ],
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
      { label: "Mobile", variant: "lavender" },
    ],
    caseStudy: {
      tagline:
        "A practice-first learning app that turns skill-building into modules — with a path for what to do next, and feedback when you get stuck.",
      meta: {
        role: "Product Designer",
        timeline: "Capstone · 2026",
        team: "Solo designer",
        platform: "iOS",
        tools: ["Figma", "FigJam", "Google Meet"],
      },
      overview:
        "Path Learning is a project-based mobile app for self-directed learners who are tired of **watching** without **doing**. Instead of course catalogs and completion badges, the product is built around illustrated skill paths and modules — a lesson, an assignment that produces an artifact, then AI and mentor feedback. I led research, IA, wireframes, visual design, and two rounds of usability testing as sole designer.",
      problem: {
        statement:
          "Learners get stuck in **tutorial hell**, drowned in content choices, and left without feedback that actually helps them improve.",
        points: [
          "Passive video consumption creates a false sense of mastery that disappears the moment someone opens a blank project.",
          "Feedback is either generic praise or binary pass/fail — not category-specific enough to change lighting, composition, or logic.",
          "Fragmented catalogs cause choice paralysis, so people spend their limited free time searching instead of practicing.",
        ],
      },
      goals:
        "Flip the default EdTech loop from Watch → Read → Quiz to **Try → Struggle → Learn → Feedback → Retry**, so every concept is immediately practiced and every completed assignment becomes portfolio evidence.",
      research: {
        intro:
          "The research question was how self-directed learners move from theory to practice — and where they abandon that jump. I interviewed self-taught creatives, mid-career switchers, and hobbyists, and audited **Maven**, **Exercism**, and **MentorCruise** to map gaps in feedback, structure, and mentorship.",
        methods: [
          {
            title: "User interviews",
            description:
              "Structured sessions on how people currently learn, where projects stall, and what makes feedback feel **actionable** versus empty.",
          },
          {
            title: "Competitive analysis",
            description:
              "Compared Maven, Exercism, and MentorCruise on practice loops, mentor access, and whether progress felt like **portfolio work** or video check-offs.",
          },
          {
            title: "Affinity mapping",
            description:
              "Synthesized quotes into three problem clusters — tutorial dependency, feedback quality, and choice overload — which became the product’s north star.",
          },
        ],
        insights: [
          { stat: "3", label: "problem clusters from affinity mapping" },
          { stat: "3", label: "competitor platforms audited" },
          { stat: "5", label: "moderated usability participants" },
        ],
        quotes: [
          "I feel like a pro when I'm following a video tutorial, but the second I close the tab and try to write a single line of code on my own, I realize I haven't actually learned how to think for myself.",
          "Getting 'looks good!' or vague online comments doesn't tell me what to fix about my lighting or composition to actually get better.",
          "I spent three hours searching for the 'perfect' intro course. By the time I finally picked one, I was too mentally exhausted to actually start the first lesson.",
        ],
        persona: {
          name: "Maya Osei",
          role: "28 · Marketing Coordinator · Atlanta",
          quote:
            "I’ve watched a hundred YouTube tutorials and I still can’t build anything from scratch. I need a path — not more content.",
          goals: [
            "Escape tutorial hell and follow one clear, trusted roadmap",
            "Build a portfolio that passes real hiring screens",
          ],
          frustrations: [
            "Hundreds of hours watched, nothing built",
            "Fragmented resources with no sequence or quality signal",
          ],
        },
        personas: [
          {
            name: "Maya Osei",
            role: "28 · Marketing Coordinator · Atlanta",
            quote:
              "I’ve watched a hundred YouTube tutorials and I still can’t build anything from scratch. I need a path — not more content.",
            goals: [
              "Escape tutorial hell and follow one clear, trusted roadmap",
              "Build a portfolio that passes real hiring screens",
            ],
            frustrations: [
              "Hundreds of hours watched, nothing built",
              "Fragmented resources with no sequence or quality signal",
            ],
          },
          {
            name: "Nico Valls",
            role: "24 · Photographer · Portland",
            quote:
              "I have a hundred ideas. I just freeze the second I open a blank file. I need someone — or something — to just get me unstuck.",
            goals: [
              "Ship a finished creative project with an audience",
              "Get feedback in a low-pressure space, without judgment",
            ],
            frustrations: [
              "Blank-page syndrome — staring at empty files",
              "Overly theoretical content that kills creative momentum",
            ],
          },
          {
            name: "Dr. Priya Nair",
            role: "35 · ML Research Scientist · Cambridge",
            quote:
              "I don’t want to just build it. I want to understand why it works — and why every alternative approach doesn’t.",
            goals: [
              "A first-principles understanding of new domains",
              "Know the limits and failure modes before adopting a tool",
            ],
            frustrations: [
              "Platforms that teach how and skip why",
              "Black-box tools with no explanatory depth",
            ],
          },
        ],
      },
      define: {
        intro:
          "Research ran across **four weeks** — planning, interviews, synthesis, then concept testing. Design work followed the same loop the product teaches: try, get feedback, iterate. Two usability rounds (Phase 1 and Phase 2) validated the lesson-and-assignment model, then tightened pricing, resources, and mentor booking.",
        steps: [
          "Problem framing: tutorial hell, feedback quality, choice overload",
          "IA around sign-up, interests, skill choice, modules, assignment, and mentor booking",
          "Hi-fi prototype and two rounds of remote moderated testing",
        ],
        timeline: [
          "Week 1: Planning and recruitment",
          "Week 2: Interviews and competitive analysis",
          "Week 3: Synthesis and insights mapping",
          "Week 4: Concept testing and prototyping",
        ],
      },
      ia: {
        intro:
          "The app is organized around a **practice loop**, not a course catalog. After **sign up or login**, learners pick interests, choose a skill, follow a module path, then work through **Lesson / Assignment / Feedback** — with a mentor to book when they want a human eye. Home, Paths, Projects, Mentors, and Settings live in the menu.",
        sitemap: [
          "Splash → Sign up or login",
          "Onboarding → Choose your interests, then a skill",
          "Home → What do you want to learn? For you / Featured / Saved",
          "Path → Photography · Visual Storytelling modules",
          "Module → Lesson list (e.g. Module 1: Framing)",
          "Lesson → Lesson, Assignment, and Feedback tabs",
          "Mentors → Profile, availability, live booking",
          "Menu → Home, Paths, Projects, Mentors, Settings",
        ],
        flow: [
          "Sign up / login",
          "Choose interests",
          "Choose a skill",
          "Start the path",
          "Lesson → Assignment → Feedback",
          "Book a mentor",
        ],
      },
      wireframes: {
        lowFi:
          "Early screens locked the core loop before visual design: **skill choice**, a photography path, a lesson with upload, and mentor booking. Testing later confirmed the path-and-assignment format; the friction lived in drafts, academic depth, and pricing transparency.",
        layout: "full",
        images: [
          {
            src: "/images/projects/path-learning/wireframes.jpg",
            alt: "Path Learning grayscale screens — skill selection, photography path, lesson, submission, and mentor booking",
            caption: "Core loop in grayscale: choose a skill, follow the path, submit work, book a mentor",
            width: 2400,
            height: 1218,
          },
        ],
        hiFi:
          "High-fidelity screens sit on **mint, lilac, and white**, with charcoal actions and line illustration. Splash offers **Sign Up** and **Login**; onboarding asks what you want to learn; photography opens as a **Visual Storytelling** path of modules; each lesson splits into Lesson, Assignment, and Feedback — including mentor and AI scores — then a live booking surface. A menu of Home, Paths, Projects, Mentors, and Settings holds the rest of the app.",
      },
      onboarding: {
        intro:
          "Onboarding asks **what do you want to learn?** after **Choose Your Interests** — searchable skill chips (Design, Photography, Marketing) instead of a course catalogue. Search on the interests screen is how a freeform goal still becomes a path.",
        insights: [
          {
            title: "Outcome-first phrasing",
            description:
              "Participants preferred a direct “What do you want to learn?” over a course catalogue — it felt tailored rather than like shopping.",
          },
          {
            title: "Snackable over exhaustive",
            description:
              "Busy professionals wanted directed, short practice — not another hour-long lecture before they could start.",
          },
          {
            title: "Pricing up front",
            description:
              "Career switchers wanted ROI and plan details early. Phase 2 added a pricing step without hurting completion.",
          },
        ],
        quotes: [
          "It's so visually clean and directly asks what I want to make. It feels like it's tailoring the journey to me.",
          "It's simple and concise—not too much wording. Very easy to read and answer.",
        ],
        layout: "full",
        images: [
          {
            src: "/images/projects/path-learning/design-system.png",
            alt: "Path Learning brand system — Newsreader wordmark, Poppins headlines, palette, iconography, and UI",
            caption: "Type, palette, iconography, and core UI",
            width: 1024,
            height: 729,
          },
        ],
      },
      branding: {
        intro:
          "The brand needed to feel like a studio for practice — playful illustration, not another gamified course app. A **Newsreader** wordmark in forest green, mint fields, and charcoal actions keep skill cards and completion states distinct without turning the product into a toy.",
        colors: [
          { name: "Paper", hex: "#FFFFFF", role: "Buttons, search, working surfaces" },
          { name: "Charcoal", hex: "#242527", role: "Primary buttons, selected chips, text" },
          { name: "Forest", hex: "#388068", role: "Wordmark" },
          { name: "Mint", hex: "#E3F5DF", role: "Splash, interests, path fields" },
          { name: "Sage", hex: "#C3E7BB", role: "Skill-path chips" },
          { name: "Lilac", hex: "#D7CFFE", role: "Skill and completion accents" },
          { name: "Blush", hex: "#F0D9F7", role: "Secondary skill accents" },
          { name: "Sky", hex: "#B6D8FE", role: "Secondary UI accent" },
        ],
        typefaces: [
          {
            name: "Newsreader",
            role: "Wordmark",
            weights: "Medium, Semibold",
          },
          {
            name: "Poppins",
            role: "H1 and H2 headlines",
            weights: "Semibold, Bold",
          },
          {
            name: "Work Sans",
            role: "Body and UI",
            weights: "Regular, Medium",
          },
        ],
        typography:
          "**Newsreader** is the Path Learning wordmark. **Poppins** carries H1 and H2 so “Choose Your Interests” and skill names stay friendly at phone size. **Work Sans** is the body — search, chips, and long lesson copy — so it doesn’t compete with the display type.",
        palette:
          "Mint (#E3F5DF) holds splash and sign-up so illustration can sit on a field instead of a white void. **Lilac** is login. **Charcoal** (#242527) is the only high-contrast action. Forest (#388068) is reserved for the wordmark. White is the working surface. Sage, blush, and sky mark adjacent skills without turning the product into a toy.",
        messaging:
          "The product speaks in short actions, not catalog copy: “Sign Up,” “Login,” “Choose Skills,” “Choose Skill,” “Next Lesson,” “Complete Lesson.” Feedback is a score plus notes — mentor and AI — instead of a vague “looks good.”",
      },
      visuals: {
        layout: "phones",
        tone: "dark",
        roomy: true,
        images: [
          {
            src: "/images/projects/path-learning/screens/01-splash.png",
            alt: "Path Learning splash — Explore and Master New Skills, with Sign Up and Login",
            caption: "Splash",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/02-signup.png",
            alt: "Path Learning sign up — Name, Email, and Password",
            caption: "Sign up",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/03-login.png",
            alt: "Path Learning login — Email, Password, and Forgot",
            caption: "Login",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/04-interests.png",
            alt: "Path Learning onboarding — Choose Your Interests with searchable skill chips",
            caption: "Interests",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/05-choose-skill.png",
            alt: "Path Learning home — What do you want to learn, Photography skill selected",
            caption: "Choose a skill",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/06-path.png",
            alt: "Path Learning photography path — Visual Storytelling modules",
            caption: "Photography path",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/07-module.png",
            alt: "Path Learning Module 1 Framing with Choosing Your Camera current",
            caption: "Module",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/08-lesson.png",
            alt: "Path Learning lesson — Choosing Your Camera",
            caption: "Lesson",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/09-assignment.png",
            alt: "Path Learning assignment — Choose Your Camera with file upload",
            caption: "Assignment",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/10-module-progress.png",
            alt: "Path Learning Module 1 Framing — first lesson complete, Framing Your Shots current",
            caption: "Module progress",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/11-feedback.png",
            alt: "Path Learning feedback — 8.5 overall with mentor and AI notes",
            caption: "Feedback",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/12-choose-skill-progress.png",
            alt: "Path Learning home — Photography skill card at 80 percent",
            caption: "Skill progress",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/13-mentor.png",
            alt: "Path Learning mentor booking with Sarah Chen",
            caption: "Mentor",
            width: 393,
            height: 852,
          },
          {
            src: "/images/projects/path-learning/screens/14-menu.png",
            alt: "Path Learning menu — Home, Paths, Projects, Mentors, Settings",
            caption: "Menu",
            width: 393,
            height: 852,
          },
        ],
      },
      solution: {
        intro:
          "Path is a **practice loop** of modules, assignments, and feedback — not a video library with a progress bar. Four surfaces carry the core loop; the mentor calendar sits one step up when automated notes run out.",
        features: [
          {
            title: "Lesson + assignment",
            description:
              "A short lesson, then an **artifact** — choose a camera, upload a photo — instead of finishing a video and stopping.",
          },
          {
            title: "Illustrated skill path",
            description:
              "Photography opens as Visual Storytelling: Framing 101 through Recreate a Film Still, so the next module is a list, not a search. The home card later shows percent complete so progress is a project, not a video checkbox.",
          },
          {
            title: "AI and mentor feedback",
            description:
              "An overall score with separate mentor and AI notes — lighting, composition, color — instead of a pass/fail.",
          },
          {
            title: "Mentor booking",
            description:
              "Live availability on Sarah Chen’s calendar when the assignment needs a human eye. Testing made the calendar easy; the remaining request is a lower-cost **quick critique**.",
          },
        ],
      },
      testing: {
        intro:
          "Two rounds of remote moderated tests with **5 participants** (career switchers, an active maker, a theoretical learner, a structured learner). Phase 1 proved the lesson-and-assignment loop. Phase 2 measured iterations on pricing, module progression, collapsible deep-dives, and mentor booking.",
        findings: [
          "**100%** completed onboarding in both rounds; difficulty moved from 1.2 to **1.1 / 5** after adding pricing.",
          "The photography path and snackable lessons were the strongest engagement drivers — “checking off videos doesn’t feel like real progress.”",
          "Mentor booking hit **100%** completion; Phase 2 ease improved from 1.8 to **1.1 / 5**.",
          "AI + structured peer prompts (“what works” / “one change”) reduced isolation; scholars still wanted Socratic depth over a single 8.5 score.",
        ],
        iterations: [
          "Added early pricing transparency for structured learners and career switchers.",
          "Collapsible deep-dive literature and Socratic prompts for theoretical learners.",
          "Persistent **Complete Lesson** on the feedback tab; draft/sandbox remains a next-step for submission anxiety.",
          "Redesigned Sarah Chen booking calendar; planned a $20 asynchronous quick critique beside live sessions.",
        ],
      },
      outcomes: [
        { stat: "100%", label: "onboarding completion in both test rounds" },
        { stat: "1.1", label: "mentor booking difficulty after iteration" },
        { stat: "5", label: "archetypes tested across two phases" },
      ],
      reflection:
        "The product only works if the **first session produces work**, not a watched video. The path, the assignment, and the feedback ladder all exist to get someone from a blank page to an artifact they can show. What I’m still holding: a true draft/sandbox, and a cheaper asynchronous mentor option so live calls aren’t the only human door.",
      conclusion: {
        challenges: [
          "Serving switchers who want a rigid roadmap, makers who want open paths, and scholars who want depth — without three separate apps.",
          "Submission anxiety: people would finish the assignment steps and still hesitate to mark work final.",
          "Pricing trust versus onboarding length — adding a plan step helped, but the questionnaire can’t grow forever.",
        ],
        learnings: [
          "Progress has to look like a project milestone, not a video checkbox.",
          "Feedback is a ladder: AI for speed, constrained peer prompts for quality, humans for judgment.",
          "Collapsible depth lets scholars go further without trapping casual learners in literature.",
        ],
        nextSteps: [
          "Save-draft / sandbox on assignment upload.",
          "Stronger visual affordance on deep-dive toggles.",
          "Asynchronous $20 quick critiques next to live booking.",
        ],
        proud:
          "Designing a full practice loop — from path choice through mentor booking — and watching testers describe it as job-ready progress instead of another course to finish.",
      },
    },
  },
  {
    slug: "pulsefit",
    name: "PulseFit",
    description:
      "A mobile fitness and diet tracker designed for people who want to stay consistent without spending their free time in the app.",
    image: "/images/project-pulsefit-cover.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
      { label: "Mobile", variant: "lavender" },
    ],
    caseStudy: {
      tagline:
        "A fitness and diet app for busy adults who need tracking that stays simple and personal.",
      presentation: {
        label: "case study presentation",
        href: "https://www.figma.com/deck/UkAoxp7axZkm6oXXOlDUk7",
      },
      meta: {
        role: "UX/UI Lead",
        timeline: "4 weeks · 2026",
        team: "Solo design lead",
        platform: "Mobile",
        tools: ["Figma", "FigJam"],
      },
      overview:
        "PulseFit is a health, fitness, and diet tracker for adults 18–40 who want better habits but can’t spend hours logging every detail. As **sole UX/UI lead**, I led research, defined the information architecture, iterated from lo-fi through usability testing, and designed the high-fidelity prototype. The product brings workouts, nutrition, and light community features together in an experience that stays quick to use day to day.",
      problem: {
        statement:
          "Fitness apps often demand **too much input** and still feel **generic** for people with limited time.",
        points: [
          "Users abandon tracking when setup and logging consume their scarce free time.",
          "Competing products tended to be either deep and heavy, or simple and incomplete.",
          "Calorie-only progress rarely felt motivating on its own.",
        ],
      },
      goals:
        "Design a single fitness and diet experience that remains quick to use on busy weeks, with **consistency** as the primary measure of success.",
      research: {
        intro:
          "In week 1 I conducted **5 interviews**, reviewed MyFitnessPal, Strava, and Apple Fitness, and ran a card sort. Participants wanted fitness and diet in one place — as long as the product didn’t become another time sink.",
        methods: [
          {
            title: "User interviews",
            description:
              "**5 sessions** on motivation, current tools, and where tracking breaks down. Time pressure surfaced in every conversation.",
          },
          {
            title: "Competitive analysis",
            description:
              "Reviewed MyFitnessPal, Strava, and Apple Fitness with a focus on **onboarding and logging**, where users most often stalled.",
          },
          {
            title: "Card sorting",
            description:
              "Mapped how participants grouped fitness, diet, and social features, which informed the five primary sections.",
          },
        ],
        insights: [
          { stat: "5", label: "interviews" },
          { stat: "3", label: "competitors" },
          { stat: "20", label: "cards sorted" },
        ],
        quotes: [
          "I have a busy career schedule and don't want to spend too much time on tracking tools.",
          "I don't think any tool right now has an all-in-one solution that doesn't feel too complicated.",
          "If it's fun, free, and competitive, I'm in.",
        ],
        persona: {
          name: "Danielle Carter",
          role: "29 · Product Manager · San Francisco",
          quote: "I need something that fits into my busy schedule.",
          goals: [
            "Stay active despite a demanding career",
            "Track progress without spending too much time",
          ],
          frustrations: [
            "Limited time and a sporadic schedule",
            "Existing apps feel overwhelming",
          ],
        },
        personas: [
          {
            name: "Danielle Carter",
            role: "29 · Product Manager · San Francisco",
            quote: "I need something that fits into my busy schedule.",
            goals: [
              "Stay active despite a demanding career",
              "Track progress without spending too much time",
            ],
            frustrations: [
              "Limited time and sporadic schedule",
              "Apps feel overwhelming",
            ],
          },
          {
            name: "Sebastian Day",
            role: "32 · Occupational Therapist · Denver",
            quote: "I prefer minimal and intuitive tracking.",
            goals: [
              "Stay consistent with short self-planned workouts",
              "Simple routines without gym dependency",
            ],
            frustrations: [
              "Sporadic schedule disrupts routine",
              "Hard to stay consistent by location/time",
            ],
          },
          {
            name: "Daniel Martinez",
            role: "24 · Student · Seattle",
            quote: "If it's fun, free, and competitive, I'm in.",
            goals: [
              "Build strength and improve cardio",
              "Compare progress with friends",
            ],
            frustrations: [
              "Gear-heavy workouts",
              "Confusing or overwhelming routines",
            ],
          },
        ],
      },
      define: {
        intro:
          "With a **4-week** timeline, I focused early on flows and lo-fi structure, then moved into visual design once testing confirmed the foundation held up.",
        steps: [
          "Flows, storyboards, and lo-fi sketches",
          "Usability testing on lo-fi, then iteration into hi-fi",
          "Final prototype and a second round of testing",
        ],
        timeline: [
          "Week 1: Research and personas",
          "Week 2: IA and lo-fi",
          "Week 3: Hi-fi and prototype",
          "Week 4: Usability testing",
        ],
      },
      ia: {
        intro:
          "The card sort pointed to **five sections** — Home, Fitness, Diet, Social, and Profile — so planning and tracking stayed easy to find in day-to-day use.",
        sitemap: [
          "Home → Dashboard, Activity, Progress, Goals",
          "Fitness → Workouts, Plans, Exercise Library",
          "Diet → Meals, Recipes, Nutrition, Goals",
          "Social → Community, Challenges, Friends, Feed",
          "Profile → Settings, Preferences, Devices",
        ],
        flow: [
          "Onboarding",
          "Workouts",
          "Tracking",
          "Diet logging",
          "Social",
        ],
      },
      wireframes: {
        lowFi:
          "I sketched the full set of flows — from onboarding through scheduling — in lo-fi first, with enough detail to **validate hierarchy and task flow** before moving into visual design.",
        layout: "full",
        images: [
          {
            src: "/images/projects/pulsefit/wireframes/pulsefit-lofi-mass.png",
            alt: "PulseFit low-fidelity wireframes — full screen set",
            caption: "Low-fidelity wireframes across the core flows",
            width: 1412,
            height: 2348,
          },
        ],
        hiFi:
          "The high-fidelity UI uses a dark foundation with **neon lime** accents so progress stands out quickly. Workouts and diet stay intentionally light; social features focus on challenges and friends rather than a heavy feed.",
      },
      onboarding: {
        intro:
          "Participants wanted personalization, but lengthy onboarding reduced follow-through. I kept the quiz short — fitness level, blockers, diet goals, and key body metrics — enough to generate a plan users can **begin the same day**.",
        insights: [
          {
            title: "Time is the #1 blocker",
            description:
              "Asking about schedule constraints early helps the plan reflect how people actually live.",
          },
          {
            title: "Light personalization",
            description:
              "A small set of questions is enough to tune intensity and meals without a long setup.",
          },
          {
            title: "Clear goals",
            description:
              "Height, weight, and a target give the plan concrete inputs from the start.",
          },
        ],
        quotes: [
          "I have a busy career schedule and don't want to spend too much time on tracking tools.",
          "I need something that fits into my busy schedule.",
        ],
        layout: "phones",
        images: [
          {
            src: "/images/projects/pulsefit/onboarding/01-fitness-level.png",
            alt: "PulseFit onboarding — fitness level quiz",
            caption: "Fitness level",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/onboarding/02-fitness-blockers.png",
            alt: "PulseFit onboarding — fitness blockers quiz",
            caption: "Fitness blockers",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/onboarding/03-diet-goals.png",
            alt: "PulseFit onboarding — diet goals quiz",
            caption: "Diet goals",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/onboarding/04-diet-blockers.png",
            alt: "PulseFit onboarding — diet blockers quiz",
            caption: "Diet blockers",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/onboarding/05-height.png",
            alt: "PulseFit onboarding — height picker",
            caption: "Height",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/onboarding/06-weight.png",
            alt: "PulseFit onboarding — weight picker",
            caption: "Weight",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/onboarding/07-weight-goal.png",
            alt: "PulseFit onboarding — weight goal picker",
            caption: "Weight goal",
            width: 375,
            height: 864,
          },
        ],
      },
      visuals: {
        layout: "phones",
        images: [
          {
            src: "/images/projects/pulsefit/final/01.png",
            alt: "PulseFit welcome screen",
            caption: "Welcome",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/11.png",
            alt: "PulseFit plan summary screen",
            caption: "Plan ready",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/12.png",
            alt: "PulseFit home dashboard",
            caption: "Home",
            width: 375,
            height: 1075,
          },
          {
            src: "/images/projects/pulsefit/final/13.png",
            alt: "PulseFit workout library",
            caption: "Workouts",
            width: 361,
            height: 1076,
          },
          {
            src: "/images/projects/pulsefit/final/15.png",
            alt: "PulseFit workout detail",
            caption: "Workout detail",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/22.png",
            alt: "PulseFit active workout",
            caption: "Active workout",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/23.png",
            alt: "PulseFit workout complete",
            caption: "Workout complete",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/16.png",
            alt: "PulseFit nutrition screen",
            caption: "Nutrition",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/14.png",
            alt: "PulseFit recipes screen",
            caption: "Recipes",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/24.png",
            alt: "PulseFit log meal camera",
            caption: "Log meal",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/25.png",
            alt: "PulseFit meal detection review",
            caption: "Meal logged",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/17.png",
            alt: "PulseFit social leaderboard",
            caption: "Leaderboard",
            width: 375,
            height: 936,
          },
          {
            src: "/images/projects/pulsefit/final/18.png",
            alt: "PulseFit friends feed",
            caption: "Friends",
            width: 287,
            height: 1076,
          },
          {
            src: "/images/projects/pulsefit/final/19.png",
            alt: "PulseFit challenges",
            caption: "Challenges",
            width: 329,
            height: 1076,
          },
          {
            src: "/images/projects/pulsefit/final/20.png",
            alt: "PulseFit profile",
            caption: "Profile",
            width: 375,
            height: 864,
          },
          {
            src: "/images/projects/pulsefit/final/21.png",
            alt: "PulseFit schedule and calendar",
            caption: "Schedule",
            width: 375,
            height: 864,
          },
        ],
      },
      branding: {
        intro:
          "The visual system needed to feel focused and energetic: dark surfaces for concentration, a sharp lime accent for progress, and type that remains readable on dense mobile dashboards.",
        colors: [
          { name: "Void", hex: "#0B0B0B", role: "App background" },
          { name: "Surface", hex: "#171717", role: "Cards & sheets" },
          { name: "Neon Lime", hex: "#C8F53A", role: "Progress, CTAs, highlights" },
          { name: "Snow", hex: "#F5F5F5", role: "Primary text & icons" },
          { name: "Mist", hex: "#8C8C8C", role: "Secondary labels" },
        ],
        typefaces: [
          {
            name: "Inter",
            role: "UI body, labels, and data",
            weights: "Regular, Medium, SemiBold",
          },
          {
            name: "SF Pro",
            role: "System metrics & native iOS feel",
            weights: "Regular, Semibold",
          },
        ],
        typography:
          "**Inter** carries most of the interface — it stays clear at small sizes across rings, labels, and lists. **SF Pro** appears on selected health metrics for a more native iOS feel. Hierarchy relies on weight and accent color rather than oversized display type.",
        palette:
          "Near-black backgrounds keep the product calm. **Neon lime** is reserved for progress rings, primary actions, and completion states so status is easy to scan. Neutral grays support secondary information.",
        messaging:
          "Fitness. Diet. Community. — practical language tied to what the user is trying to accomplish.",
      },
      solution: {
        intro:
          "PulseFit brings goals, workouts, diet, and a light social layer into one experience. Daily progress is framed in a way that stays achievable, even when logging isn’t perfect.",
        features: [
          {
            title: "Dashboard",
            description:
              "Rings and vitals up front so users can check in within seconds.",
          },
          {
            title: "Workouts",
            description:
              "Sessions shaped by onboarding inputs, with progression and brief form guidance.",
          },
          {
            title: "Diet",
            description:
              "Macros, recipes, and **photo logging**, introduced after participants cited manual entry as their biggest pain point.",
          },
          {
            title: "Social",
            description:
              "Challenges and sharing with friends — enough for accountability, without a heavy social feed.",
          },
        ],
      },
      testing: {
        intro:
          "I tested lo-fi early to catch structural issues, then ran high-fidelity sessions in week 4 on dashboard, workouts, and diet logging — the flows users would return to most often.",
        findings: [
          "Participants found the dashboard and workouts clear and suitably personal.",
          "Structured sessions and form guidance helped less-experienced users.",
          "**Photo logging** drew the strongest response in the diet flow.",
        ],
        iterations: [
          "Clarified personal goals on progress rings after several participants missed them.",
          "Added weekly and monthly progression views.",
          "Moved recipes to a text-first format for faster scanning between meals.",
        ],
      },
      outcomes: [
        { stat: "3", label: "personas" },
        { stat: "5", label: "core sections" },
        { stat: "4 wks", label: "research to prototype" },
      ],
      reflection:
        "The clearest takeaway was how much **consistent use** mattered. That influenced decisions throughout — from onboarding length to how progress is framed and what stayed out of scope.",
      conclusion: {
        challenges: [
          "Combining fitness and diet in one product without overwhelming users.",
          "Designing for three personas with very different schedules.",
          "Presenting progress in a personal way without overloading the interface with data.",
        ],
        learnings: [
          "Schedules are irregular, and the product needs to accommodate that.",
          "Clear information hierarchy is what makes simplicity work.",
          "Photo logging meaningfully reduced friction in diet tracking during testing.",
        ],
        nextSteps: [
          "Richer weekly and monthly progression.",
          "Clearer goal cues on the progress rings.",
          "A broader accessibility pass.",
        ],
        proud:
          "Taking the work from interviews through a tested prototype as sole design lead, while keeping the experience usable for time-constrained users.",
      },
    },
  },
  {
    slug: "netflix-community",
    name: "Netflix Community",
    description:
      "A private-by-default social layer for Netflix that keeps post-watch conversation, spoiler-safe discussion, and trusted recommendations inside the app.",
    image: "/images/project-netflix-community.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
      { label: "Mobile", variant: "lavender" },
      { label: "TV", variant: "outline" },
    ],
    caseStudy: {
      tagline:
        "A private-by-default social layer for Netflix — friend circles, spoiler-safe discussion, and trusted collections that keep the story going in-app.",
      presentation: {
        label: "interactive prototype",
        href: "https://www.figma.com/proto/OFEilBtkAjdJsDBRhMeZiz/Netflix-Community---Capstone-1--Add-a-Feature?node-id=151-6&p=f&t=D65iIEoLP9ghQYY2-1&scaling=min-zoom&content-scaling=fixed&page-id=151%3A5&starting-point-node-id=151%3A6&show-proto-sidebar=1",
      },
      meta: {
        role: "UX/UI lead",
        timeline: "4 weeks · 2026",
        team: "Solo designer",
        platform: "Mobile and TV",
        tools: ["Figma", "FigJam"],
      },
      overview:
        "Netflix Community is a four-week feature concept that turns Netflix from a **utility for watching** into a place to sit with a story afterward — without making consumption secondary. As UX/UI lead I owned the end-to-end process: research, IA, wireframes, and a high-fidelity prototype. The work targets **platform leakage**: people leave for Reddit, YouTube, WhatsApp, and IMDb because the app has nothing to say once the credits roll. Netflix already wins at algorithmic discovery. It is missing an integrated social loop.",
      problem: {
        statement:
          "After a title ends, people leave Netflix to talk, search, and decide what to watch next — and the app gives them **no trusted place to stay**.",
        points: [
          "**Platform leakage.** Viewers fragment the experience across Reddit, YouTube recaps, and group chats, so the social loop never comes back.",
          "**Public-by-default is the wrong model.** Forums feel noisy, spoiler-heavy, and unsafe. People want intimacy — discussion inside private circles, not a bid for viral metrics.",
          "**Discovery paralysis.** A huge catalog plus untrusted recs makes choosing the next title tiring, so sessions end at the credits.",
        ],
      },
      goals:
        "Internalize the post-watch loop: **private-by-default circles**, **spoiler-gated discussion** at high-intent moments (including TV → phone), and **trusted collections** that turn a friend’s note into Play or Add to My List.",
      research: {
        intro:
          "I audited where social discovery currently lives, then interviewed people who already talk about shows constantly — just not on Netflix. Competitors solve **what to watch**, but they all sit **outside the viewing moment**. Interviews made the product constraint obvious: social features fail when they are public-by-default.",
        methods: [
          {
            title: "Competitive audit",
            description:
              "Mapped Letterboxd, Trakt, IMDb, and Reddit. Each solves discovery or discussion **off-platform**, so the moment after the credits still leaks out of Netflix.",
          },
          {
            title: "User interviews",
            description:
              "Five semi-structured sessions with **power users aged 25–34**. The dominant frustrations were spoiler risk and the noise of public forums; the desire was safety and intimacy inside a trusted circle.",
          },
          {
            title: "Synthesis",
            description:
              "The design insight was **private-by-default**. People do not want to compete for attention. They want to share trusted recs and talk immediately after the credits, with spoilers gated until they choose otherwise.",
          },
        ],
        insights: [
          { stat: "5", label: "power-user interviews, ages 25–34" },
          { stat: "4", label: "products in the competitive audit" },
          { stat: "7", label: "task flows in usability testing" },
        ],
        persona: {
          name: "Jordan Hale",
          role: "31 · Solo viewer · Oakland",
          quote:
            "I finish a finale and have no one to talk to. Reddit is a spoiler minefield. I just want a room that waited with me.",
          goals: [
            "Talk about a title without being spoiled",
            "A recap at the moment they need it — not a YouTube hunt",
          ],
          frustrations: [
            "Public forums feel toxic or too loud",
            "No in-app place to sit with a story after it ends",
          ],
        },
        personas: [
          {
            name: "Jordan Hale",
            role: "31 · Solo viewer · Oakland",
            quote:
              "I finish a finale and have no one to talk to. Reddit is a spoiler minefield. I just want a room that waited with me.",
            goals: [
              "Episode-gated discussion that matches progress",
              "Plot context without leaving for YouTube",
            ],
            frustrations: [
              "Isolation after watching",
              "Spoilers and pile-on culture off-platform",
            ],
          },
          {
            name: "Maya Chen",
            role: "27 · Social watcher · Brooklyn",
            quote:
              "I already text my friends ‘you have to watch this.’ I shouldn’t have to leave the app to send the list.",
            goals: [
              "Share a must-watch list with notes attached",
              "Talk with her circle, not the internet",
            ],
            frustrations: [
              "Recommendations leak into iMessage and Notes",
              "Friend recs are hard to act on later",
            ],
          },
        ],
      },
      define: {
        intro:
          "The strategy is **private-by-default** — Friend Circles as digital living rooms, Trusted Collections so people can be tastemakers for their circle, and a moderated public hub so people without an active circle are not locked out. Intimacy over virality. I prioritized by whether a feature reduced leakage, protected trust, or shortened the path to the next title.",
        steps: [
          "Audit competitors and interview power users",
          "Commit to private-by-default: Circles, spoiler gates, trusted collections",
          "Sketch, wireframe, then test a hi-fi prototype across mobile and TV",
        ],
        timeline: [
          "Week 1: Competitive audit, interviews, private-by-default insight",
          "Week 2: Ideation, lo-fi, Community Hub and collection entry points",
          "Week 3–4: Hi-fi, remote usability testing, moderation and trigger refinements",
        ],
      },
      ia: {
        intro:
          "Community lives on the **title page** as a third tab beside Episodes and Trailers, and as a tab in Netflix navigation. Discussion is grouped by season, episode, and topic, with spoilers **blurred until you have reached that episode**. Collections sit in the circle, not in a public popularity contest — no follower counts, no trending ranks.",
        sitemap: [
          "Title page → Episodes · Trailers · Community",
          "Community hub → Episode-sorted threads, spoiler gates, topic chips",
          "Your circle → Private threads, shared collections, notes",
          "Collections → Must-watch lists with Add to My List / Play",
          "Safety → Report, mute, spoiler gates that stay quiet on the dark UI",
        ],
        flow: [
          "Finish a title",
          "Open Community",
          "Join a gated thread",
          "Post in your circle",
          "Save a collection",
        ],
      },
      wireframes: {
        lowFi:
          "Before visual design I explored structure through rapid sketching and lo-fi — especially the **Community Hub** layout and **Trusted Collections** entry points — so information hierarchy could change cheaply. Device splits showed up early: TV is the primary viewing surface, so posting from the living room needed a **connect-to-phone** path. The remote never becomes a keyboard.",
        layout: "full",
        images: [
          {
            src: "/images/projects/netflix-community/user-flows.png",
            alt: "Netflix Community user flows for private hubs, public discussion, collections, and shared-list prompts",
            caption: "Four primary flows: private hub, public hub, collections, and a shared-list prompt",
            width: 1024,
            height: 608,
          },
          {
            src: "/images/projects/netflix-community/wireframes.jpg",
            alt: "Netflix Community low-fidelity wireframes across title, hub, thread, composer, and collection screens",
            caption: "Low-fidelity screens for title, hubs, threads, posting, and collections",
            width: 1024,
            height: 287,
          },
        ],
        hiFi:
          "High-fidelity stays inside Netflix’s own system — near-black surfaces, the red wordmark, and a Community tab on the title. **Phone and TV share the same jobs** with different input. A TV post-watch prompt uses the remote to hand off to the phone, so comments stay frictionless. Copy is quiet on purpose: **Keep the story going.** Spoilers stay hidden until you choose to see them. A post-watch prompt (**What stayed with you?**) starts the thread without turning the credits into a comments section.",
      },
      branding: {
        intro:
          "This is a feature inside Netflix, not a new brand. The visual work was about **restraint** — using the existing dark UI, and adding only the cues that make discussion feel safe: spoiler chips, circle lockups, and collection cards you can act on in one tap.",
        colors: [
          { name: "Netflix Black", hex: "#141414", role: "App background" },
          { name: "Surface", hex: "#1F1F1F", role: "Cards and composer" },
          { name: "Netflix Red", hex: "#E50914", role: "Brand, selected tab" },
          { name: "Match Green", hex: "#46D369", role: "Safety and match states" },
          { name: "Muted", hex: "#A7A7A7", role: "Secondary labels" },
        ],
        typefaces: [
          {
            name: "Netflix Sans / Arial",
            role: "UI, titles, and discussion",
            weights: "Regular, Bold, ExtraBold",
          },
        ],
        typography:
          "Title treatment stays Netflix-large. Community copy is smaller and denser — thoughts, not trailers. The spark mark (✦) is the only new identity cue, used on the Community tab so it can sit next to Home and New & Hot without looking like a social network.",
        palette:
          "Near-black keeps watching mode intact. **Red** is reserved for the wordmark and the selected Community tab. Green is only for safety and match — never for likes or ranks — so the product does not start scoring people.",
        messaging:
          "“Keep the story going.” “What stayed with you?” “Be kind. Be curious. No spoilers.” The product speaks like a living room, not a feed.",
      },
      visuals: {
        heading: "Phone",
        layout: "phones",
        tone: "dark",
        roomy: true,
        images: [
          {
            src: "/images/projects/netflix-community/phone/01-title.png",
            alt: "Netflix title page with a Community tab on Stranger Things",
            caption: "Title · Community",
            width: 362,
            height: 1024,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/02-hub.png",
            alt: "Public Community Discussion Hub for Stranger Things with spoiler-gated threads",
            caption: "Discussion hub",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/04-thread.png",
            alt: "Episode thread with replies and a spoiler-hidden comment",
            caption: "Thread",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/05-compose.png",
            alt: "New thought composer with season and episode pickers",
            caption: "New thought",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/03-circle.png",
            alt: "Private circle discussion hub for Stranger Things",
            caption: "Circle hub",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/06-prompt.png",
            alt: "Post-watch prompt asking what stayed with you after an episode",
            caption: "Post-watch prompt",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/09-collections.png",
            alt: "Recommended collections from a circle, filterable by mood",
            caption: "Recommended collections",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/08-collection.png",
            alt: "Fantasy Favorites collection with Play and My List actions",
            caption: "Collection",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/phone/07-share.png",
            alt: "Maya shared a collection with a personal note",
            caption: "Shared collection",
            width: 393,
            height: 852,
            statusBar: "dark",
          },
        ],
        galleries: [
          {
            heading: "TV",
            layout: "full",
            tone: "dark",
            images: [
              {
                src: "/images/projects/netflix-community/tv/01-hub.png",
                alt: "TV Community Discussion Hub for Stranger Things",
                caption: "Discussion hub",
                width: 1024,
                height: 576,
              },
              {
                src: "/images/projects/netflix-community/tv/02-thread.png",
                alt: "TV episode thread with replies, report, and spoiler reveal",
                caption: "Thread",
                width: 1024,
                height: 576,
              },
              {
                src: "/images/projects/netflix-community/tv/04-prompt.png",
                alt: "TV post-watch overlay asking what stayed with you",
                caption: "Post-watch prompt",
                width: 1024,
                height: 576,
              },
              {
                src: "/images/projects/netflix-community/tv/03-pairing.png",
                alt: "TV sign-in overlay with a code to post from a phone",
                caption: "Post from your phone",
                width: 1024,
                height: 576,
              },
            ],
          },
        ],
      },
      solution: {
        intro:
          "The product balances **session length** — capturing the high-intent moment after a title — with **user psychology**: a safe harbor, not a feed. MVP is private-by-default. Virality stays out.",
        features: [
          {
            title: "Friend Circles",
            description:
              "Private threads with people you already watch with. Trust is the default. Public discussion exists beside it so people without a circle are not locked out — but it is never the first posture.",
          },
          {
            title: "Trusted collections",
            description:
              "Must-watch lists so friends can be tastemakers for their circle. Testers called this a direct answer to **choice paralysis**: a rec from someone they trust, saved or played in one tap.",
          },
          {
            title: "Post-watch prompt",
            description:
              "A context-aware composer after a title — “What stayed with you?” — designed first for **TV**, then handed to the phone so the remote never becomes a keyboard. The alternative to idle googling for a recap.",
          },
          {
            title: "Context cards",
            description:
              "Episode and movie recaps at the moment people usually switch to YouTube. Testers wanted them badly — and needed **precise triggers** so a recap never spoils an episode they have not reached.",
          },
        ],
      },
      testing: {
        intro:
          "I ran remote usability sessions on the high-fidelity prototype across **seven core task flows** — posting a thought, private-circle posting, receiving a shared collection, and the rest of the loop. Completion was complete; the work was in _how_ people felt while doing it.",
        findings: [
          "**100% task completion**, with **1.2 navigation errors** per session on average.",
          "**Context cards ended app-switching** for one participant: the recap they usually hunt on YouTube was already in Netflix.",
          "Spoiler gates were a **prerequisite, not a nice-to-have**. People relaxed when unread episodes stayed blurred.",
          "**4.8 / 5** trust and safety perception — testers felt safer here than on public social platforms.",
        ],
        iterations: [
          "Tightened **when** a context card appears so plot summaries cannot fire accidentally.",
          "Kept Report and Spoiler controls **present but quiet** after early notes that the icons felt like policing on the dark UI.",
          "Made spoiler gates more visible in the hub — navigation only felt safe once people could see what was hidden.",
        ],
      },
      outcomes: [
        { stat: "100%", label: "task completion in usability testing" },
        { stat: "4.8/5", label: "trust and safety perception" },
        { stat: "4 wks", label: "research through a tested prototype" },
      ],
      reflection:
        "The constraint that mattered most was **not building a social network**. Netflix already has attention. What it is missing is a trusted room after the story. Users were skeptical of anything that felt broadcastable, and eager once they understood private-by-default. Spoilers, circle privacy, and one-tap collections were the product. Virality was the thing to keep out.",
      conclusion: {
        challenges: [
          "Making discussion safe on a TV, where typing and spoiler risk are both worse.",
          "Giving recaps at the exact moment of friction without accidental spoilers.",
          "Keeping moderation visible without making people feel policed.",
        ],
        learnings: [
          "**Trust is the currency.** Private-by-default changed whether people would even try the feature.",
          "**Immediacy matters.** Context cards and post-watch prompts work because they sit at the friction — not in a buried tab.",
          "**Refinement over novelty.** The job was to tailor sharing a list or talking about a twist to the emotional context of watching — not to invent a new social network.",
        ],
        nextSteps: [
          "Category and mood filters for the public hub.",
          "Optional sync alerts when a circle shares a list — quiet, not a notification firehose.",
          "A broader pass on spoiler-trigger timing across more title types.",
        ],
        proud:
          "Designing a social layer that still feels like Netflix — a living room after the credits, not a feed competing with the story.",
      },
    },
  },
  {
    slug: "yuugen",
    name: "Yuugen",
    description:
      "An artist-owned Japanese streetwear brand of original anime- and cyberpunk-inspired graphics, built from illustration through launch.",
    image: "/images/project-yuugen-cover.jpg",
    tags: [
      { label: "Brand Identity", variant: "outline" },
      { label: "Illustration", variant: "solid" },
      { label: "Fashion", variant: "lavender" },
      { label: "Creative Direction", variant: "outline" },
      { label: "Marketing & Ops", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "An artist-owned streetwear brand named for a Japanese sense of subtle, mysterious beauty — original graphics, from Procreate to print.",
      presentation: {
        label: "the shop",
        href: "https://www.instagram.com/yuugenapparel",
      },
      meta: {
        role: "Founder, designer, and illustrator",
        timeline: "2020–2023",
        team: "Solo, with artist collaborations",
        platform: "Shopify, Instagram, Etsy, conventions",
        tools: ["Procreate", "Illustrator", "Shopify", "Instagram"],
      },
      overview:
        "**Yuugen** (n.) — a profound, mysterious sense of subtle beauty in the universe. I started Yuugen Apparel to get my art off the screen and onto clothing. Original work was drawn in **Procreate**, mocked up in **Illustrator**, and printed with local suppliers after weeks of sample shipping and trial and error. I ran user and market research, then launched as an online fashion brand in 2020. Over a year of operating primarily online I designed the Instagram presence, learned ads in the Facebook / Instagram ecosystem, posted drops and collections, and made **over 1,000 sales** through Instagram, Shopify, and Etsy. People wrote in during an uncertain period of time to say the brand meant something to them. I began collaborating with artists in the US and overseas, worked with fashion influencers, and pivoted to selling in person at anime conventions — where I met the communities the work was actually for.",
      goals:
        "My art lived on a screen — a Procreate file with no path to something people could wear. I wanted to **build an artist-owned Japanese streetwear brand** from my own graphics: get my drawings onto garments, communicate with vendors locally and overseas, prove production through samples, and learn how to sell it myself — market research, visual identity, Instagram and ads, Shopify and Etsy, then conventions.",
      define: {
        intro:
          "The process was the whole business: draw, mock up, sample, listen, drop. I stayed with it from the first illustration through ads, collaborations, and convention floors.",
        steps: [
          "Draw original graphics in **Procreate**",
          "Mock up garments in **Illustrator**",
          "Communicate with vendors locally and overseas; iterate on samples",
          "Research the market, then launch online",
          "Run Instagram, ads, and regular drops",
          "Collaborate with artists and sell at conventions",
        ],
        timeline: [
          "2020 — first samples, brand identity, online launch",
          "Year one — Instagram, Shopify, Etsy, 1,000+ sales",
          "Artist collaborations in the US and overseas",
          "Pivot to anime conventions and in-person community",
          "2020–2023 — Yuugen as a living streetwear practice",
        ],
      },
      branding: {
        intro:
          "The name is the brief. **Yuugen** is a Japanese idea of subtle, mysterious beauty — the same feeling as **mono no aware**, the ephemerality the first collection was titled after. The brand had to feel like Japanese streetwear, not a merch stall: black and white as the canvas, anime- and cyberpunk-inspired graphics as the tribute to the media that shaped the work, and a wordmark quiet enough to sit on a hoodie.",
        colors: [
          { name: "Ink", hex: "#111111", role: "Garments, wordmark, ads" },
          { name: "Paper", hex: "#F4F1EC", role: "Light tees, lookbook ground" },
          { name: "Ash", hex: "#8A8680", role: "Captions, secondary type" },
          { name: "Rose", hex: "#C45C6A", role: "Bloom graphics, accent drops" },
        ],
        typefaces: [
          {
            name: "Inter",
            role: "Shop, captions, and product names — dense enough for a drop list",
            weights: "400, 600",
          },
        ],
        typography:
          "The **custom Yuugen wordmark** carries the Japanese streetwear read. Body type stays small and cool so a collection page can hold names, prices, and sold-out states without shouting.",
        palette:
          "**Black and off-white** do the garment work. Color lives in the graphics — rose, bloom, devil — not as a wash over the brand. The lookbook stays desaturated so the illustration, not the photography lighting, is the product.",
        messaging:
          "“Subtle beauty of the ephemeral.” “幽玄 Streetwear.” The voice is a tribute, not a slogan — anime-inspired graphics for overlooked beauty, produced in North America.",
      },
      visuals: {
        label: "Collection",
        title: "Graphics, garments, and the lookbook",
        intro:
          "Original art on apparel, Instagram drops, and photographed wear — the brand as it actually shipped.",
        layout: "masonry",
        tone: "muted",
        banner: {
          src: "/images/projects/yuugen/logo-banner.jpg",
          alt: "Yuugen wordmark — YŪGEN 幽玄",
          width: 1600,
          height: 800,
        },
        images: [
          {
            src: "/images/projects/yuugen/g01.jpg",
            alt: "Yuugen wordmark — 幽玄 YŪGEN with blossom",
            width: 1359,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g02.jpg",
            alt: "Yuugen brand identity board with wordmark, palette, and apparel mockups",
            width: 1174,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g03.jpg",
            alt: "Bloom 02 hoodie, back graphic",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g04.jpg",
            alt: "Bloom 02 hoodie, front graphic",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g05.jpg",
            alt: "Yuugen drop 1 longsleeve mockup",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g06.jpg",
            alt: "Awake tee mockup from Yuugen drop 1",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g07.jpg",
            alt: "Yuugen drop 1 white tee mockup",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g08.jpg",
            alt: "Yuugen drop 1 hoodie mockup",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g09.jpg",
            alt: "Gaze graphic tee mockup from Yuugen drop 1",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g10.jpg",
            alt: "Yuugen basic hoodie mockup in white",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g11.jpg",
            alt: "Yuugen drop 1 face mask mockup",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g12.jpg",
            alt: "Yuugen reminder Instagram post",
            width: 900,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g13.jpg",
            alt: "Yuugen reminder Instagram post, alternate",
            width: 900,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g14.jpg",
            alt: "Yuugen Collection I Bloom hoodie campaign",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g15.jpg",
            alt: "Yuugen Drop 1 sale campaign",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g16.jpg",
            alt: "Yuugen Collection I — Mono no Aware campaign",
            width: 1500,
            height: 1500,
          },
          {
            src: "/images/projects/yuugen/g17.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1233,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g18.jpg",
            alt: "Yuugen lookbook photograph",
            width: 895,
            height: 895,
          },
          {
            src: "/images/projects/yuugen/g19.jpg",
            alt: "Yuugen lookbook photograph",
            width: 895,
            height: 895,
          },
          {
            src: "/images/projects/yuugen/g20.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1227,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g21.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g22.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g23.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1303,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g24.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1280,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g25.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1280,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g26.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g27.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g28.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g29.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g30.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g31.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g32.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g33.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g34.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1122,
          },
          {
            src: "/images/projects/yuugen/g35.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g36.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g37.jpg",
            alt: "Yuugen Collection I graphic tee, still life",
            width: 1500,
            height: 1038,
          },
          {
            src: "/images/projects/yuugen/g38.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1200,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g39.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g40.jpg",
            alt: "Yuugen lookbook photograph",
            width: 750,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g41.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g42.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g43.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1300,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g44.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1066,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g45.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g46.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g47.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1265,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g48.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1066,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g49.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g50.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g51.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g52.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1440,
            height: 1264,
          },
          {
            src: "/images/projects/yuugen/g53.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1430,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g54.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g55.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g56.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g57.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g58.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1064,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g59.jpg",
            alt: "Yuugen lookbook photograph",
            width: 900,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g60.jpg",
            alt: "Yuugen lookbook photograph",
            width: 750,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g61.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g62.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g63.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g64.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g65.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g66.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g67.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1066,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g68.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1088,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g69.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1066,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g70.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1066,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g71.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g72.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g73.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g74.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g75.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1257,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g76.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1017,
          },
          {
            src: "/images/projects/yuugen/g77.jpg",
            alt: "Yuugen lookbook photograph",
            width: 562,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g78.jpg",
            alt: "Yuugen lookbook photograph",
            width: 562,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g79.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g80.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1216,
          },
          {
            src: "/images/projects/yuugen/g81.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g82.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g83.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1249,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g84.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1067,
            height: 1600,
          },
          {
            src: "/images/projects/yuugen/g85.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 1000,
          },
          {
            src: "/images/projects/yuugen/g86.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 844,
          },
          {
            src: "/images/projects/yuugen/g87.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 844,
          },
          {
            src: "/images/projects/yuugen/g88.jpg",
            alt: "Yuugen lookbook photograph",
            width: 1500,
            height: 844,
          },
        ],
      },
      solution: {
        intro:
          "The brand was the system: original art, a drop cadence, a shop, and a community that eventually wanted to meet in person.",
        features: [
          {
            title: "Art as the product",
            description:
              "Every graphic started as original illustration — anime- and cyberpunk-inspired, printed on tees, hoodies, longsleeves, and small goods.",
          },
          {
            title: "Drops, not a catalog",
            description:
              "Collections posted on a cadence. Instagram and the shop moved together so a drop felt like an event, not restock.",
          },
          {
            title: "Shopify, Etsy, Instagram",
            description:
              "Online first: storefront, marketplace, and the account I designed and ran, including ads in the Facebook / Instagram ecosystem.",
          },
          {
            title: "Collaborations and conventions",
            description:
              "Work with artists in the US and overseas, fashion influencers, then in-person selling at anime conventions — the community the graphics were for.",
          },
        ],
      },
      outcomes: [
        { stat: "1,000+", label: "sales across Instagram, Shopify, and Etsy" },
        { stat: "2020–23", label: "years running the brand end to end" },
        { stat: "IRL", label: "pivot to anime conventions and artist collabs" },
      ],
      reflection:
        "This was my first solo project. I’m grateful to everyone who helped sell, photograph, and show up for the brand. Thank you for letting me make something that told my story and reached people along the way.",
      conclusion: {
        challenges: [
          "Learning production by shipping samples until the print matched the drawing.",
          "Running ads, a shop, and a social account as one person.",
          "Taking a screen-native art practice into a physical brand without losing the feeling.",
        ],
        learnings: [
          "The name was the identity — yuugen as a feeling, not a logo exercise.",
          "Community showed up in DMs first, then in person at conventions.",
          "Drops work when the graphic is the product, not decoration on a blank.",
        ],
        nextSteps: [
          "The shop remains a record of the collections at yuugenapparel.co.",
          "Illustration and brand work continue in the gallery and in product design.",
        ],
        proud:
          "Building a brand people wrote to during an uncertain year — and then getting to meet them.",
      },
    },
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luluwang25" },
  { label: "Instagram", href: "https://www.instagram.com/luluw.art" },
  { label: "Email", href: "mailto:lulu.wang25@gmail.com" },
];

export type Experience = {
  company: string;
  role: string;
  when: string;
  where: string;
  hover?: string;
  highlight: {
    color: string;
    hover: string;
    ink?: string;
  };
  summary: string;
};

export const experience: Experience[] = [
  {
    company: "Meta",
    role: "Software Engineer, Product",
    when: "2024–2026",
    where: "Menlo Park",
    hover: "#4A90E2",
    highlight: {
      color: "#B6D8FE",
      hover: "#4A90E2",
      ink: "#ffffff",
    },
    summary:
      "I own ads product initiatives on the Monetization Dynamic Ads team that drove a 0.19% revenue gain across two halves, working ranking strategy from hypothesis and experimentation through technical architecture with Data Science in London. I also built a Messenger Stories product Quicksnap 0-to-1 from backend through iOS on a small cross-functional team, and improved org-wide A/B testing with tooling, dashboards, and documentation.",
  },
  {
    company: "Finary",
    role: "Full-Stack Software Engineer",
    when: "2023",
    where: "New York",
    hover: "#7C5CF6",
    highlight: {
      color: "color-mix(in srgb, #7C5CF6 28%, white)",
      hover: "#7C5CF6",
      ink: "#ffffff",
    },
    summary:
      "On a six-person team I helped shape an early-stage social investing product across web and mobile — shipping market news, chat threads, and ticker tagging that contributed to 22% user acquisition growth over three months.",
  },
  {
    company: "Microsoft",
    role: "Software Engineer, Xbox",
    when: "2020–2023",
    where: "Redmond",
    hover: "#6B9A12",
    highlight: {
      color: "color-mix(in srgb, #C8F53A 38%, white)",
      hover: "#6B9A12",
      ink: "#ffffff",
    },
    summary:
      "I partnered with Product and Design to ship a revamped Xbox Search experience across UX and the Search API, contributing to a 30% increase in engagement and retention. I also built customer-facing work across Cloud Gaming, Search, Home, Collection, memory, and accessibility for 120 million monthly Xbox users.",
  },
];
