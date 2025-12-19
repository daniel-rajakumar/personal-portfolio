"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TabKey } from "@/lib/types";
import { blogPosts, hasBlogPosts } from "@/lib/data";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";
import CommandPalette from "./CommandPalette";

import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Portfolio from "@/components/sections/Portfolio";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

const BASE_TABS: TabKey[] = ["about", "resume", "portfolio", "blog", "contact"];
const AVAILABLE_TABS: TabKey[] = hasBlogPosts
    ? BASE_TABS
    : BASE_TABS.filter((tab) => tab !== "blog");

export default function Home() {
    const sp = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const active = useMemo<TabKey>(() => {
        const t = sp.get("tab") as TabKey | null;
        return t && AVAILABLE_TABS.includes(t) ? t : "about";
    }, [sp]);

    function setTab(tab: TabKey) {
        if (!AVAILABLE_TABS.includes(tab)) {
            return;
        }
        const next = new URLSearchParams(sp.toString());
        next.set("tab", tab);
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }
    }

    return (
        <>
            <main>
                <Sidebar />

                <div className="main-content">
                    <Tabs active={active} onChange={setTab} />

                    <article className={`about${active === "about" ? " active" : ""}`} data-page="about">
                        <About />
                    </article>

                    <article className={`resume${active === "resume" ? " active" : ""}`} data-page="resume">
                        <Resume />
                    </article>

                    <article className={`portfolio${active === "portfolio" ? " active" : ""}`} data-page="portfolio">
                        <Portfolio />
                    </article>

                    {hasBlogPosts ? (
                        <article className={`blog${active === "blog" ? " active" : ""}`} data-page="blog">
                            <Blog />
                        </article>
                    ) : null}

                    <article className={`contact${active === "contact" ? " active" : ""}`} data-page="contact">
                        <Contact />
                    </article>
                </div>
            </main>

            <CommandPalette onNavigate={setTab} />
        </>
    );
}
