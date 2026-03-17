import React, { useEffect, useState } from "react";
import { getOffers, createOffer, updateOffer } from "../api/api";
import "../styles/adminOffer.css";

export default function OfferManager({ adminName, password, onBack }) {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // start, end, create
  const [showMessage, setShowMessage] = useState(false);

  const loadOffers = async () => {
    const data = await getOffers();
    setOffers(data);
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
    await updateOffer(
      offer.id,
      { ...offer, startDate: today, endDate: offer.endDate.split("T")[0] },
      adminName,
      password
    );
    loadOffers();
    showConfirmation(`Offer "${offer.title}" Started!`, "start");
  };

  const handleEnd = async (offer) => {
    const today = new Date().toISOString().split("T")[0];
    await updateOffer(
      offer.id,
      { ...offer, startDate: offer.startDate.split("T")[0], endDate: today },
      adminName,
      password
    );
    loadOffers();
    showConfirmation(`Offer "${offer.title}" Ended!`, "end");
  };

  return (
    <div className="admin-flex-container">

      <div className="settings-card">
        <h3>Offers</h3>

        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={handleCreate}>Create Offer</button>
        <button className="back-btn" onClick={onBack}>Back to Admin Login</button>
      </div>

      <div className="offer-list">
        {offers.map((o) => (
          <div key={o.id} className="offer-card">
            <p><b>{o.title}</b></p>
            <p>{o.description}</p>
            <p>Start: {o.startDate}</p>
            <p>End: {o.endDate}</p>

            <div className="offer-btn-group">
              <button onClick={() => handleStart(o)}>Start Offer</button>
              <button onClick={() => handleEnd(o)}>End Offer</button>
            </div>
          </div>
        ))}
      </div>

      {showMessage && (
        <div className={`offer-confirmation ${msgType}`}>
          {message}
        </div>
      )}

    </div>
  );
}