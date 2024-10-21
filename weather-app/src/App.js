import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchWeather, setSearchWeather] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3450356f343cf614e443fe7636725142
&units=metric`)
        .then((response) => response.json())
        .then((data) => setWeather(data));
    });
  }, []);

  const handleSearch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=3450356f343cf614e443fe7636725142
&units=metric`)
      .then((response) => response.json())
      .then((data) => setSearchWeather(data));
  };

  return (
    <div className="app">
      <div className="background" />
      <div className="weather-container">
        <h1>Current Weather</h1>
        <p>
          {weather.name}, {weather.sys?.country}
        </p>
        <p className="weather-description">
          {weather.weather?.[0]?.description}
        </p>
        <p>Temperature: {weather.main?.temp}°C</p>
        <p>Humidity: {weather.main?.humidity}%</p>
        <p>Wind Speed: {weather.wind?.speed} m/s</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search for another location</button>
        {searchWeather.name && (
          <div>
            <h2>Weather in {searchWeather.name}</h2>
            <p className="weather-description">
              {searchWeather.weather?.[0]?.description}
            </p>
            <p>Temperature: {searchWeather.main?.temp}°C</p>
            <p>Humidity: {searchWeather.main?.humidity}%</p>
            <p>Wind Speed: {searchWeather.wind?.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
