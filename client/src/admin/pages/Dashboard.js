import AdminLayout from "../AdminLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <AdminLayout>

      <h2 className="mb-4">
        Dashboard Overview
      </h2>

      <div className="row g-4">

        <DashboardCard
          title="Total Products"
          value="10"
        />

        <DashboardCard
          title="Categories"
          value="6"
        />

        <DashboardCard
          title="Orders"
          value="25"
        />

        <DashboardCard
          title="Users"
          value="15"
        />

      </div>

    </AdminLayout>
  );
}

export default Dashboard;