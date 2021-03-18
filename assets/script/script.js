/*var searchFormEl = document.querySelector('#weather-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

var searchInputVal = document.querySelector('#search-input');


if (!searchInputVal) {
  alert("Please enter a city in America to search for!");
  return;
}

var queryString = './weather-results.html?q=' + searchInputVal;

location.assign(queryString);
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
*/


//=======================================================================================================
/*
var searchFormEl = document.querySelector('#weather-form');
var searchInputEl = document.querySelector("#search-input");
var recentContainerEl = document.querySelector('#recent-container');
var recentSearchCity = document.querySelector("#recent-search-city");

/*function handleSearchFormSubmit(event) {
  event.preventDefault();

var searchInputVal = document.querySelector('#search-input');


if (!searchInputVal) {
  alert("Please enter a city in America to search for!");
  return;
}

var queryString = './weather-results.html?q=' + searchInputVal;

location.assign(queryString);
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

var formSubmitHandler = function (event) {
  event.preventDefualt();

  var city = searchInputEl.value.trim();

  if (city) {
    getWeatherReport(city);

    searchContainerEl.textContent = '';
    searchInputEl.value = '';
  } else {
    alert('Please enter a City Name');
  }
}

/*var buttonClickHandler = function (event) {
  var element = event.target;
  element.textContent = searchInputEl;
  console.log(element);

  if (element) {
    getWeatherReport(element);
    console.log(element);

    recentContainerEl.textContent = '';
  }
};





var getWeatherReport = function (city) {
    //var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`;
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            //data is the data from the repos and username
            console.log(data)
            console.log(data.coord.lat);
            console.log(data.coord.lon)
            oneCallAPI(data.coord.lat, data.coord.lon)
          });
        } else {
          alert('bigbadError: ' + response.statusText);
        }
      })
      .catch(function (error) {
        
      });
      
  };
  

  getWeatherReport("tampa");
  //getWeatherReport();
  


var getCurrentWeather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`;
fetch(apiUrl)
.then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      displayCurrentWeather(data, current);
    });
  } else {
    alert("BigError: " + response.statusText);
  }
})
.catch(function (error) {
  alert('unable to connect to OpenWeatherAPI');
});
}


var displayCurrentWeather = function (recent, searchCity) {


}




function oneCallAPI(lat, lon){
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=23dd7d8d5c92cd7c1c479c510aaf11d3`
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

searchFormEl.addEventListener('submit', formSubmitHandler);*/