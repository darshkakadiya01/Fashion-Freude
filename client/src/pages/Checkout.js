import { useState } from "react";
import { createOrder } from "../api/orders";
import { getImageUrl } from "../config";
import { useCart } from "../context/CartContext";
import ZariDivider from "../components/ZariDivider";

function Checkout() {
    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        payment: "Cash on Delivery",
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,

        0
    );

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,

        0
    );

    const handleChange = (e) => {
        setForm({
            ...form,

            [e.target.name]: e.target.value,
        });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        try {
            const orderData = {
                customerName: form.name,

                phone: form.phone,

                address: form.address,

                paymentMethod: form.payment,

                items: cart.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),

                totalAmount: total,
            };

            const data = await createOrder(orderData);

            alert(data.message);

            clearCart();

            window.location.href = "/";
        } catch (error) {
            console.log(error);

            alert("Failed to place order");
        }
    };

    return (
        <section className="bg-ivory">
            <div className="container-luxe py-12 lg:py-16">
                <div className="text-center">
                    <span className="eyebrow">Almost There</span>
                    <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Checkout</h2>
                    <p className="mt-3 text-muted">Complete your order details below.</p>
                </div>

                <form onSubmit={placeOrder} className="mt-10">
                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Customer Details */}

                        <div className="lg:col-span-7">
                            <div className="rounded-2xl border border-sand/70 bg-white p-6 shadow-card sm:p-8">
                                <h2 className="font-display text-2xl text-ink">Billing Details</h2>

                                <p className="mt-1 text-sm text-muted">
                                    Please fill your delivery information.
                                </p>

                                <div className="mt-6 space-y-5">
                                    <div>
                                        <label className="field-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="field"
                                            placeholder="Full Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="field-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="field"
                                            placeholder="Phone Number"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="field-label">Delivery Address</label>
                                        <textarea
                                            className="field"
                                            rows="4"
                                            placeholder="Delivery Address"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="field-label">Payment Method</label>
                                        <select
                                            className="field"
                                            name="payment"
                                            value={form.payment}
                                            onChange={handleChange}
                                        >
                                            <option>Cash on Delivery</option>

                                            <option>Online Payment</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}

                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border border-sand/70 bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-24">
                                <h2 className="font-display text-2xl text-ink">Order Summary</h2>

                                <div className="mt-6 space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                                                <img
                                                    src={getImageUrl(item.image)}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "/no-image.png";
                                                    }}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h5 className="font-display text-base text-ink">
                                                    {item.name}
                                                </h5>

                                                <p className="text-sm text-maroon">
                                                    ₹ {item.price}
                                                </p>

                                                <small className="text-xs text-muted">
                                                    Qty : {item.quantity}
                                                </small>
                                            </div>

                                            <div className="font-display text-lg text-ink">
                                                ₹ {item.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <ZariDivider className="my-6" />

                                <div className="flex items-center justify-between py-2 text-sm">
                                    <span className="text-muted">Total Items</span>

                                    <strong className="text-ink">{totalItems}</strong>
                                </div>

                                <div className="flex items-center justify-between py-2 text-sm">
                                    <span className="text-muted">Shipping</span>

                                    <strong className="text-maroon">FREE</strong>
                                </div>

                                <div className="mt-2 flex items-center justify-between border-t border-sand/70 pt-4">
                                    <span className="font-display text-lg text-ink">
                                        Grand Total
                                    </span>

                                    <strong className="font-display text-2xl text-maroon">
                                        ₹ {total}
                                    </strong>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary mt-6 w-full justify-center"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Checkout;
