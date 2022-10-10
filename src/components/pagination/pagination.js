import { getAllMovies } from "../../service.js";

// pagination

const pagination = document.querySelector(".pagination");
const pageBtns = pagination.querySelectorAll(".page-item");
const MIN_PAGE = 1;
const MAX_PAGE = 3

pagination.addEventListener('click', onPaginationClick)

 function onPaginationClick(e) {
  debugger
  // on page btns click
  if (e.target.dataset.paginationPage) {
    pageBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
    const pageValue = e.target.dataset.paginationPage;
    getAllMovies(pageValue)
    document.querySelector("#heroCarousel").scrollIntoView();
  }

  // on arrows click
  /*
    if (e.target.dataset.paginationBtn) {
      const activePage = pagination.querySelector(".page-link.active");
      let activePageValue = Number(activePage.dataset.paginationPage);

      if (e.target.dataset.paginationBtn === "prev" && activePageValue > MIN_PAGE) {
          getAllMovies(activePageValue - 1);

        }

      if (e.target.dataset.paginationBtn === "next" && activePageValue < MAX_PAGE) {
          getAllMovies(activePageValue + 1);
        }
    } 
    */
}

export {onPaginationClick}