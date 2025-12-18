import { profile } from "@/lib/data";

export default function About() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">About</h2>
            <div className="space-y-3 text-sm text-white/80 leading-relaxed">
                {profile.about.map((p) => (
                    <p key={p}>{p}</p>
                ))}
            </div>
        </div>
    );
}
