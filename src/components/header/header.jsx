import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";
import {AppPages} from "../const.js";

const Header = (props) => {
  const {authorizationStatus, authInfo, onSignInClick} = props;
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link
          to={AppPages.MAIN}
          className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH ?
          <Link to={AppPages.MY_LIST}>
            <div className="user-block__avatar">
              <img src={authInfo.avatarUrl} alt={`${authInfo.name} avatar`} width="63" height="63"/>
            </div>
          </Link> :
          <Link
            to={AppPages.SIGN_IN}
            className="user-block__link">
              Sign in
          </Link>}
      </div>
    </header>
  );
};

Header.propTypes = {
  authInfo: PropTypes.object,
  authorizationStatus: PropTypes.string,
  onSignInClick: PropTypes.func.isRequired,
};

export default Header;
