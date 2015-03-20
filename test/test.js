var assert = require("assert"),
  index = require('../index.js');

describe('Movie Search CLI', function(){
  it('should return -1 when the value is not present', function(done){
    var MoviesList = [
    'The-Matrix',
    'titanic',
    'The-Godfather',
    'few-good-men'
    ];
    MoviesList.forEach(function (movie) {
      index.MoviesReleaseDate(movie, function(err, res) {
        if (err) {
          throw err
        } else {
          done()
        }
      })
    })
  })
})
