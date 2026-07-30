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
    slug: "prediction-market",
    name: "Prediction Market",
    description:
      "A prediction market redesign focused on people who follow the news but have never placed a forecast before.",
    image: "/images/project-prediction.jpg",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Web Design", variant: "lavender" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "A prediction market experience designed for people who follow the news but have never traded before.",
      meta: {
        role: "Product Designer",
        timeline: "10 weeks · 2024",
        team: "2 PMs, 3 Engineers, 1 Designer",
        platform: "Responsive Web",
        tools: ["Figma", "FigJam", "Amplitude", "Framer"],
      },
      overview:
        "Prediction markets let people forecast real-world events, but most products in the space look and feel like trading terminals. I redesigned the experience for people who follow the news and have **opinions**, without requiring them to learn order books in order to participate.",
      problem: {
        statement:
          "Prediction markets are compelling, but the interfaces feel built for **traders** — and newcomers struggle to get started.",
        points: [
          "First-time users didn’t understand what “shares” or “odds” meant in this context.",
          "Order books assumed financial literacy that most participants didn’t have.",
          "There was no clear first step between browsing markets and placing a forecast.",
        ],
      },
      goals:
        "Help newcomers place a **first forecast** with language and visuals they can follow, while preserving depth for more advanced use.",
      research: {
        intro:
          "Most participants had never used a prediction market, so research started with how they already reason about likelihood and risk — before introducing interface patterns that only made sense to traders.",
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
          "I restructured discovery around **topics and questions**, matching how people already discuss the news.",
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
          "Low-fidelity work focused on the highest-risk moment: placing a **first forecast**. I explored sliders, cards, and plain-language toggles until one framing felt clearer in walkthroughs.",
        lowFiVariants: ["list", "detail", "dashboard"],
        hiFi:
          "High-fidelity design took a more editorial direction. Each card leads with the probability, and a lavender accent marks primary actions — moving the visual language away from a trading terminal.",
      },
      solution: {
        intro:
          "Every market opens with a **plain-language question** and a clear probability, making forecasting feel closer to sharing an informed view on current events.",
        features: [
          {
            title: "Question-First Cards",
            description:
              "A plain-language question and a large **probability** on each card.",
          },
          {
            title: "Visual Forecasting",
            description:
              "A slider shows potential outcomes in dollars before confirmation.",
          },
          {
            title: "Topic Discovery",
            description:
              "Browse by politics, sports, tech, and other familiar topics — aligned with how participants sorted events in research.",
          },
        ],
      },
      branding: {
        intro:
          "The brand direction aimed for an editorial feel closer to reading the news than opening a brokerage product. Color and type needed to stay clear and restrained.",
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
          "**Fraunces** gives market questions a more human, editorial tone. **Instrument Sans** handles the interface, probabilities, and supporting copy. Large percentage numerals carry most of the visual hierarchy on each card.",
        palette:
          "Warm paper backgrounds soften the finance association. **Lavender** marks primary actions. High-contrast text keeps probabilities readable; graphite supports secondary metadata.",
      },
      outcomes: [
        { stat: "2.4x", label: "newcomer activation rate" },
        { stat: "−55%", label: "drop-off on first forecast" },
        { stat: "+38%", label: "7-day return rate" },
      ],
      reflection:
        "The most effective change wasn’t a single interface detail — it was rebuilding the product around **questions**. Once markets read like something people would say out loud, much of the intimidation fell away.",
    },
  },
  {
    slug: "meetmews",
    name: "MeetMews",
    description:
      "A social app for pet owners to find local help, meet nearby owners, and keep pet care in one place.",
    image: "/images/project-meetmews.jpg",
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
