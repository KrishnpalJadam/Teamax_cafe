
"use client";

export default function FranchiseBookingButton() {
    const handleClick = () => {
        window.dispatchEvent(
            new Event("open-teamax-franchise-popup")
        );
    };

    return (
        <button
            type="button"
            className="tm-footer-booking-btn"
            onClick={handleClick}
        >
            Franchise Booking
        </button>
    );
}
