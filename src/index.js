import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {MOVIES} from "./mocks/films.js";
import {CURRENT_MOVIE} from "./mocks/current-film.js";

ReactDOM.render(
    <App
      currentMovie={CURRENT_MOVIE}
      films={MOVIES}
    />,
    document.querySelector(`#root`)
);
