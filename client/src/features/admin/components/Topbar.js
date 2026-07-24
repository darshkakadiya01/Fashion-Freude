function Topbar({ onMenuClick = () => {} }) {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-sand bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="text-2xl text-maroon lg:hidden"
                >
                    ☰
                </button>
                <div>
                    <p className="eyebrow">Fashion Freude</p>
                    <h4 className="font-display text-xl text-ink sm:text-2xl">Admin Dashboard</h4>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="hidden text-sm text-muted sm:block">Welcome back</span>
                <span className="chip">
                    <span className="mr-1">👤</span> Admin
                </span>
            </div>
        </header>
    );
}

export default Topbar;
