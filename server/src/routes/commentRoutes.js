const express = require("express");
const router = express.Router();

const {
    createComment,
    getApprovedCommentsByProduct,
    getAllCommentsAdmin,
    updateCommentStatus,
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

// Public: Get approved comments for a product by product ID
router.get("/product/:productId", getApprovedCommentsByProduct);

// Public: Submit a new comment (stored with status: 'pending')
router.post("/", createComment);

// Admin: Get all comments (with filter by ?status= and product details)
router.get("/", getAllCommentsAdmin);

// Admin: Update comment status (approve, reject, pending)
router.put("/:id/status", updateCommentStatus);

// Admin: Update full comment (edit text, name, email, rating, status)
router.put("/:id", updateComment);

// Admin: Delete comment
router.delete("/:id", deleteComment);

module.exports = router;
