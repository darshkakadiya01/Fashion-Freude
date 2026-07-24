import AdminLayout from "../AdminLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <p className="eyebrow">Overview</p>
                <h2 className="mt-2 font-display text-4xl text-ink">Dashboard</h2>
                <span className="mt-4 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard title="Total Products" value="10" icon="📦" />

                <DashboardCard title="Categories" value="6" icon="📂" />

                <DashboardCard title="Orders" value="25" icon="🛒" />

                <DashboardCard title="Users" value="15" icon="👥" />
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
