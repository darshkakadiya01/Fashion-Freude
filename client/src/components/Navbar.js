import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const { cart } = useCart();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const totalItems = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    // ==========================
    // CREATE CATEGORY SLUG
    // ==========================

    const createSlug = (text = "") => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    // ==========================
    // SEARCH
    // ==========================

    const handleSearch = (e) => {

        e.preventDefault();

        if (!search.trim()) return;

        navigate(`/search/${encodeURIComponent(search.trim())}`);

        setSearch("");
        setMenuOpen(false);

    };

    const closeMenu = () => {

        setMenuOpen(false);

    };

    // ==========================
    // GET CATEGORIES
    // ==========================

    useEffect(() => {

        const getCategories = async () => {

            try {

                const res = await axios.get(
                    `${API_BASE_URL}/api/categories`
                );

                console.log("Categories:", res.data);

                // Remove duplicate categories
                const uniqueCategories = [];

                const names = new Set();

                res.data.forEach((cat) => {

                    const name = cat.name.trim().toLowerCase();

                    if (!names.has(name)) {

                        names.add(name);

                        uniqueCategories.push(cat);

                    }

                });

                setCategories(uniqueCategories);

            } catch (error) {

                console.log(error);

            }

        };

        getCategories();

    }, []);

    return (

        <nav className="custom-navbar">

            <div className="container navbar-wrapper">

                {/* Logo */}

                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >
                    🛍️ Fashion Freude
                </Link>

                {/* Mobile Menu */}

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                <div
                    className={
                        menuOpen
                            ? "navbar-menu active"
                            : "navbar-menu"
                    }
                >

                    {/* Search */}

                    <form
                        className="search-box"
                        onSubmit={handleSearch}
                    >

                        <input
                            type="search"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <button type="submit">
                            🔍
                        </button>

                    </form>

                    {/* Navigation */}

                    <ul className="nav-links">

                        <li>

                            <Link
                                to="/"
                                onClick={closeMenu}
                            >
                                Home
                            </Link>

                        </li>

                        {/* Categories */}

                        <li className="dropdown">

                            <span className="dropdown-title">
                                Categories ▾
                            </span>

                            <ul className="dropdown-menu-custom">

                                {

                                    categories.length > 0 ?

                                        categories.map((category) => (

                                            <li key={category.id}>

                                                <Link
                                                    to={`/category/${createSlug(category.name)}`}
                                                    onClick={closeMenu}
                                                >
                                                    {category.name}
                                                </Link>

                                            </li>

                                        ))

                                        :

                                        <li>

                                            <span className="no-category">

                                                No Categories

                                            </span>

                                        </li>

                                }

                            </ul>

                        </li>

                        <li>

                            <Link
                                to="/blog"
                                onClick={closeMenu}
                            >
                                Blog
                            </Link>

                        </li>

                        <li>

                            <Link
                                to="/cart"
                                className="cart-link"
                                onClick={closeMenu}
                            >

                                🛒 Cart

                                <span className="cart-count">

                                    {totalItems}

                                </span>

                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;  