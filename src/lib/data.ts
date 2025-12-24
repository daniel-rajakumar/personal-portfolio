import type {
  BlogPost,
  Client,
  Project,
  Service,
  Skill,
  SocialLink,
  Testimonial,
  TimelineItem,
} from './types'

export const profile = {
  name: 'Daniel Rajakumar',
  role: 'Computer Science Student',
  location: 'Mahwah, NJ',
  email: 'hello@danielrajakumar.com',
  phone: '+1 (609) 388-1811',
  resumeUrl: '/resume.pdf',
  status: {
    label: 'Seeking Spring Internship',
    available: true,
  },
  graduation: {
    label: 'Expected May 2026',
    datetime: '2026-05',
  },
  avatar: '/assets/images/profile-picture-11.png',
  about: [
    'Computer Science student with 7 years of programming experience and a strong background in software development and technical leadership.',
    'Founded the Google Developer Student Club on campus and led workshops in Android and web development to build real-world skills.',
  ],
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-rajakumar/' },
  { label: 'Instagram', href: 'https://instagram.com/' },
]

export const education: TimelineItem[] = [
  {
    title: 'B.S. Computer Science',
    org: 'Ramapo College of New Jersey, Mahwah, NJ',
    range: 'Aug 2022 — Jun 2026',
    details: [
      'Presidential Scholarship (full-tuition merit award).',
      'Relevant coursework: Software Design, Data Structures & Algorithms, Machine Learning, Web Application Development, Data Analysis & Visualization.',
    ],
  },
]

export const experience: TimelineItem[] = [
  {
    title: 'Lead',
    org: 'Google Developer Student Club, Ramapo College',
    range: 'Aug 2023 — May 2025',
    details: [
      'Organized first DevFest Event on campus, bringing together over 50 students for keynote and hands-on technical workshops.',
      'Led a hands-on Android development workshop leveraging Java, teaching students how to develop and deploy apps using Android Studio',
      'Directed a team of 8 to deliver diverse workshops and coding events, fostering a vibrant developer community',
    ],
  },
  {
    title: 'Founding President',
    org: 'Computer Science Club',
    range: 'Apr 2022 — Jun 2024',
    details: [
      'Initiated and established the Computer Science Club, creating a student-led hub for campus tech community.',
      'Organized and oversaw over 10 workshops on React.js, portfolio building, and collaborative software development practices.',
      "Built and maintained club's website using HTML, CSS, and JS to showcase events and provide resources to over 150 students.",
    ],
  },
]

export const skills: Skill[] = [
  { name: 'Java', logo: '/assets/images/skills/java.svg' },
  { name: 'C++', logo: '/assets/images/skills/cpp.svg' },
  { name: 'JavaScript', logo: '/assets/images/skills/javascript.svg' },
  { name: 'TypeScript', logo: '/assets/images/skills/typescript.svg' },
  { name: 'Python', logo: '/assets/images/skills/python.svg' },
  { name: 'React.js', logo: '/assets/images/skills/react.svg' },
  { name: 'SQL', logo: '/assets/images/skills/sql.svg' },
  { name: 'Google Cloud', logo: '/assets/images/skills/google-cloud.svg' },
]

export const services: Service[] = [
  {
    title: 'Software engineering',
    description:
      'Build scalable apps with clean architecture and solid engineering practices.',
    icon: 'dev',
  },
  {
    title: 'Mobile development',
    description:
      'Android and Flutter experience from real workshops and hands-on builds.',
    icon: 'app',
  },
  {
    title: 'Data & ML',
    description:
      'Data pipelines, ML models, and insights using Python and Pandas.',
    icon: 'design',
  },
  {
    title: 'Technical leadership',
    description:
      'Led student developer communities and large-scale campus workshops.',
    icon: 'photo',
  },
]

export const testimonials: Testimonial[] = [
  // { name: "Daniel Lewis", avatar: "/assets/images/avatar-1.svg", date: "2021-06-14", text: "Daniel was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of the client.", },
  // { name: "Jessica Miller", avatar: "/assets/images/avatar-2.svg", date: "2021-05-28", text: "Daniel took a complex brief and turned it into a clean product experience. The process was collaborative and the outcome was better than expected.", },
  // { name: "Emily Evans", avatar: "/assets/images/avatar-3.svg", date: "2021-04-18", text: "The attention to detail was impressive, and the final site loads fast while looking sharp on every screen.", },
  // { name: "Henry William", avatar: "/assets/images/avatar-4.svg", date: "2021-03-09", text: "Reliable, organized, and thoughtful. Delivered on time and made the whole build feel smooth.", },
]

export const clients: Client[] = [
  // { name: "client-1", logo: "/assets/images/logo-1.svg" },
  // { name: "client-2", logo: "/assets/images/logo-2.svg" },
  // { name: "client-3", logo: "/assets/images/logo-3.svg" },
  // { name: "client-4", logo: "/assets/images/logo-4.svg" },
  // { name: "client-5", logo: "/assets/images/logo-5.svg" },
  // { name: "client-6", logo: "/assets/images/logo-6.svg" },
]

export const projects: Project[] = [
  {
    title: 'Assembler & Emulator (VC407)',
    category: 'Applications',
    description:
      'Built a VC407 assembler/emulator in C++ with a two-pass assembly process and modular design.',
    tech: ['C++', 'Assembler', 'Agile'],
    image: '/assets/images/projects/VC370Assem/thumbnail.png',
    // image: "/assets/images/projects/VC370Assem/one.png",
    screenshots: [
      {
        src: '/assets/images/projects/VC370Assem/one.png',
        caption: 'Assembler output view',
      },
      {
        src: '/assets/images/projects/VC370Assem/two.png',
        caption: 'Emulator run results',
      },
      {
        src: '/assets/images/projects/VC370Assem/three.png',
        caption: 'Assembler output view',
      },
      {
        src: '/assets/images/projects/VC370Assem/four.png',
        caption: 'Emulator run results',
      },
    ],
  },
  {
    title: 'Social Media Engagement Analysis',
    category: 'Other',
    description:
      'Analyzed 250+ Instagram posts with ML models, reaching up to 88% classification accuracy.',
    tech: ['Python', 'Pandas', 'Scikit-learn'],
    image:
      '/assets/images/projects/SocialMediaEngagementAnalysis/thumbnail.png',

    screenshots: [
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/one.png',
        caption: 'Project screenshot',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/two.png',
        caption: 'Data visualization example',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/three.png',
        caption: 'Model accuracy results',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/four.png',
        caption: 'Feature importance analysis',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/five.png',
        caption: 'Engagement prediction results',
      },
    ],
  },
  {
    title: 'Canoga Game',
    category: 'Applications',
    description:
      'Developed a 2D Canoga game in Java with multiplayer support and AI opponent.',
    tech: ['Java', 'OOP', 'Game Development'],
    image: '/assets/images/projects/CanogaGame/thumbnail.png',
    screenshots: [
      {
        src: '/assets/images/projects/CanogaGame/one.png',
        caption: 'Game board view',
      },
      {
        src: '/assets/images/projects/CanogaGame/two.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/three.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/four.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/five.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/six.png',
        caption: 'Multiplayer mode',
      },
    ],
  },
  {
    title: 'Ramapo International Street Food Festival 2025 Website',
    category: 'Web development',
    description:
      'Created a responsive website for the Ramapo International Street Food Festival 2025 using React.js and hosted on Netlify.',
    tech: ['React.js', 'CSS', 'Netlify'],
    image: '/assets/images/projects/ISFF25/thumbnail.png',
    screenshots: [
      {
        src: '/assets/images/projects/ISFF25/one.png',
        caption: 'Homepage view',
      },
      {
        src: '/assets/images/projects/ISFF25/two.png',
        caption: 'Event schedule section',
      },
      {
        src: '/assets/images/projects/ISFF25/three.png',
        caption: 'Vendor information page',
      },
      {
        src: '/assets/images/projects/ISFF25/four.png',
        caption: 'Contact form view',
      },
      {
        src: '/assets/images/projects/ISFF25/five.png',
        caption: 'Responsive design on mobile',
      },
    ],
  },
  {
    title: 'RockyGPT: Ramapo College Chatbot',
    category: 'Web development',
    description:
      "Developed RockyGPT, a chatbot for Ramapo College using OpenAI's GPT-3.5 API to assist students with campus-related queries.",
    tech: ['JavaScript', 'OpenAI API', 'HTML/CSS'],
    image: '/assets/images/projects/RockyGPT/thumbnail.png',
    status: 'In Progress',
    screenshots: [
    //   {
    //       src: "/assets/images/projects/RockyGPT/one.png",
    //       caption: "Chat interface",
    //   },
      // {
      //     src: "/assets/images/projects/RockyGPT/two.png",
      //     caption: "Sample conversation",
      // },
      // {
      //     src: "/assets/images/projects/RockyGPT/three.png",
      //     caption: "Mobile view",
      // }
    ],
  },
]

export const blogPosts: BlogPost[] = [
  // { title: "Design conferences in 2025", category: "Design", date: "2025-02-23", excerpt: "A quick rundown of the events I am tracking this year.", image: "/assets/images/blog-1.svg", },
  // { title: "Best fonts every designer uses", category: "Design", date: "2025-02-16", excerpt: "A short list of typefaces that work across web and print.", image: "/assets/images/blog-2.svg", },
  // { title: "Building with intent", category: "Product", date: "2025-01-30", excerpt: "How I keep projects tight, useful, and easy to ship.", image: "/assets/images/blog-3.svg", },
]

export const hasBlogPosts = blogPosts.length > 0
