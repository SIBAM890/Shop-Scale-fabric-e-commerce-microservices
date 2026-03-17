import axios from "axios";

const API_URL       = "http://localhost:8080/api/products";
const ORDER_API_URL = "http://localhost:8080/api";
const AUTH_API      = "http://localhost:8080/auth";
const ADDRESS_API   = "http://localhost:8080/api/address";
const API_BASE_URL = "http://localhost:8080/api/festival";
const STORE_SETTINGS_API = "http://localhost:8080/api/storesettings";
const BASE_URL = "http://localhost:8080";

// ADMIN LOGIN
export const adminLogin = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/admin/login`, data);
  return res.data;
};

// GET OFFERS
export const getOffers = async () => {
  const res = await axios.get(`${BASE_URL}/api/offers`);
  return res.data;
};

// CREATE OFFER
export const createOffer = async (offer, adminName, password) => {
  const res = await axios.post(
    `${BASE_URL}/api/offers?adminName=${adminName}&password=${password}`,
    offer
  );
  return res.data;
};

// UPDATE OFFER
export const updateOffer = async (id, offer, adminName, password) => {
  const res = await axios.put(
    `${BASE_URL}/api/offers/${id}?adminName=${adminName}&password=${password}`,
    offer
  );
  return res.data;
};

// Get user settings by email
export const getSettingsByEmail = async (email) => {
  if (!email || !email.trim()) throw new Error("Email is required");
  const encoded = encodeURIComponent(email.trim());
  const res = await axios.get(`${STORE_SETTINGS_API}/${encoded}`);
  return res.data;
};

// Get all user preferences
export const getAllPreferences = async () => {
  const res = await axios.get(`${STORE_SETTINGS_API}/all`);
  return res.data;
};

// Save or update store settings
export const saveSettings = async (data) => {
  const res = await axios.post(`${STORE_SETTINGS_API}/save`, data);
  return res.data;
};


export const getPreferences = async () => {
  const res = await fetch("http://localhost:8080/api/storesettings/all");
  return res.json();
};

export const festivalService = {
  getAllOffers: async () => {
    const response = await fetch(`${API_BASE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch offers");
    return await response.json();
  },

  getOfferById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch offer");
    return await response.json();
  },
};

// ── Auth ──────────────────────────────────────────────
export const loginUser  = (data) => axios.post(`${AUTH_API}/login`,  data);
export const signupUser = (data) => axios.post(`${AUTH_API}/signin`, data);

export const getMe = async (token) => {
  const res = await axios.get(`${AUTH_API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ── Orders ────────────────────────────────────────────
export const placeOrder = async (orderData) => {
  const res = await axios.post(`${ORDER_API_URL}/orders`, orderData);
  return res.data;
};

export const markAsDelivered = async (orderId) => {
  const res = await axios.patch(`${ORDER_API_URL}/orders/${orderId}/deliver`);
  return res.data;
};

export const markAsShipped = async (orderId) => {            
  const res = await axios.patch(`${ORDER_API_URL}/orders/${orderId}/ship`);
  return res.data;
};
 

export const getOrdersByEmail = async (email) => {
  if (!email || !email.trim()) throw new Error("Email is required");

  const encoded = encodeURIComponent(email.trim());
  const res = await axios.get(`${ORDER_API_URL}/orders?email=${encoded}`);
  return Array.isArray(res.data) ? res.data : [];
};

export const cancelOrder = async (orderId) => {
  const res = await axios.patch(`${ORDER_API_URL}/orders/${orderId}/cancel`);
  return res.data;
};

// ── Products ──────────────────────────────────────────
export const getProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}/category/${category}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// ── Address ───────────────────────────────────────────

// POST   /api/address         — save new address
export const saveAddress = async (addressData) => {
  const res = await axios.post(ADDRESS_API, addressData);
  return res.data;
};

// GET    /api/address?email=  — get all addresses for user
export const getAddressesByEmail = async (email) => {
  if (!email || !email.trim()) throw new Error("Email is required");
  const encoded = encodeURIComponent(email.trim());
  const res = await axios.get(`${ADDRESS_API}?email=${encoded}`);
  return Array.isArray(res.data) ? res.data : [];
};

// GET    /api/address/:id     — get single address
export const getAddressById = async (id) => {
  const res = await axios.get(`${ADDRESS_API}/${id}`);
  return res.data;
};

// PUT    /api/address/:id     — update address
export const updateAddress = async (id, addressData) => {
  const res = await axios.put(`${ADDRESS_API}/${id}`, addressData);
  return res.data;
};

// DELETE /api/address/:id     — delete address
export const deleteAddress = async (id) => {
  const res = await axios.delete(`${ADDRESS_API}/${id}`);
  return res.data;
};