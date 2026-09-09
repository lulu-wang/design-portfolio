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
    slug: "meetmews",
    name: "MeetMews",
    description:
      "A social app for pet owners to find local help, meet nearby owners, and keep pet care in one place.",
    image: "/images/project-meetmews.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "A local community product for pet owners seeking trusted recommendations and nearby connections.",
      meta: {
        role: "Product Designer",
        timeline: "14 weeks · 2023",
        team: "1 PM, 2 Engineers, 2 Designers",
        platform: "iOS",
        tools: ["Figma", "Lookback", "Notion", "ProtoPie"],
      },
      overview:
        "MeetMews helps pet owners find local services, connect with nearby owners, and keep pet care organized. Much of the design work centered on **trust** — making the product feel local and safe enough for people to ask questions and share openly.",
      problem: {
        statement:
          "Pet owners move between **too many tools** and scattered groups, with no clear local place to ask for help.",
        points: [
          "Useful information lived across Facebook groups, Nextdoor, and word of mouth.",
          "Newer owners often felt isolated and unsure whose advice to trust.",
          "Existing products tended to optimize for engagement more than community quality.",
        ],
      },
      goals:
        "Build a **local community** where pet care tools live together and people feel safe enough to participate.",
      research: {
        intro:
          "Research focused on what makes people comfortable participating online when the topic is their pet. Those findings shaped how verification and locality were handled in the product.",
        methods: [
          {
            title: "Diary Study",
            description:
              "A 2-week diary study with 9 pet owners capturing real moments of need and frustration.",
          },
          {
            title: "Community Audit",
            description:
              "Observed behavior across existing pet forums and local groups to map unmet needs.",
          },
          {
            title: "Stakeholder Interviews",
            description:
              "Interviewed local vets and groomers to understand the service side of the ecosystem.",
          },
        ],
        insights: [
          { stat: "6", label: "separate tools used by the average owner" },
          { stat: "82%", label: "wanted local, verified recommendations" },
          { stat: "2x", label: "more trust in owner-to-owner advice" },
        ],
        persona: {
          name: "Priya Sharma",
          role: "26 · First-time Dog Owner",
          quote:
            "I love my dog but I'm constantly second-guessing myself — I just want people nearby I can actually trust.",
          goals: [
            "Find trustworthy local vets, sitters, and parks",
            "Meet other owners in her neighborhood",
            "Keep her pet's info and reminders in one place",
          ],
          frustrations: [
            "Advice online is contradictory and anonymous",
            "Juggling multiple apps for one pet",
            "Feeling judged in large, impersonal groups",
          ],
        },
      },
      ia: {
        intro:
          "The information architecture starts from **what’s nearby** — local owners and services first, then broader community from there.",
        flow: [
          "Create pet profile",
          "Discover locally",
          "Connect with owners",
          "Book & save services",
          "Share in community",
        ],
      },
      wireframes: {
        lowFi:
          "Low-fidelity exploration focused on balancing discovery, connection, and pet management without overcrowding navigation. I tested several models until community remained easy to reach.",
        lowFiVariants: ["list", "dashboard", "detail"],
        hiFi:
          "High-fidelity design uses bold cards and playful photography for a warmer feel. **Verified badges** and local context are visually prominent, reflecting how consistently trust came up in research.",
      },
      solution: {
        intro:
          "MeetMews brings discovery, nearby owners, and pet care into one place. Local context and verification are surfaced early so the product feels grounded in a real neighborhood.",
        features: [
          {
            title: "Local Discovery",
            description:
              "Nearby vets, sitters, parks, and events with **owner-verified** recommendations.",
          },
          {
            title: "Pet Profiles",
            description:
              "Health, reminders, and milestones in one place — diary study participants were managing this across roughly six apps.",
          },
          {
            title: "Trusted Community",
            description:
              "Neighborhood groups with **verified members**, keeping conversations more relevant and less anonymous.",
          },
        ],
      },
      branding: {
        intro:
          "The brand needed to feel warm without becoming overly playful. Verification and locality had to read as part of the interface from the start.",
        colors: [
          { name: "Charcoal", hex: "#1C1C1C", role: "Primary text" },
          { name: "Cream", hex: "#FAF6F1", role: "App background" },
          { name: "Coral", hex: "#E86A4A", role: "Primary actions" },
          { name: "Sage", hex: "#6B9B7A", role: "Verified & success states" },
          { name: "Stone", hex: "#9A9188", role: "Secondary text" },
        ],
        typefaces: [
          {
            name: "Plus Jakarta Sans",
            role: "UI, body, and navigation",
            weights: "Regular, Medium, Bold",
          },
          {
            name: "Fraunces",
            role: "Section titles & empty states",
            weights: "Medium",
          },
        ],
        typography:
          "**Plus Jakarta Sans** carries most of the interface and stays clear at mobile sizes. **Fraunces** appears sparingly on community titles and empty states for softer moments. Names and places remain the priority in the hierarchy.",
        palette:
          "Cream backgrounds and coral actions create an approachable foundation. **Sage** marks verified and success states for consistency. Charcoal on cream keeps discovery cards and profiles readable.",
      },
      outcomes: [
        { stat: "12k", label: "waitlist signups pre-launch" },
        { stat: "4.9★", label: "beta community rating" },
        { stat: "+63%", label: "D30 retention vs. benchmark" },
      ],
      reflection:
        "This project kept returning to **trust** — verification, tone, and local context. Those details proved as important as the primary product flows.",
    },
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luluwang25" },
  { label: "Instagram", href: "https://www.instagram.com/luluw.art" },
  { label: "Email", href: "mailto:lulu.wang25@gmail.com" },
];
