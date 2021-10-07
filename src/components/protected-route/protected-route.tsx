import React, { FC, useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { getUserInfo } from "../../services/actions/user";
import { useAppDispatch, useSelectorHook } from "../../services/store";

const ProtectedRoute:FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const user = useSelectorHook((store) => store.user.user.name);
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
        user ? (
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
