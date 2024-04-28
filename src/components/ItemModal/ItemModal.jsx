import "./ItemModal.css";

function ItemModal({ isOpen, selectedCard, handleModalClose }) {
  return (
    <div className={`${isOpen ? "item-modal item-modal_opened" : "modal"}`}>
      <div className="item-modal__container">
        <button
          type="button"
          className="item-modal__close-btn"
          id="item-modal__close-btn"
          onClick={handleModalClose}
        ></button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="item-modal__image"
        />

        <p className="item-modal__title">{selectedCard.name}</p>
        <p className="item-modal__deascription">
          Weather: {selectedCard.weather}
        </p>
      </div>
    </div>
  );
}
export default ItemModal;
