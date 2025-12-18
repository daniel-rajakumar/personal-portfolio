"use client";

const clients = [
    { name: "client-1", image: "/logo-1-color.png" },
    { name: "client-2", image: "/logo-2-color.png" },
    { name: "client-3", image: "/logo-3-color.png" },
    { name: "client-4", image: "/logo-4-color.png" },
    { name: "client-5", image: "/logo-5-color.png" },
    { name: "client-6", image: "/logo-6-color.png" },
];

export default function Clients() {
    return (
        <section className="clients">
            <h3 className="h3 clients-title">Clients</h3>
            <ul className="clients-list has-scrollbar">
                {clients.map((client) => (
                    <li className="clients-item" key={client.name}>
                        <a href="#">
                            <img src={client.image} alt={client.name} />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

