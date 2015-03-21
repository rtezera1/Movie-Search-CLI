var search = require('../index.js'),
  async = require('async'),
  expect = require('chai').expect;

describe('Search Module', function () {
  it('searches movies and provide the name and year released', function (done) {
    var titles = [
      'Titanic',
      'Training-day',
      'The-Matrix'
    ];
    search.OMDBapi(titles, function (err, res) {
      if (err) {
        throw new Error(err);
      } else {
        expect(res).to.deep.equal({Titanic: '1997', 'The Matrix': '1999', 'Training Day': '2001' });
      }
      done();
    });
  });

  it('Throws an error if titles are not in array format', function (done) {
    var title = 'titanic';
    search.OMDBapi(title, function (err, res) {
      if (err) {
        expect(err).to.equal('Make sure the arguement is in Array format.');
        done();
      } else {
        throw new Error('The expect wasnt thrown');
      }
    });
  });
});
