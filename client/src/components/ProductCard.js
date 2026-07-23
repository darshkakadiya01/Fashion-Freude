import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");

    // Show only first 4 words
    const shortTitle = product?.name
        ? product.name.split(" ").slice(0, 4).join(" ")
        : "";

    // Build Image URL
    const imageUrl = product?.image
        ? product.image.startsWith("http")
            ? product.image
            : `${API_BASE_URL}/uploads/${product.image.replace(/^uploads[\\/]/, "")}`
        : "/no-image.png";

    return (

        <div className="shop-card">

            <div className="shop-image-wrapper">

                <span className="shop-discount">
                    20% OFF
                </span>

                <img
                    src={imageUrl}
                    alt={product?.name}
                    className="shop-image"
                    onError={(e) => {
                        e.target.src = "/no-image.png";
                    }}
                />

            </div>

            <div className="shop-content">

                <span className="shop-category">
                    {product.category}
                </span>

                <h3 className="shop-title">
                    {shortTitle}
                    {product?.name &&
                        product.name.split(" ").length > 4
                        ? "..."
                        : ""}
                </h3>

                <div className="shop-price">
                    ₹ {product.price}
                </div>

                <Link
                    to={`/product/${product.slug}`}
                    className="shop-button"
                >
                    View Details
                </Link>

            </div>

        </div>

    );

}

export default ProductCard;