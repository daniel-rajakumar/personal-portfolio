export type TabKey = "about" | "resume" | "portfolio" | "blog" | "contact";

export type SocialLink = {
    label: string;
    href: string;
};

export type Project = {
    title: string;
    category: "Web development" | "Web design" | "Applications" | "Other";
    description: string;
    tech: string[];
    image?: string; // /projects/xxx.png
    links?: { label: string; href: string }[];
};

export type TimelineItem = {
    title: string;
    org: string;
    range: string;
    details: string;
};

export type Skill = { name: string; level: number }; // 0-100
