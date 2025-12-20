"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
    CalendarDays,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    UserRound,
} from "lucide-react";
import { profile, socials } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

const socialIcons: Record<string, typeof Github> = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Instagram: Instagram,
};

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const available = useMemo(() => profile.status.available, []);
    return (
        <aside
            className={`sidebar${open ? " active" : ""}`}
            data-sidebar
            onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("a, button, input, textarea, select, [data-no-sidebar-toggle]")) {
                    return;
                }
                setOpen((v) => !v);
            }}
        >
            <div className="sidebar-info">
                <figure className="avatar-box">
                    <Image
                        src={profile.avatar}
                        alt={profile.name}
                        width={96}
                        height={96}
                        sizes="(min-width: 1250px) 160px, (min-width: 768px) 130px, (min-width: 580px) 104px, 96px"
                        priority
                    />
                </figure>

                <div className="info-content">
                    <h1 className="name" title={profile.name}>
                        {profile.name}
                    </h1>
                    <p className="title">{profile.role}</p>
                    <div className="status-row">
                        <span className={`status-chip${available ? " is-open" : " is-closed"}`}>
                            {profile.status.label}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="info_more-btn"
                    data-sidebar-btn
                    aria-expanded={open}
                    onClick={(event) => {
                        event.stopPropagation();
                        trackEvent("sidebar_contacts_toggle", { open: !open });
                        setOpen((v) => !v);
                    }}
                >
                    <span className="info_more-btn__icon" aria-hidden="true">
                        <UserRound size={16} />
                    </span>
                    <span className="info_more-btn__label">Show Contacts</span>
                </button>
            </div>

            <div className="sidebar-info_more">
                <div className="sidebar-info_more-inner">
                    <div className="separator"></div>

                    <ul className="contacts-list">
                        <li className="contact-item">
                            <div className="icon-box">
                                <Mail aria-hidden="true" />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Email</p>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="contact-link"
                                    onClick={() => trackEvent("contact_email_click")}
                                >
                                    {profile.email}
                                </a>
                            </div>
                        </li>

                        <li className="contact-item">
                            <div className="icon-box">
                                <Phone aria-hidden="true" />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Phone</p>
                                <a
                                    href={`tel:${profile.phone}`}
                                    className="contact-link"
                                    onClick={() => trackEvent("contact_phone_click")}
                                >
                                    {profile.phone}
                                </a>
                            </div>
                        </li>

                        <li className="contact-item">
                            <div className="icon-box">
                                <CalendarDays aria-hidden="true" />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Birthday</p>
                                <time dateTime={profile.birthday.datetime}>{profile.birthday.label}</time>
                            </div>
                        </li>

                        <li className="contact-item">
                            <div className="icon-box">
                                <MapPin aria-hidden="true" />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Location</p>
                                <address>{profile.location}</address>
                            </div>
                        </li>
                    </ul>

                    <div className="separator"></div>

                    <ul className="social-list">
                        {socials.map((s) => {
                            const Icon = socialIcons[s.label] ?? Github;
                            return (
                                <li className="social-item" key={s.label}>
                                    <a
                                        className="social-link"
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackEvent("social_click", { network: s.label })}
                                    >
                                        <Icon aria-label={s.label} size={18} />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
