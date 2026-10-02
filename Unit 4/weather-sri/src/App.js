import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [cityImage, setCityImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // STEP 1: Find the location
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      const locationData = await locationResponse.json();

      if (
        !locationData.results ||
        locationData.results.length === 0
      ) {
        throw new Error("City not found");
      }

      const place = locationData.results[0];

      // STEP 2: Get weather using exact latitude and longitude
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=5`
      );

      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        throw new Error("Weather data unavailable");
      }

      // STEP 3: Save location
      setLocation(place);

      // STEP 4: Convert Open-Meteo data into the format
      // used by the existing React components
      const currentWeather = {
        name: place.name,
        sys: {
          country: place.country_code,
          state: place.admin1 || "",
        },
        coord: {
          lat: place.latitude,
          lon: place.longitude,
        },
        main: {
          temp: weatherData.current.temperature_2m,
          feels_like: weatherData.current.apparent_temperature,
          humidity: weatherData.current.relative_humidity_2m,
          pressure: weatherData.current.surface_pressure,
        },
        wind: {
          speed: weatherData.current.wind_speed_10m,
        },
        visibility: weatherData.current.visibility || 10000,
        weather: [
          {
            description: getWeatherDescription(
              weatherData.current.weather_code
            ),
            icon: getWeatherIcon(
              weatherData.current.weather_code
            ),
          },
        ],
      };

      setWeather(currentWeather);

      // STEP 5: Create 5-day forecast
      const dailyForecast = weatherData.daily.time.map(
        (date, index) => ({
          dt: new Date(date).getTime() / 1000,

          main: {
            temp:
              (weatherData.daily.temperature_2m_max[index] +
                weatherData.daily.temperature_2m_min[index]) /
              2,

            temp_max:
              weatherData.daily.temperature_2m_max[index],

            temp_min:
              weatherData.daily.temperature_2m_min[index],

            humidity: 0,
          },

          weather: [
            {
              description: getWeatherDescription(
                weatherData.daily.weather_code[index]
              ),
              icon: getWeatherIcon(
                weatherData.daily.weather_code[index]
              ),
            },
          ],

          precipitation_probability:
            weatherData.daily
              .precipitation_probability_max[index],
        })
      );

      setForecast(dailyForecast);

     // STEP 6: Find a real photo of the searched city
const imageResponse = await fetch(
  `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    place.name + " " + (place.admin1 || "")
  )}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json&origin=*`
);

const imageData = await imageResponse.json();

const pages = imageData.query?.pages
  ? Object.values(imageData.query.pages)
  : [];

const imagePage = pages.find(
  (page) =>
    page.imageinfo &&
    page.imageinfo[0] &&
    page.imageinfo[0].thumburl
);

if (imagePage) {
  setCityImage(imagePage.imageinfo[0].thumburl);
} else {
  setCityImage("");
}
    } catch (err) {
      console.error(err);

      setWeather(null);
      setForecast([]);
      setLocation(null);
      setCityImage("");

      if (err.message === "City not found") {
        setError("City not found. Please check the spelling.");
      } else {
        setError(
          "Unable to get weather data. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="weather-container">

        <header className="header">
          <h1>Weatherly</h1>
          <p>Weather Dashboard</p>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={searchWeather}
          loading={loading}
        />

        {loading && (
          <div className="message">
            🔄 Loading weather...
          </div>
        )}

        {error && !loading && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {!loading && weather && location && (
          <>
            <CurrentWeather
              weather={weather}
              location={location}
              cityImage={cityImage}
            />

            <WeatherDetails weather={weather} />

            <Forecast forecast={forecast} />
          </>
        )}

        {!loading && !weather && !error && (
          <div className="welcome">
            <div className="welcome-icon">🌤️</div>

            <h2>Live Weather</h2>

            <p>
              Search for a city to see current weather
              and forecast.
            </p>
          </div>
        )}

        <footer>
          Weather data powered by Open-Meteo
        </footer>

      </div>
    </div>
  );
}


/* --------------------------------
   WEATHER DESCRIPTION
-------------------------------- */

function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear sky",

    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Depositing rime fog",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",

    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",

    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",

    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",

    77: "Snow grains",

    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",

    85: "Slight snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",

    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return descriptions[code] || "Unknown weather";
}


/* --------------------------------
   WEATHER ICON
-------------------------------- */

function getWeatherIcon(code) {
  if (code === 0) {
    return "01d";
  }

  if (code === 1 || code === 2) {
    return "02d";
  }

  if (code === 3) {
    return "04d";
  }

  if (
    code === 45 ||
    code === 48
  ) {
    return "50d";
  }

  if (
    code >= 51 &&
    code <= 67
  ) {
    return "10d";
  }

  if (
    code >= 71 &&
    code <= 77
  ) {
    return "13d";
  }

  if (
    code >= 80 &&
    code <= 82
  ) {
    return "09d";
  }

  if (
    code >= 85 &&
    code <= 86
  ) {
    return "13d";
  }

  if (
    code >= 95 &&
    code <= 99
  ) {
    return "11d";
  }

  return "01d";
}

export default App;