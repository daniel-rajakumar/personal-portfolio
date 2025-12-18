"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { TabKey } from "@/lib/types";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";

import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Portfolio from "@/components/sections/Portfolio";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

const TABS: TabKey[] = ["about", "resume", "portfolio", "blog", "contact"];

export default function Home() {
    const sp = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const active = useMemo<TabKey>(() => {
        const t = sp.get("tab") as TabKey | null;
        return t && TABS.includes(t) ? t : "about";
    }, [sp]);

    function setTab(tab: TabKey) {
        const next = new URLSearchParams(sp.toString());
        next.set("tab", tab);
        router.replace(`${pathname}?${next.toString()}`);
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
            <div className="grid gap-6 md:grid-cols-[320px_1fr]">
                <Sidebar />

                <section className="space-y-4">
                    <Tabs active={active} onChange={setTab} />

                    <div className="rounded-2xl border border-white/10 bg-[rgb(var(--card))] p-5 shadow-[0_20px_70px_rgba(0,0,0,.35)]">
                        {active === "about" && <About />}
                        {active === "resume" && <Resume />}
                        {active === "portfolio" && <Portfolio />}
                        {active === "blog" && <Blog />}
                        {active === "contact" && <Contact />}
                    </div>
                </section>
            </div>
        </main>
    );
}
