import { blogPosts } from "@/lib/data";

export default function Blog() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Blog</h2>
            <ul className="grid gap-3">
                {blogPosts.map((p) => (
                    <li key={p.title} className="rounded-xl bg-white/5 p-4">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="font-medium">{p.title}</p>
                            <p className="text-xs text-white/60">{p.date}</p>
                        </div>
                        <p className="mt-2 text-sm text-white/75">{p.excerpt}</p>
                    </li>
                ))}
            </ul>
            <p className="text-xs text-white/50">
                (Later we can upgrade this to MDX posts or a CMS — not needed for v1.)
            </p>
        </div>
    );
}
