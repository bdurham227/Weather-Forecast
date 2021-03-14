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
searchFormEl.addEventListener('submit', handleSearchFormSubmit);*/

var formSubmitHandler = function (event) {
  event.preventDefualt();

  var city = searchInputEl.value.trim();

  if (city) {
    getWeatherReport(city);

    recentContainerEl.textContent = '';
    searchInputEl.value = '';
  } else {
    alert('Please enter a City Name');
  }
}

var buttonClickHandler = function (event) {
  var element = event.target;
  console.log(element);

  if (element) {
    getWeatherReport(element);

    recentContainerEl.textContent = '';
  }
};





var getWeatherReport = function (city) {
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=166a433c57516f51dfab1f7edaed8413`;
  
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
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        
      });
  };
  

  getWeatherReport();


var getCurrentWeather = function (city) {
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=166a433c57516f51dfab1f7edaed8413`;
fetch(apiUrl)
.then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayCurrentWeather(data, current);
    });
  } else {
    alert("Error: " + response.statusText);
  }
})
.catch(function (error) {
  alert('unable to connect to OpenWeatherAPI');
});
}

var displayCurrentWeather = function (city, current) {


}




















function oneCallAPI(lat, lon){
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=166a433c57516f51dfab1f7edaed8413`

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
            })
        }
    })

}

searchFormEl.addEventListener('submit', formSubmitHandler);