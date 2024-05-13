import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const tempDisplayF = `${weatherData.temp.F} °F`;
  const tempDisplayC = `${((weatherData.temp.F - 32) / (9 / 5)).toFixed(1)} °C`;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weather = weatherData.type;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F" ? tempDisplayF : tempDisplayC} / You
          may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather == weather)
            .map((item) => {
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
