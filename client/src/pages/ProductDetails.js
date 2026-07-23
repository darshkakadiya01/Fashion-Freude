import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const { slug } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState("");

    const getImageUrl = (img) => {
        if (!img || typeof img !== "string") return "/no-image.png";

        if (img.startsWith("http")) return img;

        const normalized = img
            .replace(/\\/g, "/")
            .replace(/^\/+/, "")
            .replace(/^uploads\//i, "");

        return `${API_BASE_URL}/uploads/${normalized}`;
    };

    useEffect(() => {
    if (product) {
        setSelectedImage(getImageUrl(product.image));
    }
}, [product]);


useEffect(() => {

const getProduct = async () => {

    try {

        const res = await axios.get(
            `${API_BASE_URL}/api/products/${slug}`
        );

        setProduct(res.data);

        if (res.data.image) {

            setSelectedImage(getImageUrl(res.data.image));

        }

        setLoading(false);

    } catch (error) {

        console.log(error);

        setLoading(false);

    }

};

    getProduct();

}, [slug]);

    const increaseQty = () => {

        setQuantity(quantity + 1);

    };

    const decreaseQty = () => {

        if (quantity > 1) {

            setQuantity(quantity - 1);

        }

    };
    const handleAddToCart = () => {

        for (let i = 0; i < quantity; i++) {

            addToCart(product);

        }

        navigate("/cart");

    };

    if (loading) {

        return (

            <div className="product-loading">

                <h2>Loading Product...</h2>

            </div>

        );

    }

    if (!product) {

        return (

            <div className="product-loading">

                <h2>Product Not Found</h2>

                <Link
                    to="/"
                    className="back-home-btn"
                >
                    Back Home
                </Link>

            </div>

        );

    }

    const oldPrice = Math.round(product.price * 1.25);

    const discount = Math.round(
        ((oldPrice - product.price) / oldPrice) * 100
    );

    const rawGallery = Array.isArray(product?.gallery)
        ? product.gallery
        : typeof product?.gallery === "string"
            ? JSON.parse(product.gallery)
            : [];

    const allImages = product
    ? [
          product.image,
          ...rawGallery
      ].filter(Boolean).map((img) => getImageUrl(img))
    : [];

const showPrevImage = () => {

    if (allImages.length === 0) return;

    const index = allImages.indexOf(selectedImage);

    if (index <= 0) {

        setSelectedImage(allImages[allImages.length - 1]);

    } else {

        setSelectedImage(allImages[index - 1]);

    }

};

const showNextImage = () => {

    if (allImages.length === 0) return;

    const index = allImages.indexOf(selectedImage);

    if (index === allImages.length - 1) {

        setSelectedImage(allImages[0]);

    } else {

        setSelectedImage(allImages[index + 1]);

    }

};
    return (

        <section className="product-details-page">

            <div className="container">

                <div className="product-details-card">

                    {/* LEFT SIDE */}

                    <div className="product-image-section">

                        <div className="discount-badge">

                            {discount}% OFF

                        </div>
                        <div className="product-images">

    <div className="main-image-box">

        <img
            src={selectedImage || getImageUrl(product.image)}
            alt={product.name}
            onError={(e) => {
                e.target.src = "/no-image.png";
            }}
        />

    </div>

    <div className="thumbnail-row">

        <button
            className="image-arrow"
            onClick={showPrevImage}
        >
            ❮
        </button>

        {allImages.map((img, index) => (

            <img
                key={index}
                src={img}
                alt=""
                className={
                    selectedImage === img
                        ? "thumbnail active"
                        : "thumbnail"
                }
                onClick={() => setSelectedImage(img)}
            />

        ))}

        <button
            className="image-arrow"
            onClick={showNextImage}
        >
            ❯
        </button>

    </div>

</div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="product-info-section">

                        <span className="product-category">

                            {product.category}

                        </span>

                        <h1>

                            {product.name}

                        </h1>

                        <div className="rating-row">

                            ⭐⭐⭐⭐⭐

                            <span>

                                (4.8 Reviews)

                            </span>

                        </div>

                        <div className="price-row">

                            <h2>

                                ₹ {product.price}

                            </h2>

                            <del>

                                ₹ {oldPrice}

                            </del>

                        </div>

                        <div className="stock-box">

                            {product.stock > 0
                                ? "✅ In Stock"
                                : "❌ Out of Stock"}

                        </div>

                        <div className="delivery-box">

                            🚚 Free Delivery

                            <br />

                            🔒 Secure Payment

                            <br />

                            ↩️ Easy Return

                        </div>
                                                {/* Quantity */}

                        <div className="quantity-wrapper">

                            <h5>Quantity</h5>

                            <div className="quantity-box">

                                <button
                                    onClick={decreaseQty}
                                >
                                    −
                                </button>

                                <span>

                                    {quantity}

                                </span>

                                <button
                                    onClick={increaseQty}
                                >
                                    +

                                </button>

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="product-buttons">

                            <button
                                className="add-cart-btn"
                                onClick={handleAddToCart}
                            >

                                🛒 Add To Cart

                            </button>

                            <Link
                                to="/checkout"
                                className="buy-now-btn"
                                onClick={handleAddToCart}
                            >

                                ⚡ Buy Now

                            </Link>

                        </div>

                    </div>

                </div>

                {/* Description */}

                <div className="product-extra-card">

                    <h3>

                        Product Description

                    </h3>

                    <p>

                        {product.description}

                    </p>

                </div>

                {/* Specifications */}

                <div className="product-extra-card">

                    <h3>

                        Specifications

                    </h3>

                    <table className="spec-table">

                        <tbody>

                            <tr>

                                <td>

                                    Product Name

                                </td>

                                <td>

                                    {product.name}

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    Category

                                </td>

                                <td>

                                    {product.category}

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    Price

                                </td>

                                <td>

                                    ₹ {product.price}

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    Stock

                                </td>

                                <td>

                                    {product.stock}

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    Availability

                                </td>

                                <td>

                                    {product.stock > 0
                                        ? "In Stock"
                                        : "Out of Stock"}

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    Delivery

                                </td>

                                <td>

                                    Free Delivery Available

                                </td>

                            </tr>

                            <tr>

                                <td>

                                    Payment

                                </td>

                                <td>

                                    Cash on Delivery / Online

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                {/* Features */}

                <div className="product-extra-card">

                    <h3>

                        Why Shop With Us?

                    </h3>

                    <div className="features-grid">

                        <div className="feature-item">

                            🚚

                            <h5>

                                Free Shipping

                            </h5>

                            <p>

                                Free delivery on eligible orders.

                            </p>

                        </div>

                        <div className="feature-item">

                            🔒

                            <h5>

                                Secure Payment

                            </h5>

                            <p>

                                100% secure payment gateway.

                            </p>

                        </div>

                        <div className="feature-item">

                            🔄

                            <h5>

                                Easy Return

                            </h5>

                            <p>

                                7 Days return policy.

                            </p>

                        </div>

                        <div className="feature-item">

                            ⭐

                            <h5>

                                Premium Quality

                            </h5>

                            <p>

                                Genuine products with warranty.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ProductDetails;