"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { TabKey } from "@/lib/types";
import { hasBlogPosts } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

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
    const visibleItems = hasBlogPosts ? items : items.filter((item) => item !== "blog");
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;
        let lastCompact = false;
        const threshold = 8;
        const topThreshold = 10;

        const update = () => {
            const y = window.scrollY;
            const delta = y - lastY;

            if (Math.abs(delta) < threshold) {
                ticking = false;
                return;
            }

            if (y <= topThreshold) {
                if (lastCompact) {
                    lastCompact = false;
                    setIsCompact(false);
                }
                lastY = y;
                ticking = false;
                return;
            }

            const nextCompact = delta > 0;
            if (nextCompact !== lastCompact) {
                lastCompact = nextCompact;
                setIsCompact(nextCompact);
            }

            lastY = y;
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`navbar${isCompact ? " navbar--compact" : ""}`}>
            <ul className="navbar-list">
                <li className="navbar-item navbar-item--quick">
                    <button
                        type="button"
                        className="navbar-link navbar-link--icon"
                        onClick={() => {
                            trackEvent("quick_actions_click");
                            window.dispatchEvent(new Event("open-command-palette"));
                        }}
                        aria-label="Quick actions"
                    >
                        <Search aria-hidden="true" />
                    </button>
                </li>
                {visibleItems.map((t) => {
                    const isActive = t === active;
                    return (
                        <li className={`navbar-item${isActive ? " is-active" : ""}`} key={t}>
                            <button
                                type="button"
                                data-nav-link
                                onClick={() => {
                                    trackEvent("tab_nav_click", { tab: t });
                                    onChange(t);
                                }}
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
