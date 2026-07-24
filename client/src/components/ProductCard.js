import { Link } from "react-router-dom";
import { getImageUrl } from "../config";

function ProductCard({ product }) {
    const words = product.name ? product.name.split(" ") : [];
    const shortTitle = words.slice(0, 5).join(" ");
    const truncated = words.length > 5;

    return (
        <Link
            to={`/product/${product.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-maroon/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ivory">
                    20% Off
                </span>

                <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = "/no-image.png";
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* signature gold corner tick, revealed on hover */}
                <span className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold/0 transition-all duration-500 group-hover:border-gold/70" />
            </div>

            <div className="flex flex-1 flex-col px-5 py-4">
                <span className="eyebrow">{product.category}</span>

                <h3 className="mt-1.5 font-display text-xl leading-snug text-ink">
                    {shortTitle}
                    {truncated ? "…" : ""}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="font-display text-2xl font-medium text-maroon">
                        ₹{product.price}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-maroon">
                        View
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                        </span>
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
