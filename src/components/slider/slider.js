const corouselInner = document.querySelector(".carousel-inner");

function setCarouselItems(data) {
  data.forEach((movie, i) => {
    const imageSrc = movie.backdrop_path;
    const movieTitle = movie.title;
    const overview = movie.overview;
    const el = document.createElement("div");
    
    i == 0
      ? el.classList.add("carousel-item", "active")
      : el.classList.add("carousel-item");
    
    el.innerHTML += `
    <div class="overlay-image" style="background-image: url('https://image.tmdb.org/t/p/original${imageSrc}');"></div>
    <div class="container">
    <h1>${movieTitle}</h1>
    <p>${overview}</p>
    </div>
    </div>
    `;

    corouselInner.appendChild(el);
  });
}

export { setCarouselItems };
