require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var request = require('request');

if (process.argv[2] == 'concert-this' ) {
   
    var performer = process.argv.slice(3).join(" ")
    console.log(performer);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + performer + "/events?app_id="+keys.bandsintown.id;

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);

        var result  =  JSON.parse(body)[0];
        console.log("Venue name: " + result.venue.name);
        console.log("Venue location: " + result.venue.city);
    });
    
} else if ( process.argv[2] == 'spotify-this-song') {
    var songName = process.argv.slice(3).join(" ");

    if (songName == undefined) {
        songName = "The sign by Ace of Base";
    } 
   

     spotify.search({ type: 'track', query: songName, limit: 10  }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

            var songArray = [];

            for (var i = 0; i < data.tracks.items.length; i++ ) {
                var result = {
                    performer : data.tracks.items[i].album.artists[0].name,
                    album_name : data.tracks.items[i].album.name,
                    song_name : data.tracks.items[i].name,
                    preview_url : data.tracks.items[i].preview_url 
                }
                songArray.push(result);
            }
            console.log(songArray);

       
    });



} else if ( process.argv[2] == 'movie-this') {
    var movieName = process.argv.slice(3).join(" ");

    if (movieName == undefined) {
        movieName = "Mr. Nobody";
    } 

    request('http://www.omdbapi.com/?i=tt3896198&apikey=trilogy&t=' + process.argv[3], function (error, response, body) {

      var result  =  JSON.parse(body);
      console.log("Title :" + result.Title);
      console.log("Year :" + result.Released);
      console.log("IMDB Rating :" + result.imdbRating );
      console.log("Rotten Tomatoes :" + result.Ratings[0].Value);
      console.log("Country :" +  result.Country);
      console.log("Language :" + result.Language);
      console.log("Movie Plot :" + result.Plot);
      console.log("Actors :" +  result.Actors);

  });

} else if ( process.argv[2] == 'do-what-it-says') {
  console.log('do what it says')
}