import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const TABS_INFO = [`Overview`, `Details`, `Reviews`];

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(e) {
    const {onTabClick} = this.props;
    const index = +e.currentTarget.dataset.index;

    e.preventDefault();
    onTabClick({index});
  }

  render() {
    const {currentTab} = this.props;

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {
            TABS_INFO.map((tab, index) => {
              return (
                <li key={tab}
                  className={`movie-nav__item ${currentTab === index ? `movie-nav__item--active` : ``}`}>
                  <a
                    data-index={index}
                    href="#"
                    className="movie-nav__link"
                    onClick={this._handleTabClick}
                  >{tab}</a>
                </li>
              );
            })
          }
        </ul>
      </nav>
    );
  }
}

Tabs.propTypes = {
  currentTab: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Tabs;
