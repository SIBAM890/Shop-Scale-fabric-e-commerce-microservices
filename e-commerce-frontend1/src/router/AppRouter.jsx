// src/router/AppRouter.jsx

import { Routes, Route } from "react-router-dom";

/* PAGES */
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import CategoryPage from "../pages/CategoryPage";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Account from "../pages/Account";

import Login from "../pages/Login";
import Signin from "../pages/Signin";

import FestivalOffers from "../pages/FestivalOffers";
import CategoryOffersPage from "../pages/CategoryOffersPage";

import SettingsPage from "../pages/SettingsPage";

/* COMPONENTS */
import ProductDetails from "../components/ProductDetails";

/* AUTH */
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>

      {/* ---------- PUBLIC ROUTES ---------- */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signin />} />

      <Route path="/festival-offers" element={<FestivalOffers />} />

      <Route path="/festival-offers/electronics" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/fashions" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/sports" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/home-appliances" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/toys" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/jewelleries" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/footwears" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/books" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/beauty" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/automotive-spares" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/bags-luggages" element={<CategoryOffersPage />} />
      <Route path="/festival-offers/watches" element={<CategoryOffersPage />} />



      {/* ---------- PROTECTED ROUTES ---------- */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/category/:categorySlug"
        element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:productId"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />



      {/* ---------- SETTINGS PAGE ---------- */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRouter;