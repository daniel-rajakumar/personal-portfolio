"use client";

import Image from "next/image";
import { ChevronDown, Eye } from "lucide-react";
import { useState } from "react";
import { projects } from "@/lib/data";

const categories = ["All", "Web development", "Web design", "Applications", "Other"] as const;

export default function Portfolio() {
    const [cat, setCat] = useState<(typeof categories)[number]>("All");
    const [selectOpen, setSelectOpen] = useState(false);

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
                                onClick={() => setCat(c)}
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
                                        setCat(c);
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
                        const href = p.links?.[0]?.href ?? "#";
                        const isExternal = href !== "#";
                        return (
                            <li
                                className={`project-item${isActive ? " active" : ""}`}
                                key={p.title}
                                data-filter-item
                                data-category={p.category.toLowerCase()}
                            >
                                <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
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
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </>
    );
}
