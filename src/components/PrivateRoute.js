import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from '../utilities/service';
import Async from 'react-async';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Async promiseFn={authenticate} id={localStorage.getItem('id')}>
          {({ data, err, isLoading }) => {
            if (isLoading) return 'Loading...'
            if (err) return `Something went wrong: ${err.msg}`
            return data ?
              (
                <Component {...props} />
              ) :
              (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location }
                }} />
              )
          }}
        </Async>
      )}
    />
  );
}
export default PrivateRoute;