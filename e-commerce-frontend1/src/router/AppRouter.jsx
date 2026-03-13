import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import CategoryPage from "../pages/CategoryPage";
import ProductDetails from "../components/ProductDetails";

import Cart from "../pages/Cart";
import Orders from "../pages/Orders";

import Login from "../pages/Login";
import Signin from "../pages/Signin";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => (

  <Routes>

    <Route path="/login" element={<Login />} />

    <Route path="/signup" element={<Signin />} />

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

  </Routes>
);

export default AppRouter;