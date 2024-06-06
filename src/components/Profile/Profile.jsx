import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  handleLogout,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleLogout={handleLogout}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}
