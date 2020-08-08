import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppPages} from "./components/const.js";
import {AuthorizationStatus} from "./reducer/user/user.js";
import {getAuthorizationStatus} from "./reducer/user/selectors.js";
import Loader from "./components/loader/loader.jsx";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {


        switch (authorizationStatus) {
          case (AuthorizationStatus.UNKNOWN):
            return <Loader />;
          case (AuthorizationStatus.NO_AUTH):
            return <Redirect to={AppPages.SIGN_IN} />;
          case (AuthorizationStatus.AUTH):
            return render(routeProps);
        }
        return render(routeProps);
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
