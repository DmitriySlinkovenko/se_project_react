import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  weatherData,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        weatherData={weatherData}
      />
    </div>
  );
}
