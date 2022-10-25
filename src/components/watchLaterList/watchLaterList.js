const API_KEY = "api_key=beb91ae92c1db29a0fa50adedb55ba5f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

document.addEventListener("DOMContentLoaded", getWatchLaterList);

function getWatchLaterList() {
  const watchLaterContainer = document.getElementById("contentWrapper");

    const list = localStorage.getItem("watchLater") || "[]";
    const watchLaterList = JSON.parse(list);
    
    watchLaterList.forEach((item) => {

      fetch(`${BASE_URL}/movie/${item}?${API_KEY}`, {
        method: "GET",
        contentType: "application/json",
      })
        .then((response) => response.json())
        .then((data) => {
            const movieId = data.id;
            const imgSrc = IMAGE_BASE_URL + data.poster_path;
            const title = data.title;
            const vote = (data.vote_average).toFixed(1);
            const releaseDate = data.release_date;
            const el = `
                    <div class="movies_all__item" id="${movieId}">
                        <div>
                          <img src="${imgSrc}" alt="${title}">
                        </div>
                        <div class="bottom">
                            <div class="rating">${vote}%</div>
                            <h3 class="title">${title}</h3>
                            <p class="date">${releaseDate}</p>
                            </div>
                        <div class="delete-btn"></div>
                    </div>
                `;
            watchLaterContainer.innerHTML += el;
        })
        .then(() => deleteMovie());
        
    });
    
    if (!watchLaterList.length) {
    watchLaterContainer.innerHTML = `
            <div class="movies_all__watch-later container">No movies added</div>
        `;
  }
}

function deleteMovie() {
  const deleteBtnList = document.querySelectorAll(".delete-btn");
  deleteBtnList.forEach(btn => btn.addEventListener("click", (e) => {
    
    const movieId = e.target.parentNode.getAttribute('id');

    const filteredWatchLaterList = JSON.parse(localStorage.getItem('watchLater'))
      .filter(item => {return item != movieId});

    localStorage.setItem('watchLater', JSON.stringify(filteredWatchLaterList));
    e.target.parentNode.remove()

    const watchLaterContainer = document.getElementById("contentWrapper");
    const list = localStorage.getItem("watchLater") || "[]";
    const watchLaterList = JSON.parse(list);

    if (!watchLaterList.length) {
      watchLaterContainer.innerHTML = `
              <div class="movies_all__watch-later container">No movies added</div>
          `;
    }
  }))
}
