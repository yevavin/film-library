import { getTrendingMovies, getAllMovies } from "./service.js";
import {onPaginationClick} from "./components/pagination/pagination.js"

// variables

// functions call

getTrendingMovies();
getAllMovies(1);
onPaginationClick()