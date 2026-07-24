import axiosClient from "./axiosClient";

const MULTIPART = { headers: { "Content-Type": "multipart/form-data" } };

export const getProducts = () => axiosClient.get("/products").then((res) => res.data);

// slug or id — backend resolves by slug
export const getProduct = (slugOrId) =>
    axiosClient.get(`/products/${slugOrId}`).then((res) => res.data);

export const getProductsByCategory = (category) =>
    axiosClient.get(`/products/category/${encodeURIComponent(category)}`).then((res) => res.data);

export const searchProducts = (keyword) =>
    axiosClient.get("/products/search", { params: { keyword } }).then((res) => res.data);

export const addProduct = (formData) =>
    axiosClient.post("/products/add", formData, MULTIPART).then((res) => res.data);

export const updateProduct = (id, formData) =>
    axiosClient.put(`/products/update/${id}`, formData, MULTIPART).then((res) => res.data);

export const deleteProduct = (id) =>
    axiosClient.delete(`/products/delete/${id}`).then((res) => res.data);
