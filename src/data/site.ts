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
  problem: {
    statement: string;
    points: string[];
  };
  goals: string;
  research: {
    intro: string;
    methods: { title: string; description: string }[];
    insights: { stat: string; label: string }[];
    persona: Persona;
    personas?: Persona[];
    quotes?: string[];
  };
  define?: {
    intro: string;
    steps: string[];
    timeline: string[];
  };
  ia: {
    intro: string;
    flow: string[];
    sitemap?: string[];
  };
  wireframes: {
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
  };
  solution: {
    intro: string;
    features: { title: string; description: string }[];
  };
  testing?: {
    intro: string;
    findings: string[];
    iterations: string[];
  };
  outcomes: { stat: string; label: string }[];
  reflection: string;
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
            alt: "Low-fidelity desktop wireframe of Opal’s all-tasks board, with to-do, in-progress, and completed columns and status buttons on each card",
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
    slug: "path-learning",
    name: "Path Learning",
    description:
      "A mobile learning app that replaces tutorial watching with hands-on quests, an adaptive skill map, and feedback from AI, peers, and mentors.",
    image: "/images/project-path-learning.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
      { label: "Mobile", variant: "lavender" },
    ],
    caseStudy: {
      tagline:
        "A practice-first learning app that turns skill-building into quests — with a map for what to do next, and feedback when you get stuck.",
      meta: {
        role: "Product Designer",
        timeline: "Capstone · 2026",
        team: "Solo designer",
        platform: "iOS",
        tools: ["Figma", "FigJam", "Google Meet"],
      },
      overview:
        "Path Learning is a project-based mobile app for self-directed learners who are tired of **watching** without **doing**. Instead of course catalogs and completion badges, the product is built around quests — short, artifact-producing practice units — on an adaptive skill map, with a feedback ladder from AI to peers to human mentors. I led research, IA, wireframes, visual design, and two rounds of usability testing as sole designer.",
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
        "Flip the default EdTech loop from Watch → Read → Quiz to **Try → Struggle → Learn → Feedback → Retry**, so every concept is immediately practiced and every completed quest becomes portfolio evidence.",
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
            "Follow a trusted roadmap toward a new role within 12 months",
            "Build a portfolio that passes hiring screens",
            "Use mentor checkpoints to confirm industry-readiness",
          ],
          frustrations: [
            "Tutorial hell and fragmented resources",
            "No quality signal that work is actually job-ready",
          ],
        },
        personas: [
          {
            name: "Maya Osei",
            role: "28 · Career switcher · Atlanta",
            quote:
              "I’ve watched a hundred YouTube tutorials and I still can’t build anything from scratch. I need a path — not more content.",
            goals: [
              "A linear roadmap that removes decision fatigue",
              "A portfolio of demoable artifacts from every quest",
            ],
            frustrations: [
              "Tutorial hell",
              "No industry quality signal",
            ],
          },
          {
            name: "Nico Valls",
            role: "24 · Creative maker · Portland",
            quote:
              "I have a hundred ideas. I just freeze the second I open a blank file.",
            goals: [
              "Ship finished projects in small, winnable steps",
              "Get low-pressure feedback without a lecture",
            ],
            frustrations: [
              "Blank-page paralysis",
              "Overly theoretical content",
            ],
          },
          {
            name: "Dr. Priya Nair",
            role: "35 · Deep-dive scholar · Cambridge",
            quote:
              "I don’t want to just build it. I want to understand why it works — and why every alternative doesn’t.",
            goals: [
              "Skip rudimentary modules and enter at the right depth",
              "Socratic mentorship instead of how-to videos",
            ],
            frustrations: [
              "Superficial tutorials",
              "Black-box tools with no first principles",
            ],
          },
        ],
      },
      define: {
        intro:
          "Research ran across **four weeks** — planning, interviews, synthesis, then concept testing. Design work followed the same loop the product teaches: try, get feedback, iterate. Two usability rounds (Phase 1 and Phase 2) validated the quest model, then tightened pricing, resources, and mentor booking.",
        steps: [
          "Problem framing: tutorial hell, feedback quality, choice overload",
          "IA around path selection, quest map, submission, and mentor escalation",
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
          "The app is organized around a **practice loop**, not a course catalog. Learners pick a path, follow a visual map of quests, submit an artifact, then escalate feedback only when they need it — AI first, then structured peer critique, then a mentor.",
        sitemap: [
          "Onboarding → Choose a path, optional diagnostic for depth",
          "My Path → Adaptive roadmap, XP, milestones",
          "Quests → Mission checklist, snackable resources, submission",
          "Feedback → AI evaluation, structured peer critique",
          "Mentors → Profile, availability, live booking",
          "Library · Messages · Settings",
        ],
        flow: [
          "Choose a path",
          "Follow the map",
          "Complete a quest",
          "Get AI & peer feedback",
          "Book a mentor",
        ],
      },
      wireframes: {
        lowFi:
          "Early screens locked the core loop before visual design: **path selection**, a photography quest map, a mission with upload, a submission confirmation, and mentor booking. Testing later confirmed the map and quest format; the friction lived in drafts, academic depth, and pricing transparency.",
        layout: "full",
        images: [
          {
            src: "/images/projects/path-learning/wireframes.jpg",
            alt: "Path Learning grayscale screens — path selection, quest map, quest detail, submission, and mentor booking",
            caption: "Core loop in grayscale: choose a path, follow the map, submit work, book a mentor",
            width: 2400,
            height: 1218,
          },
        ],
        hiFi:
          "High-fidelity UI sits on warm cream with forest green progress and charcoal actions. Path cards are color-coded by skill. The photography map makes the **next quest** obvious, and submission opens immediately into AI and peer critique instead of a dead end.",
      },
      onboarding: {
        intro:
          "Onboarding asks **what path will you take?** — photography, language, coding, or product design — instead of browsing a catalog. Natural-language search is a P0 for turning a freeform goal into a structured path. Testing found 100% completion and a 1.2 / 5 difficulty rating; structured learners then asked for pricing earlier, which Phase 2 added.",
        insights: [
          {
            title: "Outcome-first phrasing",
            description:
              "Participants preferred “What path will you take?” over a course catalogue — it felt tailored rather than like shopping.",
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
            src: "/images/projects/path-learning/personas.jpg",
            alt: "Path Learning platform personas — Maya Osei, Nico Valls, and Dr. Priya Nair",
            caption: "Three archetypes synthesized from research: switcher, maker, and scholar",
            width: 1800,
            height: 2546,
          },
          {
            src: "/images/projects/path-learning/design-system.jpg",
            alt: "Path Learning design system — type, color, navigation, and path selection",
            caption: "Visual language: Newsreader wordmark, Inter headings, cream field, charcoal actions",
            width: 1601,
            height: 1140,
          },
        ],
      },
      branding: {
        intro:
          "The brand needed to feel like a studio for practice — calm, a little academic, not another gamified course app. Cream surfaces, forest green for progress, and soft path-card pastels keep the map readable without turning the product into a toy.",
        colors: [
          { name: "Cream", hex: "#FEFCFA", role: "App background" },
          { name: "Charcoal", hex: "#242527", role: "Primary buttons & text" },
          { name: "Forest", hex: "#388068", role: "Progress, success, brand" },
          { name: "Mint", hex: "#BDE2D0", role: "Active switches & highlights" },
          { name: "Sage", hex: "#E3F5DF", role: "Home / path card fields" },
          { name: "Purple", hex: "#6F67B5", role: "Accent & quest emphasis" },
          { name: "Lilac", hex: "#F0D9F7", role: "Skill card — coding" },
          { name: "Sky", hex: "#B6D8FE", role: "Secondary skill fields" },
        ],
        typefaces: [
          {
            name: "Newsreader",
            role: "Wordmark and brand moments",
            weights: "Medium",
          },
          {
            name: "Inter",
            role: "Headings and UI",
            weights: "Regular, Medium, Bold",
          },
          {
            name: "Arial",
            role: "Body copy",
            weights: "Regular",
          },
        ],
        typography:
          "**Newsreader** is reserved for the Path Learning wordmark. **Inter** carries headlines and interface chrome so the map, quests, and booking stay clear at phone size. **Arial** handles body copy — instructions, feedback, and mentor bios — without competing with the display type.",
        palette:
          "Cream (#FEFCFA) keeps long practice sessions from feeling sterile. **Charcoal** buttons are the only high-contrast actions. Forest green marks progress and completion. Soft sage, lilac, and sky tint path cards so skills are distinguishable without loud branding.",
        messaging:
          "The product speaks like a coach, not a catalog: “Start my journey,” “Next quest,” “Mark as complete.” Peer critique is constrained to **what works** and **one change**, so comments stay useful instead of vague.",
      },
      visuals: {
        layout: "phones",
        tone: "dark",
        images: [
          {
            src: "/images/projects/path-learning/screens/01-menu.jpg",
            alt: "Path Learning navigation drawer",
            caption: "Menu",
            width: 780,
            height: 1733,
          },
          {
            src: "/images/projects/path-learning/screens/02-path.jpg",
            alt: "Path Learning path selection screen",
            caption: "Choose a path",
            width: 780,
            height: 1722,
          },
          {
            src: "/images/projects/path-learning/screens/03-map.jpg",
            alt: "Path Learning photography quest map",
            caption: "Quest map",
            width: 780,
            height: 1722,
          },
          {
            src: "/images/projects/path-learning/screens/04-quest.jpg",
            alt: "Path Learning recreate a film still quest",
            caption: "Quest",
            width: 780,
            height: 1979,
          },
          {
            src: "/images/projects/path-learning/screens/05-submission.jpg",
            alt: "Path Learning quest submission and AI feedback",
            caption: "Feedback",
            width: 780,
            height: 1722,
          },
          {
            src: "/images/projects/path-learning/screens/06-mentor.jpg",
            alt: "Path Learning mentor booking with Sarah Chen",
            caption: "Mentor",
            width: 780,
            height: 1722,
          },
          {
            src: "/images/projects/path-learning/screens/07-search.jpg",
            alt: "Path Learning path selection with skill search",
            caption: "Search",
            width: 780,
            height: 1733,
          },
        ],
      },
      solution: {
        intro:
          "Path is a **quest engine** with a map, not a video library with a progress bar. Four P0 systems carry the core loop; mentors and structured peer critique sit one step up the escalation ladder.",
        features: [
          {
            title: "Quest content system",
            description:
              "Action-focused units that require an **artifact** — a photo, file, or reflection — instead of finishing a video. Directly targets tutorial hell.",
          },
          {
            title: "Adaptive skill map",
            description:
              "A visual path of the next practice step (e.g. Recreate a Film Still) so learners stop spending evenings picking a lesson.",
          },
          {
            title: "AI-guided feedback",
            description:
              "Category-specific evaluation on submitted work — lighting, composition, execution — instead of a compiler-style pass/fail.",
          },
          {
            title: "Mentor marketplace",
            description:
              "Live booking when automated feedback runs out. Testing made the calendar easy; the remaining request is a lower-cost **quick critique**.",
          },
        ],
      },
      testing: {
        intro:
          "Two rounds of remote moderated tests with **5 participants** (career switchers, an active maker, a theoretical learner, a structured learner). Phase 1 proved the quest model. Phase 2 measured iterations on pricing, quest progression, collapsible deep-dives, and mentor booking.",
        findings: [
          "**100%** completed onboarding in both rounds; difficulty moved from 1.2 to **1.1 / 5** after adding pricing.",
          "Quest map and snackable resources were the strongest engagement drivers — “checking off videos doesn’t feel like real progress.”",
          "Mentor booking hit **100%** completion; Phase 2 ease improved from 1.8 to **1.1 / 5**.",
          "AI + structured peer prompts (“what works” / “one change”) reduced isolation; scholars still wanted Socratic depth over a single 8.5 score.",
        ],
        iterations: [
          "Added early pricing transparency for structured learners and career switchers.",
          "Collapsible deep-dive literature and Socratic prompts for theoretical learners.",
          "Persistent “Mark as complete” bar on quests; draft/sandbox remains a next-step for submission anxiety.",
          "Redesigned Sarah Chen booking calendar; planned a $20 asynchronous quick critique beside live sessions.",
        ],
      },
      outcomes: [
        { stat: "100%", label: "onboarding completion in both test rounds" },
        { stat: "1.1", label: "mentor booking difficulty after iteration" },
        { stat: "5", label: "archetypes tested across two phases" },
      ],
      reflection:
        "The product only works if the **first session produces work**, not a watched video. The map, the quest, and the feedback ladder all exist to get someone from a blank page to an artifact they can show. What I’m still holding: a true draft/sandbox, and a cheaper asynchronous mentor option so live calls aren’t the only human door.",
      conclusion: {
        challenges: [
          "Serving switchers who want a rigid roadmap, makers who want open quests, and scholars who want depth — without three separate apps.",
          "Submission anxiety: people would complete the quest steps and still hesitate to mark work final.",
          "Pricing trust versus onboarding length — adding a plan step helped, but the questionnaire can’t grow forever.",
        ],
        learnings: [
          "Progress has to look like a project milestone, not a video checkbox.",
          "Feedback is a ladder: AI for speed, constrained peer prompts for quality, humans for judgment.",
          "Collapsible depth lets scholars go further without trapping casual learners in literature.",
        ],
        nextSteps: [
          "Save-draft / sandbox on quest submission.",
          "Stronger visual affordance on deep-dive toggles.",
          "Asynchronous $20 quick critiques next to live booking.",
        ],
        proud:
          "Designing a full practice loop — from path choice through mentor booking — and watching testers describe it as job-ready progress instead of another course to finish.",
      },
    },
  },
  {
    slug: "netflix-community",
    name: "Netflix Community",
    description:
      "A social layer for Netflix that keeps post-watch conversation, spoiler-safe discussion, and trusted recommendations inside the app.",
    image: "/images/project-netflix-community.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
      { label: "Mobile", variant: "lavender" },
    ],
    caseStudy: {
      tagline:
        "A private social layer for Netflix — spoiler-safe discussion, friend circles, and collections that keep the story going in-app.",
      presentation: {
        label: "interactive prototype",
        href: "/prototypes/netflix-community/index.html",
      },
      meta: {
        role: "Product Designer",
        timeline: "Feature concept · 2026",
        team: "Solo designer",
        platform: "Mobile",
        tools: ["Figma", "FigJam"],
      },
      overview:
        "Netflix Community is a proposed feature set that turns Netflix from a **utility for watching** into a place to sit with a story afterward. As sole designer I framed the problem, prioritized a hybrid social model — private Circles plus a moderated public hub — and designed the flows, wireframes, and high-fidelity prototype. The work targets **platform leakage**: the moment people leave for Reddit, group chats, or IMDb because the app has nothing to say once the credits roll.",
      problem: {
        statement:
          "After a title ends, people leave Netflix to talk, search, and decide what to watch next — and the app gives them **no trusted place to stay**.",
        points: [
          "**Fragmented post-viewing insights.** Viewers hunt for analysis off-platform, so the social loop never comes back.",
          "**Isolation and toxic forums.** Public internet discussion feels unsafe or spoiler-heavy, especially for people without an active watch circle.",
          "**Discovery paralysis.** A huge catalog plus untrusted recs makes choosing the next title tiring, so sessions end at the credits.",
        ],
      },
      goals:
        "Internalize the post-watch loop: **spoiler-protected discussion** at high-emotion moments, **private circles** for people you actually trust, and **actionable collections** that turn a friend’s note into Play or Add to My List.",
      research: {
        intro:
          "I started from three clustered pains — leakage, isolation, and choice fatigue — and mapped where Netflix currently loses the conversation. The pattern was consistent: people already share through texts and group chats, and they already search elsewhere for plot context. The product opportunity was to bring that behavior **in-app** without turning Netflix into a public forum.",
        methods: [
          {
            title: "Problem framing",
            description:
              "Wrote problem / business-goal / **How Might We** pairs for leakage, isolation, and discovery paralysis so every feature had to serve a named user pain.",
          },
          {
            title: "Behavior mapping",
            description:
              "Traced the post-credits path to group chats, Reddit, Discord, YouTube recaps, and IMDb — then asked what a **closed-loop** version of each behavior would look like on a title page.",
          },
          {
            title: "Flow design",
            description:
              "Split the system into four jobs: private circle discussion, public hub, curated collections, and a shared-collection prompt — then designed for **mobile and living-room** posting.",
          },
        ],
        insights: [
          { stat: "3", label: "problem clusters from the framework" },
          { stat: "4", label: "primary user flows" },
          { stat: "3", label: "P0 pillars for MVP" },
        ],
        persona: {
          name: "Jordan Hale",
          role: "31 · Solo viewer · Oakland",
          quote:
            "I finish a finale and have no one to talk to. Reddit is a spoiler minefield. I just want a room that waited with me.",
          goals: [
            "Talk about a title without being spoiled",
            "Find people who are at the same episode",
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
              "A public hub that still feels safe",
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
          "The strategy is a **private social layer** first — Circles as digital living rooms — with a moderated public hub so people without an active circle are not locked out. I prioritized by whether a feature reduced leakage, protected trust, or shortened the path to the next title.",
        steps: [
          "Frame pains as HMW questions tied to platform outcomes",
          "Prioritize P0 Circles, public hub, and trusted collections",
          "Design four flows, then lo-fi through a hi-fi prototype",
        ],
        timeline: [
          "P0: Public hub, friend-circle threads, trusted collections",
          "P1: Verified context cards, category and mood filters",
          "P2: Sync alerts and curator badges — only after trust holds",
        ],
      },
      ia: {
        intro:
          "Community lives on the **title page** as a third tab beside Episodes and Trailers, and as a tab in Netflix navigation. Discussion is grouped by season, episode, and topic, with spoilers hidden by default. Collections sit in the circle, not in a public popularity contest — no follower counts, no trending ranks.",
        sitemap: [
          "Title page → Episodes · Trailers · Community",
          "Community hub → Episode-sorted threads, spoiler gates, topic chips",
          "Your circle → Private threads, shared collections, notes",
          "Collections → Must-watch lists with Add to My List / Play",
          "Safety → Report, mute, automated spoiler detection",
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
          "Lo-fi mapped the four jobs before visual design: a **private circle hub**, a **public community hub**, **recommended collections**, and a prompt when someone shares a list. Device splits (TV vs mobile) showed up early — posting from the living room needed a connect-to-phone path so the remote never became a keyboard.",
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
          "High-fidelity stays inside Netflix’s own system — near-black surfaces, the red wordmark, and a Community tab on the title. Copy is quiet on purpose: **Keep the story going.** Spoilers stay hidden until you choose to see them. A post-watch prompt (**What stayed with you?**) starts the thread without turning the credits into a comments section.",
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
        layout: "phones",
        tone: "dark",
        roomy: true,
        images: [
          {
            src: "/images/projects/netflix-community/screens/01-title.jpg",
            alt: "Netflix title page with a Community tab on Stranger Things",
            caption: "Title · Community",
            width: 472,
            height: 1076,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/screens/03-hub.jpg",
            alt: "Private circle discussion hub for Stranger Things with spoiler-gated threads",
            caption: "Discussion hub",
            width: 473,
            height: 966,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/screens/02-thread.jpg",
            alt: "Episode thread with replies and spoiler-hidden comments",
            caption: "Thread",
            width: 473,
            height: 966,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/screens/04-collection.jpg",
            alt: "Fantasy Favorites collection shared with a circle, with Play and My List actions",
            caption: "Collection",
            width: 472,
            height: 966,
            statusBar: "dark",
          },
          {
            src: "/images/projects/netflix-community/screens/05-prompt.jpg",
            alt: "Post-watch prompt asking what stayed with you after an episode",
            caption: "Post-watch prompt",
            width: 471,
            height: 1076,
            statusBar: "dark",
          },
        ],
      },
      solution: {
        intro:
          "MVP is three P0 pillars. Everything else — context cards, mood filters, badges — waits until discussion is **safe and useful** without them.",
        features: [
          {
            title: "Public Community Hub",
            description:
              "Moderated, spoiler-gated, episode-sorted threads for people **without** an active circle — a safe room, not a timeline.",
          },
          {
            title: "Friend Circle discussions",
            description:
              "Private threads with people you already watch with, sitting beside the public hub so trust is the default, not the exception.",
          },
          {
            title: "Trusted collections",
            description:
              "Must-watch lists with personal notes and one-tap **Add to My List** or Play — word of mouth that does not leave the app.",
          },
          {
            title: "Post-watch prompt",
            description:
              "A short composer after a title — “What stayed with you?” — so the first comment is a thought, not a recap dump.",
          },
        ],
      },
      outcomes: [
        { stat: "3", label: "P0 pillars for the MVP" },
        { stat: "4", label: "flows covering circle, public, and collections" },
        { stat: "2", label: "surfaces: title page and Netflix nav" },
      ],
      reflection:
        "The constraint that mattered most was **not building a social network**. Netflix already has attention. What it is missing is a trusted room after the story. Spoilers, circle privacy, and one-tap collections were the product. Virality was the thing to keep out.",
      conclusion: {
        challenges: [
          "Serving people with a circle and people without one in the same hub.",
          "Making discussion safe on a TV, where typing and spoiler risk are both worse.",
          "Using Netflix’s visual system without the feature disappearing into the title page.",
        ],
        learnings: [
          "Trust is a layout decision: spoilers hidden, no public scores, circles first.",
          "Collections only work if a rec is actionable in one tap.",
          "A post-watch prompt beats an empty comments tab.",
        ],
        nextSteps: [
          "Verified context cards so plot questions do not send people to IMDb.",
          "Category and mood filters for the public hub.",
          "Optional sync alerts when a circle shares a list — quiet, not a notification firehose.",
        ],
        proud:
          "Designing a social layer that still feels like Netflix — a living room after the credits, not a feed competing with the story.",
      },
    },
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luluwang25" },
  { label: "Instagram", href: "https://www.instagram.com/luluw.art" },
  { label: "Email", href: "mailto:lulu.wang25@gmail.com" },
];
