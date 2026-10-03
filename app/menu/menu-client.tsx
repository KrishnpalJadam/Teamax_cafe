"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Grid2X2,
  Coffee,
  Utensils,
  Sandwich,
  IceCreamBowl,
  Plus,
  ChevronDown,
  ChevronRight,
  Popcorn,
  Soup,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  isVeg: boolean;
  isPopular?: boolean;
  isWellness?: boolean;
  badge?: string;
  priceNote?: string;
  price?: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  image: string;
  icon: string;
  specialtyBadge?: string;
}

interface MenuClientProps {
  categories: MenuCategory[];
  items: MenuItem[];
}

const categoryIcons: Record<string, React.ElementType> = {
  all: Grid2X2,
  tea: Coffee,
  coffee: Coffee,
  burgers: Utensils,
  snacks: Popcorn,
  sandwiches: Sandwich,
  thickshakes: IceCreamBowl,
  "hot-beverages": Coffee,
  "special-coffees": Coffee,
  "herbal-teas": Coffee,
};

const categoryImages: Record<string, string> = {
  tea: "/images/chai.webp",
  coffee: "/images/coffee.webp",
  burgers: "/images/hero-cafe.jpg",
  snacks: "/images/cafe-interior.jpg",
  sandwiches: "/images/cafe-interior.jpg",
  thickshakes: "/images/milkshake.webp",
};

const displayCategories = [
  {
    id: "all",
    name: "All Items",
    icon: "all",
  },
  {
    id: "tea",
    name: "Tea",
    icon: "tea",
  },
  {
    id: "coffee",
    name: "Coffee",
    icon: "coffee",
  },
  {
    id: "burgers",
    name: "Burgers",
    icon: "burgers",
  },
  {
    id: "snacks",
    name: "Snacks",
    icon: "snacks",
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: "sandwiches",
  },
  {
    id: "thickshakes",
    name: "Thickshakes",
    icon: "thickshakes",
  },
];

const mockupItems: MenuItem[] = [
  {
    id: "masala-chai",
    name: "Masala Chai",
    description:
      "Our signature masala chai with rich Indian spices.",
    category: "Tea",
    categoryId: "tea",
    isVeg: true,
    isPopular: true,
    badge: "Popular",
    price: 20,
    image: "/images/chai.webp",
  },
  {
    id: "classic-coffee",
    name: "Classic Coffee",
    description:
      "Freshly brewed classic hot coffee.",
    category: "Coffee",
    categoryId: "coffee",
    isVeg: true,
    price: 49,
    image: "/images/coffee.webp",
  },
  {
    id: "cheese-burger",
    name: "Cheese Burger",
    description:
      "Loaded with cheese and fresh toppings.",
    category: "Burgers",
    categoryId: "burgers",
    isVeg: true,
    price: 149,
    image: "/images/coffee.webp",
  },
  {
    id: "peri-peri-fries",
    name: "Peri Peri Fries",
    description:
      "Spicy and flavourful peri peri fries.",
    category: "Snacks",
    categoryId: "snacks",
    isVeg: true,
    price: 59,
    image: "/images/cafe-interior.jpg",
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    description:
      "Chilled coffee with a smooth taste.",
    category: "Coffee",
    categoryId: "coffee",
    isVeg: true,
    price: 99,
    image: "/images/milkshake.webp",
  },
  {
    id: "paneer-burger",
    name: "Paneer Burger",
    description:
      "Grilled paneer with lettuce and mayo.",
    category: "Burgers",
    categoryId: "burgers",
    isVeg: true,
    price: 129,
    image: "/images/hero-cafe.jpg",
  },
  {
    id: "veg-sandwich",
    name: "Veg Sandwich",
    description:
      "Grilled sandwich with fresh vegetables.",
    category: "Sandwiches",
    categoryId: "sandwiches",
    isVeg: true,
    price: 89,
    image: "/images/coffee.webp",
  },
  {
    id: "chocolate-shake",
    name: "Chocolate Shake",
    description:
      "Rich chocolate with ice cream.",
    category: "Thickshakes",
    categoryId: "thickshakes",
    isVeg: true,
    price: 99,
    image: "/images/milkshake.webp",
  },
  {
    id: "strawberry-shake",
    name: "Strawberry Shake",
    description:
      "Fresh strawberries with creamy goodness.",
    category: "Thickshakes",
    categoryId: "thickshakes",
    isVeg: true,
    price: 99,
    image: "/images/milkshake.webp",
  },
];

function normalizeItems(items: MenuItem[]) {
  const hasPrice = items.some(
    (item) => typeof item.price === "number"
  );

  if (hasPrice) {
    return items;
  }

  return mockupItems;
}

export function MenuClient({
  categories,
  items,
}: MenuClientProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [sortBy, setSortBy] =
    useState("popular");

  const sourceItems = normalizeItems(items);

  const filteredItems = useMemo(() => {
    let result = sourceItems.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" ||
        item.categoryId === selectedCategory;

      const query =
        searchQuery.trim().toLowerCase();

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description
          .toLowerCase()
          .includes(query) ||
        item.category
          .toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });

    if (sortBy === "popular") {
      result = [...result].sort(
        (a, b) =>
          Number(Boolean(b.isPopular)) -
          Number(Boolean(a.isPopular))
      );
    }

    if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) =>
          (a.price ?? 0) -
          (b.price ?? 0)
      );
    }

    return result;
  }, [
    sourceItems,
    selectedCategory,
    searchQuery,
    sortBy,
  ]);

  const activeCategory =
    displayCategories.find(
      (item) => item.id === selectedCategory
    );

  return (
    <section className="tx-menu-shell">

      {/* SEARCH */}
      <div className="tx-menu-search-wrap">
        <form
          className="tx-menu-search"
          role="search"
          onSubmit={(event) =>
            event.preventDefault()
          }
        >
          <Search
            size={21}
            strokeWidth={2.5}
            className="tx-menu-search-icon"
            aria-hidden="true"
          />

          <input
            type="search"
            className="tx-menu-search-input"
            aria-label="Search menu"
            placeholder="Search for tea, coffee, burger, sandwich..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          <button
            type="submit"
            className="tx-menu-search-button"
          >
            Search
          </button>
        </form>
      </div>

      {/* MENU */}
      <div className="tx-menu-area">

        {/* SIDEBAR */}
        <aside
          className="tx-menu-category-panel"
          aria-label="Menu categories"
        >
          <div className="tx-menu-category-list">

            {displayCategories.map(
              (category) => {
                const Icon =
                  categoryIcons[
                    category.icon
                  ] ?? Soup;

                const isSelected =
                  selectedCategory ===
                  category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`tx-menu-category-button ${
                      isSelected
                        ? "is-selected"
                        : ""
                    }`}
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelectedCategory(
                        category.id
                      )
                    }
                  >
                    <Icon
                      className="tx-menu-category-icon"
                      size={26}
                    />

                    <span>
                      {category.name}
                    </span>

                    {isSelected && (
                      <ChevronRight
                        size={17}
                        className="tx-menu-selected-arrow"
                      />
                    )}
                  </button>
                );
              }
            )}

          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="tx-menu-content">

          <div className="tx-menu-heading-row">

            <div>
              <h2 className="tx-menu-heading">
                {activeCategory?.name ||
                  "All Items"}
              </h2>

              <span className="tx-menu-yellow-rule" />

              <p className="tx-menu-description">
                {selectedCategory === "all"
                  ? "Explore our complete menu of delicious food & beverages."
                  : `Explore our ${activeCategory?.name.toLowerCase()} favourites.`}
              </p>
            </div>

            <div className="tx-menu-sort">
              <label htmlFor="tx-menu-sort">
                Sort By:
              </label>

              <select
                id="tx-menu-sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="tx-menu-sort-select"
              >
                <option value="popular">
                  Popular
                </option>
                <option value="name">
                  Name
                </option>
                <option value="price-low">
                  Price Low
                </option>
              </select>

              <ChevronDown
                size={16}
                className="tx-menu-sort-icon"
                aria-hidden="true"
              />
            </div>

          </div>

          {filteredItems.length === 0 ? (
            <div className="tx-menu-empty">
              <Search size={35} />

              <h3>
                No menu items found
              </h3>

              <p>
                Try another search or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                View All Items
              </button>
            </div>
          ) : (
            <div className="tx-menu-product-grid">

              {filteredItems.map((item) => {
                const image =
                  item.image ||
                  categoryImages[
                    item.categoryId
                  ] ||
                  "/images/chai.webp";

                return (
                  <article
                    className="tx-menu-product-card"
                    key={item.id}
                  >
                    <div className="tx-menu-photo-wrap">

                      <img
                        className="tx-menu-product-photo"
                        src={image}
                        alt={`${item.name} at TeaMax Café`}
                        loading="lazy"
                      />

                      {item.isPopular && (
                        <span className="tx-menu-popular-badge">
                          <span>★</span>
                          Popular
                        </span>
                      )}

                    </div>

                    <div className="tx-menu-product-details">

                      <div>
                        <h3 className="tx-menu-product-name">
                          {item.name}
                        </h3>

                        {/* <p className="tx-menu-product-price">
                          ₹{item.price ?? "—"}
                        </p> */}

                        <p className="tx-menu-product-description">
                          {item.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="tx-menu-add-button"
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus
                          size={18}
                          strokeWidth={2.4}
                        />
                      </button>

                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </div>
      </div>

   
<section id="contact" className="container-xl contact-section topmaring">
        <div className="contact-banner">
          <img  src="/images/signature-chai.webp"  width={1200} height={704} alt="A warm cup of chai at TeaMax Café"  loading="lazy" />
          <div className="contact-shape">
            <h2>Try Our Signature<br /> Masala Chai</h2>
        
           
            <p>  A perfect blend of spices, served with
            love to make your day better.</p>
            <Link href="/franchise#apply" className="cafe-action">Get Franchise Details <ArrowRight size={17} /></Link>
          </div>
          <div className="contact-script">Chai<br /><span>People</span><br />Good<br /><span>Stories</span></div>
        </div>
      </section>
    </section>
  );
}