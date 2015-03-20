var assert = require("assert"),
  index = require('../index.js');

describe('Movie Search CLI', function(){
  it('should return -1 when the value is not present', function(done){
    var stuff = index.MoviesReleaseDate('Titanic')
    done
  })
})
