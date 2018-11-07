$(document).ready(function () {

    let movieArray = [];

    let scoreArray = [];

    let postersArray = []

    let counter = 0;

    let totalScore = 0;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/discover/movie?primary_release_year=2017&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&region=US&language=en-US&api_key=48c01894d7887ea8ffef8f22cfac1d98",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    getMoviesArrays();
    console.log(scoreArray+"Score Array")


    $("#userInput").children().hide();

    function endScreen() {

        $("#title").text("Finished!");
        $("#poster").hide();
        $("#userInput").hide();
        $("#submitButton").hide();

        let nameField = $("<input>").attr("type", "text").attr("class", "form-control").attr("id", "userTriviaGuess").attr("placeholder", "stuff");
        let nameSubmitBtn = $("<button>").attr("class", "btn btn-primary").attr("id", "nameSubmitBtn");

        $("#userInput").append([nameField, nameSubmitBtn]);
    }

    function gameStart() {



        $(".fluff").hide();
        $("#startButton").hide();
        $("#userInput").children().show();
        $("#title").html(movieArray[counter].original_title + "  " + "<span class='badge badge-secondary' id='score'></span>");
        $("#poster").attr("src", "http://image.tmdb.org/t/p/w185/" + postersArray[counter]);
        $("#score").text(totalScore);


    }

    function userSubmit() {

        let tomatoScoreUnfiletered = scoreArray[counter];
        let tomatoScoreFiltered = tomatoScoreUnfiletered.replace("%", "");
        let tomatoScore = parseInt(tomatoScoreFiltered);
        let userGuessFiltered = $("#userTriviaGuess").val().trim();
        let userGuess = parseInt(userGuessFiltered);
        let questionScore = Math.abs(tomatoScore - userGuess);
        console.log(questionScore+"Question Score");

        totalScore = totalScore + questionScore;


        counter++;
        console.log(counter + "counter");

        gameStart();
    }

    function nextQuestion() {


    }

    $("#startButton").on("click", function (event) {

        gameStart()

    });

    $("#submitButton").on("click", function () {

        if (counter + 1 < movieArray.length) {

            console.log(movieArray.length + "Movie Array Length");
            if ($("#userTriviaGuess").val() === "") {
                $("#userTriviaGuess").val(0);
                userSubmit();
            }

            else {

                userSubmit();
            }
        }

        else {
            endScreen()
        }

    });

    function getMoviesArrays() {

        $.ajax(settings).done(function (response) {
            console.log(response +"Response");

            for (i = 0; i < 10; i++) {

                let movieObject = response.results[i];
                let poster = response.results[i].poster_path;
                let year = movieObject.release_date.slice(0, 4);
                console.log(year);
                let queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=a3f03ecf&t=" + movieObject.original_title + "&y=" + year;

                $.ajax({
                    url: queryUrl,
                    method: "GET",
                }).done(function (scoreResponse) {

                    console.log(scoreResponse+"Score Response");

                    let movieScore = scoreResponse.Ratings[1].Value;

                    if (movieScore == null) {

                        i--;
                    }

                    else {


                        console.log(poster +"Poster");
                        console.log(movieObject+"Movie Object")

                        movieArray.push(movieObject);
                        postersArray.push(poster);
                        console.log(postersArray+"Poseters Array");
                        scoreArray.push(movieScore);
                    }
                })
            }
            console.log(movieArray+"Movie Array");
        })
    }
});