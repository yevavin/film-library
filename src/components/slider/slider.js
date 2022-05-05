import { getTrendingMovies } from "./service.js";

const slider = document.querySelector(".slider");


const trendingMovie = await getTrendingMovies()
  .then(data => {return data.poster_path;})
  .then( data =>
    slider.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data}')`
  );

export { trendingMovie };
