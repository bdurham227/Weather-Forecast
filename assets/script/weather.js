var cities = [];

var cityFormEl = $('#city-search-form');
//let cityInputEl = $('#city').val();
//console.log($('#city').val())
let cityInputEl = $('input[name="search-input"]');
//let cityInputEl = document.querySelector('#city');
//console.log(cityInputEl.value);
let city = cityInputEl.val();
//let city = cityInputEl.value;

//let submitBtn = $('#button');
//let cityInputEl = document.getElementById("city");
var pastSearchEl = $('#past-search-buttons');
var previousCityEl = $('#previous-city');
var currentWeatherContainer = $('current-weather-container');
var fiveDayForecastEl = $('#five-day-forecast');
var currentCityWeather = $('#current-forecast');
var forecastEl = $('#forecast');
var fiveDayContainer = $('#fiveday-container');
let rightNow = moment().subtract(10, 'days').calendar();

//let previousSearch = localStorage.getItem("city");

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
  //let city = cityInputEl.value;
  let city = cityInputEl.val().trim();

  if(city) {
    getCityWeather(city);
    //get5DayCityForecast(city);
    cities.unshift({city});
    cityInputEl.val("");
  } else {
    alert("please enter a city name");
  }
  //saveSearch();
  
}

//const buttonClickHandler = (event) => {
 // let previousSearch = event.target;
//  console.log(previousSearch);
//}




const saveSearch = () => {
  localStorage.setItem("city", JSON.stringify(city));
}



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
  let apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayCurrentWeather(data, city);
    console.log(city);
   // console.log($('#city').val());
  })
}
//console.log($('#city').val());
//getCityWeather(city);
//console.log($('#city').val());

const oneCallAPI = (lat,lon) => {
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  //`api.openweathermap.org/data/2.5/weather?q={city name}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    //console.log(displayCurrentWeather);
  })
}

/*var displayCurrentWeather = function (weather, searchCity) {
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
  method: "POST"

  
  currentWeatherContainer.text("");
  currentCityWeather.text(searchCity.main);
  currentWeatherContainer.append(currentCityWeather);
}*/

const displayCurrentWeather = (data, searchCity) => {
  //var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let cityTemp = Math.round(data.main.temp);
console.log(data.weather[0].icon);
//console.log(fahrenheit);
//let tempInF = Math.floor(data.main.temp * (9/5) + 32);
currentCityWeather.text(searchCity + " " + rightNow);
let cityInfo = $('<div>');
let weatherIcon = $('<div>');
weatherIcon.text(data.weather[0].icon);
cityInfo.append(weatherIcon);

cityInfo.text("Temperature " + cityTemp);
currentCityWeather.append(cityInfo);




//let cityInfo = $('<ul>');
//for (var i = 0; i < 4;i++) {
//let cityInfoLi1 = $('<li>');
//let cityInfoLi2 = $('<li>')
//cityInfoLi.text("Temperature " + cityTemp);
//cityInfo.append(cityInfoLi1);
}



//currentCityWeather.append(cityInfo);


/*for (var i = 0; i < data.length; i++) {
  //currentCityWeather.text(searchCity)
  let cityTitle = $('<h3>');
  cityTitle.text(data[i].main.temp);
  //console.log(data.main);
  //console.log(cityTitle);
  currentCityWeather.append(cityTitle);
  body.append(currentCityWeather);
}*/




//displayCurrentWeather();









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







cityFormEl.on("submit", formSubmitHandler);

