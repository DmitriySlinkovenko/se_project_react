import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import cloudy from "../../assets/cloudy.png";
import fog from "../../assets/fog.png";
import nightCloudy from "../../assets/night-cloudy.png";
import nightFog from "../../assets/night-fog.png";
import nightRain from "../../assets/night-rain.png";
import nightSnow from "../../assets/night-snow.png";
import nightStorm from "../../assets/night-storm.png";
import night from "../../assets/night.png";
import rain from "../../assets/rain.png";
import snow from "../../assets/snow.png";
import storm from "../../assets/storm.png";
import sunny from "../../assets/sunny.png";

function WeatherCard({ weatherData }) {
  const tempDisplayF = `${weatherData.temp.F} °F`;
  const tempDisplayC = `${((weatherData.temp.F - 32) / (9 / 5)).toFixed(1)} °C`;
  const condition = weatherData.condition;
  console.log(condition);
  const weatherId = weatherData.id;
  const isDay = weatherData.isDay;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  function handleBackgroundImage(condition, weatherId, isDay) {
    const dayPaths = {
      clouds: cloudy,
      clear: sunny,
      snow: snow,
      rain: rain,
      thunderstorm: storm,
      741: fog,
    };

    const nightPaths = {
      clouds: nightCloudy,
      clear: night,
      snow: nightSnow,
      rain: nightRain,
      thunderstorm: nightStorm,
      741: nightFog,
    };

    if (condition == "smoke" || (condition == "mist" && isDay)) {
      return dayPaths.clear;
    } else {
      nightPaths.clear;
    }

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
