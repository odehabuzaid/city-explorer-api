const express = require('express');
const server = express();
const CORS = require('cors');

require('dotenv').config();
server.use(CORS());

const jSonWeatherDS = require('./data/weather.json');

server.get('/', (req, res) => {
      res.send('am a Live .. : )');
});

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


class Forecast {
      constructor(day) {
            this.ForcastDate = day.valid_date,
                  this.description = day.weather.description
      }
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
      console.log(`#################### ~ Running on port ${PORT} ~ ####################`);
});
