import { getAllMovies } from "../../service.js";

// pagination

const pagination = document.querySelector(".pagination");
const pageBtns = pagination.querySelectorAll(".page-item");
const MIN_PAGE = 1;
const MAX_PAGE = 3

pagination.addEventListener('click', onPaginationClick)

 function onPaginationClick(e) {
  // on page btns click
  debugger
  if (e.target.dataset.paginationPage) {
    pageBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
    const pageValue = e.target.dataset.paginationPage;
    getAllMovies(pageValue)
    document.querySelector("#heroCarousel").scrollIntoView();
  }
}

export {onPaginationClick}