import axiosClient from "./axiosClient";

export const getCategories = () => axiosClient.get("/categories").then((res) => res.data);

export const addCategory = (name) =>
    axiosClient.post("/categories/add", { name }).then((res) => res.data);

export const deleteCategory = (id) =>
    axiosClient.delete(`/categories/delete/${id}`).then((res) => res.data);
