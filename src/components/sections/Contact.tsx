"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const startedRef = useRef(false);
    const [isValid, setIsValid] = useState(false);

    const handleInput = () => {
        const valid = formRef.current?.checkValidity() ?? false;
        setIsValid(valid);
    };

    const handleStart = () => {
        if (!startedRef.current) {
            startedRef.current = true;
            trackEvent("contact_form_start");
        }
    };

    return (
        <>
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section className="mapbox" data-mapbox>
                <figure>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
                        width="400"
                        height="300"
                        loading="lazy"
                        title="Location map"
                    ></iframe>
                </figure>
            </section>

            <section className="contact-form">
                <h3 className="h3 form-title">Contact Form</h3>

                <form
                    ref={formRef}
                    onSubmit={(event) => {
                        event.preventDefault();
                        const valid = formRef.current?.checkValidity() ?? false;
                        if (valid) {
                            trackEvent("contact_form_submit");
                        }
                    }}
                    className="form"
                    data-form
                >
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="fullname"
                            className="form-input"
                            placeholder="Full name"
                            required
                            data-form-input
                            onInput={handleInput}
                            onFocus={handleStart}
                        />

                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email address"
                            required
                            data-form-input
                            onInput={handleInput}
                            onFocus={handleStart}
                        />
                    </div>

                    <textarea
                        name="message"
                        className="form-input"
                        placeholder="Your Message"
                        required
                        data-form-input
                        onInput={handleInput}
                        onFocus={handleStart}
                    ></textarea>

                    <button className="form-btn" type="submit" disabled={!isValid} data-form-btn>
                        <Send aria-hidden="true" />
                        <span>Send Message</span>
                    </button>
                </form>
            </section>
        </>
    );
}
