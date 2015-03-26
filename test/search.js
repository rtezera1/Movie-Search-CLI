var index = require('../index.js'),
  async = require('async'),
  expect = require('chai').expect;

describe('Search Module', function () {
  it('searches movies and provide the name and year released', function (done) {
    this.timeout(0);
    var titles = [
      'Titanic',
      'Training-day',
      'The-Matrix'
    ];
    index.OMDBapi(titles, function (err, res) {
      if (err) {
        throw new Error(err);
      } else {
        expect(res).to.deep.equal({'Titanic': '1997', 'The Matrix': '1999', 'Training Day': '2001' });
        done();
      }
    });
  });

  it('throws an error if titles are not in array format', function (done) {
    var title = 'titanic';
    index.OMDBapi(title, function (err, res) {
      if (err) {
        expect(err).to.equal('Make sure the arguement is in Array format.');
        done();
      } else {
        throw new Error('The expect wasnt thrown');
      }
    });
  });

  it('should throw an error if the movie isnt found', function (done) {
    this.timeout(0);
    var title = ['cdlkfjdfkj'];
    index.OMDBapi(title, function (err, res) {
      if (err) {
        expect(err).to.equal('Movie not found!');
        done();
      } else {
        throw new Error('The expect wasnt thrown');
      }
    });
  });

  it('parses excel sheet and requests movie dates', function (done) {
    var fileName = process.cwd() + '/test/movies.xls';
    index.ExceltoOMDB(fileName, function (err, res) {
      if (err) {
        throw new Error (err);
      } else {
        expect(res).to.contain({'Titanic': '1997', 'The Matrix': '1999', 'Training Day': '2001' });
        done();
      }
    });
  });

  it('should throw an error if the list item in the spreadsheet isnt found', function (done) {
    this.timeout(0);
    var fileName = process.cwd() + '/test/fake-movies.xls';
    index.ExceltoOMDB(fileName, function (err, res) {
      if (err) {
        expect(err).to.contain('Movie not found!');
        done();
      } else {
        throw new Error('The expected error wasnt thrown');
      }
    });
  });
});
