import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ props, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = props.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    onCardLike(props, isLiked);
  };

  return (
    <li className="item-card__container">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="item-card__image"
        onClick={() => {
          handleCardClick(props);
        }}
      />
      <p className="item-card__title">{props.name}</p>
      <button
        className={
          isLiked
            ? "item-card__like-btn item-card__like-btn_liked"
            : "item-card__like-btn"
        }
        onClick={handleLike}
      ></button>
    </li>
  );
}
export default ItemCard;
