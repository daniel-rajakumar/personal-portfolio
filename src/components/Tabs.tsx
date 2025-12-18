"use client";

import type { TabKey } from "@/lib/types";

const labels: Record<TabKey, string> = {
    about: "About",
    resume: "Resume",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact",
};

export default function Tabs({
    active,
    onChange,
}: {
    active: TabKey;
    onChange: (t: TabKey) => void;
}) {
    const items: TabKey[] = ["about", "resume", "portfolio", "blog", "contact"];

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {items.map((t) => {
                    const isActive = t === active;
                    return (
                        <li className="navbar-item" key={t}>
                            <button
                                type="button"
                                data-nav-link
                                onClick={() => onChange(t)}
                                className={`navbar-link${isActive ? " active" : ""}`}
                            >
                                {labels[t]}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
