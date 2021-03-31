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
});
// displays current date with clock
setInterval(function(){
  var date = moment().format('MMMM Do YYYY, h:mm:ss a');
  showCurrentDay.textContent = date;
});




