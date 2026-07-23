import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useNavigate } from "react-router-dom";

function Products() {
  const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleEdit = (id) => {

    console.log("Edit ID:", id);

    navigate(`/admin/edit-product/${id}`);

};  

const deleteProduct = async (id) => {

    if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
    }

    try {

        const res = await axios.delete(
            `${API_BASE_URL}/api/products/delete/${id}`
        );

        alert(res.data.message);

        getProducts();

    } catch (error) {

        console.log(error);

        alert(error.response?.data?.message || "Delete Failed");

    }

};

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>

        <Link to="/admin/products/add" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th width="180">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    width="70"
                    height="70"
                    style={{ objectFit: "cover" }}
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹ {product.price}</td>

                <td>{product.stock}</td>

                <td>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                  >
                      Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default Products;