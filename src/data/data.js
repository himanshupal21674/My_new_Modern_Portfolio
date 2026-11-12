import profilePhoto from "../assets/My_Profile_Photo.jpg"

export const siteConfig = {
  title: "Himanshu Pal — Frontend Developer",
  description:
    "Frontend Developer with 2.5+ years of experience building premium, performant web experiences with React, TypeScript, and modern UI engineering.",
  keywords: [
    "AI Frontend Developer",
  ],
  url: "https://himanshupal.dev",
  ogImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
  lang: "en",
  defaultTheme: "dark",
}

export const personalInfo = {
  name: "Himanshu Pal",
  firstName: "Himanshu",
  lastName: "Pal",
  initials: "HP",
  title: "Frontend Developer",
  email: "himanshupal21674@gmail.com",
  phone: "+91 9140807380",
  location: "Kanpur, India",
  resume: "/Himanshu_Pal_Resume.pdf",
  github: "https://github.com/himanshupal21674",
  linkedin: "https://www.linkedin.com/in/himanshu-pal-ba59a6188/",
  // twitter: "https://x.com",
  bio: "I design and build polished product interfaces that feel fast, intentional, and a little bit magical. Over the last 2.5 years I’ve shipped production React apps, design systems, and conversion-focused marketing experiences for startups and product teams.",
  profileImage: profilePhoto,
  availability: "Open to full-time and freelance opportunities",
}

export const heroContent = {
  greeting: "Hello, I'm",
  headline: "I craft immersive web experiences.",
  description:
    "Frontend developer focused on React, motion, and pixel-precise UI. I turn complex product ideas into fast, accessible, and visually premium interfaces.",
  roles: ["AI Frontend Developer"],
  floatingTechs: ["react", "javascript", "typescript", "tailwind", "nextjs", "vite", "figma", "redux"],
  ctas: [
    { label: "Download Resume", action: "resume", variant: "primary" },
    { label: "Contact Me", action: "contact", variant: "secondary" },
    { label: "View Projects", action: "projects", variant: "ghost" },
  ],
}

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#education", label: "Education" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export const sections = {
  about: {
    eyebrow: "About",
    title: "A frontend engineer who cares about the last 10%.",
    subtitle:
      "From design handoff to production polish — I obsess over motion, accessibility, and the details that make a product feel premium.",
  },
  skills: {
    eyebrow: "Capabilities",
    title: "Tools I use to ship beautiful products.",
    subtitle: "A focused stack across UI engineering, APIs, data, and the tooling that keeps teams moving.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Building interfaces in real product teams.",
    subtitle: "2.5+ years shipping user-facing features, design systems, and performance-sensitive frontends.",
  },
  projects: {
    eyebrow: "Selected work",
    title: "Projects with craft, not just checklists.",
    subtitle: "Product dashboards, e-commerce, and motion-rich marketing builds — filtered by the stack behind them.",
  },
  achievements: {
    eyebrow: "Milestones",
    title: "Recognition, certifications, and contributions.",
    subtitle: "A few markers from the journey so far — awards, credentials, and community work.",
  },
  education: {
    eyebrow: "Education",
    title: "Foundations that still inform how I build.",
    subtitle: "Intensive, project-driven training focused on full-stack web development and continuous learning.",
  },
  testimonials: {
    eyebrow: "Kind words",
    title: "What collaborators say about working together.",
    subtitle: "Feedback from product, design, and engineering partners I’ve shipped with.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s build something remarkable.",
    subtitle: "Have a product in mind, a role to fill, or a design that needs a serious frontend? I’d love to hear from you.",
  },
}

export const stats = [
  { label: "Years of experience", value: 3, suffix: "+", decimals: 0 },
  { label: "Projects completed", value: 24, suffix: "+", decimals: 0 },
  { label: "Technologies", value: 18, suffix: "+", decimals: 0 },
  { label: "Happy clients", value: 12, suffix: "+", decimals: 0 },
]

export const aboutHighlights = [
  {
    title: "Product-minded UI",
    body: "I partner with design and product to ship interfaces that convert, not just look good in a mock.",
  },
  {
    title: "Motion with purpose",
    body: "Micro-interactions, page transitions, and scroll storytelling — always in service of clarity.",
  },
  {
    title: "Performance first",
    body: "Code-splitting, image strategy, and careful animation so the experience stays buttery on mid-range devices.",
  },
]

export const skills = [
  { name: "React", level: 93, category: "Frontend" },
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 86, category: "Frontend" },
  { name: "Next.js", level: 84, category: "Frontend" },
  { name: "HTML5", level: 95, category: "Frontend" },
  { name: "CSS3", level: 94, category: "Frontend" },
  { name: "Tailwind CSS", level: 91, category: "Frontend" },
  { name: "Framer Motion", level: 82, category: "Frontend" },
  { name: "Redux", level: 78, category: "Frontend" },
  { name: "Node.js", level: 74, category: "Backend" },
  { name: "Express", level: 70, category: "Backend" },
  { name: "REST APIs", level: 80, category: "Backend" },
  { name: "GraphQL", level: 62, category: "Backend" },
  { name: "MongoDB", level: 68, category: "Database" },
  { name: "PostgreSQL", level: 64, category: "Database" },
  { name: "Firebase", level: 72, category: "Database" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "Figma", level: 85, category: "Tools" },
  { name: "Vite", level: 88, category: "Tools" },
  { name: "Jest", level: 70, category: "Tools" },
  { name: "Webpack", level: 66, category: "Tools" },
  { name: "Docker", level: 60, category: "DevOps" },
  { name: "CI/CD", level: 64, category: "DevOps" },
  { name: "AWS", level: 58, category: "DevOps" },
  { name: "Vercel", level: 82, category: "DevOps" },
  { name: "Nginx", level: 55, category: "DevOps" },
]

export const skillCategories = ["Frontend", "Backend", "Database", "Tools", "DevOps"]

export const experiences = [
  {
    id: "conceptsparx",
    company: "Concept Sparx",
    role: "Frontend Developer",
    location: "Mumbai, India",
    type: "Full-time",
    duration: "Jan 2025 — Present",
    period: "1.5 yrs",
    responsibilities: [
      "Own the customer dashboard frontend — React, TypeScript, and a shared component library used across 4 products.",
      "Led a motion and accessibility pass that lifted task completion by 18% and cut interaction lag on core flows.",
      "Partnered with design to ship a token-based theming system (light/dark) without regressions in legacy pages.",
      "Mentored two junior engineers on component APIs, code review, and performance profiling.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "GraphQL"],
  },

]

export const projects = [
  {
    id: "econ-ecomerce",
    title: "Shop with belive",
    category: "E-Commerce",
    description:
      "Anon is a fully responsive e-commerce website, with maximum compatibility in all mobile devices, built using HTML, CSS, and JavaScript.",

    image:
      "https://github.com/himanshupal21674/anon_ecomerce/raw/main/website-demo-image/desktop.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"],
    liveUrl: "https://anon-ecomerce.vercel.app",
    githubUrl: "https://github.com/himanshupal21674/anon_ecomerce",
    featured: true,
    features: [
      "Drag-and-drop widget layout with persisted preferences",
      "Role-based navigation and gated data views",
      "Dark/light themes using design tokens",
      "Optimistic UI for filters and saved reports",
    ],
  },
 {
  id: "Lenscart",
  title: "Lenscart",
  category: "High-end Engineering",
  description:
    "A modern eyewear e-commerce experience inspired by Lenskart, featuring product discovery, detailed product pages, responsive shopping flows, and an interactive cart experience.",

  longDescription:
    "Lenscart is a high-fidelity e-commerce frontend inspired by the Lenskart shopping experience. The project focuses on building a polished and responsive eyewear storefront with structured product discovery, detailed product views, variant selection, cart interactions, and a streamlined checkout flow. The interface is designed to feel fast and intuitive across desktop and mobile while maintaining consistent product information, navigation, and shopping context throughout the experience.",

  image:
    "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=75",

  tech: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Stripe",
    "Zustand"
  ],

  liveUrl: "https://cw-project-pi.vercel.app",
  githubUrl: "https://github.com/himanshupal21674/cw-project",

  featured: true,

  features: [
    "Responsive eyewear e-commerce storefront inspired by Lenskart",
    "Product discovery with organized categories and product listings",
    "Detailed product pages with product images, variants, pricing, and information",
    "Interactive shopping cart with quantity management and cart state persistence",
    "Smooth product and cart interactions for a polished shopping experience",
    "Responsive layouts optimized for desktop, tablet, and mobile devices",
    "Form validation and structured checkout flow",
    "Reusable React components for scalable storefront development",
    "Optimized product imagery and responsive image handling",
    "SEO-friendly page structure and metadata"
  ],
},
{
  id: "nayaa-property",
  title: "NayaaProperty",
  category: "Real Estate Platform",

  description:
    "A modern real estate platform built with React, Vite, and Tailwind CSS, featuring property discovery, advanced search, detailed listings, responsive interfaces, and interactive real estate workflows.",

  longDescription:
    "NayaaProperty is a comprehensive real estate platform focused on delivering a modern and responsive property discovery experience. The platform includes property search and advanced filtering, detailed property listings and galleries, project discovery, property comparison, user authentication, dashboards, profile and settings management, blog content, and contact workflows. My contribution focused on the frontend implementation, responsive UI development, reusable components, complex workflows, and translating product designs into production-ready React interfaces.",

  role: "Frontend Developer",

  tech: [
    "React",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "React Router",
    "React Query",
    "React Hook Form",
    "Zod",
    "shadcn/ui",
    "Radix UI"
  ],

  image: "YOUR_NAYAA_PROPERTY_COVER_IMAGE_URL",

  liveUrl: "https://replicant-site-builder.vercel.app",
 
  githubUrl: "https://github.com/himanshupal21674/Replicant_Site_Builder",

  featured: true,

  features: [
    "Advanced property search and filtering",
    "Property listing and detailed property information pages",
    "Project discovery with recommended and trending sections",
    "Property comparison workflows",
    "Responsive dashboards, profiles, and settings interfaces",
    "Login and signup flows with form validation",
    "Reusable and modular React component architecture",
    "Responsive UI implementation across desktop, tablet, and mobile",
    "Accessible UI components using shadcn/ui and Radix primitives",
    "SEO-friendly and performance-focused frontend implementation"
  ],
},
{
  id: "health-hub",
  title: "Health Hub",
  category: "Healthcare Platform",

  description:
    "A modern healthcare web application built with React, TypeScript, Vite, shadcn/ui, and Tailwind CSS, focused on delivering a clean, responsive, and accessible user experience.",

  longDescription:
    "Health Hub is a modern healthcare-focused web application developed with React, TypeScript, Vite, shadcn/ui, and Tailwind CSS. The project follows a component-based architecture and uses reusable UI primitives to create a consistent and responsive interface. It is designed for a streamlined healthcare experience across different screen sizes, with a focus on clean UI, maintainable frontend structure, and a modern design system.",

  image:
    "YOUR_HEALTH_HUB_COVER_IMAGE_URL",

  tech: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "shadcn/ui"
  ],

  liveUrl: "https://health-hub-hub.vercel.app",
  githubUrl: "https://github.com/himanshupal21674/health-hub-hub",

  featured: true,

  features: [
    "Responsive healthcare-focused web interface",
    "Reusable React component architecture",
    "Type-safe frontend development with TypeScript",
    "Modern UI components built with shadcn/ui",
    "Utility-first styling with Tailwind CSS",
    "Responsive layouts optimized for different screen sizes",
    "Vite-powered fast development and production build workflow"
  ],
},
  {
    id: "trailblaze",
    title: "Trailblaze",
    category: "Travel",
    description:
      "A trip planner with map-led browsing, itinerary timelines, and a magazine-like destination UI.",
    longDescription:
      "Trailblaze combines editorial storytelling with practical planning. Users browse destinations, pin stays, and rearrange days on a timeline that stays in sync with the map.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=75",
    tech: ["React", "Mapbox", "Tailwind CSS", "Firebase", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    features: [
      "Interactive maps with clustered pins",
      "Day-by-day itinerary with drag reorder",
      "Saved collections and shareable trip links",
      "Responsive magazine layouts for destination stories",
    ],
  },
  {
    id: "folio-kit",
    title: "FolioKit",
    category: "Developer Tool",
    description:
      "A personal site starter with content-driven sections, theming, and animation presets out of the box.",
    longDescription:
      "FolioKit is the spiritual sibling of this portfolio: a structured content file, reusable section architecture, and motion defaults that still look custom. Built to be forked and restyled in an afternoon.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=75",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    features: [
      "Single-file content model for all sections",
      "Theme tokens for dark/light palettes",
      "Section-level animation presets",
      "SEO helpers and semantic landmarks",
    ],
  },
]

export const education = [
  {
    id: "masai-fullstack",
    school: "Masai Coding School",
    degree: "Full Stack Web Development Diploma",
    duration: "Oct 2023 — Oct 2024",
    location: "Online / India",
    details:
      "Completed a 1-year intensive, project-based full-stack web development bootcamp focused on building production-ready web applications, frontend development, backend development, databases, REST APIs, authentication, Git/GitHub, deployment, and problem solving.",
    highlights: [
      "Full Stack Development",
      "MERN Stack",
      "React.js",
      "Node.js",
      "MongoDB",
      "Data Structures & Algorithms",
    ],
  },
]

export const certifications = [
  {
    id: "meta-fe",
    name: "Meta Front-End Developer",
    issuer: "Meta · Coursera",
    year: "2023",
    credentialUrl: "https://www.coursera.org",
  },
  {
    id: "aws-cp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    credentialUrl: "https://aws.amazon.com",
  },
  {
    id: "js-algo",
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
    credentialUrl: "https://www.freecodecamp.org",
  },
]

export const achievements = [
  {
    id: "hack-gold",
    type: "Award",
    title: "1st Place — PixelHack 2023",
    org: "PixelHack",
    year: "2023",
    description:
      "Won a 36-hour hackathon with a motion-rich civic reporting app. Judged on UX polish, accessibility, and demo storytelling.",
  },
  {
    id: "oss",
    type: "Contribution",
    title: "Open-source UI primitives",
    org: "GitHub",
    year: "2024",
    description:
      "Maintainer of a small set of accessible React primitives used by 200+ stars worth of side projects and internal tools.",
  },
  {
    id: "perf-award",
    type: "Recognition",
    title: "Engineering Spotlight — Performance",
    org: "Nexora Labs",
    year: "2024",
    description:
      "Recognized for cutting dashboard TTI by 35% through route-based splitting, image policy, and chart lazy-loading.",
  },
  {
    id: "talk",
    type: "Talk",
    title: "Motion that respects users",
    org: "React Meetup Bengaluru",
    year: "2025",
    description:
      "Spoke on designing Framer Motion systems that degrade gracefully with reduced-motion and mid-range hardware.",
  },
]

export const testimonials = [
  {
    id: "ananya",
    name: "Ananya Rao",
    role: "Product Designer",
    company: "Nexora Labs",
    quote:
      "Himanshu treats design files as a starting point, not a ceiling. The motion, empty states, and edge cases always show up — and they always feel on-brand.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "rahul",
    name: "Rahul Iyer",
    role: "Engineering Manager",
    company: "Nexora Labs",
    quote:
      "Reliable, calm under deadline, and unusually good at explaining frontend trade-offs to product. Our dashboard quality jumped the quarter he joined.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "meera",
    name: "Meera Kapoor",
    role: "Founder",
    company: "Lumen Goods",
    quote:
      "He rebuilt our storefront in a way that finally matched the brand we had in our heads. Conversion improved, and the site still feels fast on mobile.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "dev",
    name: "Dev Sharma",
    role: "Full-stack Developer",
    company: "PixelForge Studio",
    quote:
      "The component APIs he writes are the ones other people actually want to reuse. Clean, documented, and never clever at the expense of the next engineer.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
  },
]

export const contactForm = {
  submitLabel: "Send message",
  sendingLabel: "Sending…",
  successMessage: "Thanks — your message is ready. I’ll get back to you shortly.",
  errorMessage: "Please fix the highlighted fields and try again.",
  fields: {
    name: { label: "Name", placeholder: "Your name", required: true, minLength: 2 },
    email: { label: "Email", placeholder: "you@company.com", required: true },
    subject: { label: "Subject", placeholder: "What’s this about?", required: true, minLength: 4 },
    message: {
      label: "Message",
      placeholder: "Tell me about the role, product, or idea.",
      required: true,
      minLength: 12,
    },
  },
}

export const footerContent = {
  tagline: "Designed and built with care — React, Tailwind, and a lot of motion.",
  copyright: "All rights reserved.",
}

export const socialLinks = [
  { id: "github", label: "GitHub", hrefKey: "github" },
  { id: "linkedin", label: "LinkedIn", hrefKey: "linkedin" },
  { id: "twitter", label: "Twitter", hrefKey: "twitter" },
  { id: "email", label: "Email", hrefKey: "email" },
]
