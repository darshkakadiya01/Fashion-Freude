import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { getOrders as fetchOrders } from "../../../api/orders";

function Orders() {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const data = await fetchOrders();

            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <AdminLayout>
            <div className="mb-6">
                <p className="eyebrow">Fulfilment</p>
                <h2 className="mt-2 font-display text-4xl text-ink">Orders</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-cream">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Phone
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Total
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted">
                                    Payment
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="border-t border-sand/60 px-4 py-8 text-center text-muted"
                                    >
                                        No Orders Found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-cream/40">
                                        <td className="border-t border-sand/60 px-4 py-3 font-medium text-ink">
                                            {order.customerName}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 text-muted">
                                            {order.phone}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 text-maroon">
                                            ₹ {order.totalAmount}
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3">
                                            <span className="chip">{order.status}</span>
                                        </td>

                                        <td className="border-t border-sand/60 px-4 py-3 text-muted">
                                            {order.paymentMethod}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Orders;
