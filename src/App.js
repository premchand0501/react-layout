import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import './assets/scss/App.scss';
import TaskGroup from './components/Task/TaskGroup';
import Navbar from './components/Navbar/Navbar';
import TaskGroupList from './components/Task/TaskGroupList';
import User from './components/User/User';
import CreateNewBoard from './components/Task/CreateNewBoard';
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/User/Auth';
import page404 from './components/404';
import { authenticate } from './utilities/service';
import Async from 'react-async';
import { connect } from 'react-redux';
import TaskDetails from './components/Task/TaskDetails';
import EditTask from './components/Task/EditTask';
import { saveUserData } from './store/actions/userAction';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={TaskGroupList} />
            <PrivateRoute path="/tasks/:id" component={TaskGroup} />
            <PrivateRoute path="/task-details/:id" component={TaskDetails} />
            <PrivateRoute path="/edit-task/:action/:id" component={EditTask} />
            <PrivateRoute path="/add-task/:action/:taskBoardId" component={EditTask} />
            <PrivateRoute path="/my-tasks" component={User} />
            <PrivateRoute path="/create-new-board" component={CreateNewBoard} />
            <Route path="/login" render={(props) => {
              return <Async promiseFn={authenticate} id={localStorage.getItem('id')}>
                {
                  ({ data, err, isLoading }) => {
                    if (isLoading) return 'Loading...';
                    if (err) return `Something went wrong: ${err.msg}`;
                    if (data != null)
                      this.props.saveUserDataFunc(data);
                    return data == null ?
                      (
                        <Auth {...props} />
                      ) :
                      (
                        <Redirect to="/" />
                        // return ''
                      )
                  }
                }
              </Async>
            }} />
            <Route component={page404} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userReducer: state.userReducer
})
const mapDispatchToProps = (dispatch) => ({
  saveUserDataFunc: (data) => {
    dispatch(saveUserData(data));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
