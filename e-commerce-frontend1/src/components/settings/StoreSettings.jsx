import React, { useState } from "react";
import AdminLogin from "../../pages/AdminLogin";
import OfferManager from "../../pages/OfferManager";
import "../../styles/adminOffer.css";

export default function StoreSettings() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (name, pass) => {
    setAdminName(name);
    setPassword(pass);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdminName("");
    setPassword("");
  };

  return (
    <div className="admin-container">
      {!loggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <>
          <h3>ADMIN: {adminName},</h3>
          <OfferManager
            adminName={adminName}
            password={password}
            onBack={handleLogout} // Pass callback to back button
          />
        </>
      )}
    </div>
  );
}