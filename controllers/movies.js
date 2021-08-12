'use strict';
const { Movies } = require('../Data/Structure');
const { theShotGUN } = require('../agent/theShotGUN');

const getMoviesController = (request, response) => {
      let requestQuery = {
            apiURL: process.env.MOVIES_API_URL,
            params: {
                  api_key: process.env.MOVIE_API_KEY,
                  region: request.params.query,
            },
      };
      theShotGUN(requestQuery,'Movies')
            .then((apiResponse) => {
                  response.send(checkMoviesData(apiResponse));
            })
            .catch((error) => {
                  response.status(500).send(error);
            });
};
function checkMoviesData(moviesData) {
      const moviesDataArray = [];
      moviesData.data.results.forEach((movie) => {
            if (movie.poster_path) {
                  if (movie.release_date !== 'Invalid Date') {
                        moviesDataArray.push(new Movies(movie));
                  }
            }
      });
      return moviesDataArray;
}
module.exports = { getMoviesController };
