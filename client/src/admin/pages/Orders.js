import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout";

function Orders() {

    const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {

        try {

            const res = await axios.get(
                `${API_BASE_URL}/api/orders`
            );

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getOrders();

    }, []);

    return (

        <AdminLayout>

            <h2 className="mb-4">
                Orders
            </h2>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>Customer</th>

                        <th>Phone</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Payment</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map((order)=>(

                            <tr key={order._id}>

                                <td>{order.customerName}</td>

                                <td>{order.phone}</td>

                                <td>₹ {order.totalAmount}</td>

                                <td>{order.status}</td>

                                <td>{order.paymentMethod}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </AdminLayout>

    );

}

export default Orders;