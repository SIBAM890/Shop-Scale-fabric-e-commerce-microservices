import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { festivalService } from "../api/api"; 
import "../styles/Festival.css";

// Category mapping (matches backend categories)
const CATEGORIES = [
  { id: 1, name: "Electronics", slug: "electronics", color: "#2874f0" },
  { id: 2, name: "Fashion", slug: "fashions", color: "#fb641b" },
  { id: 3, name: "Sports", slug: "sports", color: "#388e3c" },
  { id: 4, name: "Home Appliances", slug: "home-appliances", color: "#f57c00" },
  { id: 5, name: "Toys", slug: "toys", color: "#9c27b0" },
  { id: 6, name: "Jewellery", slug: "jewelleries", color: "#e91e63" },
  { id: 7, name: "Footwear", slug: "footwears", color: "#010404" },
  { id: 8, name: "Books", slug: "books", color: "#5e35b1" },
  { id: 9, name: "Beauty", slug: "beauty", color: "#ec407a" },
  { id: 10, name: "Automotive", slug: "automotive-spares", color: "#455a64" },
  { id: 11, name: "Bags", slug: "bags-luggages", color: "#3949ab" },
  { id: 12, name: "Watches", slug: "watches", color: "#00897b" },
];

const FestivalOffers = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams(); // Get slug from URL (e.g., 'electronics')
  
  const [offers, setOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Default to 'all', but will be updated by URL effect
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("discount");

  // 1. Sync State with URL Parameters
  // This ensures if you refresh the page on /electronics, it stays filtered
  useEffect(() => {
    if (categorySlug) {
      // Validate if the slug exists in our CATEGORIES list
      const isValidCategory = CATEGORIES.some(cat => cat.slug === categorySlug);
      if (isValidCategory) {
        setSelectedCategory(categorySlug);
      } else {
        setSelectedCategory("all");
      }
    } else {
      setSelectedCategory("all");
    }
  }, [categorySlug]);

  // 2. Fetch Offers on Mount
  useEffect(() => {
    fetchOffers();
  }, []);

  // 3. Filter & Sort Offers when category/sort changes
  useEffect(() => {
    if (!allOffers.length) return;
    
    let filtered = [...allOffers];
    
    // --- STRICT CATEGORY FILTERING ---
    if (selectedCategory !== "all") {
      // Find the specific category definition
      const targetCategory = CATEGORIES.find(cat => cat.slug === selectedCategory);
      
      if (targetCategory) {
        filtered = filtered.filter(offer => {
          // Normalize the offer's category from backend to lowercase for comparison
          const offerCat = offer.category?.toLowerCase().trim();
          
          // Match against BOTH the Category Name and the Slug to be safe
          // e.g. If backend sends "Electronics" OR "electronics"
          return offerCat === targetCategory.name.toLowerCase() || 
                 offerCat === targetCategory.slug.toLowerCase();
        });
      }
    }
    // ---------------------------------
    
    // Sorting
    if (sortBy === "discount") {
      filtered.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
    }
    
    setOffers(filtered);
  }, [selectedCategory, sortBy, allOffers]);

  // Fetch Offers from Backend
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const data = await festivalService.getAllOffers();
      setAllOffers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError("Failed to load festival offers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate Discount Percentage
  const calculateDiscount = (original, offer) => {
    if (!original || !offer || original <= 0) return 0;
    return Math.round(((original - offer) / original) * 100);
  };

  // Format Price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  // Get Category Color
  const getCategoryColor = (categorySlug) => {
    const category = CATEGORIES.find(c => c.slug === categorySlug?.toLowerCase());
    return category ? category.color : "#2874f0";
  };

  // Get Category Name
  const getCategoryName = (categorySlug) => {
    const category = CATEGORIES.find(c => c.slug === categorySlug?.toLowerCase());
    return category ? category.name : "All";
  };

  // Format End Date
  const formatEndDate = (endTime) => {
    if (!endTime) return "N/A";
    return new Date(endTime).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Category Tabs Component
  const CategoryTabs = () => (
    <div className="category-tabs-container">
      <button
        className={`category-tab ${selectedCategory === "all" ? "active" : ""}`}
        onClick={() => {
          setSelectedCategory("all");
          navigate("/festival-offers"); // Clears the URL param
        }}
      >
        All Categories
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          className={`category-tab ${selectedCategory === cat.slug ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory(cat.slug);
            // Updates URL to /festival-offers/electronics
            navigate(`/festival-offers/${cat.slug}`);
          }}
          style={{ borderColor: selectedCategory === cat.slug ? cat.color : undefined }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );

  // Loading Skeleton
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

  return (
    <div className="festival-page-wrapper">
      
      {/* 🎊 Hero Banner */}
      <section className="festival-hero">
        <div className="hero-content">
          <div className="hero-badge">🔥 Limited Time Offer</div>
          <h1 className="hero-title">Festival Mega Sale</h1>
          <p className="hero-subtitle">Up to 80% Off + Bank Offers | Free Delivery</p>
          
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => {
              setSelectedCategory("all");
              navigate("/festival-offers");
            }}>
              Shop Now
            </button>
            <button className="btn-secondary" onClick={fetchOffers}>
              Refresh Deals
            </button>
          </div>
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* 🏷️ Offers Highlights Bar */}
      <div className="offers-highlights">
        <div className="highlight-item">🚚 Free Delivery</div>
        <div className="highlight-item">🔄 Easy Returns</div>
        <div className="highlight-item">💳 No Cost EMI</div>
        <div className="highlight-item">🎁 Exchange Offers</div>
        <div className="highlight-item">🛡️ Warranty Included</div>
      </div>

      {/* 📂 Category Filter Tabs */}
      <CategoryTabs />

      {/* 🔍 Sort & Filter Controls */}
      <div className="controls-bar">
        <span className="results-count">{offers.length} deals found</span>
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
            <h3>No Offers Found</h3>
            <p>Try selecting a different category or check back soon!</p>
            <button 
              className="btn-outline" 
              onClick={() => { 
                setSelectedCategory("all"); 
                navigate("/festival-offers"); 
              }}
            >
              View All Categories
            </button>
          </div>
        ) : (
          <div className="offers-grid">
            {offers.map((offer) => {
              const discount = calculateDiscount(offer.originalPrice, offer.offerPrice);
              // Determine color based on the offer's actual category
              const categoryColor = getCategoryColor(offer.category);
              const categoryName = getCategoryName(offer.category);
              
              return (
                <div 
                  key={offer.offerId} 
                  className="offer-card"
                  onClick={() => navigate(`/product/${offer.offerId}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${offer.offerId}`)}
                >
                  {/* Image Container with Badges */}
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
                    
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <span className="discount-badge" style={{ backgroundColor: categoryColor }}>
                        {discount}% OFF
                      </span>
                    )}
                    
                    {/* Wishlist Button */}
                    <button 
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add wishlist logic here
                      }}
                      aria-label="Add to wishlist"
                    >
                      ♡
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="offer-details">
                    <span className="category-tag" style={{ color: categoryColor, borderColor: categoryColor }}>
                      {categoryName}
                    </span>
                    
                    <h3 className="product-name" title={offer.productName}>
                      {offer.productName || "Unknown Product"}
                    </h3>
                    
                    {/* Price Section */}
                    <div className="price-section">
                      <span className="offer-price">{formatPrice(offer.offerPrice)}</span>
                      {offer.originalPrice > offer.offerPrice && (
                        <>
                          <span className="original-price">{formatPrice(offer.originalPrice)}</span>
                          <span className="savings-text">Save {formatPrice(offer.originalPrice - offer.offerPrice)}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Bank Offers */}
                    {offer.bankOffers && offer.bankOffers.length > 0 && (
                      <div className="bank-offers">
                        <span className="bank-icon">🏦</span>
                        <span className="bank-text">{offer.bankOffers[0]}</span>
                      </div>
                    )}
                    
                    {/* Offer Validity */}
                    <div className="offer-validity">
                      <span className="validity-icon">📅</span>
                      <span>Valid till: {formatEndDate(offer.endTime)}</span>
                    </div>
                    
                    {/* CTA Button */}
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

      {/* 📢 Footer CTA */}
      <section className="festival-footer-cta">
        <h3>Don't Miss Out! 🎁</h3>
        <p>Subscribe to get exclusive offers & early access to sales</p>
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button className="btn-subscribe">Subscribe</button>
        </div>
      </section>

    </div>
  );
};

export default FestivalOffers;