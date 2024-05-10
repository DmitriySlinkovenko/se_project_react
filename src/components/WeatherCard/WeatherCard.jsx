import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const tempDisplayF = `${weatherData.temp.F} °F`;
  const tempDisplayC = `${((weatherData.temp.F - 32) / (9 / 5)).toFixed(1)} °C`;
  const condition = weatherData.condition;
  const weatherId = weatherData.id;
  const isDay = weatherData.isDay;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  function handleBackgroundImage(condition, weatherId, isDay) {
    const dayPaths = {
      clouds: "../src/assets/cloudy.png",
      clear: "../src/assets/sunny.png",
      snow: "../src/assets/snow.png",
      rain: "../src/assets/rain.png",
      thunderstorm: "../src/assets/storm.png",
      741: "../src/assets/fog.png",
    };

    const nightPaths = {
      clouds: "../src/assets/night-cloudy.png",
      clear: "../src/assets/night.png",
      snow: "../src/assets/night-snow.png",
      rain: "../src/assets/night-rain.png",
      thunderstorm: "../src/assets/night-storm.png",
      741: "../src/assets/night-fog.png",
    };

    const path = isDay
      ? dayPaths[condition]
      : nightPaths[condition] || dayPaths[weatherId] || nightPaths[weatherId];

    return path || "";
  }

  return (
    <section
      className="weather-card__container"
      style={{
        backgroundImage: `url(${handleBackgroundImage(
          condition,
          weatherId,
          isDay
        )})`,
      }}
    >
      <p className="weather-card__temperature">
        {currentTemperatureUnit === "F" ? tempDisplayF : tempDisplayC}
      </p>
    </section>
  );
}
export default WeatherCard;
