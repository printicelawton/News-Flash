var news = document.getElementById("top-flash");
var categoryChoice = document.getElementById("category");
var index = Math.floor(Math.random() * 50);  
var categoryValue = localStorage.getItem("categoryValueStorage");


// if user selected category is present in local storage, gets news with parameter from local storage
if(categoryValue) {
  getNews()
}

// API call to newscatcher, includes user selected news category value
function getNews() {
  fetch(
    "https://newscatcher.p.rapidapi.com/v1/search_free?q=" +
      categoryValue +
      "&lang=en&media=True",
    {
      method: "GET",
      headers: {

        //   three api keys are available incase call limit is exceeded
        "x-rapidapi-key": "3a9751746bmsh9d6faa02ca1deccp1c1053jsnbe743b8f565e",
        // "x-rapidapi-key": "3d1d938386mshb2c35f5f3d5524ep18467ejsn3601f760f204",
        // "x-rapidapi-key": "4e65fa5d1fmshf86108e25761865p159b69jsn4aa46650c5be",
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      },
    }
  )

//API Call to Where is ISS 
//Fetch API using Asnyc/Wait method
const api_ISS_Url = 'https://api.wheretheiss.at/v1/satellites/25544'

async function getISS () {
const response = await fetch(api_ISS_Url);
const data = await response.json ();
const { latitude, longitude } = data;
//console.log(data);
//console.log(data.longitude)

//Building map using leaflet js library 
//from openstreet maps... requires attribution 
const mymap = L.map('issMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright".OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
const tiles = L.tileLayer(tileUrl, { attribution }); tiles.addTo(mymap);    


//Accessing leaflet library for the marker... may change to a sattelite icon later
L.marker([latitude,longitude]).addTo(mymap);

//getting the page to load with the map centered
mymap.setView([latitude,longitude], 2.5);
document.getElementById('lat').textContent = latitude;
document.getElementById('long').textContent = longitude;



}

getISS();



//   presents data from API call to page
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      
      topFlashHeadline.innerHTML = response.articles[index].title;
      topFlashSource.innerHTML = response.articles[index].clean_url;
      topFlashAbstract.innerHTML = response.articles[index].summary;

      // presents image from api response, if image is present.  otherwise, a "now image" icon appears   
      if (response.articles[index].media) {
        topFlashPhoto.setAttribute("src", response.articles[index].media);
      }

      // Adds click function to card to open story in new window  
      topFlash.addEventListener("click", function(){
          window.open(response.articles[index].link, "_blank")
      })  
    })
    .catch((err) => {
      console.error(err);
    });

    // presents stock widget when news category is business, economics or finance
    var stockWidgetStatus = document.getElementById("tradingWidget")
    if (categoryValue === "business" || categoryValue === "economics" || categoryValue ==="finance")
    {stockWidgetStatus.style.display = "block"} 
    else {stockWidgetStatus.style.display = "none"};

    // presents weather widget when news category is travel
    var weatherStatus = document.getElementById("weatherAPI")
    if (categoryValue === "travel")
    {weatherStatus.style.display = "block"} 
    else {weatherStatus.style.display = "none"};
}

// sets news category value from user selection in dropdown menu on click
$("#submit").click(function (event) {
    categoryValue =
    (categoryChoice.options[categoryChoice.selectedIndex].value);
  localStorage.setItem("categoryValueStorage", categoryValue);
  getNews();
  event.preventDefault();
  $("section").show();
  $("main").hide();
  $(".card").attr("style", "border: #4a4a4a solid .25em; width: border-box; cursor: pointer;");
});

// reloads page with a news story when show new story is clicked
$("#refresh").click(function () {
  location.reload()
}); 


// displays current date with clock
setInterval(function(){
  var date = moment().format('MMMM Do YYYY, h:mm a');
  showCurrentDay.textContent = date;
});



// provides weather for display when travel category is selected
// current weather variables
var currentTemp;
var currentHumid;
var currentWind;
var currentUv;
var location;

// geolocation variables
var geoLat;
var geoLng;

var searchBtn = $("#searchBtn");

// pulls last selected city from local storage on page load and displays data for last selected city
selectedCityLs = localStorage.getItem("searchedCity");

if (selectedCityLs) {
selectedCity = selectedCityLs; 
showCity.textContent = selectedCity;
getWeather();
}

// sets user input to var selectedCity, displays selected city, creates search history ul runs getWeather function
searchBtn.on('click', function () {
  selectedCity = $("#citySearch").val();

  // searchValues.push(selectedCity)
  showCity.textContent = selectedCity;

  // adds search values to display, adds click function to push clicked item to selectedCity  
  var ul = document.createElement("ul");
  ul.textContent = selectedCity;
  ul.addEventListener('click', function() {
    showCity.textContent = ul.textContent,
    selectedCity = showCity.textContent,
    getWeather();
  });
  localStorage.setItem("searchedCity", ul.textContent);
  getWeather();
}); 


function getWeather() {
  // converts selectedCity into lat and long coordinates
  var geocodeUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + selectedCity + "&key=2098cd8a74444263890876ca7ea94a84"
  fetch(geocodeUrl) 
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoLat = data.results[0].geometry.lat.toFixed(6);
    geoLng = data.results[0].geometry.lng.toFixed(6);
    
    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + geoLat + "&lon=" + geoLng + "&appid=802248b8a798a6e1e59be31a4560e2ec";
    
   fetch(oneCallUrl) 
   .then(function (response) {
     return response.json();
   })
   .then(function (data) {
       //  sets variables for current weather data 
    currentTemp = data.current.temp.toFixed(0);
    currentHumid = data.current.humidity;
    currentWind = data.current.wind_speed.toFixed(0);
    currentIcon = data.current.weather[0].icon;
    currentUv = data.current.uvi.toFixed(1)
    
    //displays current weather data 
    showCurrentTemp.textContent = "Temperature: " + currentTemp + "°F" ;
    showCurrentHumid.textContent = "Humidity: " + currentHumid + "%";
    showCurrentWind.textContent = "Wind Speed: " + currentWind + "mph";
    showCurrentUv.textContent= "UV Index " + currentUv;

   // displays current weather icon 
   var iconImg = "http://openweathermap.org/img/wn/" + currentIcon + ".png"
   showCurrentIcon.setAttribute('src', iconImg);
    
      //  determines uv index display background color
    if (currentUv < 3) {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: rgb(37, 200, 37)");
    } else if (currentUv < 6) {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: yellow");
    } else {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: red");
    };
   });
  });
};




  





