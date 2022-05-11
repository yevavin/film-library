import { getTrendingMovies, getAllMovies } from "./service.js";
import { onPaginationClick } from "./components/pagination/pagination.js";

// variables

const pagination = document.querySelector(".pagination");

// functions call

getTrendingMovies();
getAllMovies(1);
pagination.addEventListener("click", onPaginationClick);

