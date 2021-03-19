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
var currentCityEl = $('#current-city');
var currentWeatherContainer = $('current-weather-container');
var fiveDayForecastEl = $('#five-day-forecast');
var currentCityWeather = $('#current-forecast');
var forecastEl = $('#forecast');
var fiveDayContainer = $('#fiveday-container');
let rightNow = moment().subtract(10, 'days').calendar();
let temperature = $('#temperature');
let humidity = $('#humidity');
let windSpeed = $('#wind');
let uvIndex = $('#uv-index');
let weatherIcon = $('#icon');

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
    get5DayCityForecast(data.coord.lat, data.coord.lon);
    //console.log(city);
   // console.log($('#city').val());
  })
}
//console.log($('#city').val());
//getCityWeather(city);
//console.log($('#city').val());

/*const oneCallAPI = (lat,lon) => {
  var apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  //`api.openweathermap.org/data/2.5/weather?q={city name}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.coord.lat, data.coord.lon);
    
    //console.log(displayCurrentWeather);
  })
}*/

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
  let iconCode = data.weather[0].icon
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    weatherIcon.attr("src", iconUrl);
    //weatherIcon.attr('alt', );
let cityTemp = Math.round(data.main.temp);
//console.log(data.weather[0].icon);
//console.log(fahrenheit);
//let tempInF = Math.floor(data.main.temp * (9/5) + 32);

//city name displaying on HTML
currentCityEl.text(searchCity + " " + rightNow);
//append current text
temperature.text("Temperature " + cityTemp + "°F");
//append current temperature to city
currentWeatherContainer.append(temperature);


humidity.text("Humidity: " + data.main.humidity + "%");
currentWeatherContainer.append(humidity);

windSpeed.text("Winds: " + data.wind.speed + " mph")
currentWeatherContainer.append(windSpeed);

//let weatherIcon = $('<img>');
//weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${searchCity.weather.icon}@2x.png`);
//currentCityEl.append(weatherIcon);

//TO DO ADD UV INDEX, WEATHER ICON AND ADD CLASS



//currentWeatherContainer.append(currentCityWeather);
//currentWeatherContainer.append(temperature);




//let cityInfo = $('<div>');
//let weatherIcon = $('<div>');
//weatherIcon.text(data.weather[0].icon);
//cityInfo.append(weatherIcon);

//cityInfo.text("Temperature " + cityTemp);
//currentCityWeather.append(cityInfo);



//for (var i = 0; i < 4;i++) {
//let cityInfo = $('<ul>');
//let cityInfoLi1 = $('<li>');
//let cityInfoLi2 = $('<li>')
//cityInfoLi1.text("Temperature " + cityTemp);
//cityInfo.append(cityInfoLi1);
//}
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






const get5DayCityForecast = (lat, lon) => {

  var apiKey = "13a7d99fd01bbf81add0b89d186f1c5f";
  var oneUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`


fetch(oneUrl)
.then(response => response.json())
.then(data => {
  console.log(data);
  //console.log(lat, lon);
  //console.log(data.coord.lat, data.coord.lon)
  display5FiveDay(data);
 


})


}

const display5FiveDay = (data) => {
  //console.log(data.list[0]);
  //displayCurrentWeather(data, city);
  let fiveDays = data.daily.slice(0,5);
  //console.log(data);
//console.log(fiveDays);
//console.log(data);
//uvIndex.text(data.current.uvi);
/*console.log(data.current.uvi);
let currentUv = Math.round(data.current.uvi);
uvIndex.text("Uv-Index: " + currentUv);*/


let dayOneT = fiveDays[0].temp;
let dayOneH = fiveDays[0].humidity;
let dayOneUvi = fiveDays[0].uvi;
//console.log(dayOneT);
//console.log(dayOneH);
//console.log(dayOneUvi);


//===================UV INDEX=========================
//console.log(data.current.uvi);
let currentUv = Math.round(data.current.uvi);
uvIndex.text("Uv-Index: " + currentUv);

//uvIndex.text("Uv-Index: " + dayOneUvi);
if (currentUv <= 2){
  uvIndex.addClass('favorable')
} else if (currentUv >= 3 && currentUv <= 7) {
  //uvIndex.hide("favorable");
  //uvIndex.hide("severe");
  uvIndex.removeClass('favorable');
  uvIndex.addClass('moderate');
} else if (currentUv >=8){
  uvIndex.removeClass("favorable");
  uvIndex.removeClass("moderate");
  uvIndex.addClass('severe');
}










fiveDays.forEach(day => {
  //console.log(day);
  console.log(day);
  day += fiveDays.temp;
 //console.log(day.temp);
})










//fiveDay.forEach(day => day += data.list.main.temp)
//console.log(day);
}

















cityFormEl.on("submit", formSubmitHandler);

