import React, { useState } from "react";
import AdminLogin from "../../pages/AdminLogin";
import OfferManager from "../../pages/OfferManager";
import "../../styles/adminOffer.css";

export default function StoreSettings() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("QualityProducts"); // or fetch from API
  const [categories, setCategories] = useState("Electronics,Fashion,Groceries,Books,Toys,Furniture,Sports,Beauty,Automotive,Jewelry,Music,Health"); // comma-separated string


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
        <OfferManager
          adminName={adminName}
          password={password}
          storeName={storeName}       
          categories={categories}     
          onBack={handleLogout}
        />
      )}
    </div>
  );
}