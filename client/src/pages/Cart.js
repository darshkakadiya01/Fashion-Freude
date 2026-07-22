import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./App.css";

function Cart() {

    const {
        cart,
        increaseQty,
        decreaseQty,
        removeFromCart
    } = useCart();

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (

        <section className="cart-page">

            <div className="container">

                <div className="cart-wrapper">

                    <div className="cart-header">

                        <h2>
                            🛒 Shopping Cart
                        </h2>

                        <p>

                            Review your selected products before checkout.

                        </p>

                    </div>

                    {

                        cart.length === 0 ? (

                            <div className="empty-cart">

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                    alt="Empty Cart"
                                />

                                <h3>

                                    Your Cart is Empty

                                </h3>

                                <p>

                                    Looks like you haven't added any products yet.

                                </p>

                                <Link
                                    to="/"
                                    className="continue-btn"
                                >

                                    Continue Shopping

                                </Link>

                            </div>

                        ) : (

                            <>

                                <div className="cart-products">

                                    {

                                        cart.map((item) => (

                                            <div
                                                key={item._id}
                                                className="cart-card"
                                            >

                                                <div className="cart-image">

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                    />

                                                </div>

                                                <div className="cart-info">

                                                    <h3>

                                                        {item.name}

                                                    </h3>

                                                    <p className="price">

                                                        ₹ {item.price}

                                                    </p>

                                                    <div className="qty-box">

                                                        <button
                                                            onClick={() =>
                                                                decreaseQty(item._id)
                                                            }
                                                        >

                                                            −

                                                        </button>

                                                        <span>

                                                            {item.quantity}

                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                increaseQty(item._id)
                                                            }
                                                        >

                                                            +

                                                        </button>

                                                    </div>

                                                    <h4>

                                                        Subtotal :
                                                        ₹ {item.price * item.quantity}

                                                    </h4>

                                                    <button
                                                        className="remove-btn"
                                                        onClick={() =>
                                                            removeFromCart(item._id)
                                                        }
                                                    >

                                                        Remove

                                                    </button>

                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>

                                <div className="summary-card">

                                    <h3>

                                        Order Summary

                                    </h3>

                                    <div className="summary-row">

                                        <span>

                                            Total Items

                                        </span>

                                        <strong>

                                            {cart.reduce(
                                                (total, item) =>
                                                    total + item.quantity,
                                                0
                                            )}

                                        </strong>

                                    </div>

                                    <div className="summary-row">

                                        <span>

                                            Delivery

                                        </span>

                                        <strong>

                                            FREE

                                        </strong>

                                    </div>

                                    <div className="summary-row total">

                                        <span>

                                            Grand Total

                                        </span>

                                        <strong>

                                            ₹ {totalPrice}

                                        </strong>

                                    </div>

                                    <Link
                                        to="/checkout"
                                        className="checkout-btn"
                                    >

                                        Proceed To Checkout

                                    </Link>

                                </div>

                            </>

                        )

                    }

                </div>

            </div>

        </section>

    );

}

export default Cart;