import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "vCard - Personal Portfolio",
    description: "Personal portfolio inspired by the vCard UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
