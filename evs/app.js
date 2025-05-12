const API_KEY = 'your_openweathermap_api_key';

async function getAirQuality() {
  const city = document.getElementById('city').value;
  const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  const geoData = await geoRes.json();
  const { lat, lon } = geoData[0];

  const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const data = await res.json();
  const aqi = data.list[0].main.aqi;

  const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  document.getElementById('output').innerHTML = `
    <h3>AQI: ${aqi} - ${aqiLevels[aqi - 1]}</h3>
    <p>PM2.5: ${data.list[0].components.pm2_5} µg/m³</p>
    <p>PM10: ${data.list[0].components.pm10} µg/m³</p>
  `;
}
