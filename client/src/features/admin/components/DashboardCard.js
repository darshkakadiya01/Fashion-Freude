function DashboardCard({ title, value, icon }) {
    return (
        <div className="rounded-2xl border border-sand/70 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
            <div className="flex items-center justify-between">
                <p className="eyebrow">{title}</p>
                {icon && <span className="text-xl">{icon}</span>}
            </div>
            <p className="mt-3 font-display text-4xl text-maroon">{value}</p>
        </div>
    );
}

export default DashboardCard;
