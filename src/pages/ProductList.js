import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getProducts();

    }, []);
    const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        const res = await axios.delete(
            `http://localhost:5000/api/products/delete/${id}`
        );

        alert(res.data.message);

        getProducts();

    } catch (error) {

        alert(error.response?.data?.message || "Delete Failed");

    }

};

const editProduct = async (product) => {

    const newName = prompt("Enter Product Name", product.name);

    if (!newName) return;

    try {

        const res = await axios.put(

            `http://localhost:5000/api/products/update/${product._id}`,

            {

                ...product,

                name: newName

            }

        );

        alert(res.data.message);

        getProducts();

    }

    catch (error) {

        alert(error.response?.data?.message);

    }

};

return (

    <div className="container mt-5">

        <h2 className="mb-4 text-center">
            Product Management
        </h2>

        <table className="table table-bordered table-hover shadow">

            <thead className="table-dark">

                <tr>

                    <th>Image</th>

                    <th>Name</th>

                    <th>Description</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    products.map((product)=>(

                        <tr key={product._id}>

                            <td>

                                <img

                                src={product.image}

                                alt={product.name}

                                width="70"

                                height="70"

                                style={{objectFit:"cover"}}

                                />

                            </td>

                            <td>{product.name}</td>

                            <td>{product.description}</td>

                            <td>

                                <span className="badge bg-primary">

                                    {product.category}

                                </span>

                            </td>

                            <td>

                                ₹ {product.price}

                            </td>

                            <td>

                                <span className="badge bg-success">

                                    {product.stock}

                                </span>

                            </td>

                            <td>

                                <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={()=>editProduct(product)}
                                >
                                Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteProduct(product._id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    </div>

);

}

export default ProductList;