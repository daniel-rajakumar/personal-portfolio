"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, MapPin, Phone, ChevronDown } from "lucide-react";
import { profile, socials } from "@/lib/data";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <aside className="rounded-2xl border border-white/10 bg-[rgb(var(--card))] p-5 shadow-[0_20px_70px_rgba(0,0,0,.35)]">
            <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/5 p-2">
                    <Image
                        src={profile.avatar}
                        alt={profile.name}
                        width={72}
                        height={72}
                        className="rounded-xl object-cover"
                        priority
                    />
                </div>

                <div className="min-w-0">
                    <h1 className="truncate text-lg font-semibold">{profile.name}</h1>
                    <p className="mt-1 inline-flex rounded-lg bg-white/5 px-3 py-1 text-xs text-white/80">
                        {profile.role}
                    </p>
                </div>

                <button
                    onClick={() => setOpen((v) => !v)}
                    className="ml-auto rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
                    aria-label="Toggle contacts"
                >
                    <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={18} />
                </button>
            </div>

            <div className={open ? "mt-5 space-y-4" : "mt-5 hidden"}>
                <div className="h-px w-full bg-white/10" />

                <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3 text-white/80">
                        <Mail size={16} className="text-[rgb(var(--accent))]" />
                        <a className="hover:underline" href={`mailto:${profile.email}`}>
                            {profile.email}
                        </a>
                    </li>
                    <li className="flex items-center gap-3 text-white/80">
                        <Phone size={16} className="text-[rgb(var(--accent))]" />
                        <a className="hover:underline" href={`tel:${profile.phone}`}>
                            {profile.phone}
                        </a>
                    </li>
                    <li className="flex items-center gap-3 text-white/80">
                        <MapPin size={16} className="text-[rgb(var(--accent))]" />
                        <span>{profile.location}</span>
                    </li>
                </ul>

                <div className="h-px w-full bg-white/10" />

                <div className="flex flex-wrap gap-2">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>
        </aside>
    );
}
