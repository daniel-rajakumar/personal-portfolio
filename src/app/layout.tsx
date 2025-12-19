import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { profile } from "@/lib/data";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `${profile.name} | Portfolio`;
const description = "Personal portfolio with projects, resume, and contact details.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
        title,
        description,
        type: "website",
        url: siteUrl,
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
