'use strict'
const axios = require('axios');
const { Movies } = require('../data/data');

const configs = {
      movies_API_key: process.env.MOVIE_API_KEY,
      movies_API_URL: 'https://api.themoviedb.org/3/movie/top_rated',
}

const getMoviesController = (request, response) => {
      const url = 
      `${configs.movies_API_URL}?api_key=${configs.movies_API_key}&region=${request.params.query}`;
      axios
            .get(url)
            .then((movies) => {
                  const moviesDataArray = []
                  movies.data.results.map((movie) => {
                        if (movie.poster_path) {
                              if (movie.release_date !== 'Invalid Date') {
                                    moviesDataArray.push(new Movies(movie))
                              }
                        }
                  });
                  response.send(moviesDataArray)
                  console.log(`>>>>>>>> Sent ${Date.now()}`)
            })
            .catch((error) => { response.status(500).send(error) })
}

module.exports = { getMoviesController };