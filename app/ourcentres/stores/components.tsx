"use client";

import { useState, useEffect, createContext, useContext, useMemo, ReactNode } from "react";
import {
    ArrowRight, Bike, Car, Check, ChevronDown, ChevronLeft,
    ChevronRight, Clock3, MapPin, MessageCircle,
    Phone, ShoppingBag, Star, Utensils, Users, Wheat, Accessibility,
    X, Plus, Navigation, Percent
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getFeaturedProducts, getPrimaryOffer, getCommonMenu, getCentreBySlugOrId } from "../../lib/api";

const defaultPhotos = [
    { src: `https://teamaax-remake-showcase.lovable.app/assets/cafe-exterior-CdvnH_rb.jpg`, alt: "TeaMax cafe exterior" },
    { src: `https://teamaax-remake-showcase.lovable.app/assets/cafe-interior-BqO44HIC.jpg`, alt: "TeaMax cafe interior" },
    { src: `https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`, alt: "Freshly made coffee" },
    { src: `https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg`, alt: "Cafe burger" },
    { src: `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`, alt: "A cup of chai" },
];

const defaultMenuItems = [
    { name: "TeaMax Signature Masala Chai", price: "₹25", image: `https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80`, category: "Chai" },
    { name: "Smoky Kulhad Ginger Chai", price: "₹35", image: `https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80`, category: "Chai" },
    { name: "Royal Saffron Cardamom Chai", price: "₹119", image: `https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&auto=format&fit=crop&q=80`, category: "Chai" },
    { name: "Darjeeling First Flush Muskatel", price: "₹149", image: `https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80`, category: "Artisanal" },
    { name: "Fresh Mint & Peach Iced Tea", price: "₹99", image: `https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80`, category: "Beverages" },
    { name: "Crispy Cocktail Samosa Platter", price: "₹89", image: `https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80`, category: "Snacks" },
];

const defaultOffer = {
    title: "Buy 2 Chai, Get 1 Free",
    shortDescription: "Enjoy our special slow-brewed chai. Buy any 2 chai and get 1 free.",
    bannerImage: "https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg",
    promoCode: "BUY2GET1",
};

const facilities = [
    { icon: Utensils, title: "Dine-in", detail: "Available" },
    { icon: ShoppingBag, title: "Takeaway", detail: "Available" },
    { icon: Bike, title: "Home Delivery", detail: "Available" },
    { icon: Car, title: "Ample", detail: "Parking" },
    { icon: Users, title: "Family", detail: "Friendly" },
    { icon: Wheat, title: "Pet Friendly", detail: "(Outdoor)" },
    { icon: Accessibility, title: "Wheelchair", detail: "Accessible" },
];

const defaultReviews = [
    { initials: "AK", name: "Aarav Kumar", text: "Lovely place to relax with friends. The chai is excellent and the cafe has a warm atmosphere." },
    { initials: "SP", name: "Sneha Patel", text: "Good snacks, friendly staff and a comfortable seating area. Will definitely visit again." },
    { initials: "RV", name: "Rahul Verma", text: "A nice neighbourhood cafe for tea and quick bites. The interiors look beautiful." },
];

const defaultFaqs = [
    { q: "What are TeaMax opening hours?", a: "The listed hours are 7:00 AM to 11:00 PM. Please contact the cafe to confirm holiday timings." },
    { q: "Does the cafe offer takeaway and delivery?", a: "Takeaway is available. Delivery availability may depend on your location and delivery partner." },
    { q: "Is parking available at the cafe?", a: "The location listing highlights ample parking. Contact the cafe if you need specific accessibility details." },
];

// Helper to ensure external links have valid protocol
function formatExternalUrl(url?: string, defaultUrl: string = ""): string {
    if (!url || !url.trim()) return defaultUrl;
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
    }
    return trimmed;
}

// Helper to resolve exact Google Map directions URL and embed iframe URL
function getStoreMapUrls(centre: any, centreName: string, address: string) {
    const rawMap = (centre?.mapUrl || centre?.googleMapUrl || "").trim();

    // 1. Check if user pasted an embed iframe code
    let iframeSrc = "";
    if (rawMap.includes("<iframe")) {
        const match = rawMap.match(/src=["']([^"']+)["']/i);
        if (match && match[1]) {
            iframeSrc = match[1];
        }
    } else if (rawMap.includes("/maps/embed")) {
        iframeSrc = rawMap;
    }

    // 2. Direct directions URL
    let directionsUrl = "";
    if (rawMap.startsWith("http://") || rawMap.startsWith("https://")) {
        if (!rawMap.includes("/maps/embed") && !rawMap.includes("<iframe")) {
            directionsUrl = rawMap;
        }
    }

    // 3. Fallback coordinates or formatted address query
    const hasCoords = centre?.latitude != null && centre?.longitude != null;
    const coordsQuery = hasCoords ? `${centre.latitude},${centre.longitude}` : "";
    const addressQuery = `${centreName} ${address}`.trim();
    const primaryQuery = coordsQuery || addressQuery;

    if (!directionsUrl) {
        directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryQuery)}`;
    }

    if (!iframeSrc) {
        let embedQuery = primaryQuery;
        if (rawMap && !rawMap.includes("<iframe") && !rawMap.includes("/maps/embed")) {
            const coordMatch = rawMap.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || rawMap.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
            if (coordMatch) {
                embedQuery = `${coordMatch[1]},${coordMatch[2]}`;
            }
        }
        iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(embedQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    return { directionsUrl, iframeSrc };
}

// Context for Store Data synchronization
interface StoreContextType {
    centre: any;
    featuredProducts: any[];
    commonMenu: any[];
    offer: any;
}

const StoreContext = createContext<StoreContextType>({
    centre: null,
    featuredProducts: defaultMenuItems,
    commonMenu: defaultMenuItems,
    offer: defaultOffer,
});

export function useStoreData() {
    return useContext(StoreContext);
}

export function StoreDataProvider({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const slugOrId = searchParams?.get("slug") || searchParams?.get("id") || "kompally";

    const [centre, setCentre] = useState<any>(null);
    const [featuredProducts, setFeaturedProducts] = useState<any[]>(defaultMenuItems);
    const [commonMenu, setCommonMenu] = useState<any[]>(defaultMenuItems);
    const [offer, setOffer] = useState<any>(defaultOffer);

    useEffect(() => {
        let isMounted = true;

        async function loadStorePageData() {
            try {
                const [centreData, featuredData, menuData, primaryOfferData] = await Promise.allSettled([
                    getCentreBySlugOrId(slugOrId),
                    getFeaturedProducts(6),
                    getCommonMenu(),
                    getPrimaryOffer(),
                ]);

                if (!isMounted) return;

                // 1. Set Centre data
                if (centreData.status === "fulfilled" && centreData.value) {
                    setCentre(centreData.value);
                }

                // 2. Set Featured Products (strictly maximum 6, exactly 6 if 6+ available, or available count if < 6)
                if (featuredData.status === "fulfilled" && Array.isArray(featuredData.value) && featuredData.value.length > 0) {
                    const formatted = featuredData.value.slice(0, 6).map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: typeof item.price === "number" ? `₹${item.price}` : item.price,
                        image: item.image || `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`,
                        category: item.category?.name || "Chai",
                    }));
                    setFeaturedProducts(formatted);
                }

                // 3. Set Common Menu
                if (menuData.status === "fulfilled" && Array.isArray(menuData.value) && menuData.value.length > 0) {
                    const formattedMenu = menuData.value.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: typeof item.price === "number" ? `₹${item.price}` : item.price,
                        image: item.image || `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`,
                        category: item.category?.name || "Chai",
                    }));
                    setCommonMenu(formattedMenu);
                }

                // 4. Set Single Active Central Offer
                if (primaryOfferData.status === "fulfilled" && primaryOfferData.value) {
                    setOffer(primaryOfferData.value);
                }
            } catch (err) {
                console.warn("[StorePage] Error loading dynamic store data:", err);
            }
        }

        loadStorePageData();

        return () => {
            isMounted = false;
        };
    }, [slugOrId]);

    const value = useMemo(
        () => ({
            centre,
            featuredProducts,
            commonMenu,
            offer,
        }),
        [centre, featuredProducts, commonMenu, offer]
    );

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function StoreHero() {
    const { centre } = useStoreData();
    const [activePhoto, setActivePhoto] = useState(1);
    const [showHours, setShowHours] = useState(false);

    const photos = useMemo(() => {
        const list: Array<{ src: string; alt: string }> = [];
        if (centre?.coverImage) {
            list.push({ src: centre.coverImage, alt: `${centre.name || "TeaMax"} Cover Photo` });
        }
        if (centre?.galleryImages && Array.isArray(centre.galleryImages) && centre.galleryImages.length > 0) {
            centre.galleryImages.forEach((src: string, i: number) => {
                if (src !== centre.coverImage) {
                    list.push({ src, alt: `${centre.name || "TeaMax"} photo ${i + 1}` });
                }
            });
        }
        return list.length > 0 ? list : defaultPhotos;
    }, [centre]);

    const current = photos[(activePhoto - 1) % photos.length];
    const changePhoto = (direction: number) =>
        setActivePhoto((n) => ((n - 1 + direction + photos.length) % photos.length) + 1);

    const centreName = centre?.name || "TeaMax Cafe – Kompally";
    const locality = centre?.locality || "Kompally";
    const city = centre?.city || "Hyderabad";
    const state = centre?.state || "Telangana";
    const rating = centre?.averageRating || 4.6;
    const reviewCount = centre?.reviewCount || 230;
    const address = centre?.address || "Plot No. 12, Kompally Main Road, Kompally, Hyderabad, Telangana 500014";
    const phone = centre?.contactNumber || "+919876543210";
    const whatsapp = centre?.whatsappNumber || phone;

    const { directionsUrl: mapDirectionsUrl } = useMemo(
        () => getStoreMapUrls(centre, centreName, address),
        [centre, centreName, address]
    );

    return (
        <>
            <div className="detailscentres-breadcrumbs">
                <a href="/">Home</a>
                <ChevronRight />
                <a href="/ourcentres">Our Centres</a>
                <ChevronRight />
                <span>{state}</span>
                <ChevronRight />
                <span>{city}</span>
                <ChevronRight />
                <span>{locality}</span>
            </div>

            <section className="detailscentres-hero">
                <div className="detailscentres-store-info">
                    <div className="detailscentres-eyebrow">OUR CENTRES</div>

                    <h1>{centreName}<span className="detailscentres-title-mark">′</span></h1>

                    <div className="detailscentres-rating">
                        <Star fill="currentColor" size={22} />
                        <strong>{rating} <span>({reviewCount} reviews)</span></strong>
                    </div>

                    <div className="detailscentres-address">
                        <MapPin size={22} />
                        <p>{address}</p>
                    </div>

                    <div className="detailscentres-status-line">
                        <span className="detailscentres-open-badge"><i />Open Now</span>
                        <span className="detailscentres-hours-short"><Clock3 size={17} />Open 7:00 AM – 11:00 PM</span>
                        <button className="detailscentres-text-button" onClick={() => setShowHours(!showHours)}>
                            View All Timings <ChevronDown size={14} />
                        </button>
                    </div>

                    {showHours && (
                        <div className="detailscentres-hours-popover">
                            <b>Opening hours</b>
                            <span>Monday – Sunday</span>
                            <strong>7:00 AM – 11:00 PM</strong>
                            <small>Hours may vary on holidays.</small>
                        </div>
                    )}

                    <div className="detailscentres-actions">
                        <a
                            className="detailscentres-btn detailscentres-btn-yellow"
                            target="_blank"
                            rel="noreferrer"
                            href={mapDirectionsUrl}
                            title="Open Google Maps exact location"
                        >
                            <MapPin />Get Directions
                        </a>

                        <a className="detailscentres-btn detailscentres-btn-primary" href={`tel:${phone.replace(/\s+/g, "")}`}>
                            <Phone />Call Cafe
                        </a>

                        <a
                            className="detailscentres-btn detailscentres-btn-outline"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                        >
                            <MessageCircle />WhatsApp
                        </a>

                        <a className="detailscentres-btn detailscentres-btn-primary" href="/menu">
                            <Utensils />View Menu
                        </a>
                    </div>
                </div>

                <div className="detailscentres-photos">
                    <div className="detailscentres-main-photo">
                        <img src={current.src} alt={current.alt} />
                        <span className="detailscentres-photo-count">{activePhoto} / {photos.length}</span>
                        <button className="detailscentres-photo-arrow detailscentres-prev" aria-label="Previous photo" onClick={() => changePhoto(-1)}>
                            <ChevronLeft />
                        </button>
                        <button className="detailscentres-photo-arrow detailscentres-next" aria-label="Next photo" onClick={() => changePhoto(1)}>
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="detailscentres-thumbnails">
                        {photos.map((photo: any, i: number) => (
                            <button
                                key={photo.src + i}
                                onClick={() => setActivePhoto(i + 1)}
                                className={activePhoto === i + 1 ? "detailscentres-selected" : ""}
                                aria-label={`View photo ${i + 1}`}
                            >
                                <img src={photo.src} alt={photo.alt} />
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export function StoreFeatures() {
    return (
        <section className="detailscentres-facilities" aria-label="Cafe facilities">
            {facilities.map(({ icon: Icon, title, detail }) => (
                <div className="detailscentres-facility" key={title}>
                    <span className="detailscentres-round-icon"><Icon size={21} /></span>
                    <span><b>{title}</b><small>{detail}</small></span>
                </div>
            ))}
        </section>
    );
}

export function StorePromos() {
    const { offer, centre } = useStoreData();
    const currentOffer = offer || defaultOffer;
    const locality = centre?.locality || centre?.city || "Kompally";

    return (
        <section className="detailscentres-promo-row">
            <article className="detailscentres-promo detailscentres-chai-promo">
                <div className="detailscentres-promo-label">
                    <span className="detailscentres-round-icon"><Percent /></span>
                    Today&apos;s Special at {locality}
                </div>

                <h2>{currentOffer.title || "Buy 2 Chai\nGet 1 Free"}</h2>

                <a className="detailscentres-btn detailscentres-btn-yellow" href="/offers">
                    Explore Offers <ArrowRight size={15} />
                </a>

                <img
                    className="detailscentres-promo-food"
                    src={currentOffer.bannerImage || `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`}
                    alt={currentOffer.title || "A glass of hot chai"}
                />
            </article>

            <article className="detailscentres-promo detailscentres-delivery-promo">
                {/* <span className="detailscentres-round-icon"><Bike /></span> */}

                <div className="detailscentres-delivery-content">
                    <h2>Order Online from<br />TeaMax {locality}</h2>
                    <p>Get your favourite tea, coffee and snacks delivered to your doorstep.</p>
                    <div className="detailscentres-delivery-links">
                        <a
                            href={formatExternalUrl(centre?.zomatoUrl, "https://www.zomato.com/")}
                            target="_blank"
                            rel="noreferrer"
                            title={`Order on Zomato from TeaMax ${locality}`}
                        >
                            zomato
                        </a>
                        <a
                            href={formatExternalUrl(centre?.swiggyUrl, "https://www.swiggy.com/")}
                            target="_blank"
                            rel="noreferrer"
                            title={`Order on Swiggy from TeaMax ${locality}`}
                        >
                            Swiggy
                        </a>
                    </div>
                </div>

                <Bike className="detailscentres-delivery-art" size={100} />
            </article>
        </section>
    );
}

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://teamaxbackend-production.up.railway.app/api/v1";

function MomentsSection() {
    const [photos, setPhotos] = useState<{ src: string; alt: string }[]>([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`${API_BASE}/settings/moments`)
            .then((r) => r.json())
            .then((json) => {
                if (!isMounted) return;
                const raw = json?.data?.images || json?.images || (Array.isArray(json?.data) ? json.data : []);
                const images: string[] = Array.isArray(raw) ? raw : [];
                const valid = images.filter((img) => typeof img === "string" && img.trim().length > 0);
                if (valid.length > 0) {
                    setPhotos(valid.map((src, i) => ({ src, alt: `TeaMax moment ${i + 1}` })));
                } else {
                    setPhotos(defaultPhotos);
                }
            })
            .catch((err) => {
                console.warn("[MomentsSection] Error fetching moments from API:", err);
                if (isMounted) setPhotos(defaultPhotos);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const display = photos.length > 0 ? photos : defaultPhotos;

    return (
        <section className="detailscentres-section">
            <div className="detailscentres-section-heading">
                <div>
                    <span className="detailscentres-eyebrow">A LITTLE LOOK INSIDE</span>
                    <h2>Moments at TeaMax</h2>
                </div>
            </div>

            <div className="detailscentres-gallery-grid">
                {display.map((photo, index) => (
                    <div className="detailscentres-gallery-item" key={`${photo.src}-${index}`}>
                        <img src={photo.src} alt={photo.alt} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export function StoreSections() {
    const { featuredProducts, commonMenu, offer, centre } = useStoreData();
    const [category, setCategory] = useState("All");
    const [added, setAdded] = useState("");
    const [openFaq, setOpenFaq] = useState(0);

    // Featured products logic:
    // Display maximum 6 featured products (exactly 6 when at least 6 are available, or available count if < 6)
    const activeProducts = useMemo(() => {
        if (category === "All") {
            return featuredProducts.slice(0, 6);
        }
        const filteredFromMenu = commonMenu.filter(
            (item) => item.category?.toLowerCase() === category.toLowerCase()
        );
        return (filteredFromMenu.length > 0 ? filteredFromMenu : featuredProducts).slice(0, 6);
    }, [category, featuredProducts, commonMenu]);

    const activeOffer = offer || defaultOffer;
    const locality = centre?.locality || centre?.city || "Kompally";
    const centreName = centre?.name || `TeaMax Cafe – ${locality}`;
    const address = centre?.address || "Plot No. 12, Kompally Main Road, Kompally, Hyderabad, Telangana 500014";
    const phone = centre?.contactNumber || "+91 98765 43210";
    const whatsapp = centre?.whatsappNumber || phone;

    const { directionsUrl: mapDirectionsUrl, iframeSrc: mapIframeSrc } = useMemo(
        () => getStoreMapUrls(centre, centreName, address),
        [centre, centreName, address]
    );

    return (
        <>
            {/* Common Menu & Featured Products Section */}
            <section className="detailscentres-section" id="menu">
                <div className="detailscentres-section-heading">
                    <div>
                        <span className="detailscentres-eyebrow">FRESHLY MADE</span>
                        <h2>Popular at TeaMax</h2>
                    </div>
                    <a className="detailscentres-section-link" href="/menu">
                        View Full Menu <ArrowRight size={16} />
                    </a>
                </div>

                <div className="detailscentres-menu-tabs">
                    {["All", "Chai", "Coffee", "Snacks"].map((tab) => (
                        <button
                            key={tab}
                            className={category === tab ? "detailscentres-chosen" : ""}
                            onClick={() => setCategory(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="detailscentres-menu-grid">
                    {activeProducts.map((item) => (
                        <article className="detailscentres-menu-card" key={item.id || item.name}>
                            <img src={item.image} alt={item.name} />
                            <div className="detailscentres-menu-card-body">
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {added && (
                    <p className="detailscentres-cart-notice">
                        <Check size={17} /> {added} selected. Online ordering can be connected to your ordering system.
                    </p>
                )}
            </section>

            {/* Reviews Section */}
            <section className="detailscentres-section">
                <div className="detailscentres-section-heading">
                    <div>
                        <span className="detailscentres-eyebrow">WHAT PEOPLE SAY</span>
                        <h2>Loved by our guests</h2>
                    </div>
                    <div className="detailscentres-review-summary">
                        <Star fill="currentColor" /> <b>{centre?.averageRating || 4.6}/5</b> <span>{centre?.reviewCount || 230} reviews</span>
                    </div>
                </div>

                <div className="detailscentres-reviews-grid">
                    {((centre?.reviews && centre.reviews.length > 0)
                        ? centre.reviews.map((r: any) => ({
                            id: r.id,
                            name: r.reviewerName,
                            initials: (r.reviewerName || "TM")
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase(),
                            avatar: r.reviewerAvatar,
                            text: r.reviewText,
                            stars: r.starRating || 5,
                        }))
                        : defaultReviews
                    ).map((review: any) => (
                        <article className="detailscentres-review-card" key={review.id || review.initials}>
                            <div className="detailscentres-avatar">
                                {review.avatar ? (
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                                    />
                                ) : (
                                    review.initials
                                )}
                            </div>
                            <div>
                                <h3>{review.name}</h3>
                                <div className="detailscentres-stars">
                                    {"★".repeat(review.stars || 5)}
                                </div>
                                <p>{review.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Location & Map Section */}
            <section className="detailscentres-section">
                <div className="detailscentres-section-heading">
                    <div>
                        <span className="detailscentres-eyebrow">FIND US</span>
                        <h2>Visit {centreName}</h2>
                    </div>
                </div>

                <div className="detailscentres-location-grid">
                    <article className="detailscentres-map-panel">
                        <div className="detailscentres-panel-heading">
                            <h3>Our Location</h3>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={mapDirectionsUrl}
                            >
                                Open in Google Maps <ArrowRight size={14} />
                            </a>
                        </div>

                        <div className="detailscentres-real-map">
                            <iframe
                                title={`${centreName} Location Map`}
                                src={mapIframeSrc}
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
                                    <strong>{centreName}</strong>
                                    <span>{locality}</span>
                                </div>
                            </div>

                            <a
                                className="detailscentres-btn detailscentres-btn-primary detailscentres-map-directions"
                                target="_blank"
                                rel="noreferrer"
                                href={mapDirectionsUrl}
                            >
                                <Navigation size={16} /> Get Directions
                            </a>
                        </div>
                    </article>

                    <div className="detailscentres-contact-stack">
                        <article className="detailscentres-contact-panel">
                            <h3>Contact the Cafe</h3>
                            <a href={`tel:${phone.replace(/\s+/g, "")}`}>
                                <Phone size={17} /> {phone}
                            </a>
                            <a
                                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MessageCircle size={17} /> Chat on WhatsApp
                            </a>
                            <p>
                                <MapPin size={17} /> {address}
                            </p>

                            {(centre?.swiggyUrl || centre?.zomatoUrl) && (
                                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0ede6' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#687770', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                        Order Online from this Outlet:
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {centre?.swiggyUrl && (
                                            <a
                                                href={formatExternalUrl(centre.swiggyUrl)}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 14px',
                                                    borderRadius: '999px',
                                                    background: '#FC8019',
                                                    color: '#ffffff',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Swiggy ↗
                                            </a>
                                        )}
                                        {centre?.zomatoUrl && (
                                            <a
                                                href={formatExternalUrl(centre.zomatoUrl)}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 14px',
                                                    borderRadius: '999px',
                                                    background: '#E23744',
                                                    color: '#ffffff',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Zomato ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
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

            {/* Gallery Section — dynamic from global /settings/moments, fallback to defaultPhotos */}
            <MomentsSection />

            {/* Common Central Offer Section:
                Strict requirement: Each franchise page must display only ONE offer at a time! */}
            <section className="detailscentres-section detailscentres-offers-section">
                <div className="detailscentres-section-heading">
                    <div>
                        <span className="detailscentres-eyebrow">MADE FOR YOUR BREAK</span>
                        <h2>Offers worth sharing</h2>
                    </div>
                    <a className="detailscentres-section-link" href="/offers">
                        Explore Offers <ArrowRight size={16} />
                    </a>
                </div>

                <div className="detailscentres-offers-grid">
                    <article>
                        <img
                            src={activeOffer.bannerImage || `https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg`}
                            alt={activeOffer.title || "Tea offer"}
                        />
                        <div>
                            <span>{activeOffer.promoCode || "CHAI TIME"}</span>
                            <h3>{activeOffer.title}</h3>
                            <p>{activeOffer.shortDescription || activeOffer.detailedDescription}</p>
                            <a href="/menu">
                                Explore offer <ArrowRight size={14} />
                            </a>
                        </div>
                    </article>
                </div>
            </section>
            <section className="" id="faq">
                <div className="detailscentres-faq-intro">
                    <span className="detailscentres-eyebrow">About us</span>
                    <h3 className="desc mt-3">{centre?.shortDescription}</h3>

                </div>

                <div className="detailscentres-faq-list mar2">

                    <article className="detailscentres-faq-item mt-4">

                        <p>{centre?.detailedDescription}</p>
                    </article>

                </div>
            </section>
            {/* FAQs Section */}
            <section className="detailscentres-section detailscentres-faq-section" id="faq">
                <div className="detailscentres-faq-intro">
                    <span className="detailscentres-eyebrow">GOOD TO KNOW</span>
                    <h2>A few things you might be wondering</h2>
                    <p>Everything you need to plan your next TeaMax visit.</p>
                    <div className="detailscentres-faq-art">
                        <img
                            src={`https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg`}
                            alt="Coffee at TeaMax"
                        />
                        <span>Chai, chat<br />and chill!</span>
                    </div>
                </div>

                <div className="detailscentres-faq-list">
                    {defaultFaqs.map((faq, i) => (
                        <article key={faq.q} className="detailscentres-faq-item">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                aria-expanded={openFaq === i}
                            >
                                {faq.q}
                                {openFaq === i ? <X size={17} /> : <Plus size={17} />}
                            </button>
                            {openFaq === i && <p>{faq.a}</p>}
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
