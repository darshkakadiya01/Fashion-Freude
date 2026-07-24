import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getCategories } from "../api/categories";

function Navbar() {
    const { cart } = useCart();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const createSlug = (text) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        navigate(`/search/${encodeURIComponent(search.trim())}`);
        setSearch("");
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

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
        <header className="sticky top-0 z-50">
            {/* Main bar */}
            <nav className="border-b border-sand/70 bg-ivory/95 backdrop-blur-md">
                <div className="container-luxe flex items-center justify-between gap-4 py-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="shrink-0 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                    >
                        Fashion <span className="text-maroon">Freude</span>
                    </Link>

                    {/* Search — desktop */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden flex-1 items-center lg:flex lg:max-w-md"
                    >
                        <div className="flex w-full items-center rounded-full border border-sand bg-white px-4 py-2 transition focus-within:border-gold">
                            <input
                                type="search"
                                placeholder="Search sarees, kurtis, lehengas…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent text-sm text-ink placeholder:text-muted/60 focus:outline-none"
                            />
                            <button type="submit" aria-label="Search" className="text-maroon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-8 lg:flex">
                        <NavItem to="/" label="Home" onClick={closeMenu} />

                        <div className="group relative">
                            <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-ink transition-colors hover:text-maroon">
                                Categories
                                <span className="text-xs text-gold">▾</span>
                            </button>
                            <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-2 rounded-2xl border border-sand/70 bg-white p-2 opacity-0 shadow-soft transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/category/${createSlug(category.name)}`}
                                            onClick={closeMenu}
                                            className="block rounded-xl px-4 py-2.5 text-sm text-ink transition-colors hover:bg-cream hover:text-maroon"
                                        >
                                            {category.name}
                                        </Link>
                                    ))
                                ) : (
                                    <span className="block px-4 py-2.5 text-sm text-muted">
                                        No categories
                                    </span>
                                )}
                            </div>
                        </div>

                        <NavItem to="/blog" label="Blog" onClick={closeMenu} />

                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="relative inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink transition-colors hover:text-maroon"
                        >
                            <span aria-hidden>🛍</span>
                            Cart
                            <span className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1.5 text-[11px] font-semibold text-ivory">
                                {totalItems}
                            </span>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="text-2xl text-maroon lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="border-t border-sand/70 bg-ivory px-5 pb-6 pt-4 lg:hidden">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex w-full items-center rounded-full border border-sand bg-white px-4 py-2.5">
                                <input
                                    type="search"
                                    placeholder="Search…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-transparent text-sm focus:outline-none"
                                />
                                <button type="submit" aria-label="Search" className="text-maroon">
                                    🔍
                                </button>
                            </div>
                        </form>

                        <div className="flex flex-col divide-y divide-sand/60">
                            <Link to="/" onClick={closeMenu} className="py-3 text-ink">
                                Home
                            </Link>
                            <div className="py-3">
                                <p className="eyebrow mb-2">Categories</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/category/${createSlug(category.name)}`}
                                            onClick={closeMenu}
                                            className="chip"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link to="/blog" onClick={closeMenu} className="py-3 text-ink">
                                Blog
                            </Link>
                            <Link
                                to="/cart"
                                onClick={closeMenu}
                                className="flex items-center justify-between py-3 text-ink"
                            >
                                Cart
                                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1.5 text-[11px] font-semibold text-ivory">
                                    {totalItems}
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

function NavItem({ to, label, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="group relative text-sm font-medium tracking-wide text-ink transition-colors hover:text-maroon"
        >
            {label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

export default Navbar;
