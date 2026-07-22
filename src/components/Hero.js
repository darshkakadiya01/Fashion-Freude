import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        background: "linear-gradient(to right, #0d6efd, #6610f2)",
        minHeight: "500px"
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          <div className="col-md-6">

            <h1 className="display-3 fw-bold">
              Welcome to Fashion Freude
            </h1>

            <p className="lead mt-3">
              Discover the latest fashion, electronics, accessories,
              and much more at the best prices.
            </p>

            <Link
              to="/products"
              className="btn btn-warning btn-lg mt-3"
            >
              Shop Now
            </Link>

          </div>

          <div className="col-md-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700"
              alt="Shopping"
              className="img-fluid rounded shadow"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;