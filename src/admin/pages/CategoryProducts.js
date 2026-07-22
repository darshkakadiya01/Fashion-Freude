import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

function CategoryProducts() {

    const { categoryName } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Convert slug back to category name
    const originalCategory = categoryName
        .replace(/-/g, " ")
        .trim();

    useEffect(() => {

        getProducts();

    }, [categoryName]);

    const getProducts = async () => {

        setLoading(true);

        try {

            const res = await axios.get(
                `http://localhost:5000/api/products/category/${encodeURIComponent(originalCategory)}`
            );

            console.log("URL Slug:", categoryName);
            console.log("Original Category:", originalCategory);
            console.log("Products:", res.data);

            setProducts(res.data);

        } catch (error) {

            console.log(error);

            setProducts([]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="products-section">

            <div className="container">

                <div className="section-title">

                    <h2>{originalCategory}</h2>

                    <p>
                        Products available in this category
                    </p>

                </div>

                <div className="products-grid">

                    {

                        loading ?

                            <h3 style={{ width: "100%", textAlign: "center" }}>
                                Loading...
                            </h3>

                            :

                            products.length > 0 ?

                                products.map((product) => (

                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />

                                ))

                                :

                                <h3 style={{ width: "100%", textAlign: "center" }}>
                                    No Products Found
                                </h3>

                    }

                </div>

            </div>

        </section>

    );

}

export default CategoryProducts;