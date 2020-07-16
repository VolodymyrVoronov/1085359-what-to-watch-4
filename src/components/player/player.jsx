import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {poster, isMuted, src} = this.props;
    const video = this._videoRef.current;

    video.preload = `none`;
    video.poster = poster;
    video.muted = isMuted;
    video.src = src;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.poster = ``;
    video.src = ``;
  }

  componentDidUpdate() {
    const {isActive} = this.props;
    const video = this._videoRef.current;

    if (isActive) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    return (
      <video ref={this._videoRef} className="player__video" poster={this.poster}></video>
    );
  }
}

Player.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isMuted: PropTypes.bool,
};

Player.defaultProps = {
  isMuted: true,
};

export default Player;
