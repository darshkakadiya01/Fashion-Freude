import { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    const [image, setImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    };

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

    useEffect(() => {

        getCategories();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("stock", product.stock);

            // Main Image
            formData.append("image", image);

            // Gallery Images
            for (let i = 0; i < gallery.length; i++) {

                formData.append(
                    "gallery",
                    gallery[i]
                );

            }

            const res = await axios.post(
                `${API_BASE_URL}/api/products/add`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert(res.data.message);

            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: ""
            });

            setImage(null);
            setGallery([]);

            document.getElementById("productImage").value = "";
            document.getElementById("galleryImages").value = "";

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert(error.message);

            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3>Add Product</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Product Name"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    className="form-control mb-3"
                                    placeholder="Description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    className="form-control mb-3"
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                />

                                <select
                                    className="form-control mb-3"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {

                                        categories.map((category) => (

                                            <option
                                                key={category._id}
                                                value={category.name}
                                            >

                                                {category.name}

                                            </option>

                                        ))

                                    }

                                </select>

                                {/* Main Image */}

                                <label className="fw-bold mb-2">

                                    Main Product Image

                                </label>

                                <input
                                    id="productImage"
                                    type="file"
                                    className="form-control mb-3"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                    required
                                />

                                {/* Gallery Images */}

                                <label className="fw-bold mb-2">

                                    Product Gallery (Maximum 4 Images)

                                </label>

                                <input
                                    id="galleryImages"
                                    type="file"
                                    className="form-control mb-3"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                        setGallery(e.target.files)
                                    }
                                />

                                <small className="text-muted d-block mb-3">

                                    Select up to 4 additional images for the product details page.

                                </small>

                                <input
                                    className="form-control mb-3"
                                    type="number"
                                    placeholder="Stock"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    className="btn btn-success w-100"
                                >
                                    Add Product
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddProduct;