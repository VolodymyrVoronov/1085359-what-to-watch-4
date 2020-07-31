import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {MOVIES} from "./mocks/films.js";

import reducer from "./reducer/reducer.js";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {Operation as DataOperation} from "./reducer/data/data.js";
import {createAPI} from "./api.js";

const api = createAPI(() => {});

const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api)),
    )
);

store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(DataOperation.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,

    document.querySelector(`#root`)
);
