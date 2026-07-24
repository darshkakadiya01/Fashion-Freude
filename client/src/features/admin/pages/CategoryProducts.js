import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";
import SectionHeading from "../../../components/SectionHeading";
import { getProductsByCategory } from "../../../api/products";

function CategoryProducts() {
    const { categoryName } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Convert slug back to category name
    const originalCategory = categoryName.replace(/-/g, " ").trim();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);

            try {
                const data = await getProductsByCategory(originalCategory);

                console.log("URL Slug:", categoryName);
                console.log("Original Category:", originalCategory);
                console.log("Products:", data);

                setProducts(data);
            } catch (error) {
                console.log(error);

                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [categoryName, originalCategory]);

    return (
        <div className="container-luxe py-12 lg:py-16">
            <SectionHeading
                eyebrow="Collection"
                title={originalCategory}
                subtitle="Products available in this category"
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
                <p className="mt-16 text-center font-display text-3xl text-ink">No Products Found</p>
            )}
        </div>
    );
}

export default CategoryProducts;
