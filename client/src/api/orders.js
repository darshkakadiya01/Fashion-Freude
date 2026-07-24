import axiosClient from "./axiosClient";

export const getOrders = () => axiosClient.get("/orders").then((res) => res.data);

export const createOrder = (orderData) =>
    axiosClient.post("/orders", orderData).then((res) => res.data);
