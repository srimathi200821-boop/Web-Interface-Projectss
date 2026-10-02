import React from "react";

function CurrentWeather({ weather, location, cityImage }) {
  const latitude = location.latitude;
  const longitude = location.longitude;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="current-card">

      <div className="city-image-container">
        <img
          src={cityImage}
          alt={location.name}
          className="city-image"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

        <div className="image-overlay">
          <h2>{location.name}</h2>

          <p>
            {location.admin1
              ? `${location.admin1}, `
              : ""}
            {location.country}
          </p>
        </div>
      </div>

      <div className="weather-main">

        <div>
          <p className="location-title">
            📍 {location.name}
          </p>

          <p className="exact-location">
            {location.admin1
              ? `${location.admin1}, `
              : ""}
            {location.country}
          </p>

          <p className="coordinates">
            Latitude: {latitude.toFixed(4)}° | Longitude:{" "}
            {longitude.toFixed(4)}°
          </p>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="map-button"
          >
            📍 View Exact Location
          </a>
        </div>

        <div className="temperature-section">

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />

          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>

          <div className="description">
            {weather.weather[0].description}
          </div>

          <div className="feels">
            Feels like{" "}
            {Math.round(weather.main.feels_like)}°C
          </div>

        </div>

      </div>
    </div>
  );
}

export default CurrentWeather;