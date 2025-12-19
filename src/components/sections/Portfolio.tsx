"use client";

import Image from "next/image";
import { ChevronDown, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const categories = ["All", "Web development", "Web design", "Applications", "Other"] as const;

export default function Portfolio() {
    const [cat, setCat] = useState<(typeof categories)[number]>("All");
    const [selectOpen, setSelectOpen] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);
    const shots = selected?.screenshots?.length ? selected.screenshots : selected ? [selected.image] : [];
    const singleShot = shots.length === 1;

    const handleCategory = (next: (typeof categories)[number]) => {
        if (next !== cat) {
            trackEvent("portfolio_filter", { category: next });
        }
        setCat(next);
    };

    const openProject = (project: Project) => {
        trackEvent("project_modal_open", { project: project.title, category: project.category });
        setSelected(project);
    };

    const closeProject = () => {
        if (selected) {
            trackEvent("project_modal_close", { project: selected.title });
        }
        setSelected(null);
    };

    useEffect(() => {
        if (!selected) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeProject();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selected]);

    return (
        <>
            <header>
                <h2 className="h2 article-title">Portfolio</h2>
            </header>

            <section className="projects">
                <ul className="filter-list">
                    {categories.map((c) => (
                        <li className="filter-item" key={c}>
                            <button
                                type="button"
                                data-filter-btn
                                className={c === cat ? "active" : ""}
                                onClick={() => handleCategory(c)}
                            >
                                {c}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="filter-select-box">
                    <button
                        type="button"
                        className={`filter-select${selectOpen ? " active" : ""}`}
                        data-select
                        onClick={() => setSelectOpen((v) => !v)}
                    >
                        <div className="select-value" data-selecct-value>
                            {cat}
                        </div>

                        <div className="select-icon">
                            <ChevronDown aria-hidden="true" />
                        </div>
                    </button>

                    <ul className="select-list">
                        {categories.map((c) => (
                            <li className="select-item" key={c}>
                                <button
                                    type="button"
                                    data-select-item
                                    onClick={() => {
                                        handleCategory(c);
                                        setSelectOpen(false);
                                    }}
                                >
                                    {c}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <ul className="project-list">
                    {projects.map((p) => {
                        const isActive = cat === "All" || p.category === cat;
                        return (
                            <li
                                className={`project-item${isActive ? " active" : ""}`}
                                key={p.title}
                                data-filter-item
                                data-category={p.category.toLowerCase()}
                            >
                                <button
                                    type="button"
                                    className="project-card"
                                    onClick={() => openProject(p)}
                                    aria-label={`Open project details for ${p.title}`}
                                >
                                    <figure className="project-img">
                                        <div className="project-item-icon-box">
                                            <Eye aria-hidden="true" />
                                        </div>
                                        <Image
                                            src={p.image}
                                            alt={p.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </figure>

                                    <h3 className="project-title">{p.title}</h3>
                                    <p className="project-category">{p.category}</p>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {selected ? (
                <div className="project-modal-overlay" role="dialog" aria-modal="true">
                    <div className="project-modal-backdrop" onClick={closeProject} />
                    <div className="project-modal">
                        <header className="project-modal__header">
                            <div>
                                <h3 className="h3">{selected.title}</h3>
                                <p className="project-modal__meta">{selected.category}</p>
                            </div>
                            <button
                                type="button"
                                className="project-modal__close"
                                onClick={closeProject}
                                aria-label="Close project details"
                            >
                                <X aria-hidden="true" />
                            </button>
                        </header>

                        <div className="project-modal__body">
                            <p className="project-modal__description">{selected.description}</p>

                            <div className={`project-modal__gallery${singleShot ? " is-single" : ""}`}>
                                {shots.map((src, index) => (
                                    <div className="project-modal__shot" key={`${src}-${index}`}>
                                        <Image
                                            src={src}
                                            alt={`${selected.title} screenshot ${index + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="project-modal__img"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="project-modal__meta-row">
                                <div>
                                    <h4 className="h4">Tech stack</h4>
                                    <ul className="project-modal__tech">
                                        {selected.tech.map((t) => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="h4">Links</h4>
                                    <div className="project-modal__links">
                                        {selected.links?.length ? (
                                            selected.links.map((l) => (
                                                <a
                                                    key={l.href}
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={() =>
                                                        trackEvent("project_link_click", {
                                                            project: selected.title,
                                                            label: l.label,
                                                            href: l.href,
                                                        })
                                                    }
                                                >
                                                    {l.label}
                                                </a>
                                            ))
                                        ) : (
                                            <span className="project-modal__muted">Links coming soon</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
