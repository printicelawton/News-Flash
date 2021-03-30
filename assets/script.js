$(document).ready(function() {
    console.log("ready!");
   
var news = document.getElementById("top-flash")
var categoryChoice = document.getElementById("category");
var submitBtn = document.getElementById("submit");

var nyTimesAPIKey = "VqGXtQf3PtyfZrtXwxjc54VEnZhc9QnR"


// function nyTimesTopStoriesAPI() {
//     var categoryValue = categoryChoice.options[categoryChoice.selectedIndex].value;
//     var requestTopStories = "https://api.nytimes.com/svc/topstories/v2/" + categoryValue + ".json?api-key=" + nyTimesAPIKey;
//     console.log(categoryChoice.options[categoryChoice.selectedIndex].value);

//     fetch(requestTopStories)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//             const topFlashHeading = document.getElementById("top-flash-heading");
//             topFlashHeading.innerHTML = "Top Flash";

//             const newsPhoto = document.getElementById("top-flash-photo");
//             newsPhoto.setAttribute("src",data.results[0].multimedia[0].url);
//             news.append(newsPhoto);

//             var topFlash = document.getElementById("top-flash");
//             topFlash.addEventListener("click", function() {
//                 window.open(data.results[0].url,'_blank');
//             })

//             const newsHeadline = document.getElementById("top-flash-headline");
//             newsHeadline.innerHTML = data.results[0].title;
//             news.append(newsHeadline);

//             const newsByline = document.getElementById("top-flash-byline");
//             newsByline.innerHTML = data.results[0].byline;
//             news.append(newsByline);

//             const newsAbstract = document.getElementById("top-flash-abstract");
//             newsAbstract.innerHTML = data.results[0].abstract;
//             news.append(newsAbstract);

//             const newsSource = document.getElementById("top-flash-source");
//             newsSource.innerHTML = data.copyright;
//             news.append(newsSource);

//             // var continueReadingBtn = document.createElement("BUTTON");
//             // continueReadingBtn.innerHTML = "Continue Reading";
//             // continueReadingBtn.setAttribute("class", "btn btn-danger");
//             // news.appendChild(continueReadingBtn);

//             // continueReadingBtn.addEventListener("click", function() {
//             //     window.open(data.results[0].url,'_blank');
//             // })

        
//     })
// }






function newscatcherAPI() { 
    
    var categoryValue = categoryChoice.options[categoryChoice.selectedIndex].value;
    var requestTopStories = "https://api.nytimes.com/svc/topstories/v2/" + categoryValue + ".json?api-key=" + nyTimesAPIKey;
    console.log(categoryChoice.options[categoryChoice.selectedIndex].value);

    fetch("https://newscatcher.p.rapidapi.com/v1/search_free?q=" + categoryValue + "&lang=en&media=True", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4e65fa5d1fmshf86108e25761865p159b69jsn4aa46650c5be",
		"x-rapidapi-host": "newscatcher.p.rapidapi.com"
	}
    })
    .then(response => {
        console.log(response);
        const newsPhoto = document.getElementById("top-flash-photo");
            // newsPhoto.setAttribute("src","https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6043c031ed524624344af474%2F0x0.jpg%3FcropX1%3D0%26cropX2%3D1955%26cropY1%3D912%26cropY2%3D2013");
            newsPhoto.setAttribute("src", response.articles[0].media);
            
            
            news.append(newsPhoto);
    })
    .catch(err => {
        console.error(err);
    });
}


submitBtn.addEventListener("click", function() {
    event.preventDefault();
    // nyTimesTopStoriesAPI();
    newscatcherAPI();
    console.log("ive been clicked");
})


});


   






        



