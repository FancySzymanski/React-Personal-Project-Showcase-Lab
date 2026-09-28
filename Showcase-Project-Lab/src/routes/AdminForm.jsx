import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../components/AdminContext";
import NavBar from "../components/NavBar";

function AdminForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        navigate("/admin/products");
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <NavBar />
            <h1>Admin Login</h1>

            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Log In</button>
        </form>
    );
}

export default AdminForm;
