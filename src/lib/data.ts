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
    role: "Computer Science Student",
    location: "Mahwah, NJ",
    email: "hello@danielrajakumar.com",
    phone: "+1 (609) 388-1811",
    resumeUrl: "/resume.pdf",
    status: {
        label: "Seeking Spring Internship",
        available: true,
    },
    graduation: {
        label: "Expected May 2026",
        datetime: "2027-05",
    },
    avatar: "/assets/images/profile-picture-11.png",
    about: [
        "Computer Science student with 7 years of programming experience and a strong background in software development and technical leadership.",
        "Founded the Google Developer Student Club on campus and led workshops in Android and web development to build real-world skills."
    ]
};

export const socials: SocialLink[] = [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-rajakumar/" },
    { label: "Instagram", href: "https://instagram.com/" }
];

export const education: TimelineItem[] = [
    {
        title: "B.S. Computer Science",
        org: "Ramapo College of New Jersey, Mahwah, NJ",
        range: "Aug 2022 — Jun 2026",
        details:
            "Presidential Scholarship (full-tuition merit award). Relevant coursework: Software Design, Data Structures & Algorithms, Machine Learning, Web Application Development, Data Analysis & Visualization."
    }
];

export const experience: TimelineItem[] = [
    {
        title: "Lead",
        org: "Google Developer Student Club, Ramapo College",
        range: "Aug 2023 — May 2025",
        details:
            "Organized the first DevFest on campus for 50+ students, led Android workshops using Java, and directed a team of 8 to deliver hands-on technical events."
    },
    {
        title: "Founding President",
        org: "Computer Science Club",
        range: "Apr 2022 — Jun 2024",
        details:
            "Established the CS Club, ran 10+ workshops on React and portfolio building, and built the club website for 150+ students."
    }
];

export const skills: Skill[] = [
    { name: "Java", level: 85 },
    { name: "C++", level: 80 },
    { name: "JavaScript", level: 82 },
    { name: "TypeScript", level: 78 },
    { name: "Python", level: 84 },
    { name: "React.js", level: 82 },
    { name: "SQL", level: 76 },
    { name: "Google Cloud", level: 70 }
];

export const services: Service[] = [
    {
        title: "Software engineering",
        description: "Build scalable apps with clean architecture and solid engineering practices.",
        icon: "dev",
    },
    {
        title: "Mobile development",
        description: "Android and Flutter experience from real workshops and hands-on builds.",
        icon: "app",
    },
    {
        title: "Data & ML",
        description: "Data pipelines, ML models, and insights using Python and Pandas.",
        icon: "design",
    },
    {
        title: "Technical leadership",
        description: "Led student developer communities and large-scale campus workshops.",
        icon: "photo",
    },
];

export const testimonials: Testimonial[] = [
    // { name: "Daniel Lewis", avatar: "/assets/images/avatar-1.svg", date: "2021-06-14", text: "Daniel was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of the client.", },
    // { name: "Jessica Miller", avatar: "/assets/images/avatar-2.svg", date: "2021-05-28", text: "Daniel took a complex brief and turned it into a clean product experience. The process was collaborative and the outcome was better than expected.", },
    // { name: "Emily Evans", avatar: "/assets/images/avatar-3.svg", date: "2021-04-18", text: "The attention to detail was impressive, and the final site loads fast while looking sharp on every screen.", },
    // { name: "Henry William", avatar: "/assets/images/avatar-4.svg", date: "2021-03-09", text: "Reliable, organized, and thoughtful. Delivered on time and made the whole build feel smooth.", },
];

export const clients: Client[] = [
    // { name: "client-1", logo: "/assets/images/logo-1.svg" },
    // { name: "client-2", logo: "/assets/images/logo-2.svg" },
    // { name: "client-3", logo: "/assets/images/logo-3.svg" },
    // { name: "client-4", logo: "/assets/images/logo-4.svg" },
    // { name: "client-5", logo: "/assets/images/logo-5.svg" },
    // { name: "client-6", logo: "/assets/images/logo-6.svg" },
];

export const projects: Project[] = [
    {
        title: "Assembler & Emulator (VC407)",
        category: "Applications",
        description:
            "Built a VC407 assembler/emulator in C++ with a two-pass assembly process and modular design.",
        tech: ["C++", "Assembler", "Agile"],
        image: "/assets/images/projects/VC370Assem/one.png",
        screenshots: [
            {
                src: "/assets/images/projects/VC370Assem/one.png",
                caption: "Assembler output view",
            },
            {
                src: "/assets/images/projects/VC370Assem/two.png",
                caption: "Emulator run results",
            },
            {
                src: "/assets/images/projects/VC370Assem/three.png",
                caption: "Assembler output view",
            },
            {
                src: "/assets/images/projects/VC370Assem/four.png",
                caption: "Emulator run results",
            },
        ],
    },
    {
        title: "Social Media Engagement Analysis",
        category: "Other",
        description:
            "Analyzed 250+ Instagram posts with ML models, reaching up to 88% classification accuracy.",
        tech: ["Python", "Pandas", "Scikit-learn"],
        image: "/assets/images/project-2.svg"
    },
];

export const blogPosts: BlogPost[] = [
    // { title: "Design conferences in 2025", category: "Design", date: "2025-02-23", excerpt: "A quick rundown of the events I am tracking this year.", image: "/assets/images/blog-1.svg", },
    // { title: "Best fonts every designer uses", category: "Design", date: "2025-02-16", excerpt: "A short list of typefaces that work across web and print.", image: "/assets/images/blog-2.svg", },
    // { title: "Building with intent", category: "Product", date: "2025-01-30", excerpt: "How I keep projects tight, useful, and easy to ship.", image: "/assets/images/blog-3.svg", },
];

export const hasBlogPosts = blogPosts.length > 0;
