import SectionHeading from "../components/SectionHeading";
import ZariDivider from "../components/ZariDivider";

function About() {
    return (
        <>
            <title>About Fashion Freude | Online Fashion Store</title>

            <meta
                name="description"
                content="Learn about Fashion Freude, our mission, working process, values, and commitment to providing quality fashion products with a seamless online shopping experience."
            />

            <meta
                name="keywords"
                content="Fashion Freude, online fashion store, clothing store, fashion shopping, premium fashion products, affordable fashion"
            />

            <meta name="author" content="Fashion Freude" />

            <meta name="robots" content="index, follow" />

            <link rel="canonical" href="https://fashionfreude.com/about-us" />

            {/* Open Graph */}

            <meta property="og:title" content="About Fashion Freude | Online Fashion Store" />

            <meta
                property="og:description"
                content="Discover Fashion Freude's story, values, and commitment to delivering quality fashion products online."
            />

            <meta property="og:type" content="website" />

            <meta property="og:url" content="https://fashionfreude.com/about-us" />

            <meta
                property="og:image"
                content="https://fashionfreude.com/images/about-fashion.jpg"
            />

            {/* Twitter SEO */}

            <meta name="twitter:card" content="summary_large_image" />

            <meta name="twitter:title" content="About Fashion Freude | Online Fashion Store" />

            <meta
                name="twitter:description"
                content="Know more about Fashion Freude, our products, process, and customer-first approach."
            />

            <meta
                name="twitter:image"
                content="https://fashionfreude.com/images/about-fashion.jpg"
            />

            {/* Schema Markup */}

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",

                    "@type": "Organization",

                    name: "Fashion Freude",

                    url: "https://fashionfreude.com",

                    logo: "https://fashionfreude.com/logo.png",

                    description:
                        "Fashion Freude is an online fashion store offering quality products with a smooth shopping experience.",

                    sameAs: ["https://www.instagram.com", "https://www.facebook.com"],
                })}
            </script>

            <div className="bg-ivory">
                {/* ===========================
                HERO
            =========================== */}

                <section className="bg-cream">
                    <div className="container-luxe py-16 text-center">
                        <p className="eyebrow">SOME WORDS ABOUT US</p>

                        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                            Well-Coordinated Teamwork <br></br>Speaks About Us
                        </h1>

                        <ZariDivider className="mt-5" />
                    </div>
                </section>

                {/* ===========================
                ABOUT STORE
            =========================== */}

                <section className="container-luxe py-14">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="overflow-hidden rounded-3xl border border-sand shadow-card">
                            <img
                                className="h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900"
                                alt="About Fashion Freude"
                            />
                        </div>

                        <div className="space-y-6 text-muted leading-relaxed">
                            <div>
                                <p className="eyebrow">We Love What We Do</p>

                                <p className="mt-3">
                                    we love what we do—and it shows in everything we offer. From the
                                    products we curate to the way we serve our customers, our
                                    passion for quality, style, and service drives us every single
                                    day.
                                </p>
                            </div>

                            <div>
                                <p className="eyebrow">Our working process</p>

                                <p className="mt-3">
                                    Here’s a well-structured “Our Working Process” section you can
                                    include on your About Us page or as a standalone section on your
                                    website.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===========================
                ONLINE STORE
            =========================== */}

                <section className="bg-cream">
                    <div className="container-luxe py-14">
                        <SectionHeading
                            eyebrow="SEEMINGLY ELEGANT DESIGN"
                            title="About our online store"
                            center
                        />

                        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-muted leading-relaxed">
                            <p>
                                Our goal is simple: to make your online shopping experience easy,
                                enjoyable, and reliable. We offer a carefully curated collection of
                                items across multiple categories, including:
                            </p>

                            <p>
                                Certainly! Here’s a comprehensive and detailed version of an "About Our
                                Online Store" page, ideal for presenting a complete overview of your
                                online shopping platform. This can be tailored to your store’s name,
                                launch year, specific product focus, or region:
                            </p>

                            <p>
                                We believe shopping should be simple, trustworthy, and tailored to your
                                lifestyle. As a modern, customer-first online store, we are proud to
                                offer an extensive range of high-quality products—backed by a seamless
                                digital experience and exceptional service.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===========================
                WORKING PROCESS
            =========================== */}

                {/* ====================================
                HOW WE WORK
            ==================================== */}

                <section className="container-luxe py-14">
                    <SectionHeading
                        eyebrow="Our Process"
                        title="How We Work"
                        subtitle="We’ve streamlined every aspect of our business to ensure you get the best possible experience:How-To, DIY & Expert Content"
                        center
                    />

                    <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
                        {[
                            {
                                n: "01",
                                h: "Product Sourcing",
                                p: "Product Sourcing: We work directly with manufacturers and verified suppliers to guarantee product quality and competitive prices",
                            },
                            {
                                n: "02",
                                h: "Technology Driven Platform",
                                p: "Technology-Driven Platform: Our website is built to be fast, mobile-responsive, and easy to use",
                            },
                            {
                                n: "03",
                                h: "Order Processing",
                                p: "Order Processing: Once you place an order, our fulfillment team works quickly to process, pack, and dispatch it",
                            },
                            {
                                n: "04",
                                h: "Shipping & Delivery",
                                p: "Shipping & Delivery: We offer local and nationwide shipping options with tracking and timely delivery.",
                            },
                            {
                                n: "05",
                                h: "Customer Support",
                                p: "Customer Support: Our support team is available 24/7 via email, live chat, and phone to assist with any questions or issues",
                            },
                            {
                                n: "06",
                                h: "Returns & Refunds",
                                p: "Returns & Refunds: We offer a clear, fair, and easy-to-follow returns policy to make your shopping experience risk-free.",
                            },
                        ].map((item) => (
                            <div key={item.n} className="card flex gap-5 p-6">
                                <div className="font-display text-4xl text-gold">{item.n}</div>

                                <div>
                                    <h3 className="font-display text-2xl text-ink">{item.h}</h3>

                                    <p className="mt-2 text-muted leading-relaxed">{item.p}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===========================
                WHY SHOP WITH US
            =========================== */}

                <section className="bg-cream">
                    <div className="container-luxe py-14">
                        <SectionHeading
                            eyebrow="Why Choose Fashion Freude"
                            title="Why Shop With Us?"
                            subtitle="We’re not just another online store—we’re your shopping partner. Here's what makes us different:"
                            center
                        />

                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: "⭐",
                                    h: "Premium Quality",
                                    p: "Every product is carefully selected to ensure excellent quality and long-lasting performance.",
                                },
                                {
                                    icon: "💰",
                                    h: "Affordable Prices",
                                    p: "Get the best deals with competitive pricing and exciting discounts throughout the year.",
                                },
                                {
                                    icon: "🔒",
                                    h: "Secure Payments",
                                    p: "Shop confidently with trusted payment gateways and complete transaction security.",
                                },
                                {
                                    icon: "🚚",
                                    h: "Fast Delivery",
                                    p: "Quick order processing and reliable shipping ensure your products arrive on time.",
                                },
                                {
                                    icon: "💬",
                                    h: "24/7 Support",
                                    p: "Our support team is always available to answer your questions and solve your problems.",
                                },
                                {
                                    icon: "❤️",
                                    h: "Customer Satisfaction",
                                    p: "Thousands of happy customers trust Fashion Freude for quality, service, and reliability.",
                                },
                            ].map((card) => (
                                <div
                                    key={card.h}
                                    className="card p-7 text-center transition-all hover:-translate-y-1 hover:shadow-soft"
                                >
                                    <div className="text-3xl">{card.icon}</div>

                                    <h3 className="mt-4 font-display text-2xl text-ink">{card.h}</h3>

                                    <p className="mt-2 text-muted leading-relaxed">{card.p}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===========================
                OUR VALUES
            =========================== */}

                <section className="container-luxe py-14">
                    <SectionHeading
                        eyebrow="Our Core Values"
                        title="Our Values"
                        subtitle="Everything we do is guided by strong values that help us build lasting relationships with our customers."
                        center
                    />

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                n: "01",
                                h: "Integrity",
                                p: "We believe in honesty, transparency, and delivering exactly what we promise.",
                            },
                            {
                                n: "02",
                                h: "Customer-First Approach",
                                p: "Every decision we make focuses on providing the best shopping experience possible.",
                            },
                            {
                                n: "03",
                                h: "Innovation",
                                p: "We continuously improve our platform and bring the latest products to our customers.",
                            },
                            {
                                n: "04",
                                h: "Sustainability",
                                p: "We support environmentally friendly practices through better packaging and responsible sourcing.",
                            },
                        ].map((value) => (
                            <div key={value.n} className="card p-6">
                                <div className="font-display text-4xl text-gold">{value.n}</div>

                                <h3 className="mt-3 font-display text-2xl text-ink">{value.h}</h3>

                                <p className="mt-2 text-muted leading-relaxed">{value.p}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default About;
