import { useState } from "react";
import axios from "axios";

function Register() {
  const API_BASE_URL = (process.env.REACT_APP_BASE_URL || process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        form
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;