import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { getAllComments, updateCommentStatus, updateComment, deleteComment } from "../../../api/comments";
import { getImageUrl } from "../../../config";

function Comments() {
    const [comments, setComments] = useState([]);
    const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all"); // "all", "pending", "approved", "rejected"
    const [searchTerm, setSearchTerm] = useState("");
    const [notification, setNotification] = useState(null);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    // Edit modal state
    const [editingComment, setEditingComment] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRating, setEditRating] = useState(5);
    const [editMessage, setEditMessage] = useState("");
    const [editStatus, setEditStatus] = useState("approved");
    const [editError, setEditError] = useState("");
    const [isSavingEdit, setIsSavingEdit] = useState(false);

    const handleOpenEdit = (comment) => {
        setEditingComment(comment);
        setEditName(comment.name || "");
        setEditEmail(comment.email || "");
        setEditRating(comment.rating || 5);
        setEditMessage(comment.message || "");
        setEditStatus(comment.status || "pending");
        setEditError("");
    };

    const handleCloseEdit = () => {
        setEditingComment(null);
        setEditError("");
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setEditError("");

        if (!editEmail.trim() || !editMessage.trim()) {
            setEditError("Email and message are required.");
            return;
        }

        try {
            setIsSavingEdit(true);
            const res = await updateComment(editingComment.id, {
                name: editName.trim() || "Customer",
                email: editEmail.trim(),
                rating: editRating,
                message: editMessage.trim(),
                status: editStatus,
            });

            if (res && res.success) {
                showNotification("success", "Comment updated successfully.");
                handleCloseEdit();
                fetchCommentsList();
            } else {
                setEditError(res?.message || "Failed to update comment.");
            }
        } catch (err) {
            console.error("Error updating comment:", err);
            setEditError(err.response?.data?.message || "Failed to update comment.");
        } finally {
            setIsSavingEdit(false);
        }
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 4000);
    };

    const fetchCommentsList = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAllComments(activeTab, searchTerm);
            if (data && data.success) {
                setComments(data.comments || []);
                if (data.counts) {
                    setCounts(data.counts);
                }
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            showNotification("error", "Failed to load comments. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }, [activeTab, searchTerm]);

    useEffect(() => {
        fetchCommentsList();
    }, [fetchCommentsList]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            setActionLoadingId(id);
            const res = await updateCommentStatus(id, newStatus);
            if (res && res.success) {
                showNotification(
                    "success",
                    `Comment has been ${newStatus === "approved" ? "approved and is now visible publicly" : newStatus}!`
                );
                fetchCommentsList();
            }
        } catch (error) {
            console.error("Error updating comment status:", error);
            showNotification("error", error.response?.data?.message || "Failed to update status.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this comment?")) {
            return;
        }

        try {
            setActionLoadingId(id);
            const res = await deleteComment(id);
            if (res && res.success) {
                showNotification("success", "Comment deleted successfully.");
                fetchCommentsList();
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            showNotification("error", error.response?.data?.message || "Failed to delete comment.");
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="eyebrow">Customer Voice & Moderation</p>
                    <h2 className="mt-1 font-display text-4xl text-ink">Product Comments</h2>
                    <p className="mt-1 text-sm text-muted">
                        Review customer comments linked to products and approve them to display publicly.
                    </p>
                </div>
            </div>

            {/* Notification Banner */}
            {notification && (
                <div
                    className={`mb-6 flex items-center justify-between rounded-xl p-4 text-sm font-medium ${
                        notification.type === "success"
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border border-rose-200 bg-rose-50 text-rose-800"
                    }`}
                >
                    <span>{notification.message}</span>
                    <button
                        onClick={() => setNotification(null)}
                        className="text-xs font-bold hover:underline"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Filter Tabs & Search Bar */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Tabs */}
                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-sand bg-white p-1.5 shadow-sm">
                    {[
                        { id: "all", label: "All Comments", count: counts.all },
                        { id: "pending", label: "Pending Approval", count: counts.pending, highlight: true },
                        { id: "approved", label: "Approved", count: counts.approved },
                        { id: "rejected", label: "Rejected", count: counts.rejected },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                                activeTab === tab.id
                                    ? "bg-maroon text-ivory shadow-sm"
                                    : "text-muted hover:bg-cream hover:text-ink"
                            }`}
                        >
                            <span>{tab.label}</span>
                            <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                    activeTab === tab.id
                                        ? "bg-white/20 text-white"
                                        : tab.highlight && tab.count > 0
                                          ? "bg-amber-100 text-amber-800 font-bold animate-pulse"
                                          : "bg-cream text-muted"
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by customer or message..."
                        className="field py-2 pl-9 text-xs"
                    />
                    <span className="absolute left-3 top-2.5 text-xs text-muted">🔍</span>
                </div>
            </div>

            {/* Comments Table Card */}
            <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-cream">
                            <tr>
                                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest text-muted">
                                    Product Info
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest text-muted">
                                    Customer & Rating
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest text-muted">
                                    Comment Message
                                </th>
                                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest text-muted">
                                    Status
                                </th>
                                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-widest text-muted">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-sand/60">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-muted">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-maroon border-t-transparent"></span>
                                            Loading comments...
                                        </div>
                                    </td>
                                </tr>
                            ) : comments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-muted">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <span className="text-3xl">💬</span>
                                            <p className="font-display text-lg text-ink">No Comments Found</p>
                                            <p className="text-xs text-muted">
                                                {activeTab === "pending"
                                                    ? "Great job! There are no pending comments awaiting approval."
                                                    : "No comments found for the selected view."}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                comments.map((comment) => (
                                    <tr key={comment.id} className="transition-colors hover:bg-cream/30">
                                        {/* Product Info */}
                                        <td className="px-4 py-4 align-top">
                                            {comment.product ? (
                                                <div className="flex items-start gap-3">
                                                    <img
                                                        src={getImageUrl(comment.product.image)}
                                                        alt={comment.product.name}
                                                        className="h-14 w-14 shrink-0 rounded-lg object-cover border border-sand/70"
                                                        onError={(e) => {
                                                            e.target.src = "/no-image.png";
                                                        }}
                                                    />
                                                    <div className="max-w-[200px]">
                                                        <Link
                                                            to={`/product/${comment.product.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium text-ink transition hover:text-maroon line-clamp-2"
                                                            title="View product page in new tab"
                                                        >
                                                            {comment.product.name}
                                                        </Link>
                                                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
                                                            <span className="rounded bg-cream px-1.5 py-0.5 font-mono">
                                                                ID: #{comment.product.id}
                                                            </span>
                                                            {comment.product.category && (
                                                                <span className="capitalize">
                                                                    • {comment.product.category}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-muted">
                                                    <span className="font-mono">Product #{comment.productId}</span>
                                                    <p className="italic text-rose-500">(Product not found)</p>
                                                </div>
                                            )}
                                        </td>

                                        {/* Customer & Rating */}
                                        <td className="px-4 py-4 align-top">
                                            <div className="flex items-start gap-2.5">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream font-display text-xs font-bold text-maroon">
                                                    {(comment.name || comment.email || "U")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-ink">
                                                        {comment.name || "Customer"}
                                                    </p>
                                                    <p className="text-xs text-muted">
                                                        {comment.email}
                                                    </p>
                                                    <div className="mt-1 flex items-center text-xs text-amber-500">
                                                        {"★".repeat(comment.rating || 5)}
                                                        {"☆".repeat(Math.max(0, 5 - (comment.rating || 5)))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Comment Message */}
                                        <td className="max-w-xs px-4 py-4 align-top">
                                            <p className="whitespace-pre-line text-sm text-ink/90 leading-relaxed">
                                                "{comment.message}"
                                            </p>
                                            <p className="mt-2 text-[11px] text-muted">
                                                📅{" "}
                                                {comment.createdAt
                                                    ? new Date(comment.createdAt).toLocaleString("en-US", {
                                                          month: "short",
                                                          day: "numeric",
                                                          year: "numeric",
                                                          hour: "2-digit",
                                                          minute: "2-digit",
                                                      })
                                                    : "Recently"}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4 align-top">
                                            {comment.status === "approved" ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    Approved
                                                </span>
                                            ) : comment.status === "rejected" ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                                    Rejected
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                                                    Pending
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-4 text-right align-top">
                                            <div className="flex items-center justify-end gap-2">
                                                {comment.status !== "approved" && (
                                                    <button
                                                        type="button"
                                                        disabled={actionLoadingId === comment.id}
                                                        onClick={() =>
                                                            handleStatusChange(comment.id, "approved")
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                                                        title="Approve to show publicly on product page"
                                                    >
                                                        ✓ Approve
                                                    </button>
                                                )}

                                                {comment.status !== "rejected" && (
                                                    <button
                                                        type="button"
                                                        disabled={actionLoadingId === comment.id}
                                                        onClick={() =>
                                                            handleStatusChange(comment.id, "rejected")
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                                                        title="Reject comment"
                                                    >
                                                        ✕ Reject
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenEdit(comment)}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-sand bg-cream px-2.5 py-1.5 text-xs font-semibold text-maroon shadow-sm transition hover:bg-maroon hover:text-white"
                                                    title="Edit comment"
                                                >
                                                    ✏️ Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={actionLoadingId === comment.id}
                                                    onClick={() => handleDelete(comment.id)}
                                                    className="inline-flex items-center rounded-lg border border-sand p-1.5 text-muted transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50"
                                                    title="Permanently delete comment"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Admin Edit Comment Modal */}
            {editingComment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
                    onClick={handleCloseEdit}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="admin-edit-modal-title"
                >
                    <div
                        className="relative w-full max-w-lg rounded-2xl border border-sand bg-white p-6 shadow-card sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={handleCloseEdit}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-sand/60 text-muted transition hover:bg-cream hover:text-maroon"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        <div className="pr-8">
                            <span className="eyebrow">Comment Moderation</span>
                            <h3
                                id="admin-edit-modal-title"
                                className="mt-1 font-display text-2xl text-ink"
                            >
                                Edit Comment #{editingComment.id}
                            </h3>
                            {editingComment.product && (
                                <p className="mt-1 text-xs text-muted">
                                    Product:{" "}
                                    <span className="font-medium text-ink">
                                        {editingComment.product.name}
                                    </span>
                                </p>
                            )}
                        </div>

                        {editError && (
                            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs text-rose-700">
                                {editError}
                            </div>
                        )}

                        <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="field-label">Customer Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="field"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">
                                        Email Address <span className="text-maroon">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        className="field"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="field-label">Rating</label>
                                    <div className="flex items-center gap-2 pt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setEditRating(star)}
                                                className="text-2xl text-amber-500 transition hover:scale-110 focus:outline-none"
                                            >
                                                {star <= editRating ? "★" : "☆"}
                                            </button>
                                        ))}
                                        <span className="ml-2 text-xs text-muted">
                                            ({editRating} / 5)
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="field-label">Status</label>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        className="field py-2 capitalize"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved (Public)</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="field-label">
                                    Message <span className="text-maroon">*</span>
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={editMessage}
                                    onChange={(e) => setEditMessage(e.target.value)}
                                    className="field resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseEdit}
                                    className="btn-ghost text-xs"
                                    disabled={isSavingEdit}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary text-xs"
                                    disabled={isSavingEdit}
                                >
                                    {isSavingEdit ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default Comments;
