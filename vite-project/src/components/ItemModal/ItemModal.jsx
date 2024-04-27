import "./ItemModal.css";

function ItemModal({ activeModal, selectedCard, handleModalClose }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="item-modal__container">
        <button
          type="button"
          className="preview__close-btn"
          id="item-modal__close-btn"
          onClick={handleModalClose}
        ></button>
        <img src={selectedCard.link} alt="" className="item-modal__image" />

        <p className="item-modal__title">{selectedCard.name}</p>
        <p className="item-modal__deascription">
          Weather: {selectedCard.weather}
        </p>
      </div>
    </div>
  );
}
export default ItemModal;
