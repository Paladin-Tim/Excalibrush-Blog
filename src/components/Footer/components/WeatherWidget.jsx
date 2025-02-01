import { useEffect, useState } from "react";

export const WeatherWidget = () => {
  const [weatherData, setwWeatherData] = useState({});

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Moscow&lat={lat}&lon={lon}&appid=0a8f03e5a768ad65cd9ef69eb3c3334d&units=metric",
    )
      .then((res) => res.json())
      .then(({ name, main, weather }) => {
        setwWeatherData({
          city: name,
          temperature: main.temp.toFixed(0),
          weather: weather[0].description,
        });
      });
  }, []);

  return (
    <section className="footer__weather-wiget">
      <div>{weatherData.city}</div>
      <div>
        {weatherData.temperature + "°C"}, {weatherData.weather}
      </div>
    </section>
  );
};
