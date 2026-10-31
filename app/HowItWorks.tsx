"use client";

import {
  FileText,
  MessageCircle,
  Store,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply",
    detail: "Fill the franchise form",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    detail: "Discuss with our team",
  },
  {
    icon: Store,
    title: "Confirm",
    detail: "Finalize location & agreement",
  },
  {
    icon: Rocket,
    title: "Launch",
    detail: "Get setup & start your café",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="steps-section container-xl"
      aria-labelledby="how-heading"
    >
      <div className="section-heading steps-heading">
        <div>
          <h2 id="how-heading">How It Works?</h2>
          <span className="short-line" />
        </div>


      </div>

      <div className="steps-grid">
        {steps.map(({ icon: Icon, title, detail }, index) => (
          <div className="step" key={title}>

            {/* Step Number */}
            <div className="step-count">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>

            {/* Lucide Icon */}
            <div className="step-icon-wrap">
              <Icon
                size={40}
                strokeWidth={1.8}
              />
            </div>

            {/* Step Content */}
            <h3>{title}</h3>

            <p>{detail}</p>

          </div>
        ))}
      </div>
    </section>
  );
}