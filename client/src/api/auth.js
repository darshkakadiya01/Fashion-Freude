import axiosClient from "./axiosClient";

export const login = (credentials) =>
    axiosClient.post("/users/login", credentials).then((res) => res.data);

export const register = (form) => axiosClient.post("/users/register", form).then((res) => res.data);
