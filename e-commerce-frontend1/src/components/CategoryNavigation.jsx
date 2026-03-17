// src/components/CategoryNavigation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const CATEGORIES = [
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

const CategoryNavigation = ({ selectedCategory, onCategoryChange, showAllButton = true }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    onCategoryChange(slug);
    
    if (slug === "all") {
      navigate("/festival-offers");
    } else {
      navigate(`/festival-offers/${slug}`);
    }
  };

  return (
    <div className="category-tabs-container">
      {showAllButton && (
        <button
          className={`category-tab ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryClick("all")}
        >
          All Categories
        </button>
      )}

      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`category-tab ${selectedCategory === cat.slug ? "active" : ""}`}
          onClick={() => handleCategoryClick(cat.slug)}
          style={{ 
            borderColor: selectedCategory === cat.slug ? cat.color : undefined,
            color: selectedCategory === cat.slug ? cat.color : undefined
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;