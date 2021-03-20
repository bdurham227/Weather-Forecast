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
let day1 = $('#day1');
let day2 = $('#day1');
let day3 = $('#day2');
let day4 = $('#day3');
let day5 = $('#day4');
//let previousSear4h =4localStorage.getItem("city");

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

//=====================function that handles and fetches API CALL then calls displayCurrentWeather function==========================
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


//============================Handles getcityWeather API data to display on html========================
const displayCurrentWeather = (data, searchCity) => {
 

//=======WEATHER ICON=======
  let iconCode = data.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    weatherIcon.attr("src", iconUrl);
let cityTemp = Math.round(data.main.temp);
//=================================================================

//console.log(data.weather[0].icon);
//console.log(fahrenheit);
//let tempInF = Math.floor(data.main.temp * (9/5) + 32);

//======================city name displaying on HTML====================================
currentCityEl.text(searchCity + " " + rightNow);
temperature.text("Temperature " + cityTemp + "°F");
currentWeatherContainer.append(temperature);
humidity.text("Humidity: " + data.main.humidity + "%");
currentWeatherContainer.append(humidity);
windSpeed.text("Winds: " + data.wind.speed + " mph")
currentWeatherContainer.append(windSpeed);
}



//================================API call to ONECALLAPI to get daily forecast then run display5day function to handle that data===================
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
//=============================Displaying 5 Forecast====================================
const display5FiveDay = (data) => {
  //gets api call weather object for 5 day forecast and slices at first element (0basedindexing) and stops the slice at the 5th element
let fiveDays = data.daily.slice(0,5);
//let iconCode = data.weather[0].icon
/*let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
$('#icon1').attr("src", iconUrl);
$('#icon2').attr("src", iconUrl);
$('#icon3').attr("src", iconUrl);
$('#icon4').attr("src", iconUrl);
$('#icon5').attr("src", iconUrl);*/



fiveDays.forEach((day,index) => {
  console.log(day);

  
  let dayTemp = Math.round(day.temp.day);
  let dayHumidity = day.humidity;
  //console.log(dayHumidity);
  $(`#day${index+1}`).text("Temperature: " + dayTemp + "°F" + `\n` + "Humidity " + dayHumidity + "%");
  $(`#day${index+2}`).text("Temperature: " + dayTemp + "°F" + `\n` + "Humidity " + dayHumidity + "%");
  $(`#day${index+3}`).text("Temperature: " + dayTemp + "°F" + `\n` + "Humidity " + dayHumidity + "%");
  $(`#day${index+4}`).text("Temperature: " + dayTemp + "°F" + `\n` + "Humidity " + dayHumidity + "%");
  $(`#day${index+5}`).text("Temperature: " + dayTemp + "°F" + `\n` + "Humidity " + dayHumidity + "%");
  //console.log(dayTemp);

})













//console.log(data);
//uvIndex.text(data.current.uvi);
/*console.log(data.current.uvi);
let currentUv = Math.round(data.current.uvi);
uvIndex.text("Uv-Index: " + currentUv);*/

//=================DAY ONE===================

//let dayOneTemp = Math.round(fiveDays[0].temp.day);
//let dayOneHumidity = Math.round(fiveDays[0].humidity);
//tomorrow.text("Temperature: " + dayOneTemp + "°F" + " " + "Humidity: " + dayOneHumidity + "%");
//let dayOneTempDiv = $('<div>');
//dayOneTempDiv.text(dayOneTemp);
//fiveDayContainer.append("Temperature: " + dayOneTemp + "°F" );
//add humidity
//console.log(fiveDays[0].humidity);

/*let dayOneHumidityDiv = $('<div>');
dayOneHumidityDiv.text(dayOneHumidity);
fiveDayContainer.append("Humidity: " + dayOneHumidity + "%");




















//======================DAY TWO=================================
let dayTwoTemp = Math.round(fiveDays[1].temp.day);
let dayTwoTempDiv = $('<div>');
dayTwoTempDiv.text(dayTwoTemp);
fiveDayContainer.append("Temperature: " + dayTwoTemp + "°F" );
//add humidity
let dayTwoHumidity = Math.round(fiveDays[1].humidity);
let dayTwoHumidityDiv = $('<div>');
dayTwoHumidityDiv.text(dayTwoHumidity);
fiveDayContainer.append("Humidity: " + dayTwoHumidity + "%");
//============================================

//==================DAY THREE====================
let dayThreeTemp = Math.round(fiveDays[2].temp.day);
let dayThreeTempDiv = $('<div>');
dayThreeTempDiv.text(dayThreeTemp);
fiveDayContainer.append("Temperature: " + dayThreeTemp + "°F" );
//add humidity
let dayThreeHumidity = Math.round(fiveDays[2].humidity);
let dayThreeHumidityDiv = $('<div>');
dayThreeHumidityDiv.text(dayThreeHumidity);
fiveDayContainer.append("Humidity: " + dayThreeHumidity + "%");
//=====================================

//===================DAY FOUR================
let dayFourTemp = Math.round(fiveDays[3].temp.day);
let dayFourTempDiv = $('<div>');
dayFourTempDiv.text(dayFourTemp);
fiveDayContainer.append("Temperature: " + dayFourTemp + "°F" );
//add humidity
let dayFourHumidity = Math.round(fiveDays[3].humidity);
let dayFourHumidityDiv = $('<div>');
dayFourHumidityDiv.text(dayFourHumidity);
fiveDayContainer.append("Humidity: " + dayFourHumidity + "%");

//======================DAY FIVE=====================
let dayFiveTemp = Math.round(fiveDays[4].temp.day);
let dayFiveTempDiv = $('<div>');
dayFiveTempDiv.text(dayFiveTemp);
fiveDayContainer.append("Temperature: " + dayFiveTemp + "°F" );
//add humidity
let dayFiveHumidity = Math.round(fiveDays[4].humidity);
let dayFiveHumidityDiv = $('<div>');
dayFiveHumidityDiv.text(dayFiveHumidity);
fiveDayContainer.append("Humidity: " + dayFiveHumidity + "%");*/










//console.log(dayOneTemp);


//let dayOneHumidity = fiveDays[0].humidity;
//let dayOneUvi = fiveDays[0].uvi;

//fiveDays.forEach(day => {
  //console.log(day);
  //console.log(day.temp.day);
  //let forecastedTemperature = Math.round(day.temp.day);
  //let newDayArray = [];
  //newDayArray.push(forecastedTemperature);
  //console.log(newDayArray);
  //let newDay = $('<div>');
 // newDay.text(forecastedTemperature);
  //fiveDayContainer.append(newDay)
  
  //day += temp;
 //console.log(day.daily.temp);
//})
//let forecastedTemperature = Math.round(fiveDays.temp.day);
//let newDayArray = [];
//newDayArray.push(forecastedTemperature);
//console.log(newDayArray);

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



}





cityFormEl.on("submit", formSubmitHandler);

//==========================================================TEST  CODE=================================

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

//================================================TEST CODE================================================
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

//===============================================END OF TEST CODE====================================