import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";

function Main({ weatherData, handleCardClick }) {
  const tempDisplay = `${weatherData.temp.F} °F`;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {tempDisplay} / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                props={item}
                handleCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
