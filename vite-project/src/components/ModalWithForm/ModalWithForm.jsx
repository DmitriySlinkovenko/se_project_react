import "./ModalWithForm.css";

function ModalWithForm(props) {
  return (
    <div className={`modal modal_type_${props.name}`}>
      <form className="form" name={props.name}>
        <h3 className="form__title ">New garment</h3>
        <button type="button" className="form__close-btn"></button>
        <label htmlFor="name_input">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="form__input"
          id="name_input"
          name="image_title"
        />
        <label htmlFor="image_input">Image</label>
        <input
          type="url"
          placeholder="Image URL"
          className="form__input"
          id="image_input"
          name="image"
        />
        <label
          htmlFor="weather-type-radio"
          className="form__weather-type_selector"
        >
          Select the weather type:
          <label>
            <input type="radio" name="weather-type" id="weather-type-hot" />
            Hot
          </label>
          <label>
            <input type="radio" name="weather-type" id="weather-type-warm" />
            Warm
          </label>
          <label>
            <input type="radio" name="weather-type" id="weather-type-cold" />
            Cold
          </label>
        </label>
        <button type="submit" className="form__submit-btn">
          Add garment
        </button>
      </form>
    </div>
  );
}
export default ModalWithForm;
