import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Topbar />

        <div className="p-4">
          {children}
        </div>

      </div>

      <li className="nav-item">

          <Link
              className="nav-link"
              to="/admin/orders"
          >
              Orders
          </Link>

      </li>

    </div>
  );
}

export default AdminLayout;