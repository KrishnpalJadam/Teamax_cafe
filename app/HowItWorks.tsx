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
      className="steps-section container-xl "
      aria-labelledby="how-heading"
    >
      <div className="section-heading steps-heading">
        <div>
          <h2 id="how-heading">How It Works?</h2>
          <span className="short-line" />
        </div>

        <p>
          A simple 4-step process to start your TeaMax Café.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map(({ icon: Icon, title, detail }, index) => (
          <div className="step" key={title}>
            <div className="step-count">
              <span>{index + 1}</span>
              {/* <b>{index + 1}</b> */}
            </div>

            <span className="step-icon" aria-hidden="true">
              <Icon size={28} strokeWidth={1.5} />
            </span>

            <h3>{title}</h3>

            <p>{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}