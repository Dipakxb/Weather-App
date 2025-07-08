const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Debugger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'active', 
    time: new Date().toISOString() 
  });
});

// WEATHER ENDPOINT (FIXED)
app.get('/api/weather', async (req, res) => {
  console.log("Weather endpoint triggered");
  
  try {
    const city = req.query.city;
    
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      console.error("API_KEY is missing from .env");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ 
      error: "Weather data fetch failed",
      details: error.response?.data?.message || error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Test endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/weather?city=London`);
});