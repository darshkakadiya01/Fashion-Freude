import AdminLayout from "../AdminLayout";

function Users() {
    return (
        <AdminLayout>
            <div className="mb-6">
                <p className="eyebrow">Community</p>
                <h2 className="mt-2 font-display text-4xl text-ink">Users</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-cream">
                            <tr>
                                <th className="w-20 px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    #
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Role
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td
                                    colSpan="4"
                                    className="border-t border-sand/60 px-4 py-8 text-center text-muted"
                                >
                                    No Users Found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Users;
