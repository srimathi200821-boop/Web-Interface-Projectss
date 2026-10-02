import React from "react";

function ForecastCard({ day }) {
  const date = new Date(day.dt * 1000);

  const dayName = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="forecast-card">

      <h3>{dayName}</h3>

      <p className="forecast-date">
        {date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.weather[0].description}
      />

      <h2>{Math.round(day.main.temp)}°C</h2>

      <p>
        {day.weather[0].description}
      </p>

      <div className="min-max">
        <span>
          💧 {day.main.humidity}%
        </span>
      </div>

    </div>
  );
}

export default ForecastCard;