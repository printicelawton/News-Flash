var news = document.getElementById("top-flash");
var categoryChoice = document.getElementById("category");

var index = 0;

function newscatcherAPI() {
  var categoryValue =
    categoryChoice.options[categoryChoice.selectedIndex].value;
    console.log(categoryChoice.options[categoryChoice.selectedIndex].value);
  fetch(
    "https://newscatcher.p.rapidapi.com/v1/search_free?q=" +
      categoryValue +
      "&lang=en&media=True",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4e65fa5d1fmshf86108e25761865p159b69jsn4aa46650c5be",
        "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      topFlashPhoto.setAttribute("src", response.articles[index].media);
      topFlashHeadline.innerHTML = response.articles[index].title;
      topFlashSource.innerHTML = response.articles[index].clean_url;
      topFlashAbstract.innerHTML = response.articles[index].summary;
    })
    .catch((err) => {
      console.error(err);
    });
}

$("#submit").click(function (event) {
  console.log("ive been clicked 1");
  event.preventDefault();
  $("section").show();
  $("main").hide();
  // call the function to load the stories
  newscatcherAPI();
  index++;
});

// submitBtn.addEventListener('click', function (event) {
//   event.preventDefault();
//   $('section').show();
//   $('main').hide();
//   // nyTimesTopStoriesAPI();
//   newscatcherAPI();
//   console.log('ive been clicked 1');
//   // window.location = "newspage.html"
// });
