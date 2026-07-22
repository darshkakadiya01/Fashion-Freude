function DashboardCard({ title, value }) {
  return (
    <div className="col-md-3">

      <div className="card shadow text-center">

        <div className="card-body">

          <h5>{title}</h5>

          <h2 className="text-primary">
            {value}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;