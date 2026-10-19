"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCommonCategories, getCommonMenu } from "../lib/api";

const A = "https://cafe-blueprint-magic.lovable.app/assets";

interface CategoryCardItem {
  id: string;
  name: string;
  slug?: string;
  qnt: string;
  image: string;
  alt: string;
}

const defaultMenuItems: CategoryCardItem[] = [
  { id: "tea", name: "Tea", qnt: "20", image: `${A}/menu-tea-GDCVsE9V.jpg`, alt: "Tea served at TeaMax" },
  { id: "coffee", name: "Coffee", qnt: "49", image: `${A}/menu-coffee-DRjZy5Da.jpg`, alt: "Coffee served at TeaMax" },
  { id: "burgers", name: "Burgers", qnt: "149", image: `${A}/hero-cafe-zlWPzgb-.jpg`, alt: "TeaMax burger with fries and coffee" },
  { id: "snacks", name: "Snacks", qnt: "59", image: `${A}/menu-fries-CAp5uNC2.jpg`, alt: "TeaMax fries and snacks" },
  { id: "thickshakes", name: "Thickshakes", qnt: "99", image: `${A}/menu-shake-DCrFsPuS.jpg`, alt: "TeaMax thickshake" },
];

function resolveCategoryImage(cat: any): string {
  const img = cat.image;
  if (
    img &&
    typeof img === "string" &&
    !img.startsWith("blob:") &&
    (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/"))
  ) {
    return img;
  }

  const name = (cat.name || "").toLowerCase();
  const slug = (cat.slug || "").toLowerCase();

  if (name.includes("classic") || name.includes("kadak") || name.includes("chai") || slug.includes("chai") || name.includes("tea") || slug.includes("tea")) {
    return `${A}/menu-tea-GDCVsE9V.jpg`;
  }
  if (name.includes("coffee") || slug.includes("coffee")) {
    return `${A}/menu-coffee-DRjZy5Da.jpg`;
  }
  if (name.includes("burger") || slug.includes("burger")) {
    return `${A}/hero-cafe-zlWPzgb-.jpg`;
  }
  if (name.includes("snack") || name.includes("samosa") || name.includes("fries") || name.includes("bite") || slug.includes("snack")) {
    return `${A}/menu-fries-CAp5uNC2.jpg`;
  }
  if (name.includes("shake") || name.includes("brew") || name.includes("ice") || slug.includes("shake")) {
    return `${A}/menu-shake-DCrFsPuS.jpg`;
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
  return `${A}/hero-cafe-zlWPzgb-.jpg`;
}

function resolveStartingPrice(cat: any, menuItems: any[]): string {
  const catItems = menuItems.filter(
    (item) =>
      item.categoryId === cat.id ||
      item.category?.id === cat.id ||
      item.category?.slug === cat.slug ||
      item.category?.name?.toLowerCase() === cat.name?.toLowerCase()
  );

  const prices = catItems
    .map((item) => Number(item.price))
    .filter((p) => !isNaN(p) && p > 0);

  if (prices.length > 0) {
    return `${Math.min(...prices)}`;
  }

  // Fallback defaults by keyword
  const name = (cat.name || "").toLowerCase();
  if (name.includes("chai") || name.includes("tea")) return "20";
  if (name.includes("coffee")) return "49";
  if (name.includes("burger")) return "149";
  if (name.includes("sandwich")) return "149";
  if (name.includes("snack") || name.includes("samosa") || name.includes("fries") || name.includes("bite")) return "59";
  if (name.includes("shake")) return "99";
  return "29";
}

export default function HomeMenuCategories() {
  const [categories, setCategories] = useState<CategoryCardItem[]>(defaultMenuItems);

  useEffect(() => {
    let mounted = true;

    async function loadDynamicCategories() {
      try {
        const [apiCategories, apiMenu] = await Promise.all([
          getCommonCategories(),
          getCommonMenu().catch(() => []),
        ]);

        if (!mounted || !Array.isArray(apiCategories) || apiCategories.length === 0) {
          return;
        }

        const menuList = Array.isArray(apiMenu) ? apiMenu : [];

        // Filter active categories and sort by displayOrder
        const activeCategories = apiCategories
          .filter((c: any) => c.status === "active")
          .sort((a: any, b: any) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));

        if (activeCategories.length > 0) {
          const dynamicCards: CategoryCardItem[] = activeCategories.map((c: any) => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            qnt: resolveStartingPrice(c, menuList),
            image: resolveCategoryImage(c),
            alt: `${c.name} at TeaMax Café`,
          }));

          setCategories(dynamicCards);
        }
      } catch (err) {
        console.warn("[HomeMenuCategories] Failed to load dynamic categories:", err);
      }
    }

    loadDynamicCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="menu" className="menu-section container-xl section-space">
      <div className="section-heading menu-heading-grid">
        <div>
          <p className="kicker"><span>O</span>ur Menu</p>
          <h2>Something for<br />Every Craving </h2>
          <span className="short-line" />
        </div>
        <div className="menu-intro">
          <p>From classic teas and coffees to shakes, snacks and quick bites, TeaMax offers a menu designed for everyday café moments.</p>
          <Link href="/menu" className="cafe-action cafe-outline">Explore Full Menu <ArrowRight size={17} /></Link>
        </div>
      </div>
      <div id="menu-cards" className="menu-grid">
        {categories.map((item) => (
          <Link
            href={item.slug ? `/menu?category=${encodeURIComponent(item.slug)}` : "/menu"}
            className="menu-card"
            key={item.id || item.name}
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={816}
              height={816}
              unoptimized
              loading="lazy"
            />
            <div className="menu-card-copy">
              <h3>{item.name}</h3>
              <p>Start from ₹{item.qnt} </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
