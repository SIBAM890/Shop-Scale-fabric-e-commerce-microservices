// src/pages/CategoryOffersPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { festivalService } from "../api/api";
import { CATEGORIES } from "../components/CategoryNavigation";
import "../styles/Festival.css";

const CategoryOffersPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  
  const [offers, setOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("discount");

  // Get current category info
  const currentCategory = CATEGORIES.find(cat => cat.slug === categorySlug);

  // Fetch Offers on Mount
  useEffect(() => {
    fetchOffers();
  }, [categorySlug]);

  // Filter & Sort Offers
  useEffect(() => {
    if (!allOffers.length || !currentCategory) return;
    
    let filtered = [...allOffers];
    
    // STRICT CATEGORY FILTERING
    filtered = filtered.filter(offer => {
      const offerCat = offer.category?.toLowerCase().trim();
      return offerCat === currentCategory.name.toLowerCase() || 
             offerCat === currentCategory.slug.toLowerCase();
    });
    
    // Sorting
    if (sortBy === "discount") {
      filtered.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
    }
    
    setOffers(filtered);
  }, [sortBy, allOffers, currentCategory]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const data = await festivalService.getAllOffers();
      setAllOffers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError("Failed to load offers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscount = (original, offer) => {
    if (!original || !offer || original <= 0) return 0;
    return Math.round(((original - offer) / original) * 100);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const formatEndDate = (endTime) => {
    if (!endTime) return "N/A";
    return new Date(endTime).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const LoadingSkeleton = () => (
    <div className="offers-grid">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="offer-card skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error State
  if (error) {
    return (
      <div className="festival-error">
        <div className="error-icon">⚠️</div>
        <h2>{error}</h2>
        <button className="retry-btn" onClick={fetchOffers}>Retry</button>
      </div>
    );
  }

  // Invalid Category
  if (!currentCategory) {
    return (
      <div className="festival-error">
        <div className="error-icon">❌</div>
        <h2>Category Not Found</h2>
        <button className="retry-btn" onClick={() => navigate("/festival-offers")}>
          Back to All Offers
        </button>
      </div>
    );
  }

  return (
    <div className="festival-page-wrapper">
      
      {/* 🎊 Category Hero Banner */}
      <section 
        className="festival-hero" 
        style={{ backgroundColor: currentCategory.color }}
      >
        <div className="hero-content">
          <div className="hero-badge">🔥 {currentCategory.name} Offers</div>
          <h1 className="hero-title">{currentCategory.name} Mega Sale</h1>
          <p className="hero-subtitle">Exclusive Deals on {currentCategory.name} | Up to 80% Off</p>
          
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate("/festival-offers")}>
              View All Categories
            </button>
            <button className="btn-secondary" onClick={fetchOffers}>
              Refresh Deals
            </button>
          </div>
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* 🔍 Sort Controls */}
      <div className="controls-bar">
        <span className="results-count">{offers.length} {currentCategory.name} deals found</span>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="discount">Highest Discount</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* 🎁 Offers Grid */}
      <main className="festival-main">
        {loading ? (
          <LoadingSkeleton />
        ) : offers.length === 0 ? (
          <div className="no-offers">
            <div className="empty-icon">🛍️</div>
            <h3>No {currentCategory.name} Offers Found</h3>
            <p>Check back soon for new deals!</p>
            <button 
              className="btn-outline" 
              onClick={() => navigate("/festival-offers")}
            >
              View All Categories
            </button>
          </div>
        ) : (
          <div className="offers-grid">
            {offers.map((offer) => {
              const discount = calculateDiscount(offer.originalPrice, offer.offerPrice);
              
              return (
                <div 
                  key={offer.offerId} 
                  className="offer-card"
                  onClick={() => navigate(`/product/${offer.offerId}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${offer.offerId}`)}
                >
                  <div className="offer-image-wrapper">
                    <img
                      src={offer.imgUrl || "https://via.placeholder.com/300x300?text=Product"}
                      alt={offer.productName || "Product"}
                      className="offer-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x300?text=Image+Unavailable";
                        e.target.classList.add('error-image');
                      }}
                    />
                    
                    {discount > 0 && (
                      <span className="discount-badge" style={{ backgroundColor: currentCategory.color }}>
                        {discount}% OFF
                      </span>
                    )}
                    
                    <button 
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label="Add to wishlist"
                    >
                      ♡
                    </button>
                  </div>

                  <div className="offer-details">
                    <span className="category-tag" style={{ color: currentCategory.color, borderColor: currentCategory.color }}>
                      {currentCategory.name}
                    </span>
                    
                    <h3 className="product-name" title={offer.productName}>
                      {offer.productName || "Unknown Product"}
                    </h3>
                    
                    <div className="price-section">
                      <span className="offer-price">{formatPrice(offer.offerPrice)}</span>
                      {offer.originalPrice > offer.offerPrice && (
                        <>
                          <span className="original-price">{formatPrice(offer.originalPrice)}</span>
                          <span className="savings-text">Save {formatPrice(offer.originalPrice - offer.offerPrice)}</span>
                        </>
                      )}
                    </div>
                    
                    {offer.bankOffers && offer.bankOffers.length > 0 && (
                      <div className="bank-offers">
                        <span className="bank-icon">🏦</span>
                        <span className="bank-text">{offer.bankOffers[0]}</span>
                      </div>
                    )}
                    
                    <div className="offer-validity">
                      <span className="validity-icon">📅</span>
                      <span>Valid till: {formatEndDate(offer.endTime)}</span>
                    </div>
                    
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Add to cart:", offer.offerId);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

    </div>
  );
};

export default CategoryOffersPage;