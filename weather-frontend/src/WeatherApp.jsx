import { useState } from 'react'
import './WeatherApp.css'

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://weather-app-d47o.onrender.com/api/weather?city=${city}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  return (
    <div>
      <input 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temp: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}