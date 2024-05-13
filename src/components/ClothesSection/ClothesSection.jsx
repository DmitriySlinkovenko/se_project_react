import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <section className="section__container">
      <p className="current__items">Your Items</p>
      <button className="add__new-item" onClick={handleAddClick}>
        + Add New
      </button>
      <div className="clothes__section">
        <ul className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              props={item}
              handleCardClick={handleCardClick}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
