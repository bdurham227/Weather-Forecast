var cities = [];

var cityFormEl = $('#city-search-form');
let cityInputEl = $('#city').val();
console.log($('#city').val())
let submitBtn = $('#button');
//let cityInputEl = document.getElementById("city");
var pastSearchEl = $('#past-search-buttons');
var previousCityEl = $('#previous-city');
var currentWeatherContainer = $('current-weather-container');
var fiveDayForecastEl = $('#five-day-forecast');
var currentCityWeather = $('#current-forecast');
var forecastEl = $('#forecast');
var fiveDayContainer = $('#fiveday-container');

/*var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.val().trim();
  if(city) {
    getCityWeather(city);
    get5Day(city);
    cities.unshift({city});
    cityInputEl.val("");
  } else {
    alert("please enter a city");
  }
  saveSearch();
  pastSearch();

}*/

const formSubmitHandler = (event) => {
  event.preventDefault();

  let city = cityInputEl.val().trim();

  if(city) {
    getCityWeather(city);
    get5DayCityForecast(city);
    cities.unshift({city});
    cityInputEl.val("");
  } else {
    alert("please enter a city name");
  }
  
}


/*var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));

}
console.log("pre function")
var getCityWeather = function (city) {
  var apiKey = '23dd7d8d5c92cd7c1c479c510aaf11d3';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}"`;

  fetch(apiUrl)
  .then(function (response){
    console.log("inside function");
    response.json().then(function (data) {
      console.log(data);
      displayCurrentWeather(data, city);
    });
  });
};
console.log("outside function");

var displayCurrentWeather = function (weather, searchCity) {
  currentWeatherContainer.text("");
  currentCityWeather.text(searchCity);
}*/






/*function getCityWeather (city) {
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//console.log("function-start");


fetch(apiUrl)
.then(response => response.json())
.then(data => {
  
  console.log(data);
  console.log(city);
})
}
getCityWeather(city);*/


const getCityWeather = (city) => {
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(city);
    console.log($('#city').val());
  })
}
console.log($('#city').val());
getCityWeather(city);
console.log($('#city').val());

const oneCallAPI = (lat,lon) => {
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  //`api.openweathermap.org/data/2.5/weather?q={city name}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
}





/*function oneCallAPI(lat, lon){
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  var apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  //`api.openweathermap.org/data/2.5/weather?q={city name}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`

  fetch(apiUrl)
  .then(function (response) {
      if (response.ok) {
          response.json().then(function (data){
              console.log(data);
          })
      }
  })
}
*/







submitBtn.on("submit", formSubmitHandler);

