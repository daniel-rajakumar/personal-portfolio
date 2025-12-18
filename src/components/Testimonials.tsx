"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/lib/data";

const quoteIcon = "/assets/images/icon-quote.svg";

const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};

export default function Testimonials() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        avatar: "",
        name: "",
        text: "",
        date: "",
    });

    const openModal = (avatar: string, name: string, text: string, date: string) => {
        setModalContent({ avatar, name, text, date });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="testimonials">
            <h3 className="h3 testimonials-title">Testimonials</h3>

            <ul className="testimonials-list has-scrollbar">
                {testimonials.map((testimonial) => (
                    <li
                        className="testimonials-item"
                        key={testimonial.name}
                        onClick={() =>
                            openModal(
                                testimonial.avatar,
                                testimonial.name,
                                testimonial.text,
                                testimonial.date
                            )
                        }
                    >
                        <div className="content-card" data-testimonials-item>
                            <figure className="testimonials-avatar-box">
                                <Image
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    width={60}
                                    height={60}
                                    sizes="(min-width: 580px) 80px, 60px"
                                />
                            </figure>

                            <h4 className="h4 testimonials-item-title" data-testimonials-title>
                                {testimonial.name}
                            </h4>

                            <div className="testimonials-text" data-testimonials-text>
                                <p>{testimonial.text}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {modalOpen && (
                <div className="modal-container active" data-modal-container>
                    <div className="overlay active" data-overlay onClick={closeModal}></div>

                    <section className="testimonials-modal">
                        <button
                            type="button"
                            className="modal-close-btn"
                            data-modal-close-btn
                            onClick={closeModal}
                        >
                            <X aria-hidden="true" />
                        </button>

                        <div className="modal-img-wrapper">
                            <figure className="modal-avatar-box">
                                <Image
                                    src={modalContent.avatar}
                                    alt={modalContent.name}
                                    width={80}
                                    height={80}
                                    sizes="80px"
                                />
                            </figure>
                            <Image
                                src={quoteIcon}
                                alt="Quote icon"
                                width={32}
                                height={32}
                                className="quote-icon"
                            />
                        </div>

                        <div className="modal-content">
                            <h4 className="h4 modal-title" data-modal-title>
                                {modalContent.name}
                            </h4>

                            {modalContent.date ? (
                                <time dateTime={modalContent.date}>{formatDate(modalContent.date)}</time>
                            ) : null}

                            <div data-modal-text>
                                <p>{modalContent.text}</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </section>
    );
}
