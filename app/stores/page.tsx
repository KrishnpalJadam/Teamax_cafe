import { Header, Footer, FaqJsonLd, JsonLd } from "../components";

const faqs = [
  ["How do I find a TeaMax café near me?", "Use the café search on this page or contact the TeaMax team with your city or area."],
  ["Can I check café opening hours?", "Opening hours can vary by location. Confirm the current timings with the café before visiting."],
  ["Does every TeaMax café have the same menu?", "Core categories are designed to stay consistent, while availability and seasonal items can vary by location."],
  ["Can I order online?", "If online ordering is enabled for your local TeaMax café, use the ordering option shown by that outlet."],
];

const stores = [
  ["Your City Café", "Add your café address here", "Opening hours: Add local timings"],
  ["Neighbourhood Café", "Add another location here", "Opening hours: Add local timings"],
  ["Flagship Café", "Add your flagship address here", "Opening hours: Add local timings"],
];

export const dynamic = "force-static";

export const metadata = {
  title: "Find a TeaMax Café Near You | Store Locator",
  description:
    "Find a TeaMax café near you. Search by city or area and check local café details, opening hours and visit information.",
};

export default function StoresPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TeaMax Café Locations",
    description: "Find TeaMax cafés by city and area.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: stores.map(([name, address], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        description: address,
      })),
    },
  };

  return (
    <>
      <Header active="/stores" />
      <main id="top" className="page-shell">
        <section className="page-hero" id="visit">
          <div className="page-hero-inner">
            <div>
              <span className="eyebrow">Store locator</span>
              <h1 className="page-title">Find your nearest TeaMax.</h1>
              <p className="page-lead">
                Search by city, neighbourhood or area to discover a TeaMax café and plan your visit.
              </p>
            </div>
            <div className="hero-art">
              <img src="/images/cafe-interior.jpg" alt="TeaMax café seating area" width="1080" height="864" />
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="content-inner">
            <div className="store-layout">
              <div className="store-card">
                <span className="pill">Search</span>
                <h2 className="section-title" style={{ fontSize: "42px", marginTop: 18 }}>Your next chai stop.</h2>
                <div className="store-search" role="note" aria-label="Store locator information">
                  TeaMax café locations are listed below.
                </div>
                <p style={{ marginTop: 14, fontSize: 13 }}>
                  Browse the listed cafés and replace the sample details with the client’s verified outlet information before launch.
                </p>
              </div>
              <div className="store-list">
                {stores.map(([name, address, hours]) => (
                  <article className="store-card" key={name}>
                    <h3>{name}</h3>
                    <p>{address}</p>
                    <p>{hours}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="content-section yellow-section" id="franchise">
          <div className="content-inner content-grid">
            <div>
              <span className="pill">Visit TeaMax</span>
              <h2 className="section-title" style={{ color: "#263C3D" }}>Your city.<br />Your café moment.</h2>
            </div>
            <div>
              <p className="section-copy" style={{ color: "#263C3D" }}>
                Add your real outlet addresses, phone numbers, map links, opening hours and
                online-ordering links here before launch.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="content-inner">
            <span className="eyebrow">Quick answers</span>
            <h2 className="section-title">TeaMax café FAQs.</h2>
            <div className="faq">
              {faqs.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd data={schema} />
      <FaqJsonLd questions={faqs.map(([q, a]) => ({ q, a }))} />
    </>
  );
}
