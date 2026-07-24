import { useState } from "react";
import ZariDivider from "../components/ZariDivider";

function Contactus() {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const faqs = [
        {
            id: 1,
            q: "Will I receive the same product that I see in the picture?",
            a: "Yes, you will receive the exact product shown in the picture. We ensure all product photos are taken under natural lighting to reflect accurate colors and details. Minor variations may occur due to screen settings.Manufacturing",
        },
        {
            id: 2,
            q: "Where can I view my sales receipt?",
            a: 'You can view your sales receipt in the order confirmation email sent to you after your purchase. Alternatively, you can log into your account on our website and navigate to the "Order History" section to view and download your receipt. If you need further assistance, feel free to contact us.',
        },
        {
            id: 3,
            q: "How can I return an item?",
            a: "To return an item, contact us at Contact Us Page, package the item with the receipt. We'll process your refund once we receive and inspect the item.",
        },
        {
            id: 4,
            q: 'Will you restock items indicated "out of stock"?',
            a: 'Yes, we restock items marked as "out of stock" whenever possible. You can sign up for restock notifications on the product page to be alerted when it\'s available again.',
        },
        {
            id: 5,
            q: "Where can i ship my order?",
            a: "You can ship your order to the address provided during checkout. If you need to change the shipping address, please contact us as soon as possible before your order is processed.",
        },
    ];

    return (
        <>
            <title>Contact Us | Fashion Freude</title>
            <meta name="title" content="Contact Us | Fashion Freude" />
            <meta
                name="description"
                content="Have questions or need support? Contact Fashion Freude today. Find FAQs on shipping, returns, order tracking, or send our team a direct message."
            />
            <meta
                name="keywords"
                content="Fashion Freude contact, Fashion Freude customer support, Fashion Freude help, customer service, FAQs"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="https://fashionfreude.com/contact-us" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://fashionfreude.com/contact-us" />
            <meta property="og:title" content="Contact Us | Fashion Freude" />
            <meta
                property="og:description"
                content="Get in touch with Fashion Freude. Find answers to frequently asked questions or send us a message directly."
            />
            <meta property="og:image" content="https://fashionfreude.com/logo.png" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://fashionfreude.com/contact-us" />
            <meta name="twitter:title" content="Contact Us | Fashion Freude" />
            <meta
                name="twitter:description"
                content="Get in touch with Fashion Freude. Find answers to frequently asked questions or send us a message directly."
            />
            <meta name="twitter:image" content="https://fashionfreude.com/logo.png" />

            <div className="bg-ivory">
                <section className="bg-cream">
                    <div className="container-luxe py-16 text-center">
                        <p className="eyebrow">Get In Touch</p>

                        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                            Contact Us
                        </h1>

                        <ZariDivider className="mt-5" />

                        <p className="mx-auto mt-5 max-w-xl text-muted leading-relaxed">
                            We'd love to hear from you. Whether you have a question, feedback, or
                            need support, our team is ready to help.
                        </p>
                    </div>
                </section>

                <div className="container-luxe py-14">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Frequently Asked Questions */}

                        <div>
                            <p className="eyebrow">INFORMATION QUESTIONS</p>

                            <h2 className="mt-3 font-display text-3xl text-ink">
                                FREQUENTLY ASKED QUESTIONS
                            </h2>

                            <div className="mt-8 space-y-4">
                                {faqs.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="overflow-hidden rounded-xl border border-sand bg-white"
                                    >
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                            onClick={() => toggleFAQ(faq.id)}
                                        >
                                            <span className="font-medium text-ink">{faq.q}</span>

                                            <span className="text-xl text-gold">
                                                {activeFAQ === faq.id ? "−" : "+"}
                                            </span>
                                        </button>

                                        {activeFAQ === faq.id && (
                                            <div className="border-t border-sand px-5 py-4">
                                                <p className="text-muted leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}

                        <div className="card p-8">
                            <h2 className="font-display text-3xl text-ink">Send Message</h2>

                            <form className="mt-6 space-y-5">
                                <div>
                                    <label className="field-label">Your Name</label>
                                    <input
                                        className="field"
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Email Address</label>
                                    <input
                                        className="field"
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Subject</label>
                                    <input
                                        className="field"
                                        type="text"
                                        placeholder="Subject"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Message</label>
                                    <textarea
                                        className="field"
                                        rows="6"
                                        placeholder="Write your message..."
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-primary w-full">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contactus;
