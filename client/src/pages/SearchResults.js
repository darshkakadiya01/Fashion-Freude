import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";

function SearchResults() {
    const { keyword } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await searchProducts(keyword);

                console.log("Search:", keyword);
                console.log(data);

                setProducts(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]);

    return (
        <div className="container-luxe py-12 lg:py-16">
            <SectionHeading
                eyebrow="Discover"
                title="Search Results"
                subtitle={`Results for "${keyword}"`}
                center
            />

            {loading ? (
                <p className="mt-16 text-center font-display text-2xl text-muted">Loading...</p>
            ) : products.length > 0 ? (
                <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="mt-16 text-center">
                    <h2 className="font-display text-3xl text-ink">No Products Found</h2>
                    <p className="mt-3 text-muted">
                        No products match "<span className="font-medium text-ink">{keyword}</span>"
                    </p>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
