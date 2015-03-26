var expect = require('chai').expect,
  q = require('q'),
  exec = require('child_process').exec,
  csv = require('ya-csv'),
  fs = require('fs'),
  search = require('../lib/search.js');

describe('Movie Search CLI', function(){
  it('Organize the Movies by Date released', function(done){
    /**
      I had to repeat code snippets because there was an issue
      with exec and using various movies out of an array to request the API.
      Refactoring is always good but I figured the most important thing first is 
      making sure the test works. 
      In the future, the test will be refactored.
    */
    this.timeout(0);
    q.fcall(function () {
      var deferred = q.defer();
      // excute the cli 
      var movieReleaseDate = exec(process.cwd() + '/lib/search.js -t the-matrix');
      // if there is an error, resolve gracefullly
      movieReleaseDate.on('error', function (err) {
        return deferred.reject(err);
      });
      movieReleaseDate.on('close', function () {
        return deferred.resolve();
      });
      return deferred.promise;
    }).then(function () {
      var deferred = q.defer();

      var movieReleaseDate = exec(process.cwd() + '/lib/search.js -t titanic');

      movieReleaseDate.on('error', function (err) {

        return deferred.reject(err);
      });
      movieReleaseDate.on('close', function () {
        return deferred.resolve();
      });
      return deferred.promise; 
    }).then(function () {
      var deferred = q.defer();

      var movieReleaseDate = exec(process.cwd() + '/lib/search.js -t few-good-men');

      movieReleaseDate.on('error', function (err) {

        return deferred.reject(err);
      });
      movieReleaseDate.on('close', function () {
        return deferred.resolve();
      });
      return deferred.promise; 
    }).then(function () {
       var dateList = [];
       var filereader = csv.createCsvFileReader('sortedMovies.csv', { });
       filereader.addListener('data', function(data) {
          for (var i = 0; i < data.length; i = i+2 ) {
            dateList.push(data[i+1]);
          }  
        var smallest = 0;
        dateList.forEach(function (date) {
          if (smallest < date ) {
            smallest = date;
          } else {
            throw new Error('The Dates are not organized in descending order.');
          }
        });
      });
    }).then(function () {
        q.nfcall(fs.unlink, process.cwd() + '/sortedMovies.csv');
        q.nfcall(fs.unlink, process.cwd() + '/ListOfMovies.csv');
        done();
    });
  });
  it('Throws an error if the movie isnt found', function (done) {
    this.timeout(0);
    // excute the cli 
    exec(process.cwd() + '/lib/search.js -t the-robeltedddd -v true', function (err, stdout, stderr) {
      expect(stdout).to.equal('Movie not found!\n');
      done();
    });
  });
});
