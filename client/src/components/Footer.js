import { Link } from "react-router-dom";
import "./Footer.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Footer() {
    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const [categories, setCategories] = useState([]);

useEffect(() => {
    getCategories();
}, []);

const getCategories = async () => {
    try {

        const res = await axios.get(
            `${API_BASE_URL}/api/categories`
        );

        setCategories(res.data);

    } catch (error) {

        console.log(error);

    }
};

    return (

        <footer className="footer">

            <div className="container">

                <div className="row">

                    {/* Company */}

                    <div className="col-lg-4 col-md-6 mb-4">

                        <h2 className="footer-logo">

                            🛍️ Fashion Freude

                        </h2>

                        <p className="footer-text">

                            Fashion Freude is your trusted online shopping
                            destination for Electronics, Fashion,
                            Accessories, Home Essentials and much more.

                            We deliver premium quality products at the
                            best prices with fast delivery.

                        </p>

                        <div className="social-icons">

                            <a href="https://www.facebook.com/">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a href="https://www.instagram.com/">
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a href="https://x.com/">
                                <i className="bi bi-twitter-x"></i>
                            </a>

                            <a href="https://www.linkedin.com/">
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a href="https://www.youtube.com/">
                                <i className="bi bi-youtube"></i>
                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="col-lg-2 col-md-6 mb-4">

                        <h4>

                            Quick Links

                        </h4>

                        <ul className="footer-links">

                            <li>

                                <Link to="/">
                                    Home
                                </Link>

                            </li>

                            <li>

                                <Link to="/cart">
                                    Cart
                                </Link>

                            </li>

                            <li>

                                <Link to="/blog">
                                    Blog
                                </Link>

                            </li>

                            <li>

                                <Link to="/about-us">
                                    About Us
                                </Link>

                            </li>

                            <li>

                                <Link to="/privacy-policy">
                                    Privacy Policy
                                </Link>

                            </li>

                            <li>

                                <Link to="/refund_returns">
                                    Returns
                                </Link>

                            </li>

                            <li>

                                <Link to="/terms-and-condition">
                                    Terms & Conditions
                                </Link>

                            </li>

                            <li>

                                <Link to="/contact-us">
                                    Contact Us
                                </Link>

                            </li>

                            

                            {/* <li>

                                <Link to="/login">
                                    Login
                                </Link>

                            </li> */}

                        </ul>

                    </div>

                    {/* Categories */}

                    <div className="col-lg-2 col-md-6 mb-4">

                        <h4>
                            Categories
                        </h4>

                        <ul className="footer-links">

                            {
                                categories.length > 0 ? (

                                    categories.map((category) => (

                                        <li key={category._id}>

                                            <Link
                                                to={`/category/${encodeURIComponent(category.name)}`}
                                            >
                                                {category.name}
                                            </Link>

                                        </li>

                                    ))

                                ) : (

                                    <li>

                                        <span>No Categories</span>

                                    </li>

                                )
                            }

                        </ul>

                    </div>

                    {/* Contact */}

                    <div className="col-lg-4 col-md-6 mb-4">

                        <h4>

                            Contact Us

                        </h4>

                        <p>

                            <i className="bi bi-geo-alt-fill me-2"></i>

                            Surat, Gujarat, India

                        </p>

                        <p>

                            <i className="bi bi-envelope-fill me-2"></i>

                            fashionfreude@gmail.com

                        </p>

                        <p>

                            <i className="bi bi-telephone-fill me-2"></i>

                            +91 00000 00000

                        </p>

                        <p>

                            <i className="bi bi-clock-fill me-2"></i>

                            Mon - Sat : 9 AM - 8 PM

                        </p>

                        {/* Newsletter */}

                        <div className="subscribe-box">
                        <form className="subscribe-form">
                            <input
                            type="email"
                            placeholder="Enter your email"
                            />

                            <button type="submit">
                            Subscribe
                            </button>
                        </form>
                        </div>

                    </div>

                </div>

                <hr className="footer-line" />

                <div className="footer-bottom">

                    <div>

                        © {new Date().getFullYear()} Fashion Freude.
                        All Rights Reserved.

                    </div>

                    <div>

                        Designed & Developed by

                        <span className="developer">

                            Darsh Kakadiya

                        </span>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default Footer;