import { education, experience, skills } from "@/lib/data";

function Timeline({ title, items }: { title: string; items: typeof education }) {
    return (
        <section className="space-y-3">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <ol className="space-y-3 border-l border-white/10 pl-4">
                {items.map((it) => (
                    <li key={it.title + it.org} className="relative">
                        <span className="absolute -left-[9px] top-2 h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
                        <div className="rounded-xl bg-white/5 p-3">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <p className="font-medium">{it.title}</p>
                                <p className="text-xs text-white/60">{it.range}</p>
                            </div>
                            <p className="text-xs text-white/70">{it.org}</p>
                            <p className="mt-2 text-sm text-white/75">{it.details}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default function Resume() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Resume</h2>

            <Timeline title="Education" items={education} />
            <Timeline title="Experience" items={experience} />

            <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">Skills</h3>
                <ul className="space-y-3">
                    {skills.map((s) => (
                        <li key={s.name} className="rounded-xl bg-white/5 p-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/85">{s.name}</span>
                                <span className="text-white/60">{s.level}%</span>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                                <div
                                    className="h-2 rounded-full bg-[rgb(var(--accent))]"
                                    style={{ width: `${Math.max(0, Math.min(100, s.level))}%` }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
