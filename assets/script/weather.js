var cities = [];

var cityFormEl = $('#city-search-form');
let cityInputEl = $('input[name="search-input"]');

let city = cityInputEl.val();
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


//let day1 = $('#day1');
//let day2 = $('#day1');
//let day3 = $('#day2');
//et day4 = $('#day3');
//let day5 = $('#day4');

//document ready function on page load
$('document').ready(function () {

 // function that makes buttons dynamically and assigns city text and value

  const makeButtons = (city) => {

    let button1 = $('<button>');
    button1.text(city);
    pastSearchEl.append(button1);
    button1.on("click", function () {
       let buttonCity = $(this).text()
       console.log($(this));
       getCityWeather(buttonCity);
    })
  }
 



//check local storage- if nothing is in local storage make an empty array

  let heyImFromLocalStorage = localStorage.getItem("cities");
  heyImFromLocalStorage = JSON.parse(heyImFromLocalStorage) || [];
  for (var i = 0; i < heyImFromLocalStorage.length; i++) { 
    makeButtons(heyImFromLocalStorage[i]);
  
  }

  //function that locally creates the let variable and sets its value then runs a conditional. Once the conditional is run it will check local storage and set if something was entered

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
  makeButtons(city);
  let heyImFromLocalStorage = localStorage.getItem("cities");
  heyImFromLocalStorage = JSON.parse(heyImFromLocalStorage) || [];
    
    heyImFromLocalStorage.push(city);
     let stringifiedCities = JSON.stringify(heyImFromLocalStorage);
     localStorage.setItem("cities", stringifiedCities);
}



//=====================function that handles and fetches API CALL then calls displayCurrentWeather function==========================
const getCityWeather = (city) => {
  //console.log(city);
  let apiKey = `13a7d99fd01bbf81add0b89d186f1c5f`;
  //var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayCurrentWeather(data, city);
    get5DayCityForecast(data.coord.lat, data.coord.lon);
    
  })
}


//============================Handles getcityWeather API data to display on html========================
const displayCurrentWeather = (data, searchCity) => {
 

//=======WEATHER ICON=======
  let iconCode = data.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    weatherIcon.attr("src", iconUrl);
let cityTemp = Math.round(data.main.temp);
//=================================================================


//======================city name displaying on HTML====================================
currentCityEl.text(searchCity.toUpperCase(0) + " " + rightNow);
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
  display5FiveDay(data);
 


})


}
//=============================Displaying 5 Forecast====================================
const display5FiveDay = (data) => {
  //gets api call weather object for 5 day forecast and slices at first element (0basedindexing) and stops the slice at the 5th element

let fiveDays = data.daily.slice(0,5);

fiveDays.forEach((day,index) => {
  console.log(day);
  
  let heading1 = moment().add(`${index+1}`, 'days').format('l');
  let dayTemp = Math.round(day.temp.day);
  let dayHumidity = day.humidity;
  let iconCode = day.weather[0].icon
  
  let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
 
  $('#weatherIcon1').attr("src", iconUrl)
  let imgTag = $("<img>")
  
  imgTag.attr("src", iconUrl) ;
  
  $(`#day${index+1}`).html("(" + heading1 + ")" + `\n` + `\n` + "Temperature: " + dayTemp + "°F" + `\n` + "Humidity " + dayHumidity + "%")
  $(`#day${index+1}`).append(imgTag);
 
  
})



//===================UV INDEX=========================

let currentUv = Math.round(data.current.uvi);
uvIndex.text("Uv-Index: " + currentUv);


if (currentUv <= 2){
  uvIndex.addClass('favorable')
} else if (currentUv >= 3 && currentUv <= 7) {
  
  uvIndex.removeClass('favorable');
  uvIndex.addClass('moderate');
} else if (currentUv >=8){
  uvIndex.removeClass("favorable");
  uvIndex.removeClass("moderate");
  uvIndex.addClass('severe');
}

}


let clearHistoryButton = $('<button>');
clearHistoryButton.text("Clear History");
pastSearchEl.append(clearHistoryButton);




const removeItem = (event) => {
  localStorage.clear();
  $(event.target).siblings().remove();
  //console.log(event.children());
}







clearHistoryButton.on("click", removeItem);

cityFormEl.on("submit", formSubmitHandler);





})
