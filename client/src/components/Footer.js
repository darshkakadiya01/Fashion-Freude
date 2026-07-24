import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { getCategories } from "../api/categories";
import ZariDivider from "./ZariDivider";

const socials = [
    { icon: FaFacebookF, href: "https://www.facebook.com/", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/", label: "Instagram" },
    { icon: FaXTwitter, href: "https://x.com/", label: "X" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://www.youtube.com/", label: "YouTube" },
];

const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/cart", label: "Cart" },
    { to: "/blog", label: "Blog" },
    { to: "/about-us", label: "About Us" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/refund_returns", label: "Returns" },
    { to: "/terms-and-condition", label: "Terms & Conditions" },
    { to: "/contact-us", label: "Contact Us" },
];

function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <footer className="bg-maroon-dark text-ivory/80">
            <div className="container-luxe py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
                    {/* Brand */}
                    <div>
                        <h2 className="font-display text-3xl font-semibold text-ivory">
                            Fashion <span className="text-gold">Freude</span>
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
                            A curated house of Indian ethnic wear — sarees, lehengas, kurtis and
                            salwar suits crafted for the moments that matter. Timeless pieces,
                            delivered with care.
                        </p>
                        <div className="mt-6 flex gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-all hover:border-gold hover:bg-gold hover:text-maroon-dark"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="eyebrow mb-5 text-gold">Explore</h4>
                        <ul className="space-y-2.5 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.to + link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-ivory/70 transition-colors hover:text-gold"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="eyebrow mb-5 text-gold">Shop</h4>
                        <ul className="space-y-2.5 text-sm">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            to={`/category/${encodeURIComponent(category.name)}`}
                                            className="text-ivory/70 transition-colors hover:text-gold"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-ivory/50">No categories</li>
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="eyebrow mb-5 text-gold">Visit Us</h4>
                        <ul className="space-y-3 text-sm text-ivory/70">
                            <li>Surat, Gujarat, India</li>
                            <li>
                                <a
                                    href="mailto:fashionfreude@gmail.com"
                                    className="transition-colors hover:text-gold"
                                >
                                    fashionfreude@gmail.com
                                </a>
                            </li>
                            <li>+91 00000 00000</li>
                            <li>Mon – Sat · 9 AM – 8 PM</li>
                        </ul>

                        <form
                            className="mt-5 flex overflow-hidden rounded-full border border-ivory/20 bg-ivory/5"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Email for offers"
                                className="w-full bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-gold px-5 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-soft"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <ZariDivider className="my-10" width="w-24" />

                <div className="flex flex-col items-center justify-between gap-3 text-xs text-ivory/50 sm:flex-row">
                    <p>© {new Date().getFullYear()} Fashion Freude. All rights reserved.</p>
                    {/* <p>
                        Designed &amp; developed by{" "}
                        <span className="text-gold">Darsh Kakadiya</span>
                    </p> */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
