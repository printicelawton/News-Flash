
var categoryChoice = document.getElementById("category");
var submitBtn = document.getElementById("submit");


var nyTimesAPIKey = "VqGXtQf3PtyfZrtXwxjc54VEnZhc9QnR"
var newsAPIKey = "850cb5d6549542ee848e80d5d1910b21"



function nyTimesTopStoriesAPI() {
    var categoryValue = categoryChoice.options[categoryChoice.selectedIndex].value;
    var requestTopStories = "https://api.nytimes.com/svc/topstories/v2/" + categoryValue + ".json?api-key=" + nyTimesAPIKey;
    console.log(categoryChoice.options[categoryChoice.selectedIndex].value);

    fetch(requestTopStories)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

    // Lines 25-38 are attempts at using API data.  The commented out lines don't work.  Let's find out why. JDR 
    // newsImg1 = data.results[0].multimedia[0].url;
    newsImg1 = "https://static01.nyt.com/images/2021/03/25/us/25atlanta/merlin_185529159_9ecc9cfa-7fe2-40c9-8258-c449f6039d0d-superJumbo.jpg"
    console.log(newsImg1);
    showNewsImg1.setAttribute('src', newsImg1);

    // newsHeadline1 = data.results[0].title;
    newsHeadline1 = "A Heavily Armed Man at a Grocery Store Adds to Anxiety in Atlanta"
    console.log(newsHeadline1);
    showNewsHeadline1.textContent = newsHeadline1;

    // newsLink1 = data.results[0].short_url;
    newsLink1 = "https://nyti.ms/39gJA0K";
    console.log(newsLink1);
    showNewsLink1.textContent = newsLink1;
}

submitBtn.addEventListener("click", function() {
    event.preventDefault();
    nyTimesTopStoriesAPI();
    console.log("ive been clicked 1");
})