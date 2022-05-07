const API_KEY = "api_key=beb91ae92c1db29a0fa50adedb55ba5f";
const BASE_URL = "https://api.themoviedb.org/3";
const TREND_WEEK_URL = BASE_URL + "/trending/movie/week?";
const ALL_MOVIES_URL =
  BASE_URL + `/discover/movie?${API_KEY}&sort_by=popularity.desc`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

async function getTrendingMovies() {
  await fetch(TREND_WEEK_URL + API_KEY, {
    method: "GET",
    contentType: "application/json",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .then((data) => {
      setCarouselItems(data.results.splice(0, 3));
    })
    .catch(() => null);
}

function setCarouselItems(data) {
  data.forEach((movie, i) => {
    const imageSrc = movie.backdrop_path;
    const movieTitle = movie.title;
    const overview = movie.overview;
    const el =
      i == 0
        ? `<div class="carousel-item active">
                    <div class="overlay-image" style="background-image: url('https://image.tmdb.org/t/p/original${imageSrc}');"></div>
                    <div class="container">
                         <h1>${movieTitle}</h1>
                        <p>${overview}</p>
                    </div>
                </div>`
        : `<div class="carousel-item">
                    <div class="overlay-image" style="background-image: url('https://image.tmdb.org/t/p/original${imageSrc}');"></div>
                    <div class="container">
                         <h1>${movieTitle}</h1>
                        <p>${overview}</p>
                    </div>
                </div>`;
    document.querySelector(".carousel-inner").innerHTML += el;
  });
}

async function getAllMovies() {
  await fetch(ALL_MOVIES_URL, {
    method: "GET",
    contentType: "application/json",
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
      displayMovies(data.results);
    })
    .catch(() => null);
}

function displayMovies(data) {
  const container = document.querySelector("#moviesAll");
  data.forEach((movie) => {
    const imgSrc = IMAGE_BASE_URL + movie.poster_path;
    const title = movie.title;
    const vote = movie.vote_average;
    const releaseDate = movie.release_date;
    const el = `
            <div class="movies_all__item">
                <a href="#">
                    <img src="${imgSrc}" alt="${title}">
                </a>
                <div class="bottom">
                    <div class="rating">${vote}%</div>
                    <h3 class="title">
                        <a href="#">${title}</a>
                    </h3>
                    <p class="date">${releaseDate}</p>
                </div>
            </div>
        `;
    container.innerHTML += el;
  });
}

export { getTrendingMovies, getAllMovies };
