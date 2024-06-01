import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="section__container">
      <div className="clothes__section-heading">
        <p className="current__items">Your Items</p>
        <button className="add__new-item" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <div className="clothes__section">
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  props={item}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </div>
    </section>
  );
}
