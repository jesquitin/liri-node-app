require("dotenv").config();
var twitter = require("twitter");
var request = require("request");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var client = new twitter(keys.twitter);
var spotify = new spotify(keys.spotify);


//aguments
var actions = process.argv[2];
var argTwo= process.argv[3];
//process multiple words. Triggers if 

//Actions to perform "my-tweets", "spotify-this-song", "movie-this" and "do-what-it-says"

switch(actions) {
    case "my-tweets":
    showTweets();
    break;
    case "spotify-this-song":
    getSong();
    break;
   case "movie-this":
    getMovie();
    break;
    //case "do-what-it-says":
    //getRandom();
    //break;
}

//Get tweet information
function showTweets (){
    var parameters = {
        screenName: "joeesq23",
        count: 20
    };
    client.get("statuses/user/timeline", parameters, function(error, tweets, responses) {
        if(!error){
            for (var i = 0;i < tweets.length; i++){
                var resultData = ("Number: " +(i+1) + "\n" + tweets[i].created_at + "\n" + tweets[i].text + "\n");
                console.log(resultData);
                console.log("---------------------------");
            }
        }
    });
}

//get Spotify songs funciton
function getSong(song) {
    console.log("Spotify function");

    //Search terms
    var searchTrack;
    if(argTwo === undefined){
        searchTrack = "The Sign";
    }else {
        searchTrack = argTwo;
    }
    //Spotify search
    spotify.search({type:"track", query:searchTrack}, function(err, data){
        if (err){
            console.log("Error occured " + err);
            return;
        }else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
        }
    });
}

//Movies
function getMovie(){
	console.log("Where can I see it?Netflix or Hulu!!!");

	//search query
	var searchMovie;
	if(argTwo == null){
        searchMovie = "Mr. Nobody";
        //Console.log("If you have not watched Mr. Nobody" + "\nYou shoud.  It is on Netflix");
	}else{
		searchMovie = argTwo;
	}

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&apikey=trilogy';
   	request(url, function(error, response, body){
           //console.log(body);
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body).Title);
	        console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
	        console.log("Country: " + JSON.parse(body).Country);
	        console.log("Language: " + JSON.parse(body).Language);
	        console.log("Plot: " + JSON.parse(body).Plot);
	        console.log("Actors: " + JSON.parse(body).Actors);
	        
	    }
    });
}
