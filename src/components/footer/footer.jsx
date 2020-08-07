import React from "react";
import {Link} from "react-router-dom";
import {AppPages} from "../const.js";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Link
          className="logo__link logo__link--light"
          to={AppPages.MAIN}
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2020 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
