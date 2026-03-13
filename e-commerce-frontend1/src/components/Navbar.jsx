import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../styles/navbar.css";

import { AuthContext } from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBox,
  faList,
  faGear,
  faUser,
  faCartShopping,
  faRightToBracket,
  faMedal
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ darkMode }) {

  const [search, setSearch] = useState("");

  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", search);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={darkMode ? "navbar navbar-dark" : "navbar"}>

      <div className="nav-left">

        <h2 className="logo">
          <FontAwesomeIcon icon={faMedal} className="logo-icon"/>
          QualityProducts
        </h2>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

      </div>

      <div className="nav-right">

        <NavLink to="/" end>
          <FontAwesomeIcon icon={faHouse}/> Home
        </NavLink>

        <NavLink to="/orders">
          <FontAwesomeIcon icon={faBox}/> Orders
        </NavLink>

        <NavLink to="/categories">
          <FontAwesomeIcon icon={faList}/> Categories
        </NavLink>

        <NavLink to="/settings">
          <FontAwesomeIcon icon={faGear}/> Settings
        </NavLink>

        <NavLink to="/account">
          <FontAwesomeIcon icon={faUser}/> Account
        </NavLink>

        <NavLink to="/cart">
          <FontAwesomeIcon icon={faCartShopping}/> Cart
        </NavLink>

        {token ? (
          <NavLink
            to="/login"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faRightToBracket}/> Logout
          </NavLink>
        ) : (
          <NavLink to="/login">
              <FontAwesomeIcon icon={faRightToBracket}/> Login/SignIn
          </NavLink>
    )}

      </div>

    </nav>
  );
}

export default Navbar;