#!/usr/bin/env node

var async = require('async'),
  request = require('request'),
  fs = require('fs-extra'),
  csv = require('ya-csv'),
  OMDB = require('./common.js'),
  _ = require('underscore');

var argv = require('yargs')
    .usage('-t [Title of Movie] Ex. Titanic or The-Matrix')
    .alias('t', 'Movie Title')
    .boolean('v', 'verbose')
    .default('v', false)
    .argv;

// Parse the data and write it to a CSV file
function ParseMovieData (MovieParsed, callback) {
  if(MovieParsed.Response == 'False') {
    // If the movie isn't found. Throw an error
    callback(MovieParsed.Error);
  } else {
    var Title = MovieParsed.Title,
      Year = MovieParsed.Year,
    // Organize it in array format to make it easy to write to a CSV file
      TitleAndYear = [ Title,Year];
      // Using the 'ya-csv' module to write to a file
    var fileWriter = csv.createCsvFileWriter('ListOfMovies.csv', {'flags': 'a'});
      fileWriter.writeRecord(TitleAndYear);
      callback();
  }
}
// Sort the Data based on the year released
function SortMovies (callback) {
  var toBeSorted = [];
    // Read the list of movies csv file
   var filereader = csv.createCsvFileReader('ListOfMovies.csv', { });
      // Sort the movie based on the year released
      filereader.on('data', function(data) {
          toBeSorted.push(data);
      });
      filereader.on('end', function() {
        toBeSorted.sort(function (array1, array2) {
          return array1[1] - array2[1];
        });
        callback(null, toBeSorted);
      });
}
// Write the organized (by year released) list to a CSV file 
function writeBacktoCSV (toBeSorted, callback) {
  var fileWriter = csv.createCsvFileWriter('sortedMovies.csv');
  toBeSorted.forEach(function (data) { 
   fileWriter.writeRecord(data);
   callback();
  });
}

async.waterfall([
  _.partial(OMDB.request, argv.t),
  ParseMovieData,
  SortMovies,
  writeBacktoCSV 
  ], function (err, res) {
    // if verbose, it has output after every iteration
    if (argv.v !== false) {
      if (err) {
        console.log(err);
      } else {
        console.log('Done.');
      }
    } 
  });



