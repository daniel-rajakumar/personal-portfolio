import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";

type ContactPayload = {
    name: string;
    email: string;
    message: string;
    company?: string;
};

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export async function POST(request: Request) {
    try {
        const payload = (await request.json()) as ContactPayload;
        const name = payload.name?.trim();
        const email = payload.email?.trim();
        const message = payload.message?.trim();
        const company = payload.company?.trim();

        if (company) {
            return NextResponse.json({ ok: true });
        }

        if (!name || !email || !message) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        if (message.length > 5000) {
            return NextResponse.json({ message: "Message is too long." }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL;
        const from = process.env.CONTACT_FROM_EMAIL;

        if (!apiKey || !to || !from) {
            return NextResponse.json(
                { message: "Contact form is not configured yet." },
                { status: 500 }
            );
        }

        const subject = `Portfolio contact from ${name}`;
        const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
        const html = `<p><strong>Name:</strong> ${safeName}</p>
<p><strong>Email:</strong> ${safeEmail}</p>
<p><strong>Message:</strong></p>
<p>${safeMessage}</p>`;

        const response = await fetch(RESEND_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to: [to],
                subject,
                text,
                html,
                reply_to: email,
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => null);
            return NextResponse.json(
                { message: error?.message || "Failed to send message." },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ message: "Invalid request." }, { status: 400 });
    }
}
