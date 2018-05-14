require("dotenv").config();
var keys = require("./keys.js");
//var client = new Twitter(keys.twitter);
var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});
//var Spotify = new Spotify(keys.spotify);
var spotify = new Spotify({
    id: "127bbbae39c14af59b7b4e531bd59928",
    secret:"4c96afb5af154934b8cfd19f9fea1c44"
  });
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

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
   // case "movie-this":
    //getMovie();
    //break;
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
    client.get("statuses/user/timeline", prameters, function(error, tweets, responses) {
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
