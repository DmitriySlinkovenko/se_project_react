function ItemCard(prop) {
  return (
    <div>
      <img src={prop.image} alt={prop.title} />
      <p>{prop.title}</p>
      <p></p>
    </div>
  );
}
export default ItemCard;
