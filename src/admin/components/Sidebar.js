import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <div className="p-3 border-bottom">
        <h3 className="text-center">Fashion Freude</h3>
        <p className="text-center">Admin Panel</p>
      </div>

      <ul className="nav flex-column p-2">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin">
            📊 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
          className="nav-link text-white"
          to="/admin/products"
          >
          📦 Products
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/admin/categories"
          >
            📂 Categories
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/orders">
            🛒 Orders
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/users">
            👥 Users
          </Link>
        </li>

        <li className="nav-item mt-5">
          <Link className="nav-link text-danger" to="/login">
            🚪 Logout
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;