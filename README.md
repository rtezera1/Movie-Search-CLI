## Movie Search Module and CLI

[![Build Status](https://travis-ci.org/rtezera1/movie-search-cli.svg?branch=master)](https://travis-ci.org/rtezera1/movie-search-cli)

[![Coverage Status](https://coveralls.io/repos/rtezera1/movie-search-cli/badge.svg)](https://coveralls.io/r/rtezera1/movie-search-cli)

#### Instructions

To get started: 
 
    npm insall 

#### Test

Using mocha to test:

    mocha test


### Using it as a Module

```javascript
  var search = require('Movie-Search-CLI');

  Ex:
    var title = [
      'the-matrix',
      'titanic',
      'training-day'
    ];

    search.OMDBapi(title, function (err, res) {
      console.log(err);
      console.log(res);
    })
```

You can use the CLI to search a movie and find out the year it was released. As you keep searching, it organizes the searched moves
according to it's release date descending. 
To operate:

    ./lib/search.js -t Titanic 

It will create sortedMovies.csv file, where you will see the Title of the movie and the date it was released




  

