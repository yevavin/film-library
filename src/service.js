import { setCarouselItems } from "./components/slider/slider.js";
import { onMovieItemClickHandler } from "./components/moviePopup/popup.js";

export const API_KEY = "api_key=beb91ae92c1db29a0fa50adedb55ba5f";
export const BASE_URL = "https://api.themoviedb.org/3";
export const TREND_WEEK_URL = BASE_URL + "/trending/movie/week?";
export const ALL_MOVIES_URL =
  BASE_URL + `/discover/movie?${API_KEY}&sort_by=popularity.desc`;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function getTrendingMovies() {
  fetch(TREND_WEEK_URL + API_KEY, {
    method: "GET",
    contentType: "application/json",
  })
    .then((response) => response.json())
    .then((data) => {
      setCarouselItems(data.results.splice(0, 3));
    })
    .catch(() => null);
}

function getAllMovies(page) {
  fetch(ALL_MOVIES_URL + `&page=${page}`, {
    method: "GET",
    contentType: "application/json",
  })
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
      onMovieItemClickHandler();
    })
    .catch(() => null);
}

function displayMovies(data) {
  const container = document.querySelector("#moviesAll");
  const tmpContainer = document.createElement('div');
  data.forEach((movie) => {
    const movieId = movie.id;
    const imgSrc = IMAGE_BASE_URL + movie.poster_path;
    const title = movie.title;
    const vote = (movie.vote_average).toFixed(1);
    const releaseDate = movie.release_date;
    const el = `
            <div class="movies_all__item" id="${movieId}">
                <a href="javascript:void(0)" class="movies_all__poster" id="poster_${movieId}">
                    <div>
                      <img src="${imgSrc}" alt="${title}">
                    </div>
                </a>
                <div class="bottom">
                    <div class="rating">${vote}%</div>
                    <h3 class="title">${title}</h3>
                    <p class="date">${releaseDate}</p>
                </div>
            </div>
        `;
    tmpContainer.innerHTML += el;
});
    container.innerHTML = tmpContainer.innerHTML;
}

export { getTrendingMovies, getAllMovies };
