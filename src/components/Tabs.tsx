"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
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
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        let lastY = window.scrollY;
        let lastTime = performance.now();
        let ticking = false;
        let lastDuration = 0;
        const minDuration = 220;
        const maxDuration = 560;
        const maxVelocity = 2.5;
        const compactStart = 20;
        const compactRange = 220;

        const setNavSpeed = (duration: number) => {
            if (!navRef.current || Math.abs(duration - lastDuration) < 12) {
                return;
            }
            lastDuration = duration;
            navRef.current.style.setProperty("--nav-speed", `${duration}ms`);
            navRef.current.style.setProperty("--nav-speed-fast", `${Math.round(duration * 0.7)}ms`);
        };

        const clamp = (value: number, min: number, max: number) =>
            Math.min(Math.max(value, min), max);

        const update = () => {
            const y = window.scrollY;
            const delta = y - lastY;
            const now = performance.now();
            const dt = Math.max(now - lastTime, 16);

            const velocity = Math.min(Math.abs(delta) / dt, maxVelocity);
            const duration =
                maxDuration - (maxDuration - minDuration) * (velocity / maxVelocity);
            setNavSpeed(Math.round(duration));

            if (navRef.current) {
                const compact = clamp((y - compactStart) / compactRange, 0, 1);
                navRef.current.style.setProperty("--nav-compact", compact.toFixed(3));
            }

            lastY = y;
            lastTime = now;
            ticking = false;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav ref={navRef} className="navbar">
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
