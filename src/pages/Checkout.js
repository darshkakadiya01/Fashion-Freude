import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {

    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({

        name: "",
        phone: "",
        address: "",
        payment: "Cash on Delivery"

    });

    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

    const totalItems = cart.reduce(

        (sum, item) =>

            sum + item.quantity,

        0

    );

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

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

                items: cart.map(item => ({

                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image

                })),

                totalAmount: total

            };

            const res = await axios.post(

                "http://localhost:5000/api/orders",

                orderData

            );

            alert(res.data.message);

            clearCart();

            window.location.href = "/";

        }

        catch (error) {

            console.log(error);

            alert("Failed to place order");

        }

    };

    return (

        <section className="checkout-page">

            <div className="container">

                <form onSubmit={placeOrder}>

                    <div className="row g-4">

                        {/* Customer Details */}

                        <div className="col-lg-7">

                            <div className="checkout-card">

                                <h2>

                                    Billing Details

                                </h2>

                                <p>

                                    Please fill your delivery information.

                                </p>

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Full Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="tel"
                                    className="form-control mb-3"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    className="form-control mb-3"
                                    rows="4"
                                    placeholder="Delivery Address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <label className="mb-2 fw-bold">

                                    Payment Method

                                </label>

                                <select
                                    className="form-select"
                                    name="payment"
                                    value={form.payment}
                                    onChange={handleChange}
                                >

                                    <option>

                                        Cash on Delivery

                                    </option>

                                    <option>

                                        Online Payment

                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* Order Summary */}

                        <div className="col-lg-5">

                            <div className="checkout-card">

                                <h2>

                                    Order Summary

                                </h2>

                                {

                                    cart.map((item) => (

                                        <div
                                            key={item._id}
                                            className="checkout-product"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="checkout-product-image"
                                            />

                                            <div className="checkout-product-info">

                                                <h5>

                                                    {item.name}

                                                </h5>

                                                <p>

                                                    ₹ {item.price}

                                                </p>

                                                <small>

                                                    Qty : {item.quantity}

                                                </small>

                                            </div>

                                            <div className="checkout-subtotal">

                                                ₹ {item.price * item.quantity}

                                            </div>

                                        </div>

                                    ))

                                }

                                <hr />

                                <div className="summary-row">

                                    <span>

                                        Total Items

                                    </span>

                                    <strong>

                                        {totalItems}

                                    </strong>

                                </div>

                                <div className="summary-row">

                                    <span>

                                        Shipping

                                    </span>

                                    <strong className="text-success">

                                        FREE

                                    </strong>

                                </div>

                                <div className="summary-row total-row">

                                    <span>

                                        Grand Total

                                    </span>

                                    <strong>

                                        ₹ {total}

                                    </strong>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success mt-3 w-100"
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