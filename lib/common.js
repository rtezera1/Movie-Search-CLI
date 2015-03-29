var request = require('request');

module.exports = {
  // Makes a request to the OMDBapi to get JSON object about a movie specified
  request: function OMDBApiRequest (movieTitle, callback) {
    request('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&r=json', function (err, res) {
      if (err) {
        callback(err);
      } else {
        var movieParsed = JSON.parse(res.body);
        callback(null, movieParsed);
      }
    });
  }
};
