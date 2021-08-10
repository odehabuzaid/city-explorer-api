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


class Forecast {
      constructor(day) {
            this.forcastDate = day.datetime;
            this.description = day.weather.description
      }
}


server.listen(configs.port, () => console.log(`#################### ~ Running on port ${configs.port} ~ ####################`));
      
      
      
