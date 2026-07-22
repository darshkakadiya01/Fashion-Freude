function CategoryCard({ image, title }) {
  return (
    <div className="col-md-4 col-lg-2 mb-4">
      <div className="card shadow-sm border-0 text-center h-100">

        <img
          src={image}
          alt={title}
          className="card-img-top p-3"
          style={{ height: "120px", objectFit: "contain" }}
        />

        <div className="card-body">
          <h6 className="fw-bold">{title}</h6>
        </div>

      </div>
    </div>
  );
}

export default CategoryCard;