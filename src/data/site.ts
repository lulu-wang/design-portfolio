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
      "A mobile fitness platform built around **sustainable habits** — personalized, motivating, and designed for _busy schedules_.",
    image: "/images/project-pulsefit-cover.png",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
      { label: "Mobile", variant: "lavender" },
    ],
    caseStudy: {
      tagline:
        "Fitness tracking that’s **personalized**, motivating, and built for _busy schedules_.",
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
        "PulseFit is a personal health, fitness, and diet tracker for busy adults aged 18–40 who want better habits without spending their scarce free time fighting complex apps. As **sole UX/UI lead**, I owned the project end to end — researching users through interviews and competitive analysis, defining the problem and information architecture, iterating from lo-fi wireframes through usability tests, and designing **research-backed high-fidelity prototypes** that turn goals, workouts, nutrition, and community into one cohesive experience built around _sustainable habits_, not aggressive metrics.",
      problem: {
        statement:
          "Fitness apps are too **complex** and too **generic** for people with _limited time_.",
        points: [
          "Busy schedules break when tools demand **too much input** before delivering value.",
          "Competitors offered either depth or simplicity — rarely both.",
          "Motivation fades when progress feels **impersonal** or purely calorie-driven.",
        ],
      },
      goals:
        "Build an **all-in-one** fitness and diet experience that stays light for busy schedules — success measured by _consistency_, not calories alone.",
      research: {
        intro:
          "Week 1 focused on why people abandon trackers: **5 interviews**, a competitive teardown of MyFitnessPal, Strava, and Apple Fitness, and a card sort. The pattern was clear — users wanted _all-in-one_, but only if it didn’t cost them their free time.",
        methods: [
          {
            title: "User interviews",
            description:
              "**5 sessions** on motivation, pain points, and current tools — time pressure came up in every conversation.",
          },
          {
            title: "Competitive analysis",
            description:
              "Mapped where MyFitnessPal, Strava, and Apple Fitness add friction — especially **onboarding and logging**.",
          },
          {
            title: "Card sorting",
            description:
              "Validated how users naturally group fitness, diet, and social — informing the five-pillar IA.",
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
          "With a **4-week** timeline, I prioritized **structure before polish** — validate flows early, then invest visual design only in what testing supported.",
        steps: [
          "Flows, storyboards, and lo-fi sketches to pressure-test scope",
          "Usability on lo-fi, then iterate into hi-fi",
          "Final prototype and a second test pass before lock",
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
          "Card-sort results pointed to **five pillars** — Home, Fitness, Diet, Social, Profile — so planning, tracking, and motivation live in _one place_ without burying core actions under nested menus.",
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
          "I sketched onboarding through scheduling in lo-fi first — enough fidelity to **validate hierarchy and task flow** with users before committing to visual design.",
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
          "Dark UI with **neon lime** accents keeps progress readable at a glance. Workouts and diet stay light by design; social is there to sustain **momentum**, not add another feed to manage.",
      },
      onboarding: {
        intro:
          "Interviews showed personalization mattered — but long setups killed momentum. A short quiz captures fitness level, blockers, diet goals, and body metrics so the plan feels **personal from day one** without a heavy account wizard.",
        insights: [
          {
            title: "Time is the #1 blocker",
            description:
              "Asking about constraints early lets plans adapt to **real schedules**, not idealized routines.",
          },
          {
            title: "Light personalization",
            description:
              "A few high-signal questions tune intensity and meals — _enough signal, no questionnaire fatigue_.",
          },
          {
            title: "Clear goals",
            description:
              "Height, weight, and targets feed a concrete plan so users can **start now**, not configure forever.",
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
          "The visual system had to feel energetic without looking like a flashy gym brand — dark surfaces for focus, a sharp lime accent for progress, and type that stays readable on dense mobile dashboards.",
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
          "**Inter** carries most of the UI — tight tracking at small sizes, clear hierarchy between rings, labels, and lists. **SF Pro** appears on system-adjacent metrics so health data feels native on iPhone. Display stays restrained; emphasis comes from weight and lime accents, not oversized headlines.",
        palette:
          "A near-black base keeps workouts and diet screens calm. **Neon lime** is reserved for progress rings, primary actions, and moments of completion — high contrast on dark surfaces so status reads in a glance. Neutral grays handle secondary info without competing with the accent.",
        messaging:
          "Fitness. Diet. Community. — framed around _your goals_, not punishment metrics.",
      },
      solution: {
        intro:
          "The product unifies goals, workouts, diet, and community in one light experience — celebrating _small wins_ so motivation doesn’t depend on aggressive calorie targets.",
        features: [
          {
            title: "Dashboard",
            description:
              "Rings and vitals **at a glance** — designed so a busy user can check in in seconds.",
          },
          {
            title: "Workouts",
            description:
              "**Personalized** sessions with progression and form tips, tuned from onboarding inputs.",
          },
          {
            title: "Diet",
            description:
              "Macros and recipes plus **image-based** logging — chosen to cut the friction of manual entry.",
          },
          {
            title: "Social",
            description:
              "Challenges and sharing for accountability — motivation _without guilt_ or feed overload.",
          },
        ],
      },
      testing: {
        intro:
          "I tested lo-fi early to catch structural issues, then ran hi-fi sessions in week 4 on dashboard, workouts, and diet logging — the flows most tied to daily habit.",
        findings: [
          "Dashboard and workouts felt **familiar and personal** — hierarchy held up.",
          "Structured sessions and form guidance landed well with less-experienced users.",
          "**Image-based** calorie tracking stood out as the biggest diet-friction win.",
        ],
        iterations: [
          "Clearer personal goals on progress rings after users missed intent.",
          "Weekly and monthly progression views for longer-horizon motivation.",
          "Text-based recipes over video — faster to scan between meals.",
        ],
      },
      outcomes: [
        { stat: "3", label: "personas" },
        { stat: "5", label: "core sections" },
        { stat: "4 wks", label: "research to prototype" },
      ],
      reflection:
        "The throughline was that **habits** beat aggressive metrics. Designing for _consistency_ and personal bests — not perfect logging — shaped every tradeoff from onboarding length to how progress is framed.",
      conclusion: {
        challenges: [
          "Shipping **all-in-one** scope without recreating overwhelm.",
          "Serving three personas with very different schedules.",
          "Making progress feel personal without drowning users in data.",
        ],
        learnings: [
          "Design for **sporadic schedules**, not ideal weeks.",
          "Simplicity only works with careful information hierarchy.",
          "**Image logging** meaningfully cuts diet friction.",
        ],
        nextSteps: [
          "Richer weekly/monthly progression.",
          "Clearer goal cues on progress rings.",
          "Broader accessibility pass.",
        ],
        proud:
          "Owning the work **end-to-end** — interviews to tested prototype — while keeping tracking intuitive for busy people.",
      },
    },
  },
  {
    slug: "prediction-market",
    name: "Prediction Market",
    description:
      "Reimagining prediction markets through **approachable data visualization** and intuitive interactions, making complex forecasting accessible to a _wider audience_.",
    image: "/images/project-prediction.jpg",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Web Design", variant: "lavender" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "Making **probabilistic thinking** feel intuitive for people who have _never traded before_.",
      meta: {
        role: "Product Designer",
        timeline: "10 weeks · 2024",
        team: "2 PMs, 3 Engineers, 1 Designer",
        platform: "Responsive Web",
        tools: ["Figma", "FigJam", "Amplitude", "Framer"],
      },
      overview:
        "Prediction markets let people forecast real-world events, but the category is dominated by dense, trader-oriented interfaces. I redesigned the experience for **curious newcomers** — translating probabilities and order books into _intuitive interactions_ so forecasting feels like sharing an informed opinion, not day-trading.",
      problem: {
        statement:
          "Prediction markets are powerful but **intimidating** — newcomers bounce off jargon-heavy interfaces built for _expert traders_.",
        points: [
          "First-time users didn't understand what 'shares' or 'odds' meant in context.",
          "Order-book UIs assumed financial literacy most people don't have.",
          "There was no bridge between casual curiosity and confident participation.",
        ],
      },
      goals:
        "Make probabilistic forecasting **approachable** — clear language and visuals that get newcomers to a _first confident forecast_ without burying depth.",
      research: {
        intro:
          "Because the concept was unfamiliar to most people, I centered research on **mental models** — how non-experts reason about likelihood and risk — before inventing UI metaphors that would only make sense to traders.",
        methods: [
          {
            title: "Concept Testing",
            description:
              "Tested language and visual metaphors for 'probability' with 15 non-expert participants.",
          },
          {
            title: "Competitive Audit",
            description:
              "Analyzed 6 existing markets to map the exact moments where newcomers dropped off.",
          },
          {
            title: "Card Sorting",
            description:
              "Ran open card sorts to understand how people naturally categorize events and topics.",
          },
        ],
        insights: [
          { stat: "0/15", label: "newcomers understood the default order book" },
          { stat: "3x", label: "higher comprehension with % framing" },
          { stat: "80%", label: "preferred topic-based discovery" },
        ],
        persona: {
          name: "Daniel Okafor",
          role: "31 · Product Manager",
          quote:
            "I follow the news obsessively and have opinions — I just don't want to feel like I'm day-trading to share them.",
          goals: [
            "Turn his opinions on events into something tangible",
            "Understand his potential upside and risk at a glance",
            "Learn as he goes without reading a manual",
          ],
          frustrations: [
            "Trading terminology feels gatekept and cold",
            "Can't tell a good position from a bad one",
            "Existing apps look like Bloomberg terminals",
          ],
        },
      },
      ia: {
        intro:
          "I reorganized the product around **topics and questions** rather than tickers and order books, so discovery mirrors how people already think about the news.",
        flow: [
          "Browse by topic",
          "Read the question",
          "See the probability",
          "Place a forecast",
          "Track outcome",
        ],
      },
      wireframes: {
        lowFi:
          "Low-fidelity flows focused on the single riskiest moment: placing a **first forecast**. I prototyped multiple framings of the buy interaction — sliders, cards, and plain-language toggles — to find the _least intimidating_ path.",
        lowFiVariants: ["list", "detail", "dashboard"],
        hiFi:
          "High-fidelity design leaned on bold **data visualization** and a confident, editorial style. Probabilities became the hero of each card, and a lavender accent guided attention to primary actions without feeling like a trading terminal.",
      },
      solution: {
        intro:
          "Every market leads with a **plain-language question** and a clear probability — a deliberate shift away from tickers — so forecasting feels like sharing an _informed opinion_ rather than placing a trade.",
        features: [
          {
            title: "Question-First Cards",
            description:
              "Human questions and large **probabilities** replace tickers so the card reads like news, not a terminal.",
          },
          {
            title: "Visual Forecasting",
            description:
              "A slider shows potential outcomes in real dollars **before commit** — reducing the fear of a first forecast.",
          },
          {
            title: "Topic Discovery",
            description:
              "Browse by subjects people already follow — politics, sports, tech — because that matched how they sorted events in research.",
          },
        ],
      },
      branding: {
        intro:
          "I wanted the product to feel editorial and confident — closer to a news experience than a trading terminal — so color and type had to signal clarity over complexity.",
        colors: [
          { name: "Ink", hex: "#121212", role: "Primary text" },
          { name: "Paper", hex: "#F7F5F2", role: "Page background" },
          { name: "Lavender", hex: "#C4B5FD", role: "Primary actions & focus" },
          { name: "Graphite", hex: "#5C5C5C", role: "Secondary text" },
          { name: "Line", hex: "#E6E2DC", role: "Dividers & borders" },
        ],
        typefaces: [
          {
            name: "Instrument Sans",
            role: "UI and body copy",
            weights: "Regular, Medium, SemiBold",
          },
          {
            name: "Fraunces",
            role: "Question headlines & market titles",
            weights: "SemiBold",
          },
        ],
        typography:
          "**Fraunces** gives market questions a human, editorial voice. **Instrument Sans** keeps probabilities, controls, and supporting copy crisp. Large percentage numerals sit as the visual hero on every card — type hierarchy does the persuasion that dense charts used to.",
        palette:
          "Warm paper backgrounds soften the finance vibe. **Lavender** marks primary actions without the neon urgency of trading apps. High-contrast ink on paper keeps probabilities legible; graphite handles secondary metadata.",
      },
      outcomes: [
        { stat: "2.4x", label: "newcomer activation rate" },
        { stat: "−55%", label: "drop-off on first forecast" },
        { stat: "+38%", label: "7-day return rate" },
      ],
      reflection:
        "The biggest lesson was that **clarity is a feature**, not a coat of paint. Reframing the entire product around _questions instead of markets_ did more for accessibility than any single UI tweak could have.",
    },
  },
  {
    slug: "meetmews",
    name: "MeetMews",
    description:
      "A social platform connecting pet owners through **local discovery**, community features, and thoughtful tools that make caring for animals feel more _personal_.",
    image: "/images/project-meetmews.jpg",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "Building a **warm, trustworthy community** where pet owners actually want to show up.",
      meta: {
        role: "Product Designer",
        timeline: "14 weeks · 2023",
        team: "1 PM, 2 Engineers, 2 Designers",
        platform: "iOS",
        tools: ["Figma", "Lookback", "Notion", "ProtoPie"],
      },
      overview:
        "MeetMews is a social platform for pet owners to discover local services, connect with nearby owners, and manage pet care in one place. I designed it to feel **personal and safe** — prioritizing locality and trust over another _noisy feed_ optimized for engagement.",
      problem: {
        statement:
          "Pet owners juggle **fragmented tools** and scattered communities, with no trusted, _local_ place to connect and care for their animals.",
        points: [
          "Local pet info lived across Facebook groups, Nextdoor, and word of mouth.",
          "New owners felt isolated and unsure who to trust for advice.",
          "Existing apps optimized for engagement over genuine community.",
        ],
      },
      goals:
        "Create a **safe, local community** that consolidates pet care tools and prioritizes _meaningful connection_ over vanity metrics.",
      research: {
        intro:
          "I focused research on **trust and belonging** — what makes people feel safe enough to participate online when the subject is as personal as their pets — then used those signals to shape verification and locality in the product.",
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
          "I anchored the architecture on **locality and identity** — every experience starts from 'owners and services near me' and builds outward to broader community.",
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
          "Low-fidelity wireframes explored how to balance three needs — discovery, connection, and pet management — without a cluttered tab bar. I tested several navigation models to find one that kept **community central**.",
        lowFiVariants: ["list", "dashboard", "detail"],
        hiFi:
          "High-fidelity design used a bold, high-contrast card system and playful photography to feel warm and modern. **Verified badges** and local context were made visually prominent to reinforce _trust_ throughout.",
      },
      solution: {
        intro:
          "Discovery, connection, and pet care live in one calm space — structured around **locality and verification** so the product feels local and personal instead of like another engagement feed.",
        features: [
          {
            title: "Local Discovery",
            description:
              "Nearby vets, sitters, parks, and events with **owner-verified** recs — because research showed trust beats anonymous advice.",
          },
          {
            title: "Pet Profiles",
            description:
              "Health, reminders, and milestones in one home — reducing the six-app juggling owners described in the diary study.",
          },
          {
            title: "Trusted Community",
            description:
              "Neighborhood groups with **verified members** keep conversations safe and relevant by design.",
          },
        ],
      },
      branding: {
        intro:
          "Warmth and trust had to come through in the chrome itself — playful without becoming childish, and clear enough that verification and locality feel like part of the brand, not bolted-on badges.",
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
          "**Plus Jakarta Sans** keeps the product friendly and modern at mobile sizes. **Fraunces** softens key moments — empty states, community titles — so the brand feels warm without sacrificing UI clarity. Hierarchy favors readable names and places over decorative display.",
        palette:
          "A cream base and coral actions feel approachable. **Sage** is reserved for verification and trust cues so safety is visually consistent. Charcoal on cream stays high-contrast for accessibility across discovery cards and profiles.",
      },
      outcomes: [
        { stat: "12k", label: "waitlist signups pre-launch" },
        { stat: "4.9★", label: "beta community rating" },
        { stat: "+63%", label: "D30 retention vs. benchmark" },
      ],
      reflection:
        "Community products live or die on **trust**, and trust is built through countless small design decisions — verification, tone, locality. Designing MeetMews taught me to treat _safety and warmth_ as core UX requirements, not afterthoughts.",
    },
  },
];

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luluwang25" },
  { label: "Instagram", href: "https://www.instagram.com/luluw.art" },
  { label: "Email", href: "mailto:lulu.wang25@gmail.com" },
];
