
import "./PrivacyPolicy.css";
import { Header, Footer } from "../components";

const privacypagesections = [
    {
        title: "1. Information Collection",
        paragraphs: [
            {
                heading: "1.1 Personal Information:",
                text: "We may collect personal information from you when you voluntarily provide it to us through our website, such as when you fill out a contact form or sign up for our newsletter. This may include your name, email address, phone number, and any other information you choose to provide.",
            },
            {
                heading: "1.2 Automatically Collected Information:",
                text: "When you visit our website, certain information may be collected automatically, including your IP address, browser type, operating system, referring URLs, and other technical information. We may use cookies and similar technologies to collect this information. You have the option to disable cookies through your browser settings, but this may affect your ability to use certain features of our website.",
            },
        ],
    },
    {
        title: "2. Use of Information",
        paragraphs: [
            {
                heading: "2.1 We may use the personal information you provide to us to:",
                bullets: [
                    "Respond to your inquiries or requests.",
                    "Provide you with information, products, or services you request.",
                    "Send you marketing or promotional materials if you have opted to receive them.",
                    "Improve our website and enhance user experience.",
                    "Monitor and analyze website usage and trends.",
                ],
            },
            {
                heading: "2.2 We may use automatically collected information to:",
                bullets: [
                    "Personalize your experience on our website.",
                    "Understand and analyze user preferences and behavior.",
                    "Improve our website's functionality and security.",
                    "Generate aggregated statistical data.",
                ],
            },
        ],
    },
    {
        title: "3. Information Sharing and Disclosure",
        paragraphs: [
            {
                heading: "3.1",
                text: "We will not sell, rent, or lease your personal information to third parties without your consent unless required by law.",
            },
            {
                heading: "3.2",
                text: "We may share your information with trusted third-party service providers who assist us in operating our website, conducting business activities, or servicing you. These providers are contractually obligated to keep your information confidential and secure and are not allowed to use it for any other purpose.",
            },
            {
                heading: "3.3",
                text: "We may disclose your information to comply with legal obligations, enforce our website's policies, or protect our rights, property, or safety.",
            },
        ],
    },
    {
        title: "4. Data Security",
        paragraphs: [
            {
                heading: "4.1",
                text: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
            },
        ],
    },
    {
        title: "5. Links to Third-Party Websites",
        paragraphs: [
            {
                heading: "5.1",
                text: "Our website may contain links to third-party websites. This Privacy Policy applies only to our website. We have no control over the privacy practices or content of these third-party websites. We encourage you to review the privacy policies of those websites before providing any personal information.",
            },
        ],
    },
    {
        title: "6. Children's Privacy",
        paragraphs: [
            {
                heading: "6.1",
                text: "Our website is not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will promptly delete such information from our records.",
            },
        ],
    },
    {
        title: "7. Changes to this Privacy Policy",
        paragraphs: [
            {
                heading: "7.1",
                text: "We reserve the right to update or modify this Privacy Policy at any time. We will notify you of any material changes by posting the revised policy on our website or by other means. Your continued use of our website after the changes indicates your acceptance of the updated Privacy Policy.",
            },
        ],
    },
    {
        title: "8. Contact Us",
        paragraphs: [
            {
                heading: "8.1",
                text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us using the information provided below:",
            },
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <>
            <Header />

            <main className="privacypage">
                {/* Hero Background Image */}
                <section className="privacypagehero">
                    <div className="privacypageheroverlay" />

                    <div className="privacypagecontainer privacypageheroinner">
                        <h1 className="privacypagetitle">
                            Privacy Policy for Teamax Cafe India Website
                        </h1>

                        <p className="privacypageeffectivedate">
                            Effective Date: 01/Jan/2022
                        </p>
                    </div>
                </section>

                {/* Policy Content */}
                <section className="privacypagebody">
                    <div className="privacypagecontainer">
                        <p className="privacypageintroduction">
                            At Teamax Cafe India, we are committed to protecting the privacy
                            and security of our website users&apos; personal information. This
                            Privacy Policy outlines how we collect, use, disclose, and store
                            the information we receive from users of our website. By
                            accessing or using our website, you agree to the terms and
                            practices described in this policy.
                        </p>

                        <div className="privacypagesections">
                            {privacypagesections.map((section, index) => (
                                <article
                                    className="privacypagesection"
                                    key={section.title}
                                >
                                    <h2 className="privacypagesectiontitle">
                                        {section.title}
                                    </h2>

                                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                                        <div
                                            className="privacypageparagraph"
                                            key={`${index}-${paragraphIndex}`}
                                        >
                                            {paragraph.heading && (
                                                <strong className="privacypagesubtitle">
                                                    {paragraph.heading}{" "}
                                                </strong>
                                            )}

                                            {paragraph.text && <span>{paragraph.text}</span>}

                                            {paragraph.bullets && (
                                                <ul className="privacypagelist">
                                                    {paragraph.bullets.map((bullet) => (
                                                        <li key={bullet}>{bullet}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </article>
                            ))}

                            {/* Refund Policy */}
                            <article className="privacypagesection">
                                <h2 className="privacypagesectiontitle">
                                    9. Refund Policy
                                </h2>

                                <div className="privacypageparagraph">
                                    <strong className="privacypagesubtitle">
                                        9.1{" "}
                                    </strong>
                                    <span>
                                        All Payments made against the franchise are non refundable.
                                        If you have any questions, concerns, or requests regarding
                                        this Refund Policy or the refund process, please contact
                                        our customer support using the information provided below:
                                    </span>
                                </div>

                                <p className="privacypagehelpline">
                                    Official Helpline: +91 9505 047 047
                                </p>

                                <p className="privacypageparagraph">
                                    By making a purchase on our website, you acknowledge that
                                    you have read, understood, and agreed to the terms and
                                    conditions of this Refund Policy.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
