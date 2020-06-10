import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

import {Film} from "./const.js";

ReactDOM.render(
    <App
      title={Film.TITLE}
      genre={Film.GENRE}
      releaseDate={Film.RELEASE_DATE}
    />,
    document.querySelector(`#root`)
);
