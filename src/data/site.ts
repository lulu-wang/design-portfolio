export type Tag = { label: string; variant: "outline" | "solid" | "lavender" };

export type Persona = {
  name: string;
  role: string;
  quote: string;
  goals: string[];
  frustrations: string[];
};

export type CaseStudy = {
  tagline: string;
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
  goals: string[];
  research: {
    intro: string;
    methods: { title: string; description: string }[];
    insights: { stat: string; label: string }[];
    persona: Persona;
  };
  ia: {
    intro: string;
    flow: string[];
  };
  wireframes: {
    lowFi: string;
    lowFiVariants: ("list" | "detail" | "dashboard")[];
    hiFi: string;
  };
  solution: {
    intro: string;
    features: { title: string; description: string }[];
  };
  outcomes: { stat: string; label: string }[];
  reflection: string;
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
    slug: "finos",
    name: "FinOS",
    description:
      "An intelligent finance platform designed to help people understand their money with clarity, reducing complexity through thoughtful interaction design and explainable AI.",
    image: "/images/project-finos.jpg",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "Turning financial anxiety into confidence through explainable, human-centered money management.",
      meta: {
        role: "Lead Product Designer",
        timeline: "12 weeks · 2024",
        team: "1 PM, 2 Engineers, 1 Designer",
        platform: "iOS & Android",
        tools: ["Figma", "Maze", "Dovetail", "Principle"],
      },
      overview:
        "FinOS is a personal finance app that helps everyday people understand where their money goes and why. Most budgeting tools show numbers without context, leaving users overwhelmed. We set out to design an experience that explains financial decisions in plain language and builds long-term trust through transparency.",
      problem: {
        statement:
          "People want to be better with money, but existing tools bury them in charts and jargon instead of helping them understand what to actually do next.",
        points: [
          "73% of surveyed users said budgeting apps made them feel more anxious, not less.",
          "Users couldn't explain why the app categorized their spending a certain way, eroding trust.",
          "Actionable guidance was hidden behind dense dashboards and premium paywalls.",
        ],
      },
      goals: [
        "Reduce the cognitive load of understanding personal finances.",
        "Make every AI-driven insight explainable and traceable.",
        "Drive weekly engagement through timely, relevant nudges.",
      ],
      research: {
        intro:
          "I ran a mixed-methods research phase to understand how people relate to their money emotionally and behaviorally — combining qualitative interviews with a broad quantitative survey and a teardown of competing products.",
        methods: [
          {
            title: "User Interviews",
            description:
              "12 in-depth interviews with people aged 24–40 across income brackets to map emotional friction points around money.",
          },
          {
            title: "Market Analysis",
            description:
              "Competitive teardown of 8 leading finance apps to identify gaps in explainability and onboarding.",
          },
          {
            title: "Survey",
            description:
              "A 210-respondent survey validating pain points and prioritizing the features users actually wanted.",
          },
        ],
        insights: [
          { stat: "73%", label: "felt more anxious using budgeting apps" },
          { stat: "4 of 5", label: "distrusted automatic categorization" },
          { stat: "68%", label: "wanted plain-language explanations" },
        ],
        persona: {
          name: "Maya Chen",
          role: "28 · Marketing Coordinator",
          quote:
            "I know I should budget, but every app just shows me I'm doing badly without telling me how to fix it.",
          goals: [
            "Understand where money goes each month without spreadsheets",
            "Build savings without feeling deprived",
            "Trust that the app's advice is actually in her interest",
          ],
          frustrations: [
            "Overwhelmed by dashboards full of charts",
            "Doesn't trust opaque, automatic categorization",
            "Generic advice that ignores her real situation",
          ],
        },
      },
      ia: {
        intro:
          "I restructured the information architecture around a single question users kept asking — 'Am I okay?' — surfacing a clear status first, then progressive detail on demand.",
        flow: [
          "Onboarding & account link",
          "Financial health snapshot",
          "Explainable insight feed",
          "Category deep-dive",
          "Guided action",
        ],
      },
      wireframes: {
        lowFi:
          "I started with rapid low-fidelity sketches to test the core hierarchy: a reassuring status at the top, an insight feed in the middle, and drill-downs on demand. Testing paper and grayscale flows early let me validate structure before investing in visuals.",
        lowFiVariants: ["dashboard", "list", "detail"],
        hiFi:
          "High-fidelity designs introduced a soft, approachable visual language — rounded modular cards, a calm palette, and generous typography — to counteract the anxiety users associated with finance tools. Every insight card pairs a number with a plain-language 'why'.",
      },
      solution: {
        intro:
          "The final product leads with clarity and explains itself at every step, so users always know what's happening and what to do next.",
        features: [
          {
            title: "Financial Health Score",
            description:
              "A single, glanceable status that answers 'Am I okay?' before showing any detail.",
          },
          {
            title: "Explainable Insights",
            description:
              "Every insight is written in plain language and can be expanded to show exactly how it was calculated.",
          },
          {
            title: "Guided Actions",
            description:
              "Contextual nudges turn insights into one-tap actions like moving money or adjusting a goal.",
          },
        ],
      },
      outcomes: [
        { stat: "+41%", label: "weekly active retention" },
        { stat: "4.8★", label: "average beta rating" },
        { stat: "−32%", label: "support tickets about categorization" },
      ],
      reflection:
        "Designing for trust meant slowing down and making the product explain itself rather than just look smart. If I revisited this, I'd invest earlier in the language system — the words on each insight card mattered as much as the visual design.",
    },
  },
  {
    slug: "prediction-market",
    name: "Prediction Market",
    description:
      "Reimagining prediction markets through approachable data visualization and intuitive interactions, making complex forecasting accessible to a wider audience.",
    image: "/images/project-prediction.jpg",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Web Design", variant: "lavender" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "Making probabilistic thinking feel intuitive for people who have never traded before.",
      meta: {
        role: "Product Designer",
        timeline: "10 weeks · 2024",
        team: "2 PMs, 3 Engineers, 1 Designer",
        platform: "Responsive Web",
        tools: ["Figma", "FigJam", "Amplitude", "Framer"],
      },
      overview:
        "Prediction markets let people forecast real-world events, but the category is dominated by dense, trader-oriented interfaces. This project reimagined the experience for curious newcomers, translating probabilities and order books into intuitive, approachable interactions.",
      problem: {
        statement:
          "Prediction markets are powerful but intimidating — newcomers bounce off jargon-heavy interfaces built for expert traders.",
        points: [
          "First-time users didn't understand what 'shares' or 'odds' meant in context.",
          "Order-book UIs assumed financial literacy most people don't have.",
          "There was no bridge between casual curiosity and confident participation.",
        ],
      },
      goals: [
        "Translate probability into language and visuals anyone can grasp.",
        "Lower the barrier from curiosity to first confident forecast.",
        "Preserve depth for advanced users without overwhelming newcomers.",
      ],
      research: {
        intro:
          "Because the concept was unfamiliar to most people, research focused on mental models — how non-experts reason about likelihood, risk, and reward before they ever see the product.",
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
          "I reorganized the product around topics and questions rather than tickers and order books, so discovery mirrors how people already think about the news.",
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
          "Low-fidelity flows focused on the single riskiest moment: placing a first forecast. I prototyped multiple framings of the buy interaction — sliders, cards, and plain-language toggles — to find the least intimidating path.",
        lowFiVariants: ["list", "detail", "dashboard"],
        hiFi:
          "High-fidelity design leaned on bold data visualization and a confident, editorial style. Probabilities became the hero of each card, and a lavender accent guided attention to primary actions without feeling like a trading terminal.",
      },
      solution: {
        intro:
          "The final experience frames every market as a plain-language question with a clear probability, making forecasting feel more like sharing an informed opinion than trading.",
        features: [
          {
            title: "Question-First Cards",
            description:
              "Each market leads with a human question and a large, readable probability instead of a ticker.",
          },
          {
            title: "Visual Forecasting",
            description:
              "A simple slider shows potential outcomes in real dollars before you commit.",
          },
          {
            title: "Topic Discovery",
            description:
              "Browse by the subjects you already follow — politics, sports, tech — not by symbols.",
          },
        ],
      },
      outcomes: [
        { stat: "2.4x", label: "newcomer activation rate" },
        { stat: "−55%", label: "drop-off on first forecast" },
        { stat: "+38%", label: "7-day return rate" },
      ],
      reflection:
        "The biggest lesson was that clarity is a feature, not a coat of paint. Reframing the entire product around questions instead of markets did more for accessibility than any single UI tweak could have.",
    },
  },
  {
    slug: "meetmews",
    name: "MeetMews",
    description:
      "A social platform connecting pet owners through local discovery, community features, and thoughtful tools that make caring for animals feel more personal.",
    image: "/images/project-meetmews.jpg",
    tags: [
      { label: "UX Design", variant: "outline" },
      { label: "Product Research", variant: "solid" },
    ],
    caseStudy: {
      tagline:
        "Building a warm, trustworthy community where pet owners actually want to show up.",
      meta: {
        role: "Product Designer",
        timeline: "14 weeks · 2023",
        team: "1 PM, 2 Engineers, 2 Designers",
        platform: "iOS",
        tools: ["Figma", "Lookback", "Notion", "ProtoPie"],
      },
      overview:
        "MeetMews is a social platform for pet owners to discover local services, connect with nearby owners, and manage their pets' lives in one place. The challenge was designing a community product that felt personal and safe rather than another noisy feed.",
      problem: {
        statement:
          "Pet owners juggle fragmented tools and scattered communities, with no trusted, local place to connect and care for their animals.",
        points: [
          "Local pet info lived across Facebook groups, Nextdoor, and word of mouth.",
          "New owners felt isolated and unsure who to trust for advice.",
          "Existing apps optimized for engagement over genuine community.",
        ],
      },
      goals: [
        "Create a sense of safe, local community from the first session.",
        "Consolidate pet care tools into one intuitive hub.",
        "Design for meaningful connection over vanity metrics.",
      ],
      research: {
        intro:
          "I focused research on trust and belonging — what makes an online community feel safe enough for people to participate, especially around something as personal as their pets.",
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
          "I anchored the architecture on locality and identity — every experience starts from 'owners and services near me' and builds outward to broader community.",
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
          "Low-fidelity wireframes explored how to balance three needs — discovery, connection, and pet management — without a cluttered tab bar. I tested several navigation models to find one that kept community central.",
        lowFiVariants: ["list", "dashboard", "detail"],
        hiFi:
          "High-fidelity design used a bold, high-contrast card system and playful photography to feel warm and modern. Verified badges and local context were made visually prominent to reinforce trust throughout.",
      },
      solution: {
        intro:
          "MeetMews brings discovery, connection, and pet care into one calm, trustworthy space designed to feel local and personal.",
        features: [
          {
            title: "Local Discovery",
            description:
              "Find vets, sitters, parks, and events nearby with owner-verified recommendations.",
          },
          {
            title: "Pet Profiles",
            description:
              "A home for each pet's health, reminders, and milestones — shareable with sitters and vets.",
          },
          {
            title: "Trusted Community",
            description:
              "Neighborhood-based groups with verified members keep conversations safe and relevant.",
          },
        ],
      },
      outcomes: [
        { stat: "12k", label: "waitlist signups pre-launch" },
        { stat: "4.9★", label: "beta community rating" },
        { stat: "+63%", label: "D30 retention vs. benchmark" },
      ],
      reflection:
        "Community products live or die on trust, and trust is built through countless small design decisions — verification, tone, locality. Designing MeetMews taught me to treat safety and warmth as core UX requirements, not afterthoughts.",
    },
  },
];

export const social = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/luluwang25" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/luluw.art" },
  { label: "EMAIL", href: "mailto:lulu.wang25@gmail.com" },
];
