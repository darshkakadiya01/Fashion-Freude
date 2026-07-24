import axios from "axios";
import { API_BASE_URL } from "../config";

// Single axios instance for all API calls. baseURL points at the /api root,
// so callers use paths like "/products", "/categories/add", etc.
const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

export default axiosClient;
