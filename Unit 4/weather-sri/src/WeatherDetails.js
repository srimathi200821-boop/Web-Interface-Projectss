import React from "react";

function WeatherDetails({ weather }) {
  return (
    <div className="details-section">

      <h2>Weather Details</h2>

      <div className="details-grid">

        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <p>Humidity</p>
          <h3>{weather.main.humidity}%</h3>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <p>Wind Speed</p>
          <h3>{weather.wind.speed} m/s</h3>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <p>Pressure</p>
          <h3>{weather.main.pressure} hPa</h3>
        </div>

        <div className="detail-card">
          <div className="detail-icon">👁️</div>
          <p>Visibility</p>
          <h3>
            {(weather.visibility / 1000).toFixed(1)} km
          </h3>
        </div>

      </div>
    </div>
  );
}

export default WeatherDetails;