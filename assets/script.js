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
        // "x-rapidapi-key": "3a9751746bmsh9d6faa02ca1deccp1c1053jsnbe743b8f565e",
        // "x-rapidapi-key": "3d1d938386mshb2c35f5f3d5524ep18467ejsn3601f760f204",
        "x-rapidapi-key": "4e65fa5d1fmshf86108e25761865p159b69jsn4aa46650c5be",
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      },
    }
  )

//   presents data from API call to page
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      topFlashPhoto.setAttribute("src", response.articles[index].media);
      topFlashHeadline.innerHTML = response.articles[index].title;
      topFlashSource.innerHTML = response.articles[index].clean_url;
      topFlashAbstract.innerHTML = response.articles[index].summary;
    // Adds click function to card to open story in new window  
      
      topFlash.addEventListener("click", function(){
          window.open(response.articles[index].link, "_blank")
      })  
    })
    .catch((err) => {
      console.error(err);
    });

    var stockWidgetStatus = document.getElementById("tradingWidget")
    if (categoryValue === "business" || categoryValue === "economics" || categoryValue ==="finance")
    {stockWidgetStatus.style.display = "block"} 
    else {stockWidgetStatus.style.display = "none"};
   
    
}
//ISS API Begins 

const mymap = L.map('issMap').setView([0, 0], 1);

        from openstreet maps... required attribution 
        const attribution = 
        '&copy; <a href="https://www.openstreetmap.org/copyright".OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);    

        Fetch API using Asnyc/Wait method
        const api_ISS_Url = 'https://api.wheretheiss.at/v1/satellites/25544'
        
        async function getISS () {
        const response = await fetch(api_ISS_Url);
        const data = await response.json ();
        const { latitude, longitude } = data;

        console.log(data);
        console.log(data.longitude)

        making it display window??
        L.marker([latitude,longitude]).addTo(mymap);
        getting the page to load with the map centered
        mymap.setView([latitude,longitude], 2.5);
        document.getElementById('lat').textContent = latitude;
        document.getElementById('long').textContent = longitude;

        
   
  
}

//getISS();

//Set ISS Map to only show when Science or Technology is selected 
var issLocatorStatus = document.getElementById("issMap")
   if (categoryValue === "science" || categoryValue === "technology" || categoryValue ==="beauty")
    {issLocatorStatus.style.display = "block"} 
    else {issLocatorStatus.style.display = "none"};


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

$("#refresh").click(function () {
  location.reload()
}); 


// displays current date with clock
setInterval(function(){
  var date = moment().format('MMMM Do YYYY, h:mm:ss a');
  showCurrentDay.textContent = date;
});


  





