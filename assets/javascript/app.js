// let queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=a3f03ecf";

// $.ajax({
//     url: queryUrl,
//     method: "GET",
// })

let movieArray = []

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&region=US&language=en-US&api_key=48c01894d7887ea8ffef8f22cfac1d98",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);

    for (i=0; i<response.results.length; i++){

        let movieObject = response.results[i];
        console.log(movieObject)

        movieArray.push(movieObject);
        // console.log(movieArray)

    }

    console.log(movieArray)
  })