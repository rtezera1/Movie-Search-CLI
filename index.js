var async = require('async'),
  xlsjs = require('xlsjs'),
  _ = require('underscore'),
  OMDB = require('./lib/common.js'),
  request = require('request');

// Makes a request to the OMDBapi to get JSON object about a movie specified
  function OMDBapi (title, callback) {
     // if the arguement is not an array format, throw an error
    if (Array.isArray(title) !== true) {
      callback('Make sure the arguement is in Array format.');
     } else {
        async.map(title, function (movie, cb) {
        // make a request to the array
        OMDB.request(movie, function (err, bodyObj) {
          if (err) {
            return cb(err);
          } else if (bodyObj.Response == 'False') {
            return cb(bodyObj.Error);
          } else {
            return cb(null, [bodyObj.Title, bodyObj.Year]);
          }
        });
      }, function (err, array) {
        if (err) {
          callback(err);
        } else {
          callback(null, _.object(array));
        }
      });
    }
  }

  function loadExcelAsJSON (fileName, callback) {
    var workbook = xlsjs.readFile(fileName);
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var sheet_json = xlsjs.utils.sheet_to_json(worksheet, {header: 1});
    return callback(null, sheet_json);
  }

  // Parse excel spreadsheet and request OMDBapi to get JSON object
  function ExceltoOMDB (fileName, callback) {
    var res = [];
    loadExcelAsJSON(fileName, console.log);
    // spreadsheet to json convertor 
    loadExcelAsJSON(
      fileName,
      function (err, result) {
        if (err) {
          // if err, callback an error
          callback(err);
        } else {
          var flattened = _.flatten(result);
          OMDBapi(flattened, callback);
        }
      });
  }

module.exports = {
  OMDBapi: OMDBapi,
  ExceltoOMDB: ExceltoOMDB
};
