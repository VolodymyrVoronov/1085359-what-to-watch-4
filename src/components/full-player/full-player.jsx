import React from "react";
import PropTypes from "prop-types";

import {Movie} from "../types-of-props.js";

const getTimeLeft = (videoDuration) => {
  const seconds = Math.trunc(videoDuration % 60);
  const minutes = Math.trunc(videoDuration / 60);
  const hours = Math.trunc(minutes / 60);

  return [
    (`0` + hours).slice(-2),
    (`0` + minutes).slice(-2),
    (`0` + seconds).slice(-2)
  ].join(`:`);
};

const FullPlayer = (props) => {
  const {isPlaying, progress, duration, onPlayButtonClick, onFullScreenButtonClick, onExitButtonClick, film, children} = props;
  
  const timeLeft = getTimeLeft(duration - progress);

  return (
    <React.Fragment>
      <div className="player">
        {children}
        {/* <video src="#" class="player__video" poster={film.img}></video> */}
        <button onClick={onExitButtonClick} type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max={duration}></progress>
              <div className="player__toggler" style={{left: ((progress * 100) / duration) + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timeLeft}</div>
          </div>

          <div className="player__controls-row">
            <button onClick={onPlayButtonClick} type="button" className="player__play">
              {isPlaying ?
                <React.Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"/>
                  </svg>
                  <span>Pause</span>
                </React.Fragment>
                :
                <React.Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </React.Fragment>}
            </button>
            <div className="player__name">{film.title}</div>

            <button onClick={onFullScreenButtonClick} type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

FullPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  film: Movie.isRequired
}

export default FullPlayer;
