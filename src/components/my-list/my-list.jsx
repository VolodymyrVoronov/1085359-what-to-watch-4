import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import MovieCard from "../movie-card/movie-card.jsx";
import Footer from "../footer/footer.jsx";

import withActiveItemList from "../../hocs/with-active-item-list.jsx";

const PRVIEW_DALAY = 1000;

const MovieCardWrapped = withActiveItemList(MovieCard, PRVIEW_DALAY);

const MyList = (props) => {
  const {authorizationStatus, authInfo, favoriteFilms, onFilmListItemClick} = props;

  return (
    <React.Fragment>
      <div className="user-page">
        <Header
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          extraClassName={`user-page`}
        >
          <h1 className="page-title user-page__title">My list</h1>
        </Header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {favoriteFilms.map((film, index) => {
              return (
                <MovieCardWrapped
                  id={index}
                  key={film.title + index}
                  film={film}
                  onFilmListItemClick={onFilmListItemClick}
                />
              );
            })}
          </div>
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
};

MyList.propTypes = ({
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object.isRequired,
  favoriteFilms: PropTypes.array.isRequired,
  onFilmListItemClick: PropTypes.func.isRequired,
});

export default MyList;

