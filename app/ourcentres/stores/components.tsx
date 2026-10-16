"use client";



import { useState } from "react";

import {

    ArrowRight, Bike, Car, Check, ChevronDown, ChevronLeft,

    ChevronRight, Clock3, MapPin, MessageCircle,

    Phone, ShoppingBag, Star, Utensils, Users, Wheat, Accessibility,

    X, Plus, Navigation, Percent

} from "lucide-react";

const photos = [

    { src: `https://teamaax-remake-showcase.lovable.app/assets/cafe-exterior-CdvnH_rb.jpg`, alt: "TeaMax cafe exterior" },

    { src: `https://teamaax-remake-showcase.lovable.app/assets/cafe-interior-BqO44HIC.jpg`, alt: "TeaMax cafe interior" },

    { src: `https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`, alt: "Freshly made coffee" },

    { src: `https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg`, alt: "Cafe burger" },

    { src: `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`, alt: "A cup of chai" },

];



const menuItems = [

    { name: "Masala Chai", price: "₹25", image: `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`, category: "Chai" },

    { name: "Cappuccino", price: "₹99", image: `https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`, category: "Coffee" },

    { name: "Classic Burger", price: "₹149", image: `https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg`, category: "Snacks" },

    { name: "Special Chai", price: "₹35", image: `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`, category: "Chai" },

    { name: "Cold Coffee", price: "₹119", image: `https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`, category: "Coffee" },

    { name: "Veg Burger", price: "₹129", image: `https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg`, category: "Snacks" },

];



const facilities = [

    { icon: Utensils, title: "Dine-in", detail: "Available" },

    { icon: ShoppingBag, title: "Takeaway", detail: "Available" },

    { icon: Bike, title: "Home Delivery", detail: "Available" },

    { icon: Car, title: "Ample", detail: "Parking" },

    { icon: Users, title: "Family", detail: "Friendly" },

    { icon: Wheat, title: "Pet Friendly", detail: "(Outdoor)" },

    { icon: Accessibility, title: "Wheelchair", detail: "Accessible" },

];



const reviews = [

    { initials: "AK", name: "Aarav Kumar", text: "Lovely place to relax with friends. The chai is excellent and the cafe has a warm atmosphere." },

    { initials: "SP", name: "Sneha Patel", text: "Good snacks, friendly staff and a comfortable seating area. Will definitely visit again." },

    { initials: "RV", name: "Rahul Verma", text: "A nice neighbourhood cafe for tea and quick bites. The interiors look beautiful." },

];



const faqs = [

    { q: "What are TeaMax Kompally opening hours?", a: "The listed hours are 7:00 AM to 11:00 PM. Please contact the cafe to confirm holiday timings." },

    { q: "Does the cafe offer takeaway and delivery?", a: "Takeaway is available. Delivery availability may depend on your location and delivery partner." },

    { q: "Is parking available at the cafe?", a: "The location listing highlights ample parking. Contact the cafe if you need specific accessibility details." },

];







export function StoreHero() {

    const [activePhoto, setActivePhoto] = useState(1);

    const [showHours, setShowHours] = useState(false);

    const current = photos[(activePhoto - 1) % photos.length];

    const changePhoto = (direction: number) => setActivePhoto((n) => ((n - 1 + direction + photos.length) % photos.length) + 1);

    return (

        <>

            <div className="detailscentres-breadcrumbs"><a href="/">Home</a><ChevronRight /><a href="/ourcentres">Our Centres</a><ChevronRight /><span>Telangana</span><ChevronRight /><span>Hyderabad</span><ChevronRight /><span>Kompally</span></div>

            <section className="detailscentres-hero">

                <div className="detailscentres-store-info">

                    <div className="detailscentres-eyebrow">OUR CENTRES</div>

                    <h1>TeaMax Cafe – Kompally<span className="detailscentres-title-mark">′</span></h1>

                    <div className="detailscentres-rating"><Star fill="currentColor" size={22} /><strong>4.6 <span>(230 reviews)</span></strong></div>

                    <div className="detailscentres-address"><MapPin size={22} /><p>Plot No. 12, Kompally Main Road, Kompally,<br />Hyderabad, Telangana 500014</p></div>

                    <div className="detailscentres-status-line">

                        <span className="detailscentres-open-badge"><i />Open Now</span>

                        <span className="detailscentres-hours-short"><Clock3 size={17} />Open 7:00 AM – 11:00 PM</span>

                        <button className="detailscentres-text-button" onClick={() => setShowHours(!showHours)}>View All Timings <ChevronDown size={14} /></button>

                    </div>

                    {showHours && <div className="detailscentres-hours-popover"><b>Opening hours</b><span>Monday – Sunday</span><strong>7:00 AM – 11:00 PM</strong><small>Hours may vary on holidays.</small></div>}

                    <div className="detailscentres-actions">

                        <a className="detailscentres-btn detailscentres-btn-yellow" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=TeaMax+Cafe+Kompally+Hyderabad"><MapPin />Get Directions</a>

                        <a className="detailscentres-btn detailscentres-btn-primary" href="tel:+919876543210"><Phone />Call Cafe</a>

                        <a className="detailscentres-btn detailscentres-btn-outline" target="_blank" rel="noreferrer" href="https://wa.me/919876543210"><MessageCircle />WhatsApp</a>

                        <a className="detailscentres-btn detailscentres-btn-primary" href="/menu"><Utensils />View Menu</a>

                    </div>

                </div>

                <div className="detailscentres-photos">

                    <div className="detailscentres-main-photo">

                        <img src={current.src} alt={current.alt} />

                        <span className="detailscentres-photo-count">{activePhoto + 1} / 12</span>

                        <button className="detailscentres-photo-arrow detailscentres-prev" aria-label="Previous photo" onClick={() => changePhoto(-1)}><ChevronLeft /></button>

                        <button className="detailscentres-photo-arrow detailscentres-next" aria-label="Next photo" onClick={() => changePhoto(1)}><ChevronRight /></button>

                    </div>

                    <div className="detailscentres-thumbnails">

                        {photos.map((photo, i) => <button key={photo.src} onClick={() => setActivePhoto(i)} className={activePhoto === i ? "detailscentres-selected" : ""} aria-label={`View photo ${i + 1}`}><img src={photo.src} alt={photo.alt} /></button>)}

                        <button className="detailscentres-more-photos" onClick={() => changePhoto(1)}>+7</button>

                    </div>

                </div>

            </section>

        </>

    );

}



export function StoreFeatures() {

    return <section className="detailscentres-facilities" aria-label="Cafe facilities">

        {facilities.map(({ icon: Icon, title, detail }) => <div className="detailscentres-facility" key={title}><span className="detailscentres-round-icon"><Icon size={21} /></span><span><b>{title}</b><small>{detail}</small></span></div>)}

    </section>;

}



export function StorePromos() {

    return <section className="detailscentres-promo-row">

        <article className="detailscentres-promo detailscentres-chai-promo">

            <div className="detailscentres-promo-label"><span className="detailscentres-round-icon"><Percent /></span>Today&apos;s Special at Kompally</div>

            <h2>Buy 2 Chai<br />Get 1 Free</h2>

            <a className="detailscentres-btn detailscentres-btn-yellow" href="/offers">Explore Offers <ArrowRight size={15} /></a>

            <img className="detailscentres-promo-food" src={`https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`} alt="A glass of hot chai" />

        </article>

        <article className="detailscentres-promo detailscentres-delivery-promo">

            <span className="detailscentres-round-icon"><Bike /></span>

            <div className="detailscentres-delivery-content"><h2>Order Online from<br />TeaMax Kompally</h2><p>Get your favourite tea, coffee and snacks delivered to your doorstep.</p><div className="detailscentres-delivery-links"><a href="https://www.zomato.com/" target="_blank" rel="noreferrer">zomato</a><a href="https://www.swiggy.com/" target="_blank" rel="noreferrer">Swiggy</a></div></div>

            <Bike className="detailscentres-delivery-art" size={100} />

        </article>

    </section>;

}



export function StoreSections() {

    const [category, setCategory] = useState("All");

    const [added, setAdded] = useState("");

    const [openFaq, setOpenFaq] = useState(0);

    const filtered = category === "All" ? menuItems : menuItems.filter((item) => item.category === category);

    return <>

        <section className="detailscentres-section" id="menu">

            <div className="detailscentres-section-heading"><div><span className="detailscentres-eyebrow">FRESHLY MADE</span><h2>Popular at TeaMax</h2></div><a className="detailscentres-section-link" href="/menu">View Full Menu <ArrowRight size={16} /></a></div>

            <div className="detailscentres-menu-tabs">{["All", "Chai", "Coffee", "Snacks"].map((tab) => <button key={tab} className={category === tab ? "detailscentres-chosen" : ""} onClick={() => setCategory(tab)}>{tab}</button>)}</div>

            <div className="detailscentres-menu-grid">{filtered.map((item) => <article className="detailscentres-menu-card" key={item.name}><img src={item.image} alt={item.name} /><div className="detailscentres-menu-card-body"><div><h3>{item.name}</h3><p>{item.price}</p></div></div></article>)}</div>

            {added && <p className="detailscentres-cart-notice"><Check size={17} /> {added} selected. Online ordering can be connected to your ordering system.</p>}

        </section>



        <section className="detailscentres-section">

            <div className="detailscentres-section-heading"><div><span className="detailscentres-eyebrow">WHAT PEOPLE SAY</span><h2>Loved by our guests</h2></div><div className="detailscentres-review-summary"><Star fill="currentColor" /> <b>4.6/5</b> <span>230 reviews</span></div></div>

            <div className="detailscentres-reviews-grid">{reviews.map((review) => <article className="detailscentres-review-card" key={review.initials}><div className="detailscentres-avatar">{review.initials}</div><div><h3>{review.name}</h3><div className="detailscentres-stars">★★★★★</div><p>{review.text}</p></div></article>)}</div>

        </section>




        <section className="detailscentres-section">
            <div className="detailscentres-section-heading">
                <div>
                    <span className="detailscentres-eyebrow">FIND US</span>
                    <h2>Visit TeaMax Kompally</h2>
                </div>
            </div>

            <div className="detailscentres-location-grid">
                <article className="detailscentres-map-panel">
                    <div className="detailscentres-panel-heading">
                        <h3>Our Location</h3>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.google.com/maps/search/?api=1&query=TeaMax+Cafe+Kompally+Hyderabad"
                        >
                            Open in Google Maps <ArrowRight size={14} />
                        </a>
                    </div>

                    <div className="detailscentres-real-map">
                        <iframe
                            title="TeaMax Cafe Kompally Location Map"
                            src="https://maps.google.com/maps?q=TeaMax%20Cafe%20Kompally%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="detailscentres-map-badge">
                            <span className="detailscentres-map-cup">☕</span>
                            <div>
                                <strong>TeaMax Cafe</strong>
                                <span>Kompally, Hyderabad</span>
                            </div>
                        </div>

                        <a
                            className="detailscentres-btn detailscentres-btn-primary detailscentres-map-directions"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.google.com/maps/search/?api=1&query=TeaMax+Cafe+Kompally+Hyderabad"
                        >
                            <Navigation size={16} /> Get Directions
                        </a>
                    </div>
                </article>

                <div className="detailscentres-contact-stack">
                    <article className="detailscentres-contact-panel">
                        <h3>Contact the Cafe</h3>
                        <a href="tel:+919876543210">
                            <Phone size={17} /> +91 98765 43210
                        </a>
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <MessageCircle size={17} /> Chat on WhatsApp
                        </a>
                        <p>
                            <MapPin size={17} /> Kompally Main Road, Hyderabad,
                            Telangana 500014
                        </p>
                    </article>

                    <article className="detailscentres-hours-panel">
                        <h3>
                            <Clock3 size={20} /> Opening Hours
                        </h3>
                        <div>
                            <span>Monday – Sunday</span>
                            <b>7:00 AM – 11:00 PM</b>
                        </div>
                        <small>Contact the cafe for holiday timings.</small>
                    </article>
                </div>
            </div>
        </section>




        <section className="detailscentres-section" id="gallery">

            <div className="detailscentres-section-heading"><div><span className="detailscentres-eyebrow">A LITTLE LOOK INSIDE</span><h2>Moments at TeaMax</h2></div></div>

            <div className="detailscentres-gallery-grid">{photos.map((photo) => <div className="detailscentres-gallery-item" key={photo.src}><img src={photo.src} alt={photo.alt} /></div>)}</div>

        </section>



        <section className="detailscentres-section detailscentres-offers-section">

            <div className="detailscentres-section-heading"><div><span className="detailscentres-eyebrow">MADE FOR YOUR BREAK</span><h2>Offers worth sharing</h2></div><a className="detailscentres-section-link" href="/offers">Explore Offers <ArrowRight size={16} /></a></div>

            <div className="detailscentres-offers-grid"><article><img src={`https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`} alt="Tea offer" /><div><span>CHAI TIME</span><h3>Buy 2 Chai, Get 1 Free</h3><p>Make your tea break a little better.</p><a href="/menu">Explore offer <ArrowRight size={14} /></a></div></article><article><img src={`https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`} alt="Coffee offer" /><div><span>COFFEE BREAK</span><h3>Your daily cup of comfort</h3><p>Take a moment and sip something lovely.</p><a href="/menu">View menu <ArrowRight size={14} /></a></div></article><article><img src={`https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg`} alt="Snack offer" /><div><span>GOODNESS</span><h3>Snacks for every craving</h3><p>Pair your favourite snack with chai.</p><a href="/menu">Discover more <ArrowRight size={14} /></a></div></article></div>

        </section>



        <section className="detailscentres-section detailscentres-faq-section" id="faq">

            <div className="detailscentres-faq-intro"><span className="detailscentres-eyebrow">GOOD TO KNOW</span><h2>A few things you might be wondering</h2><p>Everything you need to plan your next TeaMax visit.</p><div className="detailscentres-faq-art"><img src={`https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`} alt="Coffee at TeaMax" /><span>Chai, chat<br />and chill!</span></div></div>

            <div className="detailscentres-faq-list">{faqs.map((faq, i) => <article key={faq.q} className="detailscentres-faq-item"><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>{faq.q}{openFaq === i ? <X size={17} /> : <Plus size={17} />}</button>{openFaq === i && <p>{faq.a}</p>}</article>)}</div>

        </section>

    </>;

}
