## Movie Search CLI

#### Instuctions

To get started: 
 
    npm insall 

You can search a movie and find out the year it was released. As you keep searching, it organizes the searched moves
according to it's release date descending. 
To operate:

    ./lib/search.js -t Titanic 

It will create sortedMovies.csv file, where you will see the Title of the movie and the date it was released

#### Test

Using mocha to test:

    mocha test


### Using it as a Module

You can also use it as a module 

``
  Ex:
    var title = [
      'the-matrix',
      'titanic',
      'training-day'
    ];

    Movie-Search-CLI.search.OMDBapi(title, function (err, res) {
      console.log(err);
      console.log(res);
    })
`




  

