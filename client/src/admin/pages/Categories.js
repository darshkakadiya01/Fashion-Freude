import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // ================= GET CATEGORIES =================

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // ================= ADD CATEGORY =================

  const addCategory = async () => {

    if (name.trim() === "") {
      alert("Please enter category name");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/categories/add",
        {
          name: name.trim(),
        }
      );

      alert(res.data.message);

      setName("");

      getCategories();

    } catch (error) {

      console.log(error);

      if (error.response) {

        console.log(error.response.data);

        alert(
          error.response.data.message ||
          JSON.stringify(error.response.data)
        );

      } else {

        alert(error.message);

      }
    }
  };

  // ================= DELETE CATEGORY =================

  const deleteCategory = async (id) => {

    if (!window.confirm("Delete this category?")) return;

    try {

      const res = await axios.delete(
        `http://localhost:5000/api/categories/delete/${id}`
      );

      alert(res.data.message);

      getCategories();

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

      <h2 className="mb-4">Category Management</h2>

      <div className="card p-3 mb-4">

        <div className="row">

          <div className="col-md-10">

            <input
              type="text"
              className="form-control"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="col-md-2">

            <button
              className="btn btn-primary w-100"
              onClick={addCategory}
            >
              Add
            </button>

          </div>

        </div>

      </div>

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>

            <th width="80">#</th>

            <th>Category Name</th>

            <th width="150">Action</th>

          </tr>

        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>

              <td colSpan="3" className="text-center">
                No Categories Found
              </td>

            </tr>

          ) : (

            categories.map((category, index) => (

              <tr key={category._id}>

                <td>{index + 1}</td>

                <td>{category.name}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </AdminLayout>
  );
}

export default Categories;