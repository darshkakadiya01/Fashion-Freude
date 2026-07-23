import "./About.css";

function About() {

    return (
        <>

            <title>
                About Fashion Freude | Online Fashion Store
            </title>


            <meta
                name="description"
                content="Learn about Fashion Freude, our mission, working process, values, and commitment to providing quality fashion products with a seamless online shopping experience."
            />


            <meta
                name="keywords"
                content="Fashion Freude, online fashion store, clothing store, fashion shopping, premium fashion products, affordable fashion"
            />


            <meta
                name="author"
                content="Fashion Freude"
            />


            <meta
                name="robots"
                content="index, follow"
            />


            <link
                rel="canonical"
                href="https://fashionfreude.com/about-us"
            />


            {/* Open Graph */}

            <meta
                property="og:title"
                content="About Fashion Freude | Online Fashion Store"
            />


            <meta
                property="og:description"
                content="Discover Fashion Freude's story, values, and commitment to delivering quality fashion products online."
            />


            <meta
                property="og:type"
                content="website"
            />


            <meta
                property="og:url"
                content="https://fashionfreude.com/about-us"
            />


            <meta
                property="og:image"
                content="https://fashionfreude.com/images/about-fashion.jpg"
            />


            {/* Twitter SEO */}

            <meta
                name="twitter:card"
                content="summary_large_image"
            />


            <meta
                name="twitter:title"
                content="About Fashion Freude | Online Fashion Store"
            />


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

                    "name": "Fashion Freude",

                    "url": "https://fashionfreude.com",

                    "logo": "https://fashionfreude.com/logo.png",

                    "description":
                    "Fashion Freude is an online fashion store offering quality products with a smooth shopping experience.",

                    "sameAs": [

                        "https://www.instagram.com",

                        "https://www.facebook.com"

                    ]

                })}

            </script>

        <section className="about-page">

            {/* ===========================
                HERO
            =========================== */}

            <div className="about-hero">

                <div className="about-container">

                    <span className="about-tag">

                        SOME WORDS ABOUT US

                    </span>

                    <h1>

                        Well-Coordinated Teamwork <br></br>Speaks About Us

                    </h1>


                </div>

            </div>

            {/* ===========================
                ABOUT STORE
            =========================== */}

            <section className="about-section">

                <div className="about-container">

                    <div className="about-grid">

                        <div className="about-image">

                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900"
                                alt="About Fashion Freude"
                            />

                        </div>

                        <div className="about-content">

                            <span className="section-subtitle">

                                We Love What We Do

                            </span>


                            <p>

                                we love what we do—and it shows in everything we offer. From the products we curate to the way we serve our customers, our passion for quality,
                                style, and service drives us every single day.

                            </p>

                            <span className="section-subtitle">

                                Our working process

                            </span>

                            <p>

                                Here’s a well-structured “Our Working Process” section you can include on your About Us page or as a standalone section on your website.

                            </p>


                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================
                ONLINE STORE
            =========================== */}

            <section className="store-section">

                <div className="about-container">

                    <div className="section-heading">

                        <span>

                            SEEMINGLY ELEGANT DESIGN

                        </span>

                        <h2>

                            About our online store

                        </h2>

                    </div>

                    <p>

                        Our goal is simple: to make your online  shopping experience easy, enjoyable, and reliable. We offer a carefully curated collection of items across
                        multiple categories, including:

                    </p>

                    <p>

                        Certainly! Here’s a comprehensive and detailed version of an "About Our Online Store" page, ideal for presenting a complete overview of your online 
                        shopping platform. This can be tailored to your store’s name, launch year, specific product focus, or region:

                    </p>

                    <p>

                        We believe shopping should be simple, trustworthy, and tailored to your lifestyle. As a modern, customer-first online store, we are proud to offer an 
                        extensive range of high-quality products—backed by a seamless digital experience and exceptional service.

                    </p>

                </div>

            </section>

            {/* ===========================
                WORKING PROCESS
            =========================== */}

            {/* ====================================
                HOW WE WORK
            ==================================== */}

            <section className="work-process-section">

                <div className="about-container">

                    <div className="section-heading">

                        <span>Our Process</span>

                        <h2>How We Work</h2>

                        <p>
                            We’ve streamlined every aspect of our business to ensure you get the best possible experience:How-To, DIY & Expert Content
                        </p>

                    </div>

                    <div className="work-process-list">

                        <div className="work-process-item">

                            <div className="work-process-number">
                                01
                            </div>

                            <div className="work-process-content">

                                <h3>Product Sourcing</h3>

                                <p>
                                    Product Sourcing: We work directly with manufacturers and verified suppliers to guarantee product quality and competitive prices
                                </p>

                            </div>

                        </div>

                        <div className="work-process-item">

                            <div className="work-process-number">
                                02
                            </div>

                            <div className="work-process-content">

                                <h3>Technology Driven Platform</h3>

                                <p>
                                    Technology-Driven Platform: Our website is built to be fast, mobile-responsive, and easy to use
                                </p>

                            </div>

                        </div>

                        <div className="work-process-item">

                            <div className="work-process-number">
                                03
                            </div>

                            <div className="work-process-content">

                                <h3>Order Processing</h3>

                                <p>
                                    Order Processing: Once you place an order, our fulfillment team works quickly to process, pack, and dispatch it
                                </p>

                            </div>

                        </div>

                        <div className="work-process-item">

                            <div className="work-process-number">
                                04
                            </div>

                            <div className="work-process-content">

                                <h3>Shipping & Delivery</h3>

                                <p>
                                    Shipping & Delivery: We offer local and nationwide shipping options with tracking and timely delivery.
                                </p>

                            </div>

                        </div>

                        <div className="work-process-item">

                            <div className="work-process-number">
                                05
                            </div>

                            <div className="work-process-content">

                                <h3>Customer Support</h3>

                                <p>
                                     Customer Support: Our support team is available 24/7 via email, live chat, and phone to assist with any questions or issues
                                </p>

                            </div>

                        </div>

                        <div className="work-process-item">

                            <div className="work-process-number">
                                06
                            </div>

                            <div className="work-process-content">

                                <h3>Returns & Refunds</h3>

                                <p>
                                    Returns & Refunds: We offer a clear, fair, and easy-to-follow returns policy to make your shopping experience risk-free.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================
                WHY SHOP WITH US
            =========================== */}

            <section className="why-shop-section">

                <div className="container">

                    <div className="why-shop-heading">

                        <span>Why Choose Fashion Freude</span>

                        <h2>Why Shop With Us?</h2>

                        <p>
                            We’re not just another online store—we’re your shopping partner. Here's what makes us different:
                        </p>

                    </div>

                    <div className="why-shop-grid">

                        <div className="why-card">

                            <div className="why-icon">⭐</div>

                            <h3>Premium Quality</h3>

                            <p>
                                Every product is carefully selected to ensure excellent
                                quality and long-lasting performance.
                            </p>

                        </div>

                        <div className="why-card">

                            <div className="why-icon">💰</div>

                            <h3>Affordable Prices</h3>

                            <p>
                                Get the best deals with competitive pricing and exciting
                                discounts throughout the year.
                            </p>

                        </div>

                        <div className="why-card">

                            <div className="why-icon">🔒</div>

                            <h3>Secure Payments</h3>

                            <p>
                                Shop confidently with trusted payment gateways and complete
                                transaction security.
                            </p>

                        </div>

                        <div className="why-card">

                            <div className="why-icon">🚚</div>

                            <h3>Fast Delivery</h3>

                            <p>
                                Quick order processing and reliable shipping ensure your
                                products arrive on time.
                            </p>

                        </div>

                        <div className="why-card">

                            <div className="why-icon">💬</div>

                            <h3>24/7 Support</h3>

                            <p>
                                Our support team is always available to answer your
                                questions and solve your problems.
                            </p>

                        </div>

                        <div className="why-card">

                            <div className="why-icon">❤️</div>

                            <h3>Customer Satisfaction</h3>

                            <p>
                                Thousands of happy customers trust Fashion Freude for quality,
                                service, and reliability.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* ===========================
                OUR VALUES
            =========================== */}

            <section className="values-section">

                <div className="container">

                    <div className="values-heading">

                        <span>Our Core Values</span>

                        <h2>Our Values</h2>

                        <p>
                            Everything we do is guided by strong values that help us build
                            lasting relationships with our customers.
                        </p>

                    </div>

                    <div className="values-grid">

                        <div className="value-box">

                            <div className="value-number">01</div>

                            <h3>Integrity</h3>

                            <p>
                                We believe in honesty, transparency, and delivering exactly
                                what we promise.
                            </p>

                        </div>

                        <div className="value-box">

                            <div className="value-number">02</div>

                            <h3>Customer-First Approach</h3>

                            <p>
                                Every decision we make focuses on providing the best
                                shopping experience possible.
                            </p>

                        </div>

                        <div className="value-box">

                            <div className="value-number">03</div>

                            <h3>Innovation</h3>

                            <p>
                                We continuously improve our platform and bring the latest
                                products to our customers.
                            </p>

                        </div>

                        <div className="value-box">

                            <div className="value-number">04</div>

                            <h3>Sustainability</h3>

                            <p>
                                We support environmentally friendly practices through better
                                packaging and responsible sourcing.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </section>

        </>

    );

}

export default About;
