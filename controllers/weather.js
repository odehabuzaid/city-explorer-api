'use strict'
const axios = require('axios');
const { WeatherForcast } = require('../data/data');

const configs = {
      weather_API_key: process.env.WEATHER_API_KEY,
      weather_API_URL: 'http://api.weatherbit.io/v2.0/forecast/daily/',
}

const getWeatherController = (request, response) => {
      const url =
            `${configs.weather_API_URL}?key=${configs.weather_API_key}&lang=en&lat=${request.params.lat}&lon=${request.params.lon}`;
      axios
            .get(url)
            .then((apiResponse) => {
                  const weatherForcastData = apiResponse.data.data.map((day) => (new WeatherForcast(day)))
                  response.send(weatherForcastData.splice(0, 6))
                  console.log(`>>>>>>>> Sent ${Date.now()}`)
            })
            .catch((error) => { response.status(500).send(error) })
}

module.exports = { getWeatherController };