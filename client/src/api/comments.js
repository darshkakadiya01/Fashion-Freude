import axiosClient from "./axiosClient";

// Public: Get approved comments for a product by product ID
export const getCommentsByProductId = (productId) =>
    axiosClient.get(`/comments/product/${productId}`).then((res) => res.data);

// Public: Submit a new comment (defaults to status: 'pending')
export const submitComment = (payload) =>
    axiosClient.post("/comments", payload).then((res) => res.data);

// Admin: Get all comments with optional filter and search
export const getAllComments = (status, search) =>
    axiosClient
        .get("/comments", {
            params: {
                ...(status && status !== "all" ? { status } : {}),
                ...(search ? { search } : {}),
            },
        })
        .then((res) => res.data);

// Admin: Update status ('approved', 'rejected', 'pending')
export const updateCommentStatus = (id, status) =>
    axiosClient.put(`/comments/${id}/status`, { status }).then((res) => res.data);

// Admin: Update full comment (edit message, name, email, rating, status)
export const updateComment = (id, data) =>
    axiosClient.put(`/comments/${id}`, data).then((res) => res.data);

// Admin: Delete comment permanently
export const deleteComment = (id) =>
    axiosClient.delete(`/comments/${id}`).then((res) => res.data);
