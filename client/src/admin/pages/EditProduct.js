import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";

function EditProduct() {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const { id } = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({

        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        gallery: []

    });

    // New Selected Files

    const [mainImage, setMainImage] = useState(null);

    const [galleryImages, setGalleryImages] = useState([]);

    // Preview Images

    const [mainPreview, setMainPreview] = useState("");

    const [galleryPreview, setGalleryPreview] = useState([]);

    // ===============================
    // Load Product
    // ===============================

    const getProduct = async () => {

        try {

            const res = await axios.get(

                `${API_BASE_URL}/api/products/${id}`

            );

            setProduct(res.data);

            setMainPreview(res.data.image);

            setGalleryPreview(res.data.gallery || []);

        }

        catch (error) {

            console.log(error);

            alert("Product not found");

        }

    };

    // ===============================
    // Load Categories
    // ===============================

    const getCategories = async () => {

        try {

            const res = await axios.get(

                `${API_BASE_URL}/api/categories`

            );

            setCategories(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getProduct();

        getCategories();

    }, []);

    // ===============================
    // Text Change
    // ===============================

    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };

    // ===============================
    // Main Image Change
    // ===============================

    const handleMainImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setMainImage(file);

        setMainPreview(URL.createObjectURL(file));

    };

    // ===============================
    // Gallery Images Change
    // ===============================

    const handleGalleryImages = (e) => {

        const files = Array.from(e.target.files);

        setGalleryImages(files);

        const previews = files.map(file =>

            URL.createObjectURL(file)

        );

        setGalleryPreview(previews);

    };
    // ===============================
// Update Product
// ===============================

const updateProduct = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("stock", product.stock);

        // Main Image
        if (mainImage) {

            formData.append("image", mainImage);

        }

        // Gallery Images
        if (galleryImages.length > 0) {

            galleryImages.forEach((image) => {

                formData.append("gallery", image);

            });

        }

        const res = await axios.put(

            `${API_BASE_URL}/api/products/update/${id}`,

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        alert(res.data.message);

        navigate("/admin/products");

    }

    catch (error) {

        console.log(error);

        alert(

            error.response?.data?.message ||

            "Product Update Failed"

        );

    }

};
return (

    <AdminLayout>

        <div className="container py-4">

            <div className="card shadow border-0 rounded-4">

                <div className="card-header bg-primary text-white py-3">

                    <h3 className="mb-0">
                        Edit Product
                    </h3>

                </div>

                <div className="card-body p-4">

                    <form onSubmit={updateProduct}>

                        {/* Product Name */}

                        <div className="mb-3">

                            <label className="form-label fw-bold">

                                Product Name

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                name="name"

                                value={product.name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        {/* Description */}

                        <div className="mb-3">

                            <label className="form-label fw-bold">

                                Description

                            </label>

                            <textarea

                                className="form-control"

                                rows="5"

                                name="description"

                                value={product.description}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Price

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="price"

                                    value={product.price}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Stock

                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="stock"

                                    value={product.stock}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        {/* Category */}

                        <div className="mb-4">

                            <label className="form-label fw-bold">

                                Category

                            </label>

                            <select

                                className="form-select"

                                name="category"

                                value={product.category}

                                onChange={handleChange}

                            >

                                <option value="">

                                    Select Category

                                </option>

                                {

                                    categories.map((cat) => (

                                        <option

                                            key={cat._id}

                                            value={cat.name}

                                        >

                                            {cat.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        {/* Main Image */}

                        <div className="mb-4">

                            <label className="form-label fw-bold">

                                Main Product Image

                            </label>

                            <input

                                type="file"

                                accept="image/*"

                                className="form-control"

                                onChange={handleMainImage}

                            />

                            {

                                mainPreview && (

                                    <div className="mt-3">

                                        <img

                                            src={mainPreview}

                                            alt="Preview"

                                            className="img-fluid rounded shadow"

                                            style={{

                                                width: "220px",

                                                height: "220px",

                                                objectFit: "cover"

                                            }}

                                        />

                                    </div>

                                )

                            }

                        </div>

                        {/* Gallery */}

                        <div className="mb-4">

                            <label className="form-label fw-bold">

                                Gallery Images

                            </label>

                            <input

                                type="file"

                                multiple

                                accept="image/*"

                                className="form-control"

                                onChange={handleGalleryImages}

                            />

                            {

                                galleryPreview.length > 0 && (

                                    <div className="row mt-3 g-3">

                                        {

                                            galleryPreview.map(

                                                (img, index) => (

                                                    <div

                                                        className="col-lg-3 col-md-4 col-6"

                                                        key={index}

                                                    >

                                                        <img

                                                            src={img}

                                                            alt="Gallery"

                                                            className="img-fluid rounded shadow"

                                                            style={{

                                                                width: "100%",

                                                                height: "140px",

                                                                objectFit: "cover"

                                                            }}

                                                        />

                                                    </div>

                                                )

                                            )

                                        }

                                    </div>

                                )

                            }

                        </div>

                        <div className="d-flex gap-3">

                            <button

                                type="submit"

                                className="btn btn-success px-4"

                            >

                                Update Product

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary px-4"

                                onClick={() =>

                                    navigate("/admin/products")

                                }

                            >

                                Cancel  

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    </AdminLayout>

);

}

export default EditProduct;