import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await register(form);

            alert(data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-[80vh] grid place-items-center bg-cream px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-sand/70 bg-white shadow-card p-8">
                <div className="text-center">
                    <p className="eyebrow">Fashion Freude</p>
                    <h2 className="mt-2 font-display text-4xl text-ink">Create Account</h2>
                    <p className="mt-2 text-muted">Join Fashion Freude and start your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="field-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="field"
                            placeholder="Enter your name"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="field-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="field"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="field-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="field"
                            placeholder="Create a password"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Register
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-gold hover:text-maroon">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
