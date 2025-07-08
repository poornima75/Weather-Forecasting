const apiKey = '5f229c2e1a309224be9cbeed4a7be378'; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      // Extract the required info
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weatherDescription = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

      // Create HTML to show
      const weatherHTML = `
        <h2>${cityName}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Weather:</strong> ${weatherDescription}</p>
      `;

      resultDiv.innerHTML = weatherHTML;
    })
    .catch(error => {
      resultDiv.innerHTML = `Error: ${error.message}`;
    });
}
