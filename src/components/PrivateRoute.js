import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from '../utilities/service';
import Async from 'react-async';
import { connect } from 'react-redux';

const PrivateRoute = ({ path, userReducer, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userReducer && userReducer.loginStatus) {
          return <Redirect to={{
            pathname: path,
          }} />
        }
        return <Async promiseFn={authenticate} id={localStorage.getItem('id')}>
          {
            ({ data, err, isLoading }) => {
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
            }
          }
        </Async>
      }}
    />
  );
}
const mapStateToProps = (state) => ({
  userReducer: state.userReducer
})
export default connect(mapStateToProps)(PrivateRoute);