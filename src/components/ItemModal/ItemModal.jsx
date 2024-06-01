import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  selectedCard,
  handleModalClose,
  handleDeleteItem,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  const itemDeleteButtonClassName = ` ${`item-modal__delete-btn ${
    isOwn ? "item-modal__delete-btn_visible" : "item-modal__delete-btn_hidden"
  }`}`;

  return (
    <div className={`${isOpen ? "item-modal item-modal_opened" : "modal"}`}>
      <div className="item-modal__container">
        <button
          type="button"
          className="item-modal__close-btn"
          id="item-modal__close-btn"
          onClick={handleModalClose}
        ></button>
        <button
          className={itemDeleteButtonClassName}
          onClick={handleDeleteItem}
        >
          Delete Item
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="item-modal__image"
        />

        <p className="item-modal__title">{selectedCard.name}</p>
        <p className="item-modal__description">
          Weather: {selectedCard.weather}
        </p>
      </div>
    </div>
  );
}
export default ItemModal;
