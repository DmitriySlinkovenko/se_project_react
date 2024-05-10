import "./ItemCard.css";

function ItemCard({ props, handleCardClick }) {
  return (
    <li className="item-card__container">
      <p className="item-card__title">{props.name}</p>
      <img
        src={props.imageUrl}
        alt={props.name}
        className="item-card__image"
        onClick={() => {
          handleCardClick(props);
        }}
      />
    </li>
  );
}
export default ItemCard;
