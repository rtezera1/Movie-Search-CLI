#!/usr/bin/env node

var async = require('async'),
  request = require('request'),
  fs = require('fs-extra'),
  csv = require('ya-csv'),
  movieTitle;

var argv = require('yargs')
    .usage('-t [Title of Movie] Ex. Titanic or The-Matrix')
    .alias('t', 'Movie Title')
    .argv;

// Makes a request to the OMDBapi to get JSON object about a movie specified
function OMDBapiRequest (callback) {
  request('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&r=json', function (err, res) {
    if (err) {
      callback(err)
    } else {
      console.log('dlkfjd')
      var MovieParsed = JSON.parse(res.body);
      callback(null, MovieParsed)
    }
  })
}; 
// Parse the data and write it to a CSV file
function ParseMovieData (MovieParsed, callback) {
  if(MovieParsed.Response == 'False') {
    // If the movie isn't found. Throw an error
    callback(MovieParsed.Error)
  } else {
    var Title = MovieParsed.Title,
      Year = MovieParsed.Year,
    // Organize it in array format to make it easy to write to a CSV file
      TitleAndYear = [ Title,Year];
      // Using the 'ya-csv' module to write to a file
    var fileWriter = csv.createCsvFileWriter('ListOfMovies.csv', {'flags': 'a'});
      fileWriter.writeRecord(TitleAndYear);
      callback()
  }
};
// Sort the Data based on the year released
function SortMovies (callback) {
  var toBeSorted = [];
    // Read the list of movies csv file
   var filereader = csv.createCsvFileReader('ListOfMovies.csv', { });
      // Sort the movie based on the year released
      filereader.addListener('data', function(data) {
          toBeSorted.push(data)
          toBeSorted.sort(function (array1, array2) {
            return array1[1] - array2[1]
          });
        callback(null, toBeSorted)
      });    
};
// Write the organized (by year released) list to a CSV file 
function writeBacktoCSV (toBeSorted, callback) {
  var fileWriter = csv.createCsvFileWriter('sortedMovies.csv');
  toBeSorted.forEach(function (data) { 
   fileWriter.writeRecord(data);
   callback()
  })
};

/**
This is where the excution starts:
Go to the sortedMovies.csv to see the sorted movies
*/
function MoviesReleaseDate (title, next)  {
  movieTitle = argv.t || title; 
  async.waterfall([
    OMDBapiRequest,
    ParseMovieData,
    SortMovies,
    writeBacktoCSV 
    ], function (err, res) {
      if (err) {
        next(err)
      } else {
        next()
      }
    }
  )
}

if (argv.t !== null) { 
  MoviesReleaseDate(movieTitle, function (err, res) {
    if (err) {
      console.log('ERR', err)
    } else {
      console.log('DONE')
    }
  })
} 

module.exports = {
  MoviesReleaseDate: MoviesReleaseDate
}
  

