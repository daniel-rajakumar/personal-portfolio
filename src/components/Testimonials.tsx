"use client";

import { testimonials } from "@/lib/data";
import { useState } from "react";

const IonIcon = "ion-icon" as any;

export default function Testimonials() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        avatar: "",
        title: "",
        text: "",
    });

    const openModal = (avatar: string, title: string, text: string) => {
        setModalContent({ avatar, title, text });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="testimonials">
            <h3 className="h3 testimonials-title">Testimonials</h3>

            <ul className="testimonials-list has-scrollbar">
                {testimonials.map((testimonial: any) => (
                    <li
                        className="testimonials-item"
                        key={testimonial.title}
                        onClick={() =>
                            openModal(
                                testimonial.avatar,
                                testimonial.title,
                                testimonial.text
                            )
                        }
                    >
                        <div className="content-card" data-testimonials-item>
                            <figure className="testimonials-avatar-box">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.title}
                                    width="60"
                                    data-testimonials-avatar
                                />
                            </figure>

                            <h4
                                className="h4 testimonials-item-title"
                                data-testimonials-title
                            >
                                {testimonial.title}
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
                            className="modal-close-btn"
                            data-modal-close-btn
                            onClick={closeModal}
                        >
                            <IonIcon name="close-outline"></IonIcon>
                        </button>

                        <div className="modal-img-wrapper">
                            <figure className="modal-avatar-box">
                                <img
                                    src={modalContent.avatar}
                                    alt={modalContent.title}
                                    width="80"
                                    data-modal-img
                                />
                            </figure>
                        </div>

                        <div className="modal-content">
                            <h4 className="h4 modal-title" data-modal-title>
                                {modalContent.title}
                            </h4>

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

