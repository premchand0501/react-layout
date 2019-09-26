import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { authenticate } from '../utilities/service';
import Async from 'react-async';
import { connect } from 'react-redux';
import { saveUserData } from '../store/actions/userAction';

const PrivateRoute = ({ path, userReducer, component: Component, saveUserDataFunc, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userReducer && userReducer.loginStatus) {
          return <Component {...props} />
        }
        return <Async promiseFn={authenticate} id={localStorage.getItem('id')}>
          {
            ({ data, err, isLoading }) => {
              if (isLoading) return 'Loading...';
              if (err) return `Something went wrong: ${err.msg}`;
              if (data != null) {
                saveUserDataFunc(data);
                return <Component {...props} />
              }
              return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
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
const mapDispatchToProps = (dispatch) => ({
  saveUserDataFunc: (data) => {
    dispatch(saveUserData(data));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);