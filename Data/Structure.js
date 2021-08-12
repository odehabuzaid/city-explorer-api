function Movies(movie) {
      this.released_on = movie.release_date,
            this.title = movie.title,
            this.overview = movie.overview,
            this.average_votes = movie.vote_average,
            this.total_votes = movie.vote_count,
            this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            this.popularity = movie.popularity;
            // this.timeStamp = timeStamp;
}

function WeatherForcast(city) {
      this.forcastDate = new Date(city.valid_date).toString().slice(0, 15),
            this.description = `Low of ${city.low_temp}, high of ${city.max_temp} with ${city.weather.description}`,
            this.maxTemp = city.max_temp,
            this.lowTemp = city.low_temp,
            this.temperature = city.temp;
            // this.timeStamp = timeStamp;
}

module.exports = { WeatherForcast, Movies }

