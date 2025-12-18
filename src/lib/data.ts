import type {
    BlogPost,
    Client,
    Project,
    Service,
    Skill,
    SocialLink,
    Testimonial,
    TimelineItem,
} from "./types";

export const profile = {
    name: "Daniel Rajakumar",
    role: "CS Student • Builder",
    location: "New Jersey, USA",
    email: "daniel@example.com",
    phone: "+1 (000) 000-0000",
    resumeUrl: "/resume.pdf",
    status: {
        label: "Open to internships / Freelance",
        available: true,
    },
    birthday: {
        label: "June 23, 1999",
        datetime: "1999-06-23",
    },
    avatar: "/assets/images/my-avatar.svg",
    about: [
        "I build modern web apps and AI-powered projects. I like clean UI, fast performance, and practical features.",
        "Currently focused on Next.js + TypeScript, and shipping projects that are actually useful."
    ]
};

export const socials: SocialLink[] = [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Instagram", href: "https://instagram.com/" }
];

export const education: TimelineItem[] = [
    {
        title: "B.S. Computer Science",
        org: "Your College",
        range: "2023 — 2027",
        details: "Focus: Web Development, AI/ML, Systems."
    }
];

export const experience: TimelineItem[] = [
    {
        title: "Student Leader / Builder",
        org: "Clubs & Projects",
        range: "2024 — Present",
        details: "Built event systems, web apps, and led campus projects."
    }
];

export const skills: Skill[] = [
    { name: "TypeScript", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "Tailwind", level: 85 },
    { name: "React", level: 80 }
];

export const services: Service[] = [
    {
        title: "Web design",
        description: "Modern, thoughtful layouts built with usability and polish in mind.",
        icon: "design",
    },
    {
        title: "Web development",
        description: "High-quality, performant sites and apps shipped with care.",
        icon: "dev",
    },
    {
        title: "Mobile apps",
        description: "Cross-platform experiences that feel fast and native.",
        icon: "app",
    },
    {
        title: "Photography",
        description: "Clean visual storytelling with an editorial eye.",
        icon: "photo",
    },
];

export const testimonials: Testimonial[] = [
    {
        name: "Daniel Lewis",
        avatar: "/assets/images/avatar-1.svg",
        date: "2021-06-14",
        text: "Daniel was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of the client.",
    },
    {
        name: "Jessica Miller",
        avatar: "/assets/images/avatar-2.svg",
        date: "2021-05-28",
        text: "Daniel took a complex brief and turned it into a clean product experience. The process was collaborative and the outcome was better than expected.",
    },
    {
        name: "Emily Evans",
        avatar: "/assets/images/avatar-3.svg",
        date: "2021-04-18",
        text: "The attention to detail was impressive, and the final site loads fast while looking sharp on every screen.",
    },
    {
        name: "Henry William",
        avatar: "/assets/images/avatar-4.svg",
        date: "2021-03-09",
        text: "Reliable, organized, and thoughtful. Delivered on time and made the whole build feel smooth.",
    },
];

export const clients: Client[] = [
    { name: "client-1", logo: "/assets/images/logo-1.svg" },
    { name: "client-2", logo: "/assets/images/logo-2.svg" },
    { name: "client-3", logo: "/assets/images/logo-3.svg" },
    { name: "client-4", logo: "/assets/images/logo-4.svg" },
    { name: "client-5", logo: "/assets/images/logo-5.svg" },
    { name: "client-6", logo: "/assets/images/logo-6.svg" },
];

export const projects: Project[] = [
    {
        title: "RockyGPT",
        category: "Web development",
        description: "Campus assistant concept built with Next.js + TypeScript.",
        tech: ["Next.js", "TypeScript", "AI"],
        image: "/assets/images/project-1.svg",
        links: [
            { label: "GitHub", href: "https://github.com/" },
            { label: "Live", href: "https://example.com" }
        ]
    },
    {
        title: "Canoga (JS)",
        category: "Applications",
        description: "Dice + strategy game implementation for web.",
        tech: ["JavaScript", "Game Logic"],
        image: "/assets/images/project-2.svg"
    },
    {
        title: "Fundo",
        category: "Web design",
        description: "Landing page exploration with clean typography and spacing.",
        tech: ["Design", "UI"],
        image: "/assets/images/project-3.svg"
    },
    {
        title: "MetaSpark",
        category: "Web design",
        description: "Brand-forward layout with playful visuals.",
        tech: ["Branding", "Web"],
        image: "/assets/images/project-4.svg"
    },
    {
        title: "Summary",
        category: "Web development",
        description: "A minimal productivity site for teams.",
        tech: ["Next.js", "UI"],
        image: "/assets/images/project-5.svg"
    },
    {
        title: "Task Manager",
        category: "Applications",
        description: "Simple task app concept with boards and filters.",
        tech: ["App", "UX"],
        image: "/assets/images/project-6.svg"
    },
];

export const blogPosts: BlogPost[] = [
    {
        title: "Design conferences in 2025",
        category: "Design",
        date: "2025-02-23",
        excerpt: "A quick rundown of the events I am tracking this year.",
        image: "/assets/images/blog-1.svg",
    },
    {
        title: "Best fonts every designer uses",
        category: "Design",
        date: "2025-02-16",
        excerpt: "A short list of typefaces that work across web and print.",
        image: "/assets/images/blog-2.svg",
    },
    {
        title: "Building with intent",
        category: "Product",
        date: "2025-01-30",
        excerpt: "How I keep projects tight, useful, and easy to ship.",
        image: "/assets/images/blog-3.svg",
    },
];
