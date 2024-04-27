import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const tempDisplay = `${weatherData.temp.F} °F`;
  const condition = weatherData.condition;
  const weatherId = weatherData.id;
  const isDay = weatherData.isDay;

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
      <p className="weather-card__temperature">{tempDisplay}</p>
    </section>
  );
}
export default WeatherCard;
