import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { getUserInfo } from "../../services/actions/user";
import { getCookie } from "../../utils/utils";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, ...rest }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (getCookie("refreshToken")) {
      dispatch(getUserInfo());
    }
    setIsUserLoaded(true);
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.name ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

export default ProtectedRoute;
