import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import DashboardCard from "../components/DashboardCard";
import { getAllComments } from "../../../api/comments";

function Dashboard() {
    const [commentCounts, setCommentCounts] = useState({ all: 0, pending: 0 });

    useEffect(() => {
        getAllComments()
            .then((data) => {
                if (data && data.counts) {
                    setCommentCounts(data.counts);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <AdminLayout>
            <div className="mb-8">
                <p className="eyebrow">Overview</p>
                <h2 className="mt-2 font-display text-4xl text-ink">Dashboard</h2>
                <span className="mt-4 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                <Link to="/admin/products" className="block transition hover:opacity-95">
                    <DashboardCard title="Total Products" value="10" icon="📦" />
                </Link>

                <Link to="/admin/categories" className="block transition hover:opacity-95">
                    <DashboardCard title="Categories" value="6" icon="📂" />
                </Link>

                <Link to="/admin/orders" className="block transition hover:opacity-95">
                    <DashboardCard title="Orders" value="25" icon="🛒" />
                </Link>

                <Link to="/admin/comments" className="block transition hover:opacity-95">
                    <DashboardCard
                        title="Comments"
                        value={
                            commentCounts.pending > 0
                                ? `${commentCounts.all} (${commentCounts.pending} new)`
                                : `${commentCounts.all}`
                        }
                        icon="💬"
                    />
                </Link>

                <Link to="/admin/users" className="block transition hover:opacity-95">
                    <DashboardCard title="Users" value="15" icon="👥" />
                </Link>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
