import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
    return (
        <a
            href="https://link.teamaxcafe.in/whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="tm-whatsapp-float"
            aria-label="Chat with TeaMax on WhatsApp"
            title="Chat with us on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
}