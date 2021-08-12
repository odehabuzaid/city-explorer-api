'use strict';
const { theShotGUN } = require('../agent/theShotGUN');
const { WeatherForcast } = require('../Data/Structure');

const getWeatherController = (request, response) => {
      let requestQuery = {
            apiURL: 'http://api.weatherbit.io/v2.0/forecast/daily/',
            params: {
                  key: process.env.WEATHER_API_KEY,
                  lon: request.params.lon,
                  lat: request.params.lat,
            },
      };
      theShotGUN(requestQuery,'Weather')
            .then((agentResponse) => {
                  let obj = {
                        timestamp: agentResponse.timestamp,
                        data:  agentResponse.data.data.map((day) => new WeatherForcast(day)).splice(0, 6) }
                  response.send(obj );
            })
            .catch((error) => {
                  response.status(500).send(error);
            });
};
module.exports = { getWeatherController };
