var async = require('async'),
  request = require('request');

module.exports = {
// Makes a request to the OMDBapi to get JSON object about a movie specified
  OMDBapi: function (title, callback) {
     // if the arguement is not an array format, throw an error
    if (Array.isArray(title) !== true) {
      callback('Make sure the arguement is in Array format.');
     } else {
      var list = { }
      title.map(function (movie) {
        // make a request to the array
        request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function (err, res, body) {
          if (err) {
            callback(err);
          } else {
            list[JSON.parse(body).Title] = JSON.parse(body).Year
          }
          if (Object.keys(list).length == title.length) {
            return callback(null, list);
          }
        });
      });
    }
  }
}


