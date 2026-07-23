import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function SearchResults() {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const { keyword } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProducts();

    }, [keyword]);

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                `${API_BASE_URL}/api/products/search?keyword=${encodeURIComponent(keyword)}`
            );

            console.log("Search:", keyword);
            console.log(res.data);

            setProducts(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="products-section">

            <div className="container">

                <div className="section-title">

                    <h2>

                        Search Results

                    </h2>

                    <p>

                        Results for "<strong>{keyword}</strong>"

                    </p>

                </div>

                <div className="products-grid">

                    {

                        loading ?

                            <h3 style={{ textAlign: "center", width: "100%" }}>

                                Loading...

                            </h3>

                            :

                            products.length > 0 ?

                                products.map(product => (

                                    <ProductCard

                                        key={product._id}

                                        product={product}

                                    />

                                ))

                                :

                                <div className="no-products-found">

                                    <h2>

                                        🔍 No Products Found

                                    </h2>

                                    <p>

                                        No products match "<b>{keyword}</b>"

                                    </p>

                                </div>

                    }

                </div>

            </div>

        </section>

    );

}

export default SearchResults;