import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { getUserInfo } from "../../services/actions/user";
import { getCookie } from "../../utils/utils";
import PropTypes from "prop-types";

const ProtectedRoute:FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user.user.name);
  const token = getCookie("token");
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo());
    setIsUserLoaded(true);
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token && user ? (
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
