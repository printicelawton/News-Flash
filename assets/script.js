
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
}

submitBtn.addEventListener("click", function() {
    event.preventDefault();
    nyTimesTopStoriesAPI();
    console.log("ive been clicked 1");
})