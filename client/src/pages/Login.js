import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const data = await login(user);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful!");

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Invalid Email or Password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] grid place-items-center bg-cream px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-sand/70 bg-white shadow-card p-8">
                <div className="text-center">
                    <p className="eyebrow">Fashion Freude</p>
                    <h2 className="mt-2 font-display text-4xl text-ink">Welcome Back</h2>
                    <p className="mt-2 text-muted">Login to your Fashion Freude account</p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                    <div>
                        <label className="field-label">Email Address</label>

                        <input
                            type="email"
                            name="email"
                            className="field"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="field-label">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="field pr-16"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 my-auto h-6 text-sm font-medium text-gold hover:text-maroon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-muted">
                            <input type="checkbox" className="accent-maroon" />
                            Remember Me
                        </label>

                        <Link to="/forgot-password" className="font-medium text-gold hover:text-maroon">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <span className="h-px flex-1 bg-sand" />
                    <span className="text-xs uppercase tracking-widest text-muted">OR</span>
                    <span className="h-px flex-1 bg-sand" />
                </div>

                <button className="btn-outline w-full">Continue with Google</button>

                <div className="mt-6 text-center text-sm text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-gold hover:text-maroon">
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
