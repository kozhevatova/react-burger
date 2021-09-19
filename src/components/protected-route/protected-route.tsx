import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { getUserInfo } from "../../services/actions/user";
import { getCookie } from "../../utils/utils";

const ProtectedRoute = ({ children, path, ...rest }: any) => {
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
    console.log("null");
    return null;
  }

  return (
    <Route
      {...rest}
      path={path}
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

export default ProtectedRoute;
