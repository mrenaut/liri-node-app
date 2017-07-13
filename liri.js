

//global variables and keys
var keys = require("./keys.js");
var fs = require("fs");
var twitter = require("twitter");
var request = require("request");
var spotify = require("spotify");
'use strict';
var inquirer = require("inquirer");
var nodeArgs = process.argv;
var userCommand = process.argv[2];
var userInput = "";

for (var i=3; i<nodeArgs.length; i++){
	userInput = userInput + " " + nodeArgs[i];
}

// switch case to control which function happens based on what command is entered
switch (userCommand) {

		// command my-tweets, causes my tweets function to run
	case 'my-tweets':
		myTweets(userInput);
		break;

		// command my-tweets, causes my tweets function to run
	case 'spotify-this-song':
		mySpotify(userInput);
		break;

		// command my-tweets, causes my tweets function to run
	case 'movie-this':
		movieThis(userInput);
		break;

		// command my-tweets, causes my tweets function to run
	case 'do-what-it-says':
		doWhatItSays(userInput);
		break;

		// default response when command is not valid
	default:
		console.log("Invalid Command");

		// end switch case
			}

//my tweets function that will pull the last 20 tweets from user entered and display
function myTweets () {		
	
	
	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	
	//error message if user does not enter a twitter user
	if (userInput == 0){
		console.log("Please input twitter account");
	} 
	
	var params = {screen_name: 'lirischoolproj1', count: 20};
	
	client.get('statuses/user_timeline', params	, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
			}
		}
	});
	//keep tgetting twitter not defined errors, not sure where everyone is getting the client.get part, i've looked on the npmjs.com and the github for the examples for twitter npm and can't find the same thing everyone else is.
	//console.log(JSON.stringify(result, null, 2));
	
}
		
//spotify
//=========================================================================================	
function mySpotify () {

	//needs to access song information then display it
	
	song = userInput;
	
spotify.search({ type: 'track', query: song, limit: 5}, function(err, data) {
	//if there is an error console log it
	if (err) {
		return console.log('Error occurred: ' + err);
	}
	//for look to generate 5 results
	console.log(data);
	
	//getting{ error:  status: 401, message: 'No token provided'  
	
	});
}

//Needs to use key to get data based on user input and display returned data in console.
////
////	Artist(s)
////
////	The song's name
////
////	A preview link of the song from Spotify
////
////	The album that the song is from
////
////	If no song is provided then your program will default to "The Sign" by Ace of Base.

//omdb
//=========================================================================================

//function that makes a request for movie information then displays it.
function movieThis () {
	
	// Then run a request to the OMDB API with the movie specified
	request ("http://www.omdbapi.com/?t=" + userInput + '&apikey=40e9cece&tomatoes=true', function(error, response, body) {

		if (error) {
			console.log('error:', error);
		} else {
			//made into object for testing purposes and displayed
			var movieObject = JSON.parse(body);
			
			console.log(JSON.parse(body).Title);

			console.log("Year: " + JSON.parse(body).Year);

			console.log("Rating: " + JSON.parse(body).imdbRating);

			console.log("Rotten Tomatoes score: " + JSON.parse(body).Ratings[1].Value);

			console.log("Produced: " + JSON.parse(body).Country)

			console.log("Language: " + JSON.parse(body).Language);

			console.log("Plot: " + JSON.parse(body).Plot);

			console.log("Staring: " + JSON.parse(body).Actors);
		}
	});	
}
		
//do what it says
//=========================================================================================	

//function doWhatItSays () {
//	
////	Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
////
////	It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
////
////	Feel free to change the text in that document to test out the feature for other commands.
//
