"use client";

import { useState, useEffect, createContext, useContext, useMemo, ReactNode } from "react";
import {
    ArrowRight, Bike, Car, ChevronDown, ChevronLeft,
    ChevronRight, Clock3, MapPin, MessageCircle,
    Phone, ShoppingBag, Star, Utensils, Users, Wheat, Accessibility,
    X, Plus, Navigation, Percent, Wifi, Coffee
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getFeaturedProducts, getPrimaryOffer, getCommonMenu, getCommonCategories, getCentreBySlugOrId, getReviews } from "../../lib/api";

const ORDERED_DAYS = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
];

const DAY_KEY_BY_INDEX = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

function formatTimingValue(timeStr?: string): string {
    if (!timeStr) return "";
    const parts = timeStr.split(":");
    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1] || "0", 10);
    if (isNaN(hours)) return timeStr;

    if (hours === 0 && minutes === 0) {
        return "12:00 AM";
    }
    if (hours === 24 && minutes === 0) {
        return "12:00 AM";
    }

    const ampm = hours >= 12 && hours < 24 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;

    const formattedMinutes = minutes === 0 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMinutes} ${ampm}`;
}

function formatDayTiming(timing?: { open?: string; close?: string; isClosed?: boolean }): string {
    if (!timing) return "7:00 AM – 11:00 PM";
    if (timing.isClosed) return "Closed";
    if (timing.open && timing.close) {
        return `${formatTimingValue(timing.open)} – ${formatTimingValue(timing.close)}`;
    }
    return "7:00 AM – 11:00 PM";
}

function getStoreOpenStatus(timings: any): { isOpen: boolean; statusLabel: string; todayTimingText: string; todayKey: string } {
    const now = new Date();
    const todayIndex = now.getDay();
    const todayKey = DAY_KEY_BY_INDEX[todayIndex];

    if (!timings || typeof timings !== "object" || Object.keys(timings).length === 0) {
        return {
            isOpen: true,
            statusLabel: "Open Now",
            todayTimingText: "Open 7:00 AM – 11:00 PM",
            todayKey,
        };
    }

    const todayTiming = timings[todayKey];
    let todayTimingText = "Open 7:00 AM – 11:00 PM";
    if (todayTiming) {
        if (todayTiming.isClosed) {
            todayTimingText = "Closed Today";
        } else if (todayTiming.open && todayTiming.close) {
            todayTimingText = `Open ${formatTimingValue(todayTiming.open)} – ${formatTimingValue(todayTiming.close)}`;
        }
    }

    // Check yesterday's overnight shift
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const prevKey = DAY_KEY_BY_INDEX[(todayIndex + 6) % 7];
    const prevTiming = timings[prevKey];
    if (prevTiming && !prevTiming.isClosed && prevTiming.open && prevTiming.close) {
        const [pOpenH, pOpenM] = prevTiming.open.split(":").map(Number);
        const [pCloseH, pCloseM] = prevTiming.close.split(":").map(Number);
        const pOpenMins = pOpenH * 60 + pOpenM;
        const pCloseMins = pCloseH * 60 + pCloseM;
        if (pCloseMins > 0 && pCloseMins < pOpenMins && currentMinutes < pCloseMins) {
            return {
                isOpen: true,
                statusLabel: "Open Now",
                todayTimingText,
                todayKey,
            };
        }
    }

    if (!todayTiming || todayTiming.isClosed || !todayTiming.open || !todayTiming.close) {
        return {
            isOpen: false,
            statusLabel: "Closed",
            todayTimingText: todayTimingText || "Closed",
            todayKey,
        };
    }

    const [openH, openM] = todayTiming.open.split(":").map(Number);
    const [closeH, closeM] = todayTiming.close.split(":").map(Number);

    const openMins = openH * 60 + openM;
    let closeMins = closeH * 60 + closeM;

    if (closeMins === 0 || closeMins < openMins) {
        closeMins += 24 * 60;
    }

    const isOpen = currentMinutes >= openMins && currentMinutes < closeMins;

    return {
        isOpen,
        statusLabel: isOpen ? "Open Now" : "Closed",
        todayTimingText,
        todayKey,
    };
}

function getFacilityIcon(name: string) {
    const lower = name.toLowerCase();
    if (lower.includes("dine") || lower.includes("food") || lower.includes("restaurant")) return Utensils;
    if (lower.includes("takeaway") || lower.includes("bag") || lower.includes("take out") || lower.includes("take-away")) return ShoppingBag;
    if (lower.includes("delivery") || lower.includes("bike")) return Bike;
    if (lower.includes("park") || lower.includes("car")) return Car;
    if (lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("internet")) return Wifi;
    if (lower.includes("ac") || lower.includes("air") || lower.includes("lounge")) return Coffee;
    if (lower.includes("family") || lower.includes("kid")) return Users;
    if (lower.includes("pet")) return Wheat;
    if (lower.includes("wheelchair") || lower.includes("access")) return Accessibility;
    return Coffee;
}

function parseFacilityItem(item: any): { icon: any; title: string; detail: string } {
    if (typeof item === "object" && item !== null) {
        const title = item.title || item.name || "Facility";
        const detail = item.detail || "Available";
        return {
            icon: item.icon || getFacilityIcon(title),
            title,
            detail,
        };
    }

    const str = String(item || "").trim();
    const lower = str.toLowerCase();

    if (lower.includes("ample parking")) {
        return { icon: Car, title: "Ample", detail: "Parking" };
    }
    if (lower === "parking" || lower.includes("parking")) {
        return { icon: Car, title: "Parking", detail: "Available" };
    }
    if (lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("internet")) {
        return { icon: Wifi, title: "Free Wi-Fi", detail: "Available" };
    }
    if (lower.includes("ac lounge") || lower.includes("air conditioned")) {
        return { icon: Coffee, title: "AC Lounge", detail: "Available" };
    }
    if (lower.includes("family")) {
        return { icon: Users, title: "Family", detail: "Friendly" };
    }
    if (lower.includes("pet")) {
        return { icon: Wheat, title: "Pet Friendly", detail: "(Outdoor)" };
    }
    if (lower.includes("wheelchair") || lower.includes("accessible")) {
        return { icon: Accessibility, title: "Wheelchair", detail: "Accessible" };
    }
    if (lower.includes("dine")) {
        return { icon: Utensils, title: "Dine-in", detail: "Available" };
    }
    if (lower.includes("takeaway") || lower.includes("take-away") || lower.includes("takeout")) {
        return { icon: ShoppingBag, title: "Takeaway", detail: "Available" };
    }
    if (lower.includes("delivery")) {
        return { icon: Bike, title: "Home Delivery", detail: "Available" };
    }

    return {
        icon: getFacilityIcon(str),
        title: str,
        detail: "Available",
    };
}

function isReviewForCentre(review: any, centre: any): boolean {
    if (!review || !centre) return false;

    const centreId = centre.id ? String(centre.id).trim() : "";
    const centreSlug = centre.slug ? String(centre.slug).trim().toLowerCase() : "";
    const centreName = centre.name ? String(centre.name).trim().toLowerCase() : "";
    const centreCity = centre.city ? String(centre.city).trim().toLowerCase() : "";
    const centreLocality = centre.locality ? String(centre.locality).trim().toLowerCase() : "";

    const revCentreId = review.relatedCentreId ? String(review.relatedCentreId).trim() : (review.relatedCentre?.id ? String(review.relatedCentre.id).trim() : "");
    const revCentreSlug = review.relatedCentreSlug ? String(review.relatedCentreSlug).trim().toLowerCase() : (review.relatedCentre?.slug ? String(review.relatedCentre.slug).trim().toLowerCase() : "");
    const revCentreName = review.relatedCentreName ? String(review.relatedCentreName).trim().toLowerCase() : (review.relatedCentre?.name ? String(review.relatedCentre.name).trim().toLowerCase() : "");
    const revRole = review.reviewerRole ? String(review.reviewerRole).trim().toLowerCase() : "";

    // 1. Direct ID match
    if (centreId && revCentreId && centreId === revCentreId) {
        return true;
    }

    // 2. Direct Slug match
    if (centreSlug && (revCentreSlug === centreSlug || revCentreId === centreSlug)) {
        return true;
    }

    // 3. Centre name match
    if (centreName && revCentreName && (revCentreName === centreName || revCentreName.includes(centreName) || centreName.includes(revCentreName))) {
        return true;
    }

    // 4. Role mentions this centre's locality or city specifically, and doesn't belong to a different centre
    if (!revCentreId && !revCentreName) {
        if (centreLocality && revRole.includes(centreLocality)) return true;
        if (centreCity && revRole.includes(centreCity)) return true;
    }

    return false;
}

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

const defaultFacilities = [
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
                const [centreData, featuredData, menuData, primaryOfferData, reviewsData] = await Promise.allSettled([
                    getCentreBySlugOrId(slugOrId),
                    getFeaturedProducts(6),
                    getCommonMenu(),
                    getPrimaryOffer(),
                    getReviews({ status: "published" }),
                ]);

                if (!isMounted) return;

                // 1. Set Centre data & only keep reviews relevant to this centre
                if (centreData.status === "fulfilled" && centreData.value) {
                    let targetCentre = centreData.value;
                    const initialReviews = Array.isArray(targetCentre.reviews) ? targetCentre.reviews : [];
                    const filteredInitial = initialReviews.filter((r: any) => isReviewForCentre(r, targetCentre));

                    let combined = [...filteredInitial];

                    if (reviewsData.status === "fulfilled" && Array.isArray(reviewsData.value)) {
                        const liveReviews = reviewsData.value;
                        const relevantLive = liveReviews.filter((r: any) => {
                            const isCust = r.reviewType === "customer" || r.categoryId === "customer" || !r.reviewType;
                            const isPub = r.status === "published" || !r.status;
                            return isPub && isCust && isReviewForCentre(r, targetCentre);
                        });

                        for (const rev of relevantLive) {
                            if (!combined.some((c: any) => c.id === rev.id)) {
                                combined.push(rev);
                            }
                        }
                    }

                    combined.sort((a: any, b: any) => {
                        const featA = a.isFeatured ? 1 : 0;
                        const featB = b.isFeatured ? 1 : 0;
                        if (featA !== featB) return featB - featA;
                        return (a.displayOrder || 0) - (b.displayOrder || 0);
                    });

                    targetCentre = { ...targetCentre, reviews: combined };
                    setCentre(targetCentre);
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

    const { isOpen, statusLabel, todayTimingText, todayKey } = useMemo(
        () => getStoreOpenStatus(centre?.timings),
        [centre?.timings]
    );

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
                <a href="/locations">Our Centres</a>
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
                        <span
                            className="detailscentres-open-badge"
                            style={
                                !isOpen
                                    ? {
                                        backgroundColor: "#fee2e2",
                                        color: "#991b1b",
                                        borderColor: "#fecaca",
                                    }
                                    : undefined
                            }
                        >
                            <i style={!isOpen ? { backgroundColor: "#ef4444" } : undefined} />
                            {statusLabel}
                        </span>
                        <span className="detailscentres-hours-short">
                            <Clock3 size={17} />
                            {todayTimingText}
                        </span>
                        {/* <button className="detailscentres-text-button" onClick={() => setShowHours(!showHours)}>
                            View All Timings <ChevronDown size={14} />
                        </button> */}
                    </div>

                    {showHours && (
                        <div className="detailscentres-hours-popover" style={{ minWidth: "280px", maxWidth: "340px" }}>
                            <b style={{ marginBottom: "6px", display: "block", fontSize: "14px" }}>Opening Hours</b>
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                {ORDERED_DAYS.map(({ key, label }) => {
                                    const isToday = key === todayKey;
                                    const timingText = formatDayTiming(centre?.timings?.[key]);
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                fontSize: "13px",
                                                padding: isToday ? "4px 8px" : "2px 0",
                                                borderRadius: "6px",
                                                background: isToday ? "#e8f5e9" : "transparent",
                                                color: isToday ? "#1b5e20" : "#333333",
                                                fontWeight: isToday ? 700 : 500,
                                            }}
                                        >
                                            <span>
                                                {label}
                                                {isToday && (
                                                    <span style={{ fontSize: "11px", marginLeft: "4px", color: "#2e7d32" }}>
                                                        (Today)
                                                    </span>
                                                )}
                                            </span>
                                            <strong style={{ fontWeight: isToday ? 700 : 600 }}>{timingText}</strong>
                                        </div>
                                    );
                                })}
                            </div>
                            <small style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #e5e7eb", display: "block" }}>
                                {centre?.holidayHours || "Hours may vary on holidays."}
                            </small>
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
    const { centre } = useStoreData();

    const displayFacilities = useMemo(() => {
        if (centre?.facilities && Array.isArray(centre.facilities) && centre.facilities.length > 0) {
            return centre.facilities.map(parseFacilityItem);
        }
        return defaultFacilities;
    }, [centre?.facilities]);

    return (
        <section className="detailscentres-facilities" aria-label="Cafe facilities">
            {displayFacilities.map(
                (
                    { icon: Icon, title, detail }: {
                        icon: React.ElementType;
                        title: string;
                        detail: string;
                    },
                    idx: number
                ) => (
                    <div
                        className="detailscentres-facility"
                        key={`${title}-${idx}`}
                    >
                        <span className="detailscentres-round-icon">
                            <Icon size={21} />
                        </span>

                        <span>
                            <b>{title}</b>
                            <small>{detail}</small>
                        </span>
                    </div>
                )
            )}
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
    "https://185.158.66.148.host.secureserver.net/teamax-api/api/v1";

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

// Resolve category images using the same category image rules as HomeMenuCategories.
function resolveStoreCategoryImage(cat: any): string {
    const img = cat?.image;

    if (
        typeof img === "string" &&
        !img.startsWith("blob:") &&
        (img.startsWith("http://") ||
            img.startsWith("https://") ||
            img.startsWith("/"))
    ) {
        return img;
    }

    const name = (cat?.name || "").toLowerCase();
    const slug = (cat?.slug || "").toLowerCase();

    if (
        name.includes("classic") ||
        name.includes("kadak") ||
        name.includes("chai") ||
        slug.includes("chai") ||
        name.includes("tea") ||
        slug.includes("tea")
    ) {
        return "https://cafe-blueprint-magic.lovable.app/assets/menu-tea-GDCVsE9V.jpg";
    }

    if (name.includes("coffee") || slug.includes("coffee")) {
        return "https://cafe-blueprint-magic.lovable.app/assets/menu-coffee-DRjZy5Da.jpg";
    }

    if (name.includes("burger") || slug.includes("burger")) {
        return "https://cafe-blueprint-magic.lovable.app/assets/hero-cafe-zlWPzgb-.jpg";
    }

    if (
        name.includes("snack") ||
        name.includes("samosa") ||
        name.includes("fries") ||
        name.includes("bite") ||
        slug.includes("snack")
    ) {
        return "https://cafe-blueprint-magic.lovable.app/assets/menu-fries-CAp5uNC2.jpg";
    }

    if (
        name.includes("shake") ||
        name.includes("brew") ||
        name.includes("ice") ||
        slug.includes("shake")
    ) {
        return "https://cafe-blueprint-magic.lovable.app/assets/menu-shake-DCrFsPuS.jpg";
    }

    if (name.includes("sandwich") || slug.includes("sandwich")) {
        return "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80";
    }

    if (name.includes("kulhad") || slug.includes("kulhad")) {
        return "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80";
    }

    if (name.includes("artisan") || slug.includes("artisan")) {
        return "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80";
    }

    return "https://cafe-blueprint-magic.lovable.app/assets/hero-cafe-zlWPzgb-.jpg";
}

export function StoreSections() {
    const { offer, centre } = useStoreData();
    const [categories, setCategories] = useState<any[]>([]);
    const [openFaq, setOpenFaq] = useState(0);

    const { todayKey } = useMemo(
        () => getStoreOpenStatus(centre?.timings),
        [centre?.timings]
    );

    const displayFaqs = useMemo(() => {
        if (centre?.faqs && Array.isArray(centre.faqs) && centre.faqs.length > 0) {
            const mapped = centre.faqs
                .map((f: any) => ({
                    q: f.q || f.question || f.title || "",
                    a: f.a || f.answer || f.content || f.description || "",
                }))
                .filter((f: any) => f.q && f.a);
            if (mapped.length > 0) return mapped;
        }
        return defaultFaqs;
    }, [centre?.faqs]);

    const storeReviews = useMemo(() => {
        if (!centre?.reviews || !Array.isArray(centre.reviews)) return [];
        return centre.reviews
            .filter((r: any) => isReviewForCentre(r, centre))
            .map((r: any) => ({
                id: r.id,
                name: r.reviewerName || r.name || "Customer",
                initials: (r.reviewerName || r.name || "TM")
                    .split(" ")
                    .filter(Boolean)
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase(),
                avatar: r.reviewerAvatar || r.avatar || null,
                text: r.reviewText || r.text || r.comment || "",
                stars: Number(r.starRating || r.stars || r.rating || 5),
            }));
    }, [centre]);

    // Load active categories dynamically from the same API used on the home page.
    useEffect(() => {
        let isMounted = true;

        async function loadCategories() {
            try {
                const apiCategories = await getCommonCategories();

                if (!isMounted) return;

                if (!Array.isArray(apiCategories)) {
                    setCategories([]);
                    return;
                }

                const activeCategories = apiCategories
                    .filter((item: any) => item.status === "active")
                    .sort(
                        (a: any, b: any) =>
                            (a.displayOrder ?? 99) - (b.displayOrder ?? 99)
                    )
                    .slice(0, 6);

                setCategories(
                    activeCategories.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        image: resolveStoreCategoryImage(item),
                    }))
                );
            } catch (error) {
                console.warn(
                    "[StoreSections] Failed to load dynamic categories:",
                    error
                );

                if (isMounted) {
                    setCategories([]);
                }
            }
        }

        loadCategories();

        return () => {
            isMounted = false;
        };
    }, []);

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
            {/* Dynamic Categories Section */}
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

                <div className="detailscentres-category-grid">
                    {categories.map((item) => (
                        <a
                            href={
                                item.slug
                                    ? `/menu?category=${encodeURIComponent(item.slug)}`
                                    : "/menu"
                            }
                            className="detailscentres-category-card"
                            key={item.id || item.slug || item.name}
                        >
                            <img
                                src={item.image}
                                alt={`${item.name} at TeaMax`}
                                loading="lazy"
                            />

                            <div className="detailscentres-category-overlay">
                                <h3>{item.name}</h3>
                                <span>
                                    Explore Category <ArrowRight size={15} />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Reviews Section */}
            <section className="detailscentres-section">
                <div className="detailscentres-section-heading">
                    <div>
                        <span className="detailscentres-eyebrow">WHAT PEOPLE SAY</span>
                        <h2>Loved by our guests</h2>
                    </div>
                    <div className="detailscentres-review-summary">
                        <Star fill="currentColor" /> <b>{centre?.averageRating || 4.8}/5</b>{" "}
                        <span>
                            {storeReviews.length > 0
                                ? `${storeReviews.length} reviews`
                                : typeof centre?.reviewCount === "number"
                                    ? `${centre.reviewCount} reviews`
                                    : "0 reviews"}
                        </span>
                    </div>
                </div>

                <div className="detailscentres-reviews-grid">
                    {storeReviews.length > 0 ? (
                        storeReviews.map((review: any) => (
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
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "48px 24px",
                                gridColumn: "1 / -1",
                                background: "#fbfaf8",
                                borderRadius: "12px",
                                border: "1px dashed #dcd8cf",
                            }}
                        >
                            <p style={{ fontSize: "16px", fontWeight: 700, color: "#172b28", marginBottom: "6px" }}>
                                No reviews yet for {centreName}
                            </p>
                            <p style={{ fontSize: "14px", color: "#687770" }}>
                                Visit our café and be the first to share your experience!
                            </p>
                        </div>
                    )}
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
                            {centre?.timings && typeof centre.timings === "object" ? (
                                ORDERED_DAYS.map(({ key, label }) => {
                                    const isToday = key === todayKey;
                                    const timingText = formatDayTiming(centre.timings[key]);
                                    return (
                                        <div
                                            key={key}
                                            style={
                                                isToday
                                                    ? {
                                                        backgroundColor: "#f0fdf4",
                                                        padding: "8px 10px",
                                                        borderRadius: "6px",
                                                        fontWeight: 700,
                                                    }
                                                    : undefined
                                            }
                                        >
                                            <span style={isToday ? { color: "#166534" } : undefined}>
                                                {label}
                                                {isToday && " (Today)"}
                                            </span>
                                            <b style={isToday ? { color: "#166534" } : undefined}>{timingText}</b>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>
                                    <span>Monday – Sunday</span>
                                    <b>7:00 AM – 11:00 PM</b>
                                </div>
                            )}
                            <small>{centre?.holidayHours || "Contact the cafe for holiday timings."}</small>
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

            {/* FAQs Section - Dynamic Centre FAQs */}
            {displayFaqs.length > 0 && (
                <section
                    className="detailscentres-section detailscentres-faq-section"
                    id="centre-faq"
                >
                    <div className="detailscentres-faq-intro">
                        <span className="detailscentres-eyebrow">
                            GOOD TO KNOW
                        </span>

                        <h2>A few things you might be wondering</h2>

                        <p>
                            Everything you need to plan your next TeaMax visit.
                        </p>

                        <div className="detailscentres-faq-art">
                            <img
                                src="https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg"
                                alt="Coffee at TeaMax"
                            />
                            <span>Chai, chat<br />and chill!</span>
                        </div>
                    </div>

                    <div className="detailscentres-faq-list">
                        {displayFaqs.map(
                            (faq: { q: string; a: string }, i: number) => (
                                <article
                                    key={`${faq.q}-${i}`}
                                    className="detailscentres-faq-item"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(openFaq === i ? -1 : i)
                                        }
                                        aria-expanded={openFaq === i}
                                    >
                                        {faq.q}

                                        {openFaq === i
                                            ? <X size={17} />
                                            : <Plus size={17} />
                                        }
                                    </button>

                                    {openFaq === i && <p>{faq.a}</p>}
                                </article>
                            ))}
                    </div>
                </section>
            )}

        </>
    );
}
