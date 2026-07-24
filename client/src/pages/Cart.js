import { Link } from "react-router-dom";
import { getImageUrl } from "../config";
import { useCart } from "../context/CartContext";
import ZariDivider from "../components/ZariDivider";

function Cart() {
    const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <section className="bg-ivory">
            <div className="container-luxe py-12 lg:py-16">
                <div className="text-center">
                    <span className="eyebrow">Your Selections</span>
                    <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
                        Shopping Cart
                    </h2>
                    <p className="mt-3 text-muted">
                        Review your selected products before checkout.
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="mx-auto mt-12 max-w-md rounded-2xl border border-sand/70 bg-white p-10 text-center shadow-card">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty Cart"
                            className="mx-auto h-24 w-24 opacity-70"
                        />

                        <h3 className="mt-6 font-display text-2xl text-ink">Your Cart is Empty</h3>

                        <p className="mt-2 text-muted">
                            Looks like you haven't added any products yet.
                        </p>

                        <Link to="/" className="btn-primary mt-6 inline-flex">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 grid gap-8 lg:grid-cols-3">
                        <div className="space-y-5 lg:col-span-2">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-5 rounded-2xl border border-sand/70 bg-white p-5 shadow-card sm:flex-row"
                                >
                                    <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "/no-image.png";
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <h3 className="font-display text-xl text-ink">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 font-display text-2xl text-maroon">
                                            ₹ {item.price}
                                        </p>

                                        <div className="mt-3 inline-flex w-fit items-center gap-4 rounded-full border border-sand bg-white px-2 py-1">
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-maroon transition hover:bg-cream"
                                            >
                                                −
                                            </button>

                                            <span className="w-6 text-center font-display text-lg text-ink">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-maroon transition hover:bg-cream"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <h4 className="text-sm text-muted">
                                                Subtotal :{" "}
                                                <span className="font-display text-lg text-ink">
                                                    ₹ {item.price * item.quantity}
                                                </span>
                                            </h4>

                                            <button
                                                className="text-sm font-medium text-maroon transition hover:text-maroon-dark"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="rounded-2xl border border-sand/70 bg-white p-6 shadow-card lg:sticky lg:top-24">
                                <h3 className="font-display text-2xl text-ink">Order Summary</h3>

                                <ZariDivider className="my-5" />

                                <div className="flex items-center justify-between py-2 text-sm">
                                    <span className="text-muted">Total Items</span>

                                    <strong className="text-ink">
                                        {cart.reduce((total, item) => total + item.quantity, 0)}
                                    </strong>
                                </div>

                                <div className="flex items-center justify-between py-2 text-sm">
                                    <span className="text-muted">Delivery</span>

                                    <strong className="text-maroon">FREE</strong>
                                </div>

                                <div className="mt-2 flex items-center justify-between border-t border-sand/70 pt-4">
                                    <span className="font-display text-lg text-ink">
                                        Grand Total
                                    </span>

                                    <strong className="font-display text-2xl text-maroon">
                                        ₹ {totalPrice}
                                    </strong>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="btn-primary mt-6 w-full justify-center"
                                >
                                    Proceed To Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;
