"use client";

import Image from "next/image";
import { clients } from "@/lib/data";

export default function Clients() {
    return (
        <section className="clients">
            <h3 className="h3 clients-title">Clients</h3>
            <ul className="clients-list has-scrollbar">
                {clients.map((client) => (
                    <li className="clients-item" key={client.name}>
                        <a href="#">
                            <Image
                                src={client.logo}
                                alt={client.name}
                                width={160}
                                height={160}
                                sizes="(max-width: 580px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
