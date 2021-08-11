const express = require('express');
const server = express();
const CORS = require('cors');

require('dotenv').config();
server.use(CORS());

const {getWeatherController} = require('./controllers/weather.js')
const {getMoviesController} = require('./controllers/movies.js')


//routers
server.get('/', (request,response) =>   response.send('am a Live .. : )'))
server.get('/weather/:lon/:lat',getWeatherController)
server.get('/movies/:query', getMoviesController) 


const port = process.env.PORT
server.listen(port, () => console.log(`#################### ~ Running on port ${port} ~ ####################`));
