var searchFormEl = document.querySelector("#search-form")
var searchFormCityInputEl = document.querySelector("#search-form-city-input")
var weatherDayCityEl = document.querySelector("#weather-day-city")
var weatherDayTempEl = document.querySelector("#weather-day-temp")
var weatherDayWindEl = document.querySelector("#weather-day-wind")
var weatherDayHumidityEl = document.querySelector("#weather-day-humidity")
var weatherDayUvIndexEl = document.querySelector("#weather-day-uv-index")
var forecastContainerEl = document.querySelector("#forecast-container")
var weatherDayIconEl = document.querySelector("#weather-day-icon")

var baseUrl = "http://api.openweathermap.org/";
var apiKey = "902ed934f0d4c4e644f4024796540181";

function populate5Day(data) {
    data.forEach(function(day, index) {
        if(index === 0 || index > 5) {
            return;
        }
        var temp = day.temp.day;
        var windSpeed = day.wind_speed;
        var humidity = day.humidity.day;
        var icon = day.weather[0].icon;
        var div = document.createElement('div');
        div.classList = 'card-weather col-md-2 col-sm-12 bg-dark text-light me-3'
        div.innerHTML = `
        <h4>3/31/2021</h4>
        <img src="http://openweathermap.org/img/wn/${icon}.png" />
        <dl>
          <dt>Temp:</dt>
          <dd>${temp}</dd>
          <dt>Wind:</dt>
          <dd>${windSpeed} MPH</dd>
          <dt>Humidity:</dt>
          <dd>${humidity}%</dd>
        </dl>
        `
        forecastContainerEl.appendChild(div);
    })
}

function getCityDayWeather(city) {
    var url = `${baseUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(url).then(function(response) {
        return response.json()
    })
    .then(function(data) {
        var cityObject = data[0];
        var lat = cityObject.lat;
        var lon = cityObject.lon;

        var currentWeatherUrl = `${baseUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

        fetch(currentWeatherUrl).then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            var current = data.current;
            var temp = current.temp;
            var windSpeed = current.wind_speed;
            var humidity = current.humidity;
            var uvIndex = current.uvi;
            var icon = current.weather[0].icon;
            weatherDayCityEl.textContent = city;
            weatherDayTempEl.textContent = temp;
            weatherDayWindEl.textContent = windSpeed;
            weatherDayHumidityEl.textContent = humidity;
            weatherDayUvIndexEl.textContent = uvIndex;
            weatherDayIconEl.src = `http://openweathermap.org/img/wn/${icon}.png`;

            populate5Day(data.daily);
        })
    })
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    var city = searchFormCityInputEl.value;
    getCityDayWeather(city);
}

function addEventListeners() {
    searchFormEl.addEventListener('submit', handleFormSubmit);
}

function init() {
    addEventListeners();
}

init();