import React, { useEffect, useState } from "react";
import { getOffers, createOffer, updateOffer } from "../api/api";
import "../styles/adminOffer.css";

export default function OfferManager({ adminName, password, onBack, storeName, categories }) {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // "start", "end", "create"
  const [showMessage, setShowMessage] = useState(false);

  const loadOffers = async () => {
    const data = await getOffers();
    setOffers(data || []);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const showConfirmation = (text, type) => {
    setMessage(text);
    setMsgType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleCreate = async () => {
    if (!title || !description || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }
    await createOffer(
      { title, description, startDate, endDate },
      adminName,
      password
    );
    loadOffers();
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    showConfirmation("Offer Created Successfully!", "create");
  };

  const handleStart = async (offer) => {
    const today = new Date().toISOString().split("T")[0];
    const end = offer.endDate ? offer.endDate.split("T")[0] : today;

    await updateOffer(
      offer.id,
      { ...offer, startDate: today, endDate: end },
      adminName,
      password
    );
    loadOffers();
    showConfirmation(`Offer "${offer.title}" Started!`, "start");
  };

  const handleEnd = async (offer) => {
    const today = new Date().toISOString().split("T")[0];
    const start = offer.startDate ? offer.startDate.split("T")[0] : today;

    await updateOffer(
      offer.id,
      { ...offer, startDate: start, endDate: today },
      adminName,
      password
    );
    loadOffers();
    showConfirmation(`Offer "${offer.title}" Ended!`, "end");
  };

  const calculateHours = (dateStr) => {
    if (!dateStr) return "-";
    const now = new Date();
    const d = new Date(dateStr);
    const diff = (d - now) / (1000 * 60 * 60); // hours
    return Math.round(diff);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="admin-dashboard-container">

      {/* LEFT: Admin Info Card */}
      <div className="admin-card admin-info-card">
  <h3>Admin Info</h3>
  <p><b>Admin Name:</b> {adminName}</p>
  <p><b>Store Name:</b> {storeName}</p>
  <p><b>Total Categories:</b> {categories ? categories.split(",").length : 0}</p>
  <p><b>Total Offers:</b> {offers.length}</p>
</div>

     <div className="offer-management-wrapper">
  {/* LEFT: Offer Form */}
  <div className="offer-form">
    <h3>Create Offer</h3>
    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
    <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    
    <div className="form-btn-group">
      <button className="create-btn" onClick={handleCreate}>Create Offer</button>
      <button className="back-btn" onClick={onBack}>Back to Admin Login</button>
    </div>
  </div>

  {/* RIGHT: Offer List */}
  <div className="offer-list">
    {offers.map((o) => (
      <div key={o.id} className="offer-card">
        <p><b>{o.title}</b></p>
        <p>{o.description}</p>
        <p>Start: {formatDate(o.startDate)}</p>
        <p>End: {formatDate(o.endDate)}</p>

        <div className="offer-btn-group">
          <button className="start-btn" onClick={() => handleStart(o)}>Start Offer</button>
          <button className="end-btn" onClick={() => handleEnd(o)}>End Offer</button>
        </div>
      </div>
    ))}
  </div>
</div>

{showMessage && (
  <div className={`offer-confirmation ${msgType}`}>
    {message}
  </div>
)}
    </div>
  );
}