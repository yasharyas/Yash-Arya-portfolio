// Centralized content sourced from /.MD (Yash Arya — Portfolio Source Document)

export const profile = {
  name: "Yash Arya",
  role: "Full Stack Developer",
  subroles: ["Web3", "AI / ML", "VS Code Extension Developer"],
  location: "Faridabad · New Delhi, India",
  status:
    "B.Tech CSE @ Bennett University (2022–2026) · Frontend Engineering Intern @ Pelocal Fintech",
  avatar: "https://avatars.githubusercontent.com/u/123353688?v=4",
  // Drafted tagline & narrative — flagged in source as missing; safe-default copy that fits tone.
  tagline:
    "I build production software, end to end. Admin dashboards, smart contracts, ML pipelines, editor tools — shipped, not demoed.",
  bio: [
    "I'm Yash, a final-year CS student at Bennett University and a frontend engineer interning at Pelocal Fintech, where I'm the sole frontend on an event-operations admin panel running 100+ events and 500+ menu items in production.",
    "Across four internships — LG, a Government of India PSU, ILBS healthcare, and Pelocal — I've learned that good software is less about the stack and more about the seams: the validation that catches a double booking before launch, the cache that turns a 1,000-row table into a 300ms page, the SHAP value that makes an AI prediction defensible.",
    "I work the full spectrum: React + TypeScript dashboards, Solidity on Polygon, PyTorch on a 3060, VS Code extensions, terminal hooks. MERN-first, polyglot when the problem asks for it.",
  ],
};

export const links = {
  email: "yasharya2601@gmail.com",
  emailAlt: "yasharyas@proton.me",
  phone: "+91 70656 99918",
  github: "https://github.com/yasharyas",
  linkedin: "https://www.linkedin.com/in/yash--arya/",
  twitter: "https://twitter.com/yasharyass",
  gcpA:
    "https://www.skills.google/public_profiles/6c352e60-eda3-49c1-ae5f-db5e51f87fa3",
  gcpB:
    "https://www.skills.google/public_profiles/0eb7c336-6191-47ac-a2be-03eb486a5812",
  certificates:
    "https://drive.google.com/drive/folders/1Uwu-2HyZqDe5FHADyG_6wBve-m1aJyP1?usp=sharing",
};

export const stats = [
  { value: "4+", label: "internships shipped" },
  { value: "56", label: "public repos" },
  { value: "294", label: "contributions / yr" },
  { value: "27", label: "OSS components extracted" },
];

export const experience = [
  {
    company: "Pelocal Fintech",
    role: "Software Engineering Intern — Frontend Systems",
    location: "Noida",
    period: "Dec 2025 — Ongoing",
    products: "MyAnthology · Sammaan Capital",
    bullets: [
      "Sole frontend on the MyAnthology Admin Panel — React + TypeScript dashboard managing 100+ events, 500+ menu items, live customer bookings.",
      "Architected 8+ admin modules with TanStack Query + Table → sub-300ms cached loads on 1,000-row tables; ~60% less data-fetch boilerplate.",
      "Seat-availability + future-date + double-booking guards eliminated overbooking entirely (down from 12+ pre-launch QA issues).",
      "Zod validation across all forms cut backend rejection from ~18% to under 2%.",
      "GST reporting dashboards (CGST/SGST/IGST) replaced ~4 hrs/week of manual Excel reconciliation.",
      "5-step Sammaan Capital loan flow with per-step Zod validation cut drop-off ~25% vs. the legacy single-page form.",
      "Extracted 27 reusable primitives into the open-source yash-ui-system Turborepo. New-page scaffolding: ~2 days → ~4 hrs.",
    ],
    stack: [
      "React",
      "TypeScript",
      "TanStack Query",
      "TanStack Table",
      "Zod",
      "Tailwind",
      "Turborepo",
      "shadcn/ui",
    ],
  },
  {
    company: "Ohum Healthcare Solutions",
    role: "Backend QA Intern — HIS at ILBS",
    location: "New Delhi",
    period: "Jun — Jul 2025",
    products: "Hospital Information System for ILBS",
    bullets: [
      "Validated RBAC across 6 roles (admin, doctor, nurse, lab tech, billing, patient) — caught 22+ privilege-escalation gaps pre-rollout.",
      "Wrote 80+ raw SQL queries in DBeaver/PostgreSQL; surfaced 9 silent UI/DB data-mismatch bugs.",
      "Ran 4 full QA cycles across OPD, IPD, Lab, Pharmacy modules → 45+ Jira defects, ~30% drop in post-release hotfixes.",
      "Authored regression baselines for admission, discharge summary, and lab-result workflows — reused by the in-house team.",
    ],
    stack: ["PostgreSQL", "DBeaver", "SQL", "Jira", "RBAC"],
  },
  {
    company: "LG Electronics",
    role: "Industrial Trainee — Full Stack",
    location: "Greater Noida",
    period: "Jul 2024",
    products: "Inventory Management System",
    bullets: [
      "Built a C# + ASP.NET + SQL Server inventory system digitizing 10,000+ SKUs for 15+ floor staff.",
      "Barcode-matched lookup tool (Django + JS + MySQL) cut product lookup from ~45s to ~3s.",
      "Role-based auth + audit logging closed a recurring ~5% month-end reconciliation gap.",
      "Prototype demoed and approved by warehouse operations head inside the 4-week window.",
    ],
    stack: ["C#", "ASP.NET", "SQL Server", "Django", "MySQL"],
  },
  {
    company: "Central Electronics Limited",
    role: "Backend Developer Intern — Govt. of India PSU",
    location: "Ghaziabad",
    period: "May — Jun 2024",
    products: "Government Job Portal",
    bullets: [
      "Built 12 REST endpoints (Node + Express + Mongo) handling 500 concurrent mock requests without timeouts.",
      "Cloudinary integration for resume/photo uploads with MIME validation + 5MB caps → ~90% fewer invalid-upload errors.",
      "bcrypt (10 rounds) + JWT (24h) closed an OWASP A02 gap (prior storage was plaintext).",
      "Documented 18+ reproducible defects with cURL repros; 15 patched before QA hand-off.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Cloudinary", "JWT"],
  },
];

export type Project = {
  index: string;
  title: string;
  tagline: string;
  year: string;
  status: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  team?: string;
};

export const featured: Project[] = [
  {
    index: "01",
    title: "PromptLock",
    tagline: "Agent-aware distraction control for VS Code.",
    year: "2026",
    status: "Active · Solo",
    description:
      "A VS Code extension that watches GitHub Copilot agent activity through in-memory editor events. When you're typing, your browser windows close. When the agent is working, they open. When it needs your approval, they close again. Earn the scroll, then put it down.",
    highlights: [
      "Two-state machine driven by 7 detection signals — primary is onDidStartTerminalShellExecution.",
      "Distraction windows open at iPhone 14 Pro dimensions (393×852) with a mobile UA so Shorts and Reels scroll natively.",
      "Hard Lock, Punishment, and Reverse-Dopamine modes. All analytics local — zero external transmission.",
      "Replaces a polling approach (v1–v6) that had 17–55s detection delays. Fires instantly.",
    ],
    stack: ["TypeScript", "VS Code Extension API", "Chromium IPC"],
    links: [{ label: "Repository", href: "https://github.com/yasharyas/Promptlock" }],
  },
  {
    index: "02",
    title: "AI Study Tutor",
    tagline: "A subject tutor with four teaching modes and live token streaming.",
    year: "2026",
    status: "Shipped · with Kuljot Singh",
    description:
      "A Gemini-powered tutor that adapts how it teaches: Explain, Socratic, Revision, or Exam-Focused. Tokens stream over SSE. Voice input drives a 48-bar Web Audio visualizer. Drop an image, get multimodal analysis.",
    highlights: [
      "Four teaching modes — Socratic mode never gives the answer.",
      "Token-by-token SSE streaming with Framer Motion typewriter character animation.",
      "LaTeX, code highlighting, exportable notes. Zustand-scoped session memory.",
      "Strict TypeScript (zero any), comprehensive Jest suite, IP-based rate limiting at the edge.",
    ],
    stack: ["Next.js 16", "React 19", "Gemini 2.5 Flash", "Zustand", "Framer Motion"],
    links: [
      { label: "Live", href: "https://tutor-chatbot-eight.vercel.app/" },
      { label: "Repository", href: "https://github.com/yasharyas/Tutor-Chatbot" },
    ],
  },
  {
    index: "03",
    title: "XAI-Chain",
    tagline: "Explainable AI for blockchain transaction security.",
    year: "2025",
    status: "Shipped · with Abhigyan Tyagi",
    description:
      "A full-stack Web3 + AI platform that classifies blockchain transactions as malicious or benign, explains every prediction with SHAP values, and stores both on-chain via Polygon Amoy testnet. Every verdict is auditable.",
    highlights: [
      "XGBoost on 9 transaction features → 100% test accuracy on 10,000 synthetic transactions.",
      "SHAP per-feature contributions uploaded to IPFS via Pinata, hash + risk score pinned on-chain.",
      "Dockerized FastAPI + Next.js 14 frontend. 6/6 Hardhat smart-contract tests passing.",
      "Three-page frontend — landing, analyze, dashboard — with RainbowKit + Wagmi v2 wallet auth.",
    ],
    stack: ["Python", "FastAPI", "XGBoost", "SHAP", "Solidity", "Next.js 14", "Polygon"],
    links: [{ label: "Repository", href: "https://github.com/yasharyas/Xplainable-chain" }],
  },
  {
    index: "04",
    title: "yash-ui-system",
    tagline: "A Turborepo of components extracted from production work.",
    year: "2026",
    status: "Active",
    description:
      "shadcn-style monorepo with a CLI that copies components straight into consumer projects. Fifteen LanceMart AI components and twelve portfolio primitives, all generalized from real Pelocal production code.",
    highlights: [
      "npx yash-ui add <component> — no install, just source.",
      "apps/gallery preview app with popup previews per component.",
      "Three packages: ui, registry, cli. 97% TypeScript.",
    ],
    stack: ["Turborepo", "TypeScript", "Next.js", "Tailwind", "Node CLI"],
    links: [{ label: "Repository", href: "https://github.com/yasharyas/yash-ui-system" }],
  },
  {
    index: "05",
    title: "HAM10000 Skin Lesion Classifier",
    tagline: "Deep learning on 10,015 dermoscopy images, 7 lesion classes.",
    year: "2025",
    status: "Team of 4",
    description:
      "PyTorch pipeline classifying skin lesions with EfficientNetV2-RW-S and ConvNeXt-Tiny ensembles. Focal loss handles a brutal 6,705-vs-115 class imbalance. Grad-CAM heatmaps make every prediction inspectable.",
    highlights: [
      "EfficientNetV2-RW-S → 94.21% validation accuracy on a single RTX 3060 in ~1.5h.",
      "Focal Loss (γ=2.0) for class imbalance · Mixed Precision FP16 for 2× speedup.",
      "AdamW + CosineAnnealing LR + best-only checkpointing. Stratified 85/15 split.",
    ],
    stack: ["PyTorch 2.6", "timm", "Grad-CAM", "scikit-learn"],
    links: [
      { label: "Repository", href: "https://github.com/yasharyas/dermatology-ai-classification" },
    ],
  },
  {
    index: "06",
    title: "ShoeStore",
    tagline: "Headless e-commerce with Stripe, Cloudinary, and a Strapi backend.",
    year: "2024",
    status: "Solo",
    description:
      "Next.js storefront on a Strapi CMS. Stripe for payments, Cloudinary for media, Redux for cart state. Mobile-first responsive with a measured 25% engagement lift on mobile.",
    highlights: [
      "Stripe checkout + Cloudinary-optimized media + Strapi-managed catalog.",
      "Redux cart state with persistence across sessions.",
      "Mobile-first responsive — 25% engagement boost vs. desktop-first prototype.",
    ],
    stack: ["Next.js", "Tailwind", "Redux", "Strapi", "Stripe", "Cloudinary"],
    links: [
      { label: "Repository", href: "https://github.com/yasharyas/shoe-store-frontend" },
    ],
  },
  {
    index: "07",
    title: "Crypto Portfolio DApp",
    tagline: "Multi-chain portfolio with cross-border payments.",
    year: "2024",
    status: "with Akshay Sinha",
    description:
      "MetaMask + RainbowKit wallet auth, ERC20 + NFT tracking with on-chain queries, live pricing via CoinMarketCap, OpenAI-generated portfolio insights. Three payment rails: Ethereum, card, bank.",
    highlights: [
      "Cross-border payments authenticated by Email + Mobile OTP.",
      "Live ETH price feeds + multi-step checkout.",
      "ERC20 and NFT inventory queries against multiple chains.",
    ],
    stack: ["Next.js", "Solidity", "Wagmi", "RainbowKit", "ethers.js"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/yasharyas/Cross-border-payments-DApp-using-mobile-Email",
      },
    ],
  },
];

export const otherProjects = [
  { name: "no-as-a-service-web", year: "2026", note: "Edge runtime · WCAG 2.1 AA", href: "https://no-as-a-service-web.vercel.app" },
  { name: "FAHHH", year: "2026", note: "5★ · cross-platform CLI · 1-line install", href: "https://github.com/yasharyas/fail-fahhh" },
  { name: "CampusConvene", year: "2024", note: "Room booking · Firebase · 4 contributors", href: "https://github.com/yasharyas/CampusConvene" },
  { name: "X-Park (SIH)", year: "2023", note: "Smart parking · ALPR · FASTag", href: "https://github.com/yasharyas/SIh" },
  { name: "Redis Search Engine", year: "2024", note: "TF-IDF · ZSET-based", href: "https://github.com/yasharyas/SearchEngine_Redis-py" },
  { name: "Web3Drive", year: "2024", note: "Decentralized file sharing", href: "https://github.com/yasharyas/Web3Drive" },
  { name: "Million Times Clock", year: "2025", note: "Art installation replica", href: "https://github.com/yasharyas/Human-Since-1982---Million-Times-Clock-Replica" },
  { name: "AutoMatic Maze Solver", year: "2023", note: "C++ · pinned", href: "https://github.com/yasharyas/AutoMatic-Maze-Solver" },
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Solidity", "C#", "C++", "Java", "Dart", "SQL"],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "Framer Motion",
      "shadcn/ui",
      "Zod",
      "Vite",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "Django", "Flask", "ASP.NET", "REST"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQL Server", "Redis"],
  },
  {
    group: "Web3",
    items: ["Solidity", "ethers.js", "Wagmi", "RainbowKit", "Hardhat", "IPFS / Pinata"],
  },
  {
    group: "AI / ML",
    items: ["PyTorch", "XGBoost", "SHAP", "scikit-learn", "EfficientNetV2", "Grad-CAM", "Gemini API"],
  },
  {
    group: "Infra",
    items: ["Docker", "GitHub Actions", "Vercel", "GCP", "Turborepo", "Cloudinary"],
  },
];

export const certifications = [
  { title: "Ethereum & Solidity: The Complete Developer's Guide", issuer: "Udemy" },
  { title: "Blockchain and its Applications", issuer: "NPTEL" },
  { title: "Blockchain Basics", issuer: "University at Buffalo · Coursera" },
  { title: "Cloud Computing & Distributed Systems", issuer: "NPTEL" },
  { title: "Object-Oriented Data Structures in C++", issuer: "University of Illinois · Coursera" },
  { title: "Introduction to Modern Database Systems (CS403)", issuer: "Saylor Academy" },
  { title: "Using Git for Distributed Development", issuer: "The Linux Foundation" },
  { title: "Postman API Fundamentals Student Expert", issuer: "Postman" },
  { title: "C++ Programming Specialization (5 courses)", issuer: "Coursera · Codio" },
  { title: "MATLAB — Onramp · Linear Algebra · ODEs", issuer: "MathWorks" },
  { title: "Data Visualisation: Empowering Business with Effective Insights", issuer: "Tata · Forage" },
  { title: "Digital Marketing", issuer: "Google Digital Garage" },
];

export const gcpBadges = [
  { profile: "A", league: "Silver", points: "10,645", since: "2023" },
  { profile: "B", league: "Silver", points: "2,100", since: "2022" },
];

export const education = {
  school: "Bennett University",
  degree: "B.Tech, Computer Science Engineering",
  period: "Aug 2022 — Jun 2026 (expected)",
  location: "Greater Noida",
};
