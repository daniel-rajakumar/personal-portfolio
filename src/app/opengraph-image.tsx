import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    const initials = profile.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    background: "#111111",
                    color: "#f5f5f5",
                    padding: "72px",
                    fontFamily: "Poppins, Arial, sans-serif",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: "32px",
                        borderRadius: "32px",
                        border: "1px solid #2b2b2b",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: "96px",
                            height: "96px",
                            borderRadius: "24px",
                            background: "#1a1a1a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #22c55e",
                            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "40px",
                                fontWeight: 600,
                                color: "#22c55e",
                            }}
                        >
                            {initials}
                        </span>
                    </div>
                    <div style={{ fontSize: "64px", fontWeight: 600, lineHeight: 1.1 }}>
                        {profile.name}
                    </div>
                    <div style={{ fontSize: "30px", color: "#b3b3b3" }}>{profile.role}</div>
                    <div
                        style={{
                            marginTop: "auto",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                width: "140px",
                                height: "6px",
                                background: "#22c55e",
                                borderRadius: "999px",
                            }}
                        />
                        <div style={{ fontSize: "24px", color: "#22c55e" }}>Portfolio</div>
                    </div>
                </div>
            </div>
        ),
        {
            width: size.width,
            height: size.height,
        }
    );
}
