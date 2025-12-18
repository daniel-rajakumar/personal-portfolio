"use client";

import { BookOpen } from "lucide-react";
import { education, experience, skills } from "@/lib/data";

function Timeline({ title, items }: { title: string; items: typeof education }) {
    return (
        <section className="timeline">
            <div className="title-wrapper">
                <div className="icon-box">
                    <BookOpen aria-hidden="true" />
                </div>
                <h3 className="h3">{title}</h3>
            </div>

            <ol className="timeline-list">
                {items.map((it) => (
                    <li className="timeline-item" key={it.title + it.org}>
                        <h4 className="h4 timeline-item-title">{it.title}</h4>
                        <span>{it.range}</span>
                        <p className="timeline-text">{`${it.org} - ${it.details}`}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default function Resume() {
    return (
        <>
            <header>
                <h2 className="h2 article-title">Resume</h2>
            </header>

            <Timeline title="Education" items={education} />
            <Timeline title="Experience" items={experience} />

            <section className="skill">
                <h3 className="h3 skills-title">My skills</h3>
                <ul className="skills-list content-card">
                    {skills.map((s) => (
                        <li key={s.name} className="skills-item">
                            <div className="title-wrapper">
                                <h5 className="h5">{s.name}</h5>
                                <data value={s.level}>{s.level}%</data>
                            </div>
                            <div className="skill-progress-bg">
                                <div
                                    className="skill-progress-fill"
                                    style={{ width: `${Math.max(0, Math.min(100, s.level))}%` }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
