"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const StaffLogin = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (username === "staff" && password === "staff123") {
            setError("");
            router.push("/RequestBox");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login_container">
            <div className="login-left-container"></div>
            <div className="login-right-container">
                <div className="login-header">
                    <h1>Staff Login</h1>
                </div>
                <div className="login-input-box">
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn2" onClick={handleLogin}>Submit</button>
                    {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default StaffLogin;