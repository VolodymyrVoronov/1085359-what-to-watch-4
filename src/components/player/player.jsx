import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    // this._handleVideoPlay = this._handleVideoPlay.bind(this);
    // this._handleVideoEnd = this._handleVideoEnd.bind(this);
  }

  componentDidMount() {
    const {poster, isMuted, src} = this.props;
    const video = this._videoRef.current;

    // video.onplay = this._handleVideoPlay;
    // video.onend = this._handleVideoEnd;
    video.preload = `none`;
    video.poster = poster;
    video.muted = isMuted;
    video.src = src;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    // video.onplay = null;
    // video.onend = null;
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

  // _handleVideoPlay() {
  //   const {id, onPlay} = this.props;

  //   onPlay({id});
  // }

  // _handleVideoEnd() {
  //   const {id, onEnd} = this.props;

  //   onEnd({id});
  // }

  render() {
    return (
      <video ref={this._videoRef} className="player__video" poster={this.poster}></video>
    );
  }
}

Player.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isMuted: PropTypes.bool,
};

Player.defaultProps = {
  isMuted: true,
};

export default Player;
