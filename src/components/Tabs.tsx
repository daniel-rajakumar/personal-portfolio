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
        <nav className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <ul className="flex flex-wrap gap-2">
                {items.map((t) => {
                    const isActive = t === active;
                    return (
                        <li key={t}>
                            <button
                                onClick={() => onChange(t)}
                                className={[
                                    "rounded-xl px-4 py-2 text-sm transition",
                                    isActive
                                        ? "bg-white/10 text-[rgb(var(--accent))]"
                                        : "text-white/70 hover:bg-white/5 hover:text-white",
                                ].join(" ")}
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
