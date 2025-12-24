"use client";

import Image from "next/image";
import MarkdownIt from "markdown-it";
import { ChevronDown, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const categories = ["All", "Web development", "Web design", "Applications", "Other"] as const;
const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true });

export default function Portfolio() {
    const [cat, setCat] = useState<(typeof categories)[number]>("All");
    const [selectOpen, setSelectOpen] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);
    const [loadedShots, setLoadedShots] = useState<Record<string, boolean>>({});
    const [shotIndex, setShotIndex] = useState(0);
    const [zoomedShotIndex, setZoomedShotIndex] = useState<number | null>(null);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [caseStudyHtml, setCaseStudyHtml] = useState("");
    const [caseStudyStatus, setCaseStudyStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
    const zoomCloseTimerRef = useRef<number | null>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const touchDeltaRef = useRef(0);
    const swipeClickSuppressRef = useRef(false);
    const shots = useMemo(() => {
        if (!selected) return [];
        return selected.screenshots?.length ? selected.screenshots : [{ src: selected.image }];
    }, [selected]);
    const singleShot = shots.length <= 1;
    const activeShot = shots[shotIndex];
    const advanceShot = (direction: -1 | 1, syncZoom = false) => {
        if (shots.length <= 1) {
            return;
        }
        setShotIndex((prev) => {
            const next = (prev + direction + shots.length) % shots.length;
            if (syncZoom) {
                setZoomedShotIndex(next);
            }
            return next;
        });
    };

    const handleCategory = (next: (typeof categories)[number]) => {
        if (next !== cat) {
            trackEvent("portfolio_filter", { category: next });
        }
        setCat(next);
    };

    const openProject = (project: Project) => {
        trackEvent("project_modal_open", { project: project.title, category: project.category });
        setLoadedShots({});
        setShotIndex(0);
        setZoomedShotIndex(null);
        setZoomVisible(false);
        setSelected(project);
    };

    const closeProject = () => {
        if (selected) {
            trackEvent("project_modal_close", { project: selected.title });
        }
        setZoomedShotIndex(null);
        setZoomVisible(false);
        setSelected(null);
    };

    const closeZoom = useCallback(() => {
        if (zoomedShotIndex === null) {
            return;
        }
        setZoomVisible(false);
        if (zoomCloseTimerRef.current) {
            window.clearTimeout(zoomCloseTimerRef.current);
        }
        zoomCloseTimerRef.current = window.setTimeout(() => {
            setZoomedShotIndex(null);
            setZoomVisible(false);
        }, 560);
    }, [zoomedShotIndex]);

    const openZoom = useCallback((index: number) => {
        if (zoomCloseTimerRef.current) {
            window.clearTimeout(zoomCloseTimerRef.current);
        }
        setZoomedShotIndex(index);
        setZoomVisible(false);
        window.requestAnimationFrame(() => {
            setZoomVisible(true);
        });
    }, []);

    useEffect(() => {
        if (!selected) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (zoomedShotIndex !== null) {
                    closeZoom();
                    return;
                }
                closeProject();
            }
            if (event.key === "ArrowRight" && shots.length > 1) {
                if (zoomedShotIndex !== null) {
                    advanceShot(1, true);
                    return;
                }
                advanceShot(1);
            }
            if (event.key === "ArrowLeft" && shots.length > 1) {
                if (zoomedShotIndex !== null) {
                    advanceShot(-1, true);
                    return;
                }
                advanceShot(-1);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selected, shots.length, zoomedShotIndex, closeZoom]);

    useEffect(() => {
        const path = selected?.caseStudyPath;
        if (!path) {
            setCaseStudyHtml("");
            setCaseStudyStatus("idle");
            return;
        }
        let active = true;
        setCaseStudyStatus("loading");
        fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load case study");
                }
                return res.text();
            })
            .then((text) => {
                if (!active) return;
                setCaseStudyHtml(markdown.render(text));
                setCaseStudyStatus("ready");
            })
            .catch(() => {
                if (!active) return;
                setCaseStudyHtml("");
                setCaseStudyStatus("error");
            });
        return () => {
            active = false;
        };
    }, [selected?.caseStudyPath]);

    useEffect(() => {
        if (!shots.length) {
            return;
        }
        if (shotIndex >= shots.length) {
            setShotIndex(0);
        }
    }, [shots.length, shotIndex]);

    useEffect(() => {
        return () => {
            if (zoomCloseTimerRef.current) {
                window.clearTimeout(zoomCloseTimerRef.current);
            }
        };
    }, []);

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
                                        {p.status ? (
                                            <span
                                                className="project-badge"
                                                data-status={p.status
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}
                                            >
                                                {p.status}
                                            </span>
                                        ) : null}
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
                                <div
                                    className="project-modal__carousel"
                                    onTouchStart={(event) => {
                                        if (shots.length <= 1) {
                                            return;
                                        }
                                        const touch = event.touches[0];
                                        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
                                        touchDeltaRef.current = 0;
                                        swipeClickSuppressRef.current = false;
                                    }}
                                    onTouchMove={(event) => {
                                        if (!touchStartRef.current || shots.length <= 1) {
                                            return;
                                        }
                                        const touch = event.touches[0];
                                        const deltaX = touch.clientX - touchStartRef.current.x;
                                        const deltaY = touch.clientY - touchStartRef.current.y;
                                        touchDeltaRef.current = deltaX;
                                        if (Math.abs(deltaX) > 10) {
                                            swipeClickSuppressRef.current = true;
                                        }
                                        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
                                            event.preventDefault();
                                        }
                                    }}
                                    onTouchEnd={() => {
                                        if (shots.length <= 1) {
                                            touchStartRef.current = null;
                                            touchDeltaRef.current = 0;
                                            return;
                                        }
                                        const deltaX = touchDeltaRef.current;
                                        if (Math.abs(deltaX) > 40) {
                                            if (deltaX < 0) {
                                                setShotIndex((prev) => (prev + 1) % shots.length);
                                            } else {
                                                setShotIndex((prev) => (prev - 1 + shots.length) % shots.length);
                                            }
                                        }
                                        touchStartRef.current = null;
                                        touchDeltaRef.current = 0;
                                    }}
                                    onTouchCancel={() => {
                                        touchStartRef.current = null;
                                        touchDeltaRef.current = 0;
                                    }}
                                >
                                    <div
                                        className="project-modal__track"
                                        style={{ transform: `translateX(-${shotIndex * 100}%)` }}
                                    >
                                        {shots.map((shot, index) => {
                                            const shotKey = `${shot.src}-${index}`;
                                            const isLoaded = loadedShots[shotKey];
                                            return (
                                                <div className="project-modal__slide" key={shotKey}>
                                                    <div
                                                        className={`project-modal__shot${
                                                            isLoaded ? " is-loaded" : " is-loading"
                                                        }`}
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={() => {
                                                            if (swipeClickSuppressRef.current) {
                                                                swipeClickSuppressRef.current = false;
                                                                return;
                                                            }
                                                            openZoom(index);
                                                        }}
                                                        onKeyDown={(event) => {
                                                            if (event.key === "Enter" || event.key === " ") {
                                                                event.preventDefault();
                                                                openZoom(index);
                                                            }
                                                        }}
                                                    >
                                                        <Image
                                                            src={shot.src}
                                                            alt={`${selected.title} screenshot ${index + 1}`}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            className="project-modal__img"
                                                            onLoadingComplete={() =>
                                                                setLoadedShots((prev) => ({
                                                                    ...prev,
                                                                    [shotKey]: true,
                                                                }))
                                                            }
                                                            onError={() =>
                                                                setLoadedShots((prev) => ({
                                                                    ...prev,
                                                                    [shotKey]: true,
                                                                }))
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {!singleShot ? (
                                        <div className="project-modal__controls">
                                            <button
                                                type="button"
                                                className="project-modal__nav project-modal__nav--prev"
                                                onClick={() => advanceShot(-1)}
                                                aria-label="Previous screenshot"
                                            >
                                                <ChevronLeft aria-hidden="true" />
                                            </button>
                                            <button
                                                type="button"
                                                className="project-modal__nav project-modal__nav--next"
                                                onClick={() => advanceShot(1)}
                                                aria-label="Next screenshot"
                                            >
                                                <ChevronRight aria-hidden="true" />
                                            </button>
                                        </div>
                                    ) : null}
                                </div>

                                {activeShot?.caption ? (
                                    <p className="project-modal__caption">{activeShot.caption}</p>
                                ) : null}

                            {!singleShot ? (
                                <div className="project-modal__dots" role="tablist" aria-label="Screenshot slides">
                                    {shots.map((shot, index) => (
                                        <button
                                            key={`${shot.src}-${index}`}
                                                type="button"
                                                className={`project-modal__dot${
                                                    index === shotIndex ? " is-active" : ""
                                                }`}
                                                onClick={() => setShotIndex(index)}
                                                aria-label={`Go to screenshot ${index + 1}`}
                                                aria-current={index === shotIndex ? "true" : undefined}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </div>

                            {selected.caseStudyPath ? (
                                <section className="project-modal__case-study">
                                    <h4 className="h4">Case study</h4>
                                    {caseStudyStatus === "ready" ? (
                                        <div
                                            className="project-modal__case-content"
                                            dangerouslySetInnerHTML={{ __html: caseStudyHtml }}
                                        />
                                    ) : (
                                        <p className="project-modal__case-muted">
                                            {caseStudyStatus === "loading"
                                                ? "Loading case study..."
                                                : "Case study unavailable."}
                                        </p>
                                    )}
                                </section>
                            ) : null}

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
                    {zoomedShotIndex !== null && shots[zoomedShotIndex] ? (
                        <div
                            className={`project-modal__zoom-overlay${zoomVisible ? " is-open" : ""}`}
                            role="dialog"
                            aria-modal="true"
                            onClick={() => closeZoom()}
                        >
                            <div className="project-modal__zoom-backdrop" />
                            <div
                                className="project-modal__zoom"
                                onClick={() => closeZoom()}
                            >
                                <button
                                    type="button"
                                    className="project-modal__zoom-close"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        closeZoom();
                                    }}
                                    aria-label="Close enlarged screenshot"
                                >
                                    <X aria-hidden="true" />
                                </button>
                                <div className="project-modal__zoom-media">
                                    <Image
                                        src={shots[zoomedShotIndex].src}
                                        alt={`${selected.title} screenshot ${zoomedShotIndex + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 92vw, 80vw"
                                        className="project-modal__zoom-img"
                                    />
                                </div>
                                {shots[zoomedShotIndex].caption ? (
                                    <p className="project-modal__caption">
                                        {shots[zoomedShotIndex].caption}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
