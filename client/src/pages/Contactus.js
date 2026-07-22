import "./Contactus.css";
import { useState } from "react";


function Contactus() {

    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (

        <section className="contact-page">

            <div className="contact-container">

                <div className="contact-header">

                    <h1>Contact Us</h1>

                    <p>
                        We'd love to hear from you. Whether you have a question,
                        feedback, or need support, our team is ready to help.
                    </p>

                </div>

                <div className="contact-wrapper">

                    {/* Contact Information */}
                    
                    <div className="faq-section">

                        <span className="faq-subtitle">
                            INFORMATION QUESTIONS
                        </span>

                        <h2 className="faq-title">
                            FREQUENTLY ASKED QUESTIONS
                        </h2>

                        <div className="faq-list">

                            {/* FAQ 1 */}

                            <div className={`faq-item ${activeFAQ === 1 ? "active" : ""}`}>

                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(1)}
                                >
                                    <span>
                                        Will I receive the same product that I see in the picture?
                                    </span>

                                    <span className="faq-icon">
                                        {activeFAQ === 1 ? "−" : "+"}
                                    </span>

                                </div>

                                {activeFAQ === 1 && (

                                    <div className="faq-answer">

                                        <p>
                                            Yes, you will receive the exact product shown in the picture. 
                                            We ensure all product photos are taken under natural lighting 
                                            to reflect accurate colors and details. Minor variations may 
                                            occur due to screen settings.Manufacturing
                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* FAQ 2 */}

                            <div className={`faq-item ${activeFAQ === 2 ? "active" : ""}`}>

                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(2)}
                                >
                                    <span>
                                        Where can I view my sales receipt?
                                    </span>

                                    <span className="faq-icon">
                                        {activeFAQ === 2 ? "−" : "+"}
                                    </span>

                                </div>

                                {activeFAQ === 2 && (

                                    <div className="faq-answer">

                                        <p>
                                            You can view your sales receipt in the order confirmation email sent 
                                            to you after your purchase. Alternatively, you can log into your 
                                            account on our website and navigate to the "Order History" section 
                                            to view and download your receipt. If you need further assistance, 
                                            feel free to contact us.
                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* FAQ 3 */}

                            <div className={`faq-item ${activeFAQ === 3 ? "active" : ""}`}>

                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(3)}
                                >
                                    <span>
                                        How can I return an item?
                                    </span>

                                    <span className="faq-icon">
                                        {activeFAQ === 3 ? "−" : "+"}
                                    </span>

                                </div>

                                {activeFAQ === 3 && (

                                    <div className="faq-answer">

                                        <p>
                                            To return an item, contact us at Contact Us Page, package the item with the 
                                            receipt. We'll process your refund once we receive and inspect the item.
                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* FAQ 4 */}

                            <div className={`faq-item ${activeFAQ === 4 ? "active" : ""}`}>

                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(4)}
                                >
                                    <span>
                                        Will you restock items indicated "out of stock"?
                                    </span>

                                    <span className="faq-icon">
                                        {activeFAQ === 4 ? "−" : "+"}
                                    </span>

                                </div>

                                {activeFAQ === 4 && (

                                    <div className="faq-answer">

                                        <p>
                                            Yes, we restock items marked as "out of stock" whenever possible. You can sign 
                                            up for restock notifications on the product page to be alerted when it's 
                                            available again.
                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* FAQ 5 */}

                            <div className={`faq-item ${activeFAQ === 5 ? "active" : ""}`}>

                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(5)}
                                >
                                    <span>
                                        Where  can i  ship my order?
                                    </span>

                                    <span className="faq-icon">
                                        {activeFAQ === 5 ? "−" : "+"}
                                    </span>

                                </div>

                                {activeFAQ === 5 && (

                                    <div className="faq-answer">

                                        <p>
                                            You can ship your order to the address provided during checkout. If you need to 
                                            change the shipping address, please contact us as soon as possible before your 
                                            order is processed.
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}

                    <div className="contact-form-area">

                        <h2>Send Message</h2>

                        <form>

                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                required
                            />

                            <textarea
                                rows="6"
                                placeholder="Write your message..."
                                required
                            ></textarea>

                            <button type="submit">

                                Send Message

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Contactus;