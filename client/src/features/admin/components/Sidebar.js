import { Link, useLocation } from "react-router-dom";

const navItems = [
    { to: "/admin", icon: "📊", label: "Dashboard", exact: true },
    { to: "/admin/products", icon: "📦", label: "Products" },
    { to: "/admin/categories", icon: "📂", label: "Categories" },
    { to: "/admin/orders", icon: "🛒", label: "Orders" },
    { to: "/admin/users", icon: "👥", label: "Users" },
];

function Sidebar({ open = false, onClose = () => {} }) {
    const location = useLocation();

    const isActive = (item) =>
        item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

    return (
        <>
            {/* Mobile backdrop */}
            <div
                onClick={onClose}
                aria-hidden="true"
                className={`fixed inset-0 z-[55] bg-ink/50 transition-opacity duration-300 lg:hidden ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <aside
                className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-maroon-dark text-ivory transition-transform duration-300 lg:z-40 lg:translate-x-0 ${
                    open ? "z-[60] translate-x-0" : "z-40 -translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b border-ivory/20 px-6 py-6">
                    <div>
                        <h3 className="font-display text-2xl tracking-wide text-gold">
                            Fashion Freude
                        </h3>
                        <p className="eyebrow mt-1 text-ivory/60">Admin Panel</p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="text-xl text-ivory/70 transition hover:text-ivory lg:hidden"
                    >
                        ✕
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 p-4">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={onClose}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm tracking-wide transition-colors ${
                                    active
                                        ? "bg-white/10 text-gold"
                                        : "text-ivory/80 hover:bg-white/5 hover:text-ivory"
                                }`}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <Link
                        to="/login"
                        onClick={onClose}
                        className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm tracking-wide text-ivory/70 transition-colors hover:bg-white/5 hover:text-gold-light"
                    >
                        <span className="text-base">🚪</span>
                        <span>Logout</span>
                    </Link>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
