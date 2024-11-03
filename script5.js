// API Key for OpenWeather
const apiKey = 'cd66d26d96f6c43c1cd1195da2a67877';

// Select elements
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const currentLocationButton = document.getElementById('currentLocationButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Event listeners
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a location!");
    }
});

currentLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        }, () => {
            alert("Geolocation is not enabled.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Fetch weather by city name
function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert("Failed to fetch weather data. Check your location or API key."));
}

// Fetch weather by coordinates
function fetchWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert("Failed to fetch weather data."));
}

// Display weather information
function displayWeather(data) {
    if (data.cod === 200) { // 200 indicates successful fetch
        cityName.textContent = `Location: ${data.name}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
        alert("Location not found. Please enter a valid city.");
    }
}
