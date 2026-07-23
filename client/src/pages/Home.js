import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import { Link } from "react-router-dom";
import { blogs } from "../blogs/Blogs";

function Home() {
  
const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
const [currentPage, setCurrentPage] = useState(1);

// Responsive products per page
const [productsPerPage, setProductsPerPage] = useState(8);

const categories = [
  "All",
  "Kurti",
  "Saree",
  "Lehenga Choli",
  "Salwar Suit",
];

// ===========================
// Get Products
// ===========================

const getProducts = async () => {

  try {

    const res = await axios.get(
      `${API_BASE_URL}/api/products`
    );

    setProducts(res.data);

  } catch (error) {

    console.log(error);

  }

};

// ===========================
// Load Products
// ===========================

useEffect(() => {

  getProducts();

}, []);

// ===========================
// Responsive Pagination
// Desktop = 8
// Mobile = 4
// ===========================

useEffect(() => {

  const handleResize = () => {

    if (window.innerWidth <= 768) {

      setProductsPerPage(4);

    } else {

      setProductsPerPage(8);

    }

    // Reset to first page when screen size changes
    setCurrentPage(1);

  };

  // Run on page load
  handleResize();

  // Listen for resize
  window.addEventListener("resize", handleResize);

  return () => {

    window.removeEventListener("resize", handleResize);

  };

}, []);

// ===========================
// Pagination
// ===========================

const indexOfLastProduct =
  currentPage * productsPerPage;

const indexOfFirstProduct =
  indexOfLastProduct - productsPerPage;

const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() ===
            selectedCategory.toLowerCase()
      );

const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);
const latestBlogs = [...blogs]
  .sort((a, b) => b.id - a.id)
  .slice(0, 6);

  return (

    <>
      <title>Fashion Freude | Shop Ethnic Wear, Sarees, Kurtis & Lehenga Cholis Online</title>
      <meta name="title" content="Fashion Freude | Shop Ethnic Wear, Sarees, Kurtis & Lehenga Cholis Online" />
      <meta name="description" content="Explore Fashion Freude for the best online deals on Kurti, Saree, Lehenga Choli, and Salwar Suit collections. Enjoy free shipping over ₹999 and fast delivery across India." />
      <meta name="keywords" content="Fashion Freude, Kurti online, Flash Sale, online shoping Offer, Buy Saree online, Free Shipping, Easy Returns, Premium Quality kurti, Premium Products, Lehenga Choli shopping, Salwar Suit, ethnic wear for women, flash sale fashion, women clothing deals India" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://fashionfreude.com" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://fashionfreude.com" />
      <meta property="og:title" content="Fashion Freude | Premium Women's Ethnic Wear & Fashion Online" />
      <meta property="og:description" content="Shop thousands of hand-picked ethnic outfits including Kurtis, Sarees, and Lehengas. Save up to 50% OFF in our Flash Sale with 7-day easy returns." />
      <meta property="og:image" content="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://fashionfreude.com" />
      <meta name="twitter:title" content="Fashion Freude | Shop Ethnic Wear, Sarees & Kurtis" />
      <meta name="twitter:description" content="Discover trending Indian ethnic wear at Fashion Freude. Best prices on Kurtis, Sarees, Lehenga Cholis, and Salwar Suits." />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900" />

      <section
        className="products-section"
        id="products"
      >

        <div className="container">

          <div className="section-title">

            <h2>Featured Products</h2>

          </div>

          <div className="category-filter">

            {categories.map((category) => (

              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-btn active-category"
                    : "category-btn"
                }
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>

            ))}

          </div>

          <div className="products-grid">

            {currentProducts.length > 0 ? (

              currentProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))

            ) : (

              <h3
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "60px 0"
                }}
              >
                No Products Found
              </h3>

            )}

          </div>

          {/* ===========================
              PAGINATION
          =========================== */}

          {

            totalPages > 1 && (

              <div className="pagination">

                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                >
                  Previous
                </button>

                {

                  [...Array(totalPages)].map((_, index) => (

                    <button
                      key={index}
                      className={
                        currentPage === index + 1
                          ? "page-number active"
                          : "page-number"
                      }
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                    >
                      {index + 1}
                    </button>

                  ))

                }

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next
                </button>

              </div>

            )

          }

        </div>

      </section>      
      
      {/* ================= FLASH SALE ================= */}

      <section className="flash-sale">

        <div className="container">

          <div className="flash-content">

            <div>

              <span className="sale-badge">
                🔥 Limited Time Offer
              </span>

              <h2>
                Flash Sale
              </h2>

              <p>
                Save up to <strong>50% OFF</strong> on selected products.
                Hurry! Offer ends soon.
              </p>

            </div>

            <a href="#products" className="shop-sale-btn">
              Shop Deals
            </a>

          </div>

        </div>

      </section>

      <section className="features">

        <div className="container">

          <div className="feature-box">

            <div className="feature-card">

              <div className="icon">🚚</div>

              <h4>Free Shipping</h4>

              <p>Free delivery on orders above ₹999</p>

            </div>

            <div className="feature-card">

              <div className="icon">🔒</div>

              <h4>Secure Payment</h4>

              <p>100% Safe & Secure Checkout</p>

            </div>

            <div className="feature-card">

              <div className="icon">💳</div>

              <h4>Easy Returns</h4>

              <p>7 Days Easy Return Policy</p>

            </div>

            <div className="feature-card">

              <div className="icon">⭐</div>

              <h4>Top Rated</h4>

              <p>Trusted by Thousands of Customers</p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="container">

          <div className="stats-grid">

            <div className="stat-card">
              <h2>10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-card">
              <h2>5K+</h2>
              <p>Products</p>
            </div>

            <div className="stat-card">
              <h2>150+</h2>
              <p>Brands</p>
            </div>

            <div className="stat-card">
              <h2>24/7</h2>
              <p>Support</p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="why-us">

        <div className="container">

          <div className="section-title">

            <h2>Why Choose Fashion Freude?</h2>

            <p>
              Experience premium shopping with trusted services.
            </p>

          </div>

          <div className="why-grid">

            <div className="why-card">
              <span>🚚</span>
              <h4>Fast Delivery</h4>
              <p>
                Quick and secure shipping across India.
              </p>
            </div>

            <div className="why-card">
              <span>🔒</span>
              <h4>Secure Payment</h4>
              <p>
                Multiple safe payment methods with SSL protection.
              </p>
            </div>

            <div className="why-card">
              <span>💬</span>
              <h4>24×7 Support</h4>
              <p>
                Friendly customer support whenever you need help.
              </p>
            </div>

            <div className="why-card">
              <span>⭐</span>
              <h4>Premium Quality</h4>
              <p>
                Carefully selected products from trusted brands.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="testimonials">

        <div className="container">

          <div className="section-title">

            <h2>What Our Customers Say</h2>

          </div>

          <div className="testimonial-grid">

            <div className="testimonial-card">

              <h4>Rahul Sharma</h4>

              <p>

                ⭐⭐⭐⭐⭐

              </p>

              <p>

                Amazing shopping experience. Fast delivery and
                excellent product quality.

              </p>

            </div>

            <div className="testimonial-card">

              <h4>Priya Patel</h4>

              <p>

                ⭐⭐⭐⭐⭐

              </p>

              <p>

                Beautiful website and genuine products.
                Highly recommended.

              </p>

            </div>

            <div className="testimonial-card">

              <h4>Neha Verma</h4>

              <p>

                ⭐⭐⭐⭐⭐

              </p>

              <p>

                Great customer support and smooth checkout process.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= BLOGS ================= */}

      <section className="blogs">

        <div className="container">

          <div className="section-title">

            <h2>Latest Blogs</h2>

            <p>

              Shopping tips, buying guides & latest trends

            </p>

          </div>

          <div className="blog-grid">
  {latestBlogs.map((blog) => (
    <div className="blog-card" key={blog.id}>
      <img src={blog.image} alt={blog.title} />

      <div className="blog-body">
        <span className="blog-category">
          {blog.category}
        </span>

        <h4>{blog.title}</h4>

        <p>{blog.description.substring(0, 100)}...</p>

        <Link to={blog.link} className="blog-btn">
          Continue Reading →
        </Link>
      </div>
    </div>
  ))}
</div>

        </div>

      </section>

      {/* ================= NEWSLETTER ================= */}

      <section className="newsletter">

        <div className="container">

          <div className="newsletter-box">

            <h2>

              Subscribe Our Newsletter

            </h2>

            <p>

              Get exclusive offers, discounts and product updates.

            </p>

            <div className="newsletter-form">

              <input
                type="email"
                placeholder="Enter your email"
              />

              <button>

                Subscribe

              </button>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}

export default Home;