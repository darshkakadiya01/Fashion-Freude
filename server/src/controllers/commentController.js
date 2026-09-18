const Comment = require("../models/Comment");
const Product = require("../models/Product");
const { Op } = require("sequelize");

// ==========================================
// Submit a Comment (Public - Pending by default)
// ==========================================
exports.createComment = async (req, res) => {
    try {
        const { productId, name, email, rating, message } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const emailTrimmed = email ? email.trim() : "";
        const messageTrimmed = message ? message.trim() : "";

        if (!emailTrimmed || !messageTrimmed) {
            return res.status(400).json({
                success: false,
                message: "Email and message are required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailTrimmed)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        // Verify that the product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const parsedRating = Number(rating);
        const validRating = Number.isInteger(parsedRating) && parsedRating >= 1 && parsedRating <= 5 ? parsedRating : 5;

        const comment = await Comment.create({
            productId: Number(productId),
            name: name && name.trim() ? name.trim() : "Customer",
            email: emailTrimmed,
            rating: validRating,
            message: messageTrimmed,
            status: "pending",
        });

        return res.status(201).json({
            success: true,
            message: "Comment submitted successfully and is pending admin approval.",
            comment,
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to submit comment",
        });
    }
};

// ==========================================
// Get Approved Comments for a Product (Public)
// ==========================================
exports.getApprovedCommentsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const comments = await Comment.findAll({
            where: {
                productId: Number(productId),
                status: "approved",
            },
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error("Error fetching product comments:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch comments",
        });
    }
};

// ==========================================
// Get All Comments for Admin Panel
// ==========================================
exports.getAllCommentsAdmin = async (req, res) => {
    try {
        const { status, search } = req.query;

        const where = {};
        if (status && ["pending", "approved", "rejected"].includes(status.toLowerCase())) {
            where.status = status.toLowerCase();
        }

        if (search && search.trim()) {
            const query = `%${search.trim()}%`;
            where[Op.or] = [
                { name: { [Op.like]: query } },
                { email: { [Op.like]: query } },
                { message: { [Op.like]: query } },
            ];
        }

        const comments = await Comment.findAll({
            where,
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name", "slug", "image", "price", "category"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Compute counts for tab badges
        const allComments = await Comment.findAll({
            attributes: ["id", "status"],
        });

        const counts = {
            all: allComments.length,
            pending: allComments.filter((c) => c.status === "pending").length,
            approved: allComments.filter((c) => c.status === "approved").length,
            rejected: allComments.filter((c) => c.status === "rejected").length,
        };

        return res.status(200).json({
            success: true,
            comments,
            counts,
        });
    } catch (error) {
        console.error("Error fetching admin comments:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch comments",
        });
    }
};

// ==========================================
// Update Comment Status (Admin: Approve / Reject / Pending)
// ==========================================
exports.updateCommentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "approved", "rejected"];
        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${validStatuses.join(", ")}`,
            });
        }

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name", "slug", "image"],
                },
            ],
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        comment.status = status.toLowerCase();
        await comment.save();

        return res.status(200).json({
            success: true,
            message: `Comment marked as ${comment.status}.`,
            comment,
        });
    } catch (error) {
        console.error("Error updating comment status:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update comment status",
        });
    }
};

// ==========================================
// Update Entire Comment (Admin: Edit name, email, rating, message, status)
// ==========================================
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, rating, message, status } = req.body;

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: ["id", "name", "slug", "image"],
                },
            ],
        });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        if (name !== undefined) comment.name = name.trim() || "Customer";
        if (email !== undefined) comment.email = email.trim();
        if (message !== undefined) comment.message = message.trim();
        if (rating !== undefined) {
            const r = Number(rating);
            if (r >= 1 && r <= 5) comment.rating = r;
        }
        if (status !== undefined) {
            const validStatuses = ["pending", "approved", "rejected"];
            if (validStatuses.includes(status.toLowerCase())) {
                comment.status = status.toLowerCase();
            }
        }

        await comment.save();

        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment,
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update comment",
        });
    }
};

// ==========================================
// Delete Comment (Admin)
// ==========================================
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        await comment.destroy();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to delete comment",
        });
    }
};
