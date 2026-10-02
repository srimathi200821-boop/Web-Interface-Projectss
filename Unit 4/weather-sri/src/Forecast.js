import React from "react";
import ForecastCard from "./ForecastCard";

function Forecast({ forecast }) {
  return (
    <div className="forecast-section">

      <h2>5-Day Forecast</h2>

      <div className="forecast-grid">
        {forecast.map((day) => (
          <ForecastCard
            key={day.dt}
            day={day}
          />
        ))}
      </div>

    </div>
  );
}

export default Forecast;