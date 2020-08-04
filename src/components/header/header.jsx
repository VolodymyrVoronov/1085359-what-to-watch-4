import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const Header = (props) => {
  const {authorizationStatus, authInfo, onSignInClick} = props;
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH ?
          <div className="user-block__avatar">
            <img src={authInfo.avatarUrl} alt={`${authInfo.name} avatar`} width="63" height="63" />
          </div>
          : <a
            href="sign-in.html"
            className="user-block__link"
            onClick={(e) => {
              e.preventDefault();
              onSignInClick();
            }}
          >Sign in</a>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  authInfo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

export default Header;
