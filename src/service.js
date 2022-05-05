const API_KEY = 'api_key=beb91ae92c1db29a0fa50adedb55ba5f';

async function getTrendingMoviesImage() {
  await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?" + API_KEY,
    {
      method: "GET",
      contentType: "application/json",
    }
  )
    .then((response) => response.json())
    .then(data => {return data})
    .then(data => {
        
        setCarouselItems((data.results).splice(0,3));
    })
    .catch(() => null);
}

function setCarouselItems(data) {
      data.forEach((movie, i) => {
        const imageSrc = movie.poster_path;
        const movieTitle = movie.title
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
};

export { getTrendingMoviesImage };
