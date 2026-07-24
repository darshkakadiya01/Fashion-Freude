import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
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
                </div>
            </section>
        </>
    );
}

export default ProductDetails;
