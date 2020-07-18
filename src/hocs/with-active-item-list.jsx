import React, {PureComponent} from "react";

import {Movie} from "../components/types-of-props.js";

const withActiveItemList = (Component, setActiveTimeDelay) => {

  class WithActiveItemList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItemId: -1,
      };

      this._handleItemHover = this._handleItemHover.bind(this);
      this._handleItemLeave = this._handleItemLeave.bind(this);
    }

    componentDidUpdate() {
      clearTimeout(this._timeoutId);
    }

    componentWillUnmount() {
      clearTimeout(this._timeoutId);
    }

    _handleItemHover({film}) {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => {
        this.setState({
          activeItemId: film.id,
        });
      }, setActiveTimeDelay);
    }

    _handleItemLeave() {
      clearTimeout(this._timeoutId);
      this.setState({
        activeItemId: -1,
      });
    }

    render() {

      const {activeItemId} = this.state;
      const {film} = this.props;

      return (
        <Component {...this.props}
          isPreviewActive={activeItemId === film.id}
          onHover={this._handleItemHover}
          onLeave={this._handleItemLeave}
        />
      );
    }
  }

  WithActiveItemList.propTypes = {
    film: Movie.isRequired,
  };

  return WithActiveItemList;
};

export default withActiveItemList;
