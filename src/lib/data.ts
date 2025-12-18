import type { Project, Skill, SocialLink, TimelineItem } from "./types";

export const profile = {
    name: "Daniel Rajakumar",
    role: "CS Student • Builder",
    location: "New Jersey, USA",
    email: "daniel@example.com",
    phone: "+1 (000) 000-0000",
    avatar: "/avatar.png",
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

export const projects: Project[] = [
    {
        title: "RockyGPT",
        category: "Web development",
        description: "Campus assistant concept built with Next.js + TypeScript.",
        tech: ["Next.js", "TypeScript", "AI"],
        image: "/projects/rockygpt.png",
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
        image: "/projects/canoga.png"
    }
];

export const blogPosts = [
    {
        title: "How I structure projects in Next.js",
        date: "2025-12-18",
        excerpt: "Folder structure, data-driven UI, and keeping components clean."
    }
];
