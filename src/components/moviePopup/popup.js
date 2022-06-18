const closeBtn = document.querySelector("#closePopupBtn");
const popupWrapper = document.querySelector(".popup-wrapper");

export function onMovieItemClickHandler() {
  const moviesPosters = document.querySelectorAll(".movies_all__poster");

  moviesPosters.forEach((poster) => {
    poster.addEventListener("click", (e) => {
      // console.log(e.target.parentNode.getAttribute("id").split('_')[1]);
      const movieId = e.target.parentNode.getAttribute("id").split("_")[1];

      popupWrapper.classList.remove("popup-wrapper_hidden");

      return movieId;
    });
  });
}

closeBtn.addEventListener("click", () => {
  popupWrapper.classList.add("popup-wrapper_hidden");
});
