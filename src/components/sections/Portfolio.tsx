"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/lib/data";

const cats = ["All", "Web development", "Web design", "Applications", "Other"] as const;

export default function Portfolio() {
    const [cat, setCat] = useState<(typeof cats)[number]>("All");

    const filtered = useMemo(() => {
        if (cat === "All") return projects;
        return projects.filter((p) => p.category === cat);
    }, [cat]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Portfolio</h2>
                <div className="flex flex-wrap gap-2">
                    {cats.map((c) => {
                        const active = c === cat;
                        return (
                            <button
                                key={c}
                                onClick={() => setCat(c)}
                                className={[
                                    "rounded-xl px-3 py-2 text-xs transition",
                                    active ? "bg-white/10 text-[rgb(var(--accent))]" : "bg-white/5 text-white/70 hover:bg-white/10",
                                ].join(" ")}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>

            <ul className="grid gap-4 md:grid-cols-2">
                {filtered.map((p) => (
                    <li key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        {p.image ? (
                            <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-black/20">
                                <Image src={p.image} alt={p.title} fill className="object-cover" />
                            </div>
                        ) : null}

                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-medium">{p.title}</p>
                                <p className="text-xs text-white/60">{p.category}</p>
                            </div>
                        </div>

                        <p className="mt-2 text-sm text-white/75">{p.description}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {p.tech.map((t) => (
                                <span key={t} className="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  {t}
                </span>
                            ))}
                        </div>

                        {p.links?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {p.links.map((l) => (
                                    <a
                                        key={l.href}
                                        href={l.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                                    >
                                        {l.label}
                                    </a>
                                ))}
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}
