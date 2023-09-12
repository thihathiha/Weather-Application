function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class = "row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class = "col-2">
      <div class = "weatherr-forecast-date"> ${formatDay(
        forecastDay.dt
      )} </div> <div> 
        <img src = "http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt = "" width = "42" />
        </div> 
        <diV class = "weather-forecast-temp">
        <span class = "temp-max"> ${Math.round(forecastDay.temp.max)}°</span> 
        <span class = "temp-min"> ${Math.round(forecastDay.temp.min)}° </span> 
        </diV> </div> 
        `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function searchCity(city) {
    let apiKey = "267c856400f4f5972b08b873cbe4b99e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayTemperature);
}
searchCity("Myanmar");

function result(event) {
    event.preventDefault();
    let input = document.querySelector("#search1");
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${input.value}`;
    searchCity(input.value);
}

function currentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "267c856400f4f5972b08b873cbe4b99e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayTemperature);
}

function showCurrentLoc(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#buttonBtn1");
currentButton.addEventListener("click", showCurrentLoc);

let form = document.querySelector("form");
form.addEventListener("submit", result);