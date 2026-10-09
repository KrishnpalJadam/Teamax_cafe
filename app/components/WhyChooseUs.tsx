import {
  ChefHat,
  Coins,
  Gauge,
  TrendingUp,
  Trash2,
  MonitorSmartphone,
} from "lucide-react";

import "./WhyChooseUs.css";

const whyChooseItems = [
  {
    title: "Chef-less Model",
    description:
      "Structured guidelines outlining procedures for consistent and safe cooking practices.",
    icon: ChefHat,
    iconClass: "tmx-wcu-icon-yellow",
  },
  {
    title: "Low Investment Setup",
    description:
      "Cost-effective arrangement requiring minimal initial capital for establishment or operation.",
    icon: Coins,
    iconClass: "tmx-wcu-icon-mint",
  },
  {
    title: "Minimum Risk Quotient",
    description:
      "Implementing standardized operating procedures (SOP) in cafe cooking to minimize risks.",
    icon: Gauge,
    iconClass: "tmx-wcu-icon-blue",
  },
  {
    title: "Quick ROI (8–12 Months)",
    description:
      "Implementing a business strategy that yields a rapid return on investment within 10–12 months.",
    icon: TrendingUp,
    iconClass: "tmx-wcu-icon-purple",
  },
  {
    title: "0% Wastage Ensured",
    description:
      "Efficient utilization of raw materials in cooking processes ensures 0 wastage, minimizing resource loss.",
    icon: Trash2,
    iconClass: "tmx-wcu-icon-green",
  },
  {
    title: "Tech Enabled (POS)",
    description:
      "Utilizing POS systems to streamline operations & enhance customer experience in cafes.",
    icon: MonitorSmartphone,
    iconClass: "tmx-wcu-icon-red",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="tmx-why-choose"
      aria-labelledby="tmx-why-choose-title"
    >
      <div className="tmx-why-choose-inner container-xl">

        {/* =========================================
            LEFT CONTENT
        ========================================= */}

        <div className="tmx-why-choose-intro">

          <div className="tmx-why-choose-product">
            <img
              src="/images/High Standards. Lower Costs.webp"
              alt="TeaMax tea packaging"
              loading="lazy"
            />
          </div>

          <h2
            id="tmx-why-choose-title"
            className="tmx-why-choose-heading"
          >
            Why Choose Us?
          </h2>

          <div className="tmx-why-choose-yellow-line" />

          <p className="tmx-why-choose-description">
            TeaMax Cafe India&apos;s professional approach ensures that
            packaging reflects our commitment to excellence without
            compromising on product integrity or customer satisfaction
            both for Franchisees &amp; Cafe Customers.
          </p>

        </div>

        {/* =========================================
            RIGHT CONTENT
        ========================================= */}

        <div className="tmx-why-choose-content">

          <div className="tmx-why-choose-grid">

            {whyChooseItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="tmx-why-choose-card"
                >

                  {/* Number - appears on hover */}
                  <span
                    className="tmx-why-choose-card-number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className={`tmx-why-choose-icon ${item.iconClass}`}
                  >
                    <Icon
                      size={42}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="tmx-why-choose-card-title">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="tmx-why-choose-card-description">
                    {item.description}
                  </p>

                </article>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}