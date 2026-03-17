import React, { useState } from "react";
import { adminLogin } from "../api/api";
import "../styles/adminOffer.css";

export default function AdminLogin({ onLogin }) {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await adminLogin({ adminName, password });

      if (res === "Login Successful") {
        onLogin(adminName, password);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="settings-card">
      <h3>Admin Login</h3>

      <input placeholder="Admin Name" onChange={(e) => setAdminName(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}