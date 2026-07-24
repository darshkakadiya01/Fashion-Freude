import { useEffect, useState } from "react";
import { addProduct } from "../api/products";
import { getCategories } from "../api/categories";
import AdminLayout from "../features/admin/AdminLayout";

function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    const [image, setImage] = useState(null);
    const [gallery, setGallery] = useState([]);

    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
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
                formData.append("gallery", gallery[i]);
            }

            const data = await addProduct(formData);

            alert(data.message);

            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
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
        <AdminLayout>
            <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                    <p className="eyebrow">Catalogue</p>
                    <h2 className="mt-2 font-display text-4xl text-ink">Add Product</h2>
                </div>

                <div className="card p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="field-label">Product Name</label>
                            <input
                                className="field"
                                placeholder="Product Name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="field-label">Description</label>
                            <textarea
                                className="field"
                                rows="5"
                                placeholder="Description"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="mb-4">
                                <label className="field-label">Price</label>
                                <input
                                    className="field"
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="field-label">Stock</label>
                                <input
                                    className="field"
                                    type="number"
                                    placeholder="Stock"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="field-label">Category</label>
                            <select
                                className="field"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Main Image */}

                        <div className="mb-4">
                            <label className="field-label">Main Product Image</label>
                            <div className="rounded-xl border-2 border-dashed border-sand p-4">
                                <input
                                    id="productImage"
                                    type="file"
                                    className="field"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </div>
                        </div>

                        {/* Gallery Images */}

                        <div className="mb-6">
                            <label className="field-label">
                                Product Gallery (Maximum 4 Images)
                            </label>
                            <div className="rounded-xl border-2 border-dashed border-sand p-4">
                                <input
                                    id="galleryImages"
                                    type="file"
                                    className="field"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setGallery(e.target.files)}
                                />

                                <small className="mt-2 block text-xs text-muted">
                                    Select up to 4 additional images for the product details
                                    page.
                                </small>
                            </div>
                        </div>

                        <button className="btn-primary w-full">Add Product</button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AddProduct;
