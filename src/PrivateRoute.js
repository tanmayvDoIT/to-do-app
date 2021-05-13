import { Redirect, Route } from 'react-router-dom';

import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(typeof localStorage.getItem('authenticated'));
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('authenticated') === 'true' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
