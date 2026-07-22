import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {

    // Show only first 4 words of product name
    const shortTitle = product.name
        ? product.name.split(" ").slice(0, 4).join(" ")
        : "";

    console.log(product);

    return (

        <div className="shop-card">

            <div className="shop-image-wrapper">

                <span className="shop-discount">
                    20% OFF
                </span>

                <img
                    src={product.image}
                    alt={product.name}
                    className="shop-image"
                />

            </div>

            <div className="shop-content">

                <span className="shop-category">
                    {product.category}
                </span>

                <h3 className="shop-title">
                    {shortTitle}
                    {product.name &&
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