import React, {PureComponent} from "react";

const withActiveItemList = (Component, setActiveTimeDelay) => {

  class WithActiveItemList extends PureComponent {
    constructor(props) {
      super(props);

      // this._timeoutId = undefined;
      this.state = {
        activeItemId: -1,
      };

      this._handleItemHover = this._handleItemHover.bind(this);
      this._handleItemLeave = this._handleItemLeave.bind(this);
      // this._handleItemClick = this._handleItemClick.bind(this);
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
      clearTimeout(this.timeoutId);
      this.setState({
        activeItemId: -1,
      });
    }

    // _handleItemClick({film}) {
    //   this.setState({
    //     activeItemId: film.id,
    //   });
    // }

    render() {

      const {activeItemId} = this.state;

      return (
        <Component {...this.props}
          isPreviewActive={activeItemId}
          onHover={this._handleItemHover}
          onLeave={this._handleItemLeave}
          // onClick={this._handleItemClick}
        />
      );
    }
  }
  
  withActiveItemList.propTypes = {};

  return WithActiveItemList;
};

export default withActiveItemList;
