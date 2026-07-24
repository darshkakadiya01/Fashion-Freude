// Central client configuration.

// Base URL of the backend API server (no trailing slash).
export const API_BASE_URL = (
    process.env.REACT_APP_BASE_URL ||
    process.env.BASE_URL ||
    "http://localhost:5000"
).replace(/\/$/, "");

// Build a full URL for an uploaded image.
// - passes through absolute URLs untouched
// - strips a leading "uploads/" (or "uploads\") if present
export const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${API_BASE_URL}/uploads/${img.replace(/^uploads[\\/]/, "")}`;
};
