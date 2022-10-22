import {API_KEY, BASE_URL, IMAGE_BASE_URL} from '../../service.js'

const closeBtn = document.querySelector("#closePopupBtn");
const popupWrapper = document.querySelector(".popup-wrapper");

const popupTemplate = (data) => `
        <div class="popup-container__media">
          <img src="${IMAGE_BASE_URL + data.poster_path}" alt="${data.title}">
        </div>
        <div class="popup-container__description">
          <div class="popup-container__header">
            <h2>${data.title}</h2>
              <span class="release_date">${data.release_date}</span>
            <p class="genre">${data.genres.map((item) => {return item.name}).join(', ')}</p>
          </div>
          <div class="popup-container__overview">
            <p>
              ${data.overview}
            </p>
          </div>
        </div>
        <div class="popup-container__btns-panel">
          <button class="btn_watch-later btn_watch-later_active">+ Watch Later</button>
        </div>
`


export function onMovieItemClickHandler() {
  const moviesPosters = document.querySelectorAll(".movies_all__poster");
  moviesPosters.forEach((poster) => {
    poster.addEventListener("click", (e) => {
      
      const movieId = e.target.closest('.movies_all__item').getAttribute("id");
    
      fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}`, {
        method: "GET",
        contentType: "application/json",
      })
        .then((response) => response.json())
        .then(data => {
          document.querySelector('.popup-wrapper .popup-content').innerHTML = popupTemplate(data)

          const LocalStorageValue = JSON.parse(localStorage.getItem("watchLater"))
          if (LocalStorageValue != null) {
            if(LocalStorageValue.includes(movieId)) {
              document.querySelector('.btn_watch-later').classList.remove("btn_watch-later_active")
              document.querySelector('.btn_watch-later').classList.add("btn_watch-later_blocked")
              document.querySelector('.btn_watch-later').innerHTML = "Added to watch later"
            }
          }

          popupWrapper.classList.remove("popup-wrapper_hidden");
          onWatchLaterClick(movieId);
        })
    });
  })
}

function onWatchLaterClick(movieId) {
  let watchLaterList = [];
  document.querySelector('.popup-wrapper .btn_watch-later').addEventListener('click', (e) => {
    if (localStorage.getItem('watchLater')) {
      watchLaterList = JSON.parse(localStorage.getItem('watchLater'));
      if (!watchLaterList.includes(movieId)) {
        watchLaterList.push(movieId);
        localStorage.setItem('watchLater', JSON.stringify(watchLaterList));
      }
    } else {
      watchLaterList.push(movieId);
      localStorage.setItem('watchLater', JSON.stringify(watchLaterList));
    }

    // change class
    if (e.target.classList.contains("btn_watch-later_active")) {
      e.target.classList.remove("btn_watch-later_active")
      e.target.classList.add("btn_watch-later_blocked")
      e.target.innerHTML = "Added to watch later"
    }
  });
}

closeBtn.addEventListener("click", () => {
popupWrapper.classList.add("popup-wrapper_hidden");
});
