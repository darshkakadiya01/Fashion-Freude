import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import {
    getCategories as fetchCategories,
    addCategory as createCategory,
    deleteCategory as removeCategory,
} from "../../../api/categories";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    // ================= GET CATEGORIES =================

    const getCategories = async () => {
        try {
            const data = await fetchCategories();

            setCategories(data);
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
            const data = await createCategory(name.trim());

            alert(data.message);

            setName("");

            getCategories();
        } catch (error) {
            console.log(error);

            if (error.response) {
                console.log(error.response.data);

                alert(error.response.data.message || JSON.stringify(error.response.data));
            } else {
                alert(error.message);
            }
        }
    };

    // ================= DELETE CATEGORY =================

    const deleteCategory = async (id) => {
        if (!window.confirm("Delete this category?")) return;

        try {
            const data = await removeCategory(id);

            alert(data.message);

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
            <div className="mb-6">
                <p className="eyebrow">Organise</p>
                <h2 className="mt-2 font-display text-4xl text-ink">Category Management</h2>
            </div>

            <div className="card mb-6 p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        className="field flex-1"
                        placeholder="Enter Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button className="btn-primary sm:w-40" onClick={addCategory}>
                        Add
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-cream">
                            <tr>
                                <th className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    #
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Category Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="border-t border-sand/60 px-4 py-8 text-center text-muted"
                                    >
                                        No Categories Found
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, index) => (
                                    <tr key={category.id} className="hover:bg-cream/40">
                                        <td className="border-t border-sand/60 px-4 py-3 text-muted">
                                            {index + 1}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 font-medium text-ink">
                                            {category.name}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3">
                                            <button
                                                className="rounded-full bg-maroon px-4 py-1.5 text-xs font-medium text-ivory transition-colors hover:bg-maroon-dark"
                                                onClick={() => deleteCategory(category.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Categories;
