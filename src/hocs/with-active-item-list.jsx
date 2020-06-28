import React, {PureComponent} from "react";

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

    _handleItemHover({id}) {
      clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(() => {
        this.setState({
          activeItemId: id,
        });
      }, setActiveTimeDelay);
    }

    _handleItemLeave() {
      clearTimeout(this.timeoutId);
      this.setState({
        activeItemId: -1,
      });
    }

    render() {

      const {activeItemId} = this.state;

      return (
        <Component {...this.props}
          activeItemId={activeItemId}
          onItemHover={this._handleItemHover}
          onItemLeave={this._handleItemLeave}
        />
      );
    }
  }

  return WithActiveItemList;
};

export default withActiveItemList;
