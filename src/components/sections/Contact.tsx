import { profile, socials } from "@/lib/data";

export default function Contact() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact</h2>

            <div className="rounded-xl bg-white/5 p-4 text-sm text-white/80">
                <p>
                    Email:{" "}
                    <a className="text-[rgb(var(--accent))] hover:underline" href={`mailto:${profile.email}`}>
                        {profile.email}
                    </a>
                </p>
                <p className="mt-1">
                    Location: <span className="text-white/70">{profile.location}</span>
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                        {s.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
