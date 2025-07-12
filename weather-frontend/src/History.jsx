import { useEffect, useState } from "react";

export default function SearchHistory() {
  const [history, setHistory] = useState([]);
  const [topCities, setTopCities] = useState([]);

  useEffect(() => {
    // Fetch recent searches
    fetch('http://localhost:5000/api/history?limit=5')
      .then(res => res.json())
      .then(data => setHistory(data));
    
    // Fetch top cities
    fetch('http://localhost:5000/api/top-cities')
      .then(res => res.json())
      .then(data => setTopCities(data));
  }, []);

  return (
    <div className="history-panel">
      <h3>Recent Searches</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.city} - {item.temp}°C ({item.conditions})
          </li>
        ))}
      </ul>
      
      <h3>Most Searched Cities</h3>
      <ul>
        {topCities.map((city, index) => (
          <li key={index}>
            {city._id} (searched {city.count} times)
          </li>
        ))}
      </ul>
    </div>
  );
}