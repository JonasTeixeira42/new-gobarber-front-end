import React from 'react';
import {
  RouteProps as ReactDomProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/auth';

interface RouteProps extends ReactDomProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: { location } },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
