// ...existing code...
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { getProduct as fetchProduct, updateProduct as saveProduct } from "../../../api/products";
import { getCategories as fetchCategories } from "../../../api/categories";
import { getImageUrl } from "../../../config";

function EditProduct() {
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
    buyNowUrl: "",
    gallery: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [mainPreview, setMainPreview] = useState("");
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);

        const productData = data?.product || data || {};

        setProduct({
          name: productData.name || "",
          description: productData.description || "",
          price: productData.price || "",
          category: productData.category || "",
          stock: productData.stock || "",
          image: productData.image || "",
          buyNowUrl: productData.buyNowUrl || "",
          gallery: Array.isArray(productData.gallery)
            ? productData.gallery
            : typeof productData.gallery === "string"
              ? JSON.parse(productData.gallery)
              : [],
        });

        setMainPreview(productData.image ? getImageUrl(productData.image) : "");
        setGalleryPreview(
          (Array.isArray(productData.gallery)
            ? productData.gallery
            : typeof productData.gallery === "string"
              ? JSON.parse(productData.gallery)
              : []
          ).map((img) => getImageUrl(img))
        );
      } catch (error) {
        console.log(error);
        alert("Product not found");
        navigate("/admin/products");
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || data || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadProduct();
    loadCategories();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(previews);
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("stock", product.stock);
      formData.append("buyNowUrl", product.buyNowUrl || "");

      if (mainImage) {
        formData.append("image", mainImage);
      }

      if (galleryImages.length > 0) {
        galleryImages.forEach((image) => {
          formData.append("gallery", image);
        });
      }

      const data = await saveProduct(id, formData);
      alert(data.message || "Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Product Update Failed");
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="eyebrow">Catalogue</p>
          <h2 className="mt-2 font-display text-4xl text-ink">Edit Product</h2>
        </div>

        <div className="card p-6">
          <form onSubmit={updateProductHandler}>
            <div className="mb-4">
              <label className="field-label">Product Name</label>
              <input
                type="text"
                className="field"
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
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="mb-4">
                <label className="field-label">Price</label>
                <input
                  type="number"
                  className="field"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="field-label">Stock</label>
                <input
                  type="number"
                  className="field"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
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
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id || cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {product.category?.trim().toLowerCase() === "meesho" && (
              <div className="mb-4 rounded-xl border border-gold/40 bg-cream/40 p-4">
                <label className="field-label text-maroon font-semibold flex items-center gap-2">
                  <span>🔗</span> Meesho Product URL / Buy Now Link
                </label>
                <input
                  type="url"
                  className="field mt-1"
                  placeholder="https://www.meesho.com/..."
                  name="buyNowUrl"
                  value={product.buyNowUrl || ""}
                  onChange={handleChange}
                />
                <small className="mt-1.5 block text-xs text-muted">
                  When customers click "Buy Now" on this Meesho product, they will be redirected to this link.
                </small>
              </div>
            )}

            <div className="mb-4">
              <label className="field-label">Main Product Image</label>
              <div className="rounded-xl border-2 border-dashed border-sand p-4">
                <input
                  type="file"
                  accept="image/*"
                  className="field"
                  onChange={handleMainImage}
                />
                {mainPreview && (
                  <div className="mt-3">
                    <img
                      src={mainPreview}
                      alt="Preview"
                      className="h-56 w-56 rounded-lg object-cover shadow-card"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="field-label">Gallery Images</label>
              <div className="rounded-xl border-2 border-dashed border-sand p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="field"
                  onChange={handleGalleryImages}
                />
                {galleryPreview.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {galleryPreview.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Gallery"
                        className="h-36 w-full rounded-lg object-cover shadow-card"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                Update Product
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EditProduct;