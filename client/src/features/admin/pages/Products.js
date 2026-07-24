import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import {
    getProducts as fetchProducts,
    deleteProduct as removeProduct,
} from "../../../api/products";
import { getImageUrl } from "../../../config";

function Products() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            const data = await removeProduct(id);

            alert(data.message);

            getProducts();
        } catch (error) {
            console.log(error);

            alert(error.response?.data?.message || "Delete Failed");
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="eyebrow">Catalogue</p>
                    <h2 className="mt-2 font-display text-4xl text-ink">Products</h2>
                </div>

                <Link to="/admin/products/add" className="btn-primary">
                    + Add Product
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-cream">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Image
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Category
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Stock
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-cream/40">
                                        <td className="border-t border-sand/60 px-4 py-3">
                                            <img
                                                src={getImageUrl(product.image)}
                                                alt={product.name}
                                                width="70"
                                                height="70"
                                                className="h-16 w-16 rounded-lg object-cover"
                                                onError={(e) => {
                                                    e.target.src = "/no-image.png";
                                                }}
                                            />
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 font-medium text-ink">
                                            {product.name}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 text-muted">
                                            {product.category}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 text-maroon">
                                            ₹ {product.price}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 text-muted">
                                            {product.stock}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="btn-outline !px-4 !py-1.5 text-xs"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="rounded-full bg-maroon px-4 py-1.5 text-xs font-medium text-ivory transition-colors hover:bg-maroon-dark"
                                                    onClick={() => deleteProduct(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="border-t border-sand/60 px-4 py-8 text-center text-muted"
                                    >
                                        No Products Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Products;
