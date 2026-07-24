const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [path.join(__dirname, "src/**/*.{js,jsx}")],
    theme: {
        extend: {
            colors: {
                ivory: "#FBF8F1",
                cream: "#F1E9DA",
                sand: "#E7DAC5",
                maroon: {
                    DEFAULT: "#6E1423",
                    dark: "#4A0D18",
                    light: "#8A2433",
                },
                gold: {
                    DEFAULT: "#B08833",
                    light: "#E4CE97",
                    soft: "#D8BE86",
                },
                ink: "#2A211C",
                muted: "#6B5D52",
            },
            fontFamily: {
                display: ['"Cormorant Garamond"', "Georgia", "serif"],
                sans: ['"Jost"', "system-ui", "sans-serif"],
            },
            boxShadow: {
                soft: "0 12px 45px -18px rgba(42,33,28,0.30)",
                card: "0 10px 34px -14px rgba(42,33,28,0.20)",
                gold: "0 8px 30px -12px rgba(176,136,51,0.35)",
            },
            letterSpacing: {
                luxe: "0.24em",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
            },
        },
    },
    plugins: [],
};
