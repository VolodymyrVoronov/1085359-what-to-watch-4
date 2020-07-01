import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

class GenreFilter extends PureComponent {
  constructor(props) {
    super(props);

    this._handleItemClick = this._handleItemClick.bind(this);
  }

  _handleItemClick(e) {

    const {onGenreItemClick} = this.props;
    const index = +e.currentTarget.dataset.index;

    e.preventDefault();
    onGenreItemClick(index);
  }

  render() {

    const {genres, currentGenreIndex} = this.props;

    return (
      <ul className="catalog__genres-list">
        {
          genres.map((tab, index) => {
            return (
              <li key={tab}
                className={`catalog__genres-item${index === currentGenreIndex ? ` catalog__genres-item--active` : ``}`}
              >
                <a
                  data-index={index}
                  href="#"
                  className="catalog__genres-link"
                  onClick={this._handleItemClick}
                >{tab}</a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

GenreFilter.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenreIndex: PropTypes.number,
  onGenreItemClick: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentGenreIndex: state.genreFilterIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGenreItemClick: (index) => {
      dispatch(ActionCreator.applyGenreFilter(index));
    }
  };
}

export {GenreFilter};
export default connect(mapStateToProps, mapDispatchToProps)(GenreFilter);
