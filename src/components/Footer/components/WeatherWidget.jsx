import { useEffect, useState } from "react";

export const WeatherWidget = () => {
  const [weatherData, setwWeatherData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
        setCurrentDate(new Date());
      });
  }, []);

  return (
    <section className="footer__weather-wiget">
      <div>
        {`${weatherData.city}, ${currentDate.getDate()} ${month[currentDate.getMonth()]}`}
      </div>
      <div>
        {weatherData.temperature + "°C"}, {weatherData.weather}
      </div>
    </section>
  );
};
