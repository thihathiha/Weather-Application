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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  a.classList.add("active");
  units.classList.remove("active");
  let change = `${Math.round(((temperature.innerHTML - 32) * 5) / 9)}`;
  temperature.innerHTML = `${change}`;
}

let a = document.querySelector("#celsius");
a.addEventListener("click", celsius);

let celsiusTemperature = null;

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  a.classList.remove("active");
  units.classList.add("active");
  let change1 = `${Math.round((temperature.innerHTML * 9) / 5 + 32)}`;
  temperature.innerHTML = `${change1}`;
}

let units = document.querySelector("#fahrenheit");
units.addEventListener("click", fahrenheit);
