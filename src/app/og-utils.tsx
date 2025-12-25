import { ImageResponse } from "next/og";
import { profile, services } from "@/lib/data";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const ACCENT = "#25c26a";
const TEXT_PRIMARY = "#f5f5f5";
const TEXT_MUTED = "#b0b0b0";
const TEXT_SOFT = "#8a8a8a";
const CARD_BG = "#151515";
const CARD_BORDER = "#2b2b2b";
const CHIP_BG = "#1f1f1f";
const CHIP_BORDER = "#343434";

const resolveBaseUrl = (override?: string) => {
    if (override) {
        return override.startsWith("http") ? override : `https://${override}`;
    }
    const explicit = process.env.NEXT_PUBLIC_SITE_URL;
    if (explicit) {
        return explicit.startsWith("http") ? explicit : `https://${explicit}`;
    }
    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) {
        return `https://${vercelUrl}`;
    }
    return "http://localhost:3000";
};

const getDomain = () => {
    const email = profile.email ?? "";
    if (email.includes("@")) {
        return email.split("@")[1];
    }
    return "portfolio";
};

export const createOgImage = async (baseUrl?: string) => {
    const initials = profile.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const avatarPath = profile.ogAvatar ?? profile.avatar;
    let avatarData: ArrayBuffer | null = null;
    try {
        const avatarUrl = new URL(avatarPath, resolveBaseUrl(baseUrl));
        const response = await fetch(avatarUrl);
        const contentType = response.headers.get("content-type") ?? "";
        if (response.ok && contentType.startsWith("image/")) {
            avatarData = await response.arrayBuffer();
        }
    } catch {
        avatarData = null;
    }

    const highlights = services.slice(0, 3).map((service) => service.title);
    const statusLabel = profile.status?.label;
    const domain = getDomain();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "64px",
                    backgroundColor: "#0b0b0c",
                    backgroundImage:
                        "radial-gradient(circle at top left, rgba(37,194,106,0.18), transparent 45%), radial-gradient(circle at bottom right, rgba(37,194,106,0.12), transparent 40%)",
                    fontFamily: "Poppins, Arial, sans-serif",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        padding: "56px 56px 48px 64px",
                        borderRadius: "36px",
                        backgroundColor: CARD_BG,
                        border: `1px solid ${CARD_BORDER}`,
                        boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                        color: TEXT_PRIMARY,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            left: "24px",
                            top: "24px",
                            bottom: "24px",
                            width: "6px",
                            borderRadius: "999px",
                            backgroundColor: ACCENT,
                            opacity: 0.9,
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "28px",
                        }}
                    >
                        <div
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "28px",
                                backgroundColor: "#1c1c1c",
                                border: `2px solid ${ACCENT}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                                overflow: "hidden",
                            }}
                        >
                            {avatarData ? (
                                <img
                                    src={avatarData}
                                    width={120}
                                    height={120}
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <span
                                    style={{
                                        fontSize: "40px",
                                        fontWeight: 700,
                                        color: ACCENT,
                                    }}
                                >
                                    {initials}
                                </span>
                            )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                            <div
                                style={{
                                    fontSize: "18px",
                                    letterSpacing: "0.32em",
                                    textTransform: "uppercase",
                                    color: ACCENT,
                                }}
                            >
                                Portfolio
                            </div>
                            <div style={{ fontSize: "62px", fontWeight: 700, lineHeight: 1.05 }}>
                                {profile.name}
                            </div>
                            <div style={{ fontSize: "28px", color: TEXT_MUTED }}>{profile.role}</div>
                            <div style={{ fontSize: "20px", color: TEXT_SOFT }}>{profile.location}</div>
                        </div>

                        {statusLabel ? (
                            <div
                                style={{
                                    padding: "10px 16px",
                                    borderRadius: "999px",
                                    border: `1px solid ${ACCENT}`,
                                    color: ACCENT,
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {statusLabel}
                            </div>
                        ) : null}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                        {highlights.map((title) => (
                            <div
                                key={title}
                                style={{
                                    padding: "10px 16px",
                                    borderRadius: "999px",
                                    border: `1px solid ${CHIP_BORDER}`,
                                    backgroundColor: CHIP_BG,
                                    color: TEXT_MUTED,
                                    fontSize: "18px",
                                }}
                            >
                                {title}
                            </div>
                        ))}
                    </div>

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
                                backgroundColor: ACCENT,
                                borderRadius: "999px",
                            }}
                        />
                        <div style={{ fontSize: "22px", color: ACCENT }}>{domain}</div>
                    </div>
                </div>
            </div>
        ),
        {
            width: ogSize.width,
            height: ogSize.height,
        }
    );
};
