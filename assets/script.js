

var submitBtn = document.getElementById("submit");


var nyTimesAPIKey = "VqGXtQf3PtyfZrtXwxjc54VEnZhc9QnR"
var newsAPIKey = "850cb5d6549542ee848e80d5d1910b21"

// window.addEventListener("load", function(event) {
//     event.preventDefault();
//     console.log("page is fully loaded");
//     nyTimesTopStoriesAPI();
// ;


var checkBox = $("input[name='category']");
    var categoryValue = '';
    $('input').on('click', function() {
    
    if (checkBox.is(':checked')) {
      $("input[name='category']:checked").each ( function() {
        categoryValue= $(this).val();
        // categoryValue = categoryValue.slice(0, -1);
 	  });
       
       console.log( $(this).val() ); // return all values of checkboxes checked
    //    console.log(chkId); // return value of checkbox checked
    }     
  });



function nyTimesTopStoriesAPI() {

    
    // var categoryValue = document.querySelectorAll(".category").checked;
    

    // const categoryCheckbox = document.querySelectorAll("input[name=category]:checked");
    // const categoryValue = categoryCheckbox.value;
    
    // console.log(categoryValue);
    
    // categoryChoice.options[categoryChoice.selectedIndex].value;

    var requestTopStories = "https://api.nytimes.com/svc/topstories/v2/" + categoryValue + ".json?api-key=" + nyTimesAPIKey;


    // console.log(categoryChoice.options[categoryChoice.selectedIndex].value);

    fetch(requestTopStories)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}



function newscatcherAPI() { 
    fetch("https://newscatcher.p.rapidapi.com/v1/search_free?q=" + categoryValue + "&lang=en&media=True", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4e65fa5d1fmshf86108e25761865p159b69jsn4aa46650c5be",
		"x-rapidapi-host": "newscatcher.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

}


submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    // nyTimesTopStoriesAPI();
    newscatcherAPI();
    console.log("ive been clicked 1");
    // window.location = "newspage.html"
})