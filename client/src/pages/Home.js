import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import ZariDivider from "../components/ZariDivider";
import { blogs } from "../blogs/Blogs";

const CATEGORIES = ["All", "Kurti", "Saree", "Lehenga Choli", "Salwar Suit"];

const FEATURES = [
    { icon: "🚚", title: "Free Shipping", text: "On all orders above ₹999" },
    { icon: "🔒", title: "Secure Payment", text: "100% safe & encrypted checkout" },
    { icon: "↩", title: "Easy Returns", text: "7-day hassle-free returns" },
    { icon: "✦", title: "Handpicked", text: "Curated by our style team" },
];

const STATS = [
    { value: "10K+", label: "Happy Customers" },
    { value: "5K+", label: "Pieces Curated" },
    { value: "150+", label: "Artisan Partners" },
    { value: "24/7", label: "Concierge Support" },
];

const TESTIMONIALS = [
    {
        name: "Rahul Sharma",
        text: "An exquisite shopping experience — swift delivery and impeccable quality.",
    },
    {
        name: "Priya Patel",
        text: "Beautifully curated collection and genuine pieces. Highly recommended.",
    },
    {
        name: "Neha Verma",
        text: "Gracious support and a seamless checkout from start to finish.",
    },
];

function Home() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setProductsPerPage(window.innerWidth <= 768 ? 4 : 8);
            setCurrentPage(1);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                  (item) =>
                      item.category &&
                      item.category.toLowerCase() === selectedCategory.toLowerCase()
              );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const latestBlogs = [...blogs].sort((a, b) => b.id - a.id).slice(0, 6);

    return (
        <>
            <title>
                Fashion Freude | Shop Ethnic Wear, Sarees, Kurtis & Lehenga Cholis Online
            </title>
            <meta
                name="description"
                content="Explore Fashion Freude for premium Kurti, Saree, Lehenga Choli, and Salwar Suit collections. Free shipping over ₹999 and fast delivery across India."
            />

            {/* ================= COLLECTION ================= */}
            <section id="collection" className="container-luxe py-12 lg:py-16">
                <SectionHeading
                    eyebrow="The Collection"
                    title="Featured Pieces"
                    subtitle="Hand-selected silhouettes, refreshed each season for every celebration."
                />

                {/* Category filter */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                setCurrentPage(1);
                            }}
                            className={`rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                                selectedCategory === category
                                    ? "bg-maroon text-ivory shadow-soft"
                                    : "border border-sand text-ink hover:border-gold hover:text-maroon"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="col-span-full py-16 text-center font-display text-2xl text-muted">
                            No pieces found in this category.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="rounded-full border border-sand px-4 py-2 text-sm text-ink transition hover:border-gold disabled:opacity-40"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`h-10 w-10 rounded-full text-sm transition ${
                                    currentPage === index + 1
                                        ? "bg-maroon text-ivory"
                                        : "border border-sand text-ink hover:border-gold"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="rounded-full border border-sand px-4 py-2 text-sm text-ink transition hover:border-gold disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>

            {/* ================= FLASH SALE ================= */}
            <section className="bg-maroon text-ivory">
                <div className="container-luxe flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
                    <div>
                        <p className="eyebrow text-gold-light">Limited time</p>
                        <h2 className="mt-2 font-display text-4xl text-ivory sm:text-5xl">
                            Festive Flash Sale — up to 50% off
                        </h2>
                        <p className="mt-3 text-ivory/70">
                            Selected sarees & lehengas at their most tempting. While stocks last.
                        </p>
                    </div>
                    <a href="#collection" className="btn-gold shrink-0">
                        Shop the deals
                    </a>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="container-luxe py-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-sand/70 bg-white p-7 text-center transition hover:shadow-card"
                        >
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream text-xl text-maroon">
                                {f.icon}
                            </div>
                            <h4 className="mt-4 font-display text-xl text-ink">{f.title}</h4>
                            <p className="mt-1.5 text-sm text-muted">{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section className="bg-ink text-ivory">
                <div className="container-luxe grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="font-display text-4xl text-gold sm:text-5xl">{s.value}</p>
                            <p className="mt-2 text-xs uppercase tracking-widest text-ivory/60">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section className="container-luxe py-20">
                <SectionHeading eyebrow="Kind Words" title="Loved by our patrons" />
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <figure
                            key={t.name}
                            className="rounded-2xl border border-sand/70 bg-white p-8 shadow-card"
                        >
                            <div className="text-gold">★★★★★</div>
                            <blockquote className="mt-4 font-display text-xl italic leading-relaxed text-ink">
                                “{t.text}”
                            </blockquote>
                            <figcaption className="mt-5 text-xs uppercase tracking-widest text-muted">
                                {t.name}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            {/* ================= JOURNAL / BLOGS ================= */}
            <section className="bg-cream">
                <div className="container-luxe py-20">
                    <SectionHeading
                        eyebrow="The Journal"
                        title="Style notes & guides"
                        subtitle="Draping tips, buying guides and the latest in ethnic fashion."
                    />
                    <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {latestBlogs.map((blog) => (
                            <Link
                                to={blog.link}
                                key={blog.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft"
                            >
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <span className="eyebrow">{blog.category}</span>
                                    <h4 className="mt-2 font-display text-xl leading-snug text-ink">
                                        {blog.title}
                                    </h4>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {blog.description.substring(0, 96)}…
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-gold transition-colors group-hover:text-maroon">
                                        Continue reading →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= NEWSLETTER ================= */}
            <section className="container-luxe py-20">
                <div className="relative overflow-hidden rounded-3xl bg-maroon-dark px-8 py-16 text-center text-ivory">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-2xl" />
                    <p className="eyebrow text-gold-light">Stay in the loop</p>
                    <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl text-ivory sm:text-5xl">
                        Be first to see new arrivals
                    </h2>
                    <ZariDivider className="mt-5" width="w-20" />
                    <p className="mx-auto mt-4 max-w-md text-ivory/70">
                        Exclusive previews, private-sale invitations and styling notes — straight to
                        your inbox.
                    </p>
                    <form
                        className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-full border border-ivory/20 bg-ivory/5"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent px-5 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-gold px-6 text-sm font-medium text-maroon-dark transition hover:bg-gold-soft"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Home;
