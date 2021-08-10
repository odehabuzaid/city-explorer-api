const express = require('express');
const server = express();
const CORS = require('cors');
const axios = require('axios');
const jSonWeatherDS = require('./data/weather.json');

require('dotenv').config();
server.use(CORS());


const configs = {
      weather_API_key: process.env.WEATHER_API_KEY,
      movies_API_key : process.env.MOVIE_API_KEY,
      weather_API_URL: 'http://api.weatherbit.io/v2.0/forecast/daily/',
      movies_API_URL: 'https://api.themoviedb.org/3/movie/top_rated',
      port : process.env.PORT 
}

server.get('/', (request,response) =>   response.send('am a Live .. : )'))
server.get('/weather/:lon/:lat/:searchQuery', (request, response) => {
      const foundData = jSonWeatherDS.find(
            (cityData) =>
                  ~~+cityData.lon === ~~+request.params.lon &&
                  ~~+cityData.lat === ~~+request.params.lat &&
                  cityData.city_name === request.params.searchQuery
      );
      if (foundData) {
            response.send(
                  foundData.data
                        .map(daily =>
                              (new Forecast(daily))))
            console.log(`>>>>>>>> Sent ${Date.now()}`)
      }
      else { response.status(500).send('No results found!!!'); }
});
server.get('/weather/:lon/:lat', (request, response) => {
      const url =
      `${configs.weather_API_URL}?key=${configs.weather_API_key}&lang=en&lat=${request.params.lat}&lon=${request.params.lon}`;
axios
      .get(url)
      .then((apiResponse) => {
            const weatherForcastData = apiResponse.data.data.map((day) => (new Forecast(day)))
            response.send(weatherForcastData.splice(0, 6))
            console.log(`>>>>>>>> Sent ${Date.now()}`)
      })
      .catch((error) => { response.status(500).send(error) })
});
server.get('/movies/:query', (request, response) => {
      const url = `${configs.movies_API_URL}?api_key=${configs.movies_API_key}&region=${request.params.query}`;
      const moviesData = []
      axios
      .get(url)
      .then((apiResponse) => {
            apiResponse.data.results.map((movie) => {
                  if (movie.poster_path) {
                    if (movie.release_date !== 'Invalid Date') {
                        moviesData.push(new Movies(movie)) 
                    }
                  }
                });

            response.send(moviesData)
            console.log(`>>>>>>>> Sent ${Date.now()}`)
      })
      .catch((error) => { response.status(500).send(error) })
});

class Forecast {
      constructor(day) {
            this.forcastDate = day.datetime;
            this.description = day.weather.description
      }
}
class Movies {
      constructor(movie) {
            this.released_on = movie.release_date,
            this.title = movie.title,
            this.overview = movie.overview,
            this.average_votes = movie.vote_average,
            this.total_votes = movie.vote_count,
            this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            this.popularity = movie.popularity;
      }
    }

server.listen(configs.port, () => console.log(`#################### ~ Running on port ${configs.port} ~ ####################`));
      
      
      
