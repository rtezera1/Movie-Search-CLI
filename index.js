var async = require('async'),
  converter = require('xls-to-json'),
  _ = require('underscore'),
  request = require('request');

// Makes a request to the OMDBapi to get JSON object about a movie specified
  function OMDBapi (title, callback) {
     // if the arguement is not an array format, throw an error
    if (Array.isArray(title) !== true) {
      callback('Make sure the arguement is in Array format.');
     } else {
      var list = { };
        async.map(title, function (movie, cb) {
        // make a request to the array
        request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json', function (err, res, body) {
          if (err) {
            return cb(err);
          } else if (JSON.parse(body).Response == 'False') {
            return cb(JSON.parse(body).Error);
          } else {
            list[JSON.parse(body).Title] = JSON.parse(body).Year;
          }
          return cb(null, list);
        });
      }, callback);
    }
  }
  // Parse excel spreadsheet and request OMDBapi to get JSON object
  function ExceltoOMDB (fileName, callback) {
    var res = [];
    // spreadsheet to json convertor 
    converter({
      input: fileName,
      output: null
    }, function (err, result) {
      if (err) {
        // if err, callback an error
        callback(err);
      } else {
        var values;
        var keys;
        /**
          loop through the values and creates an array to be sent
          to the OMDBapi
        */
        result.forEach(function (value) {
          keys =  _.keys(value);
          values = _.values(value);
          res.push(values);
        });
        res.push(keys[0]);
        var flattened = _.flatten(res);
        OMDBapi(flattened, callback);
      }
    });
  }

module.exports = {
  OMDBapi: OMDBapi,
  ExceltoOMDB: ExceltoOMDB
};






  

