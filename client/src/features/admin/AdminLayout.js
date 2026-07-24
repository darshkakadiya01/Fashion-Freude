import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-ivory">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-64">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

export default AdminLayout;
