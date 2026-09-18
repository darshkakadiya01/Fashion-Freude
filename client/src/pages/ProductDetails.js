import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
import { getCommentsByProductId, submitComment, updateComment } from "../api/comments";
import { getImageUrl } from "../config";
import { useCart } from "../context/CartContext";
import ZariDivider from "../components/ZariDivider";

function ProductDetails() {
    const { slug } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState("");

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [commentName, setCommentName] = useState("");
    const [commentEmail, setCommentEmail] = useState("");
    const [commentRating, setCommentRating] = useState(5);
    const [commentMessage, setCommentMessage] = useState("");
    const [commentSuccess, setCommentSuccess] = useState("");
    const [commentError, setCommentError] = useState("");
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);

    // Admin-only edit state
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRating, setEditRating] = useState(5);
    const [editMessage, setEditMessage] = useState("");
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const [editError, setEditError] = useState("");

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const u = JSON.parse(storedUser);
                if (u && u.role === "admin") {
                    setIsAdmin(true);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const fetchComments = async (productId) => {
        if (!productId) return;
        try {
            setCommentsLoading(true);
            const res = await getCommentsByProductId(productId);
            if (res && res.success) {
                setCommentsList(res.comments || []);
            }
        } catch (e) {
            console.error("Failed to load product comments:", e);
        } finally {
            setCommentsLoading(false);
        }
    };

    useEffect(() => {
        if (product && product.id) {
            fetchComments(product.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product?.id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isCommentModalOpen) {
                setIsCommentModalOpen(false);
                setCommentError("");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isCommentModalOpen]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentError("");

        if (!product || !product.id) {
            setCommentError("Product information could not be loaded. Please refresh.");
            return;
        }

        const emailTrimmed = commentEmail.trim();
        const messageTrimmed = commentMessage.trim();
        const nameTrimmed = commentName.trim();

        if (!emailTrimmed || !messageTrimmed) {
            setCommentError("Please fill in both email and message.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailTrimmed)) {
            setCommentError("Please enter a valid email address.");
            return;
        }

        try {
            setIsSubmittingComment(true);
            const res = await submitComment({
                productId: product.id,
                name: nameTrimmed || "Customer",
                email: emailTrimmed,
                rating: commentRating,
                message: messageTrimmed,
            });

            if (res && res.success) {
                setCommentSuccess("Thank you! Your comment has been submitted for review.");
                setCommentName("");
                setCommentEmail("");
                setCommentMessage("");
                setCommentRating(5);
                setIsCommentModalOpen(false);
                setTimeout(() => {
                    setCommentSuccess("");
                }, 6000);
            } else {
                setCommentError(res?.message || "Failed to submit comment. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting comment:", err);
            setCommentError(
                err.response?.data?.message || "Failed to submit comment. Please check your connection."
            );
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleCloseCommentModal = () => {
        setIsCommentModalOpen(false);
        setCommentError("");
    };

    const handleOpenEditModal = (c) => {
        setEditingComment(c);
        setEditName(c.name || "");
        setEditEmail(c.email || "");
        setEditRating(c.rating || 5);
        setEditMessage(c.message || "");
        setEditError("");
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingComment(null);
        setEditError("");
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditError("");

        if (!editingComment) return;

        const emailTrimmed = editEmail.trim();
        const messageTrimmed = editMessage.trim();

        if (!emailTrimmed || !messageTrimmed) {
            setEditError("Email and message are required.");
            return;
        }

        try {
            setIsSavingEdit(true);
            const res = await updateComment(editingComment.id, {
                name: editName.trim() || "Customer",
                email: emailTrimmed,
                rating: editRating,
                message: messageTrimmed,
            });

            if (res && res.success) {
                handleCloseEditModal();
                setCommentSuccess("Comment updated successfully!");
                if (product && product.id) {
                    fetchComments(product.id);
                }
                setTimeout(() => {
                    setCommentSuccess("");
                }, 5000);
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

    useEffect(() => {
        if (product) {
            setSelectedImage(getImageUrl(product.image));
        }
    }, [product]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct(slug);

                setProduct(data);

                if (data.image) {
                    setSelectedImage(getImageUrl(data.image));
                }

                setLoading(false);
            } catch (error) {
                console.log(error);

                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }

        navigate("/cart");
    };

    if (loading) {
        return (
            <div className="container-luxe py-24 text-center">
                <h2 className="font-display text-3xl text-muted">Loading Product...</h2>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container-luxe py-24 text-center">
                <h2 className="font-display text-4xl text-ink">Product Not Found</h2>

                <Link to="/" className="btn-primary mt-6 inline-flex">
                    Back Home
                </Link>
            </div>
        );
    }

    const oldPrice = Math.round(product.price * 1.25);

    const discount = Math.round(((oldPrice - product.price) / oldPrice) * 100);

    const isMeesho = product?.category?.trim().toLowerCase() === "meesho";

    const getBuyNowTargetUrl = () => {
        let url = (product?.buyNowUrl || "").trim();
        if (!url) return "https://www.meesho.com";
        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }
        return url;
    };

    const rawGallery = Array.isArray(product?.gallery)
        ? product.gallery
        : typeof product?.gallery === "string"
          ? JSON.parse(product.gallery)
          : [];

    const allImages = product
        ? [product.image, ...rawGallery].filter(Boolean).map((img) => getImageUrl(img))
        : [];

    const showPrevImage = () => {
        if (allImages.length === 0) return;

        const index = allImages.indexOf(selectedImage);

        if (index <= 0) {
            setSelectedImage(allImages[allImages.length - 1]);
        } else {
            setSelectedImage(allImages[index - 1]);
        }
    };

    const showNextImage = () => {
        if (allImages.length === 0) return;

        const index = allImages.indexOf(selectedImage);

        if (index === allImages.length - 1) {
            setSelectedImage(allImages[0]);
        } else {
            setSelectedImage(allImages[index + 1]);
        }
    };
    return (
        <>
            <title>Fashion Freude</title>
            <meta name="title" content="Buy {product.name} Online | Fashion Freude" />
            <meta
                name="description"
                content="Shop {product.name} for ₹{product.price} at Fashion Freude. Discover high-quality {product.category} with free shipping, secure payment, and easy 7-day returns."
            />
            <meta
                name="keywords"
                content="{product.name}, buy {product.name}, {product.category}, Fashion Freude, ethnic wear online, latest {product.category} collection"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href="https://fashionfreude.com/product/{slug}" />

            <meta property="og:type" content="product" />
            <meta property="og:url" content="https://fashionfreude.com/product/{slug}" />
            <meta property="og:title" content="{product.name} | Fashion Freude" />
            <meta
                property="og:description"
                content="Buy {product.name} for ₹{product.price}. Premium quality {product.category} with fast shipping and easy returns."
            />
            <meta property="og:image" content="{selectedImage}" />
            <meta property="product:price:amount" content="{product.price}" />
            <meta property="product:price:currency" content="INR" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://fashionfreude.com/product/{slug}" />
            <meta name="twitter:title" content="{product.name} | Fashion Freude" />
            <meta
                name="twitter:description"
                content="Buy {product.name} for ₹{product.price}. Premium quality {product.category} with fast shipping and easy returns."
            />
            <meta name="twitter:image" content="{selectedImage}" />

            <section className="bg-ivory">
                <div className="container-luxe py-12 lg:py-16">
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* LEFT SIDE */}

                        <div className="min-w-0">
                            <div className="relative overflow-hidden rounded-2xl border border-sand/70 bg-white shadow-card">
                                <div className="absolute left-4 top-4 z-10 rounded-full bg-maroon px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                    {discount}% OFF
                                </div>
                                <div className="aspect-[4/5] w-full">
                                    <img
                                        src={selectedImage || getImageUrl(product.image)}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "/no-image.png";
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand bg-white text-maroon transition hover:bg-cream"
                                    onClick={showPrevImage}
                                >
                                    ❮
                                </button>

                                <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto py-1">
                                    {allImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt=""
                                            className={
                                                selectedImage === img
                                                    ? "h-20 w-20 shrink-0 cursor-pointer rounded-xl border-2 border-gold object-cover"
                                                    : "h-20 w-20 shrink-0 cursor-pointer rounded-xl border border-sand object-cover opacity-80 transition hover:opacity-100"
                                            }
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                </div>

                                <button
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand bg-white text-maroon transition hover:bg-cream"
                                    onClick={showNextImage}
                                >
                                    ❯
                                </button>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}

                        <div className="min-w-0">
                            <span className="chip">{product.category}</span>

                            <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                                {product.name}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                                <span className="text-gold">★★★★★</span>
                                <span>(4.8 Reviews)</span>
                            </div>

                            <div className="mt-5 flex items-end gap-3">
                                <span className="font-display text-4xl text-maroon">
                                    ₹ {product.price}
                                </span>

                                <del className="font-display text-xl text-muted">₹ {oldPrice}</del>
                            </div>

                            <div className="mt-5">
                                <span
                                    className={
                                        product.stock > 0
                                            ? "inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-maroon"
                                            : "inline-flex items-center gap-2 rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-muted"
                                    }
                                >
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            {/* Comment Button */}
                            <div className="mt-5">
                                <button
                                    type="button"
                                    id="btn-comment"
                                    onClick={() => {
                                        setIsCommentModalOpen(true);
                                        setCommentError("");
                                    }}
                                    className="inline-flex items-center gap-2 rounded-full border border-maroon/30 bg-cream/70 px-5 py-2 text-sm font-medium text-maroon transition-all duration-300 hover:border-maroon hover:bg-maroon hover:text-ivory hover:shadow-soft"
                                >
                                    <span>💬</span>
                                    <span>Comment</span>
                                    {commentsList.length > 0 && (
                                        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon/10 px-1.5 text-xs font-semibold text-maroon">
                                            {commentsList.length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            <ul className="mt-6 space-y-2 text-sm text-ink">
                                <li className="flex items-center gap-3">
                                    <span className="text-gold">🚚</span> Free Delivery
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-gold">🔒</span> Secure Payment
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-gold">↩️</span> Easy Return
                                </li>
                            </ul>

                            {isMeesho ? (
                                <div className="mt-8">
                                    <a
                                        href={getBuyNowTargetUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-gold flex w-full items-center justify-center gap-2 py-3.5 text-base font-semibold shadow-soft transition-all duration-300 hover:shadow-card"
                                    >
                                        ⚡ Buy Now
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            ) : (
                                <>
                                    {/* Quantity */}

                                    <div className="mt-8">
                                        <h5 className="field-label">Quantity</h5>

                                        <div className="mt-2 inline-flex items-center gap-4 rounded-full border border-sand bg-white px-2 py-1">
                                            <button
                                                onClick={decreaseQty}
                                                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-maroon transition hover:bg-cream"
                                            >
                                                −
                                            </button>

                                            <span className="w-6 text-center font-display text-xl text-ink">
                                                {quantity}
                                            </span>

                                            <button
                                                onClick={increaseQty}
                                                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-maroon transition hover:bg-cream"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Buttons */}

                                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                        <button
                                            className="btn-primary flex-1 justify-center"
                                            onClick={handleAddToCart}
                                        >
                                            🛒 Add To Cart
                                        </button>

                                        <Link
                                            to="/checkout"
                                            className="btn-gold flex-1 justify-center"
                                            onClick={handleAddToCart}
                                        >
                                            ⚡ Buy Now
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <ZariDivider className="my-12" />

                    {/* Description */}

                    <div className="rounded-2xl border border-sand/70 bg-white p-8 shadow-card">
                        <h3 className="font-display text-2xl text-ink">Product Description</h3>

                        <p className="mt-4 leading-relaxed text-muted">{product.description}</p>
                    </div>

                    {/* Specifications */}

                    <div className="mt-8 rounded-2xl border border-sand/70 bg-white p-8 shadow-card">
                        <h3 className="font-display text-2xl text-ink">Specifications</h3>

                        <table className="mt-4 w-full text-sm">
                            <tbody className="divide-y divide-sand/70">
                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Product Name</td>

                                    <td className="py-3 text-muted">{product.name}</td>
                                </tr>

                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Category</td>

                                    <td className="py-3 text-muted">{product.category}</td>
                                </tr>

                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Price</td>

                                    <td className="py-3 text-muted">₹ {product.price}</td>
                                </tr>

                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Stock</td>

                                    <td className="py-3 text-muted">{product.stock}</td>
                                </tr>

                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Availability</td>

                                    <td className="py-3 text-muted">
                                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Delivery</td>

                                    <td className="py-3 text-muted">Free Delivery Available</td>
                                </tr>

                                <tr>
                                    <td className="py-3 pr-4 font-medium text-ink">Payment</td>

                                    <td className="py-3 text-muted">Cash on Delivery / Online</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Features */}

                    <div className="mt-8 rounded-2xl border border-sand/70 bg-white p-8 shadow-card">
                        <h3 className="font-display text-2xl text-ink">Why Shop With Us?</h3>

                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-xl border border-sand/70 bg-cream p-6 text-center">
                                <div className="text-3xl">🚚</div>
                                <h5 className="mt-3 font-display text-lg text-ink">Free Shipping</h5>
                                <p className="mt-1 text-sm text-muted">
                                    Free delivery on eligible orders.
                                </p>
                            </div>

                            <div className="rounded-xl border border-sand/70 bg-cream p-6 text-center">
                                <div className="text-3xl">🔒</div>
                                <h5 className="mt-3 font-display text-lg text-ink">
                                    Secure Payment
                                </h5>
                                <p className="mt-1 text-sm text-muted">
                                    100% secure payment gateway.
                                </p>
                            </div>

                            <div className="rounded-xl border border-sand/70 bg-cream p-6 text-center">
                                <div className="text-3xl">🔄</div>
                                <h5 className="mt-3 font-display text-lg text-ink">Easy Return</h5>
                                <p className="mt-1 text-sm text-muted">7 Days return policy.</p>
                            </div>

                            <div className="rounded-xl border border-sand/70 bg-cream p-6 text-center">
                                <div className="text-3xl">⭐</div>
                                <h5 className="mt-3 font-display text-lg text-ink">
                                    Premium Quality
                                </h5>
                                <p className="mt-1 text-sm text-muted">
                                    Genuine products with warranty.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Comments Section */}
                    <div className="mt-8 rounded-2xl border border-sand/70 bg-white p-8 shadow-card">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <p className="eyebrow">Customer Voice</p>
                                <h3 className="mt-1 font-display text-2xl text-ink">
                                    Customer Comments ({commentsList.length})
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsCommentModalOpen(true);
                                    setCommentError("");
                                }}
                                className="btn-primary text-xs"
                            >
                                💬 Write a Comment
                            </button>
                        </div>

                        {/* Short Thank You Message */}
                        {commentSuccess && (
                            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-emerald-600">✓</span>
                                    <span>{commentSuccess}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCommentSuccess("")}
                                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                                    aria-label="Dismiss message"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {commentsLoading ? (
                            <div className="mt-6 flex items-center justify-center p-8 text-sm text-muted">
                                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-maroon border-t-transparent"></span>
                                Loading verified comments...
                            </div>
                        ) : commentsList.length === 0 ? (
                            <div className="mt-6 rounded-xl border border-dashed border-sand p-8 text-center text-muted">
                                No comments yet. Be the first to share your feedback!
                            </div>
                        ) : (
                            <div className="mt-6 divide-y divide-sand/60">
                                {commentsList.map((c) => (
                                    <div key={c.id} className="py-4 first:pt-0 last:pb-0">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream font-display text-sm font-semibold text-maroon">
                                                    {(c.name || c.email || "U").charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-ink">
                                                        {c.name || c.email}
                                                    </p>
                                                    <p className="text-xs text-muted">
                                                        {c.createdAt
                                                            ? new Date(c.createdAt).toLocaleDateString("en-US", {
                                                                  month: "short",
                                                                  day: "numeric",
                                                                  year: "numeric",
                                                              })
                                                            : "Verified Customer"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {c.rating && (
                                                    <div className="flex text-xs text-amber-500">
                                                        {"★".repeat(c.rating)}
                                                        {"☆".repeat(Math.max(0, 5 - c.rating))}
                                                    </div>
                                                )}

                                                {isAdmin && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenEditModal(c)}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-sand bg-cream px-2.5 py-1 text-xs font-semibold text-maroon shadow-sm transition hover:bg-maroon hover:text-white"
                                                        title="Edit comment (Admin only)"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p className="mt-3 pl-12 text-sm leading-relaxed text-muted">
                                            {c.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Comment Modal Dialog */}
                {isCommentModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
                        onClick={handleCloseCommentModal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="comment-modal-title"
                    >
                        <div
                            className="relative w-full max-w-lg rounded-2xl border border-sand bg-white p-6 shadow-card sm:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={handleCloseCommentModal}
                                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-sand/60 text-muted transition hover:bg-cream hover:text-maroon"
                                aria-label="Close comment modal"
                            >
                                ✕
                            </button>

                            <div className="pr-8">
                                <p className="eyebrow">Customer Feedback</p>
                                <h3
                                    id="comment-modal-title"
                                    className="mt-1 font-display text-2xl text-ink"
                                >
                                    Leave a Comment
                                </h3>
                                <p className="mt-1 text-xs text-muted">
                                    Share your review or inquiry about{" "}
                                    <span className="font-medium text-ink">
                                        {product.name}
                                    </span>
                                </p>
                            </div>

                            <ZariDivider className="my-5" />

                            {commentError && (
                                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">
                                    {commentError}
                                </div>
                            )}

                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="comment-name-input"
                                        className="field-label"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        id="comment-name-input"
                                        type="text"
                                        value={commentName}
                                        onChange={(e) => setCommentName(e.target.value)}
                                        placeholder="e.g. Priya Sharma"
                                        className="field"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="comment-email-input"
                                        className="field-label"
                                    >
                                        Email Address <span className="text-maroon">*</span>
                                    </label>
                                    <input
                                        id="comment-email-input"
                                        type="email"
                                        required
                                        value={commentEmail}
                                        onChange={(e) => setCommentEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="field"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">
                                        Rating
                                    </label>
                                    <div className="flex items-center gap-2 pt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setCommentRating(star)}
                                                className="text-2xl text-amber-500 transition hover:scale-110 focus:outline-none"
                                                title={`${star} Star${star > 1 ? "s" : ""}`}
                                            >
                                                {star <= commentRating ? "★" : "☆"}
                                            </button>
                                        ))}
                                        <span className="ml-2 text-xs text-muted">
                                            ({commentRating} / 5)
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="comment-message-input"
                                        className="field-label"
                                    >
                                        Message <span className="text-maroon">*</span>
                                    </label>
                                    <textarea
                                        id="comment-message-input"
                                        required
                                        rows="4"
                                        value={commentMessage}
                                        onChange={(e) => setCommentMessage(e.target.value)}
                                        placeholder="Write your comments or message here..."
                                        className="field resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseCommentModal}
                                        className="btn-ghost text-xs"
                                        disabled={isSubmittingComment}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary text-xs"
                                        disabled={isSubmittingComment}
                                    >
                                        {isSubmittingComment ? "Submitting..." : "Submit Comment"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Admin Edit Comment Modal */}
                {isAdmin && isEditModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
                        onClick={handleCloseEditModal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="edit-comment-modal-title"
                    >
                        <div
                            className="relative w-full max-w-lg rounded-2xl border border-sand bg-white p-6 shadow-card sm:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={handleCloseEditModal}
                                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-sand/60 text-muted transition hover:bg-cream hover:text-maroon"
                                aria-label="Close edit modal"
                            >
                                ✕
                            </button>

                            <div className="pr-8">
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                                    🛡️ Admin Mode
                                </span>
                                <h3
                                    id="edit-comment-modal-title"
                                    className="mt-2 font-display text-2xl text-ink"
                                >
                                    Edit Customer Comment
                                </h3>
                                <p className="mt-1 text-xs text-muted">
                                    Modify comment details for{" "}
                                    <span className="font-medium text-ink">
                                        {product?.name}
                                    </span>
                                </p>
                            </div>

                            <ZariDivider className="my-5" />

                            {editError && (
                                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">
                                    {editError}
                                </div>
                            )}

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="edit-comment-name-input"
                                        className="field-label"
                                    >
                                        Customer Name
                                    </label>
                                    <input
                                        id="edit-comment-name-input"
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="field"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="edit-comment-email-input"
                                        className="field-label"
                                    >
                                        Email Address <span className="text-maroon">*</span>
                                    </label>
                                    <input
                                        id="edit-comment-email-input"
                                        type="email"
                                        required
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        className="field"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">
                                        Rating
                                    </label>
                                    <div className="flex items-center gap-2 pt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setEditRating(star)}
                                                className="text-2xl text-amber-500 transition hover:scale-110 focus:outline-none"
                                                title={`${star} Star${star > 1 ? "s" : ""}`}
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
                                    <label
                                        htmlFor="edit-comment-message-input"
                                        className="field-label"
                                    >
                                        Message <span className="text-maroon">*</span>
                                    </label>
                                    <textarea
                                        id="edit-comment-message-input"
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
                                        onClick={handleCloseEditModal}
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
            </section>
        </>
    );
}

export default ProductDetails;
