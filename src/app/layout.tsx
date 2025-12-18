import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Personal portfolio built with Next.js + TypeScript + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen">{children}</body>
        </html>
    );
}
