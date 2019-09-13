import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './assets/scss/App.scss';
import TaskGroup from './components/Task/TaskGroup';
import Navbar from './components/Navbar/Navbar';
import TaskGroupList from './components/Task/TaskGroupList';
import User from './components/User/User';
import CreateNewBoard from './components/Task/CreateNewBoard';
import PrivateRoute from './components/PrivateRoute';
import Auth from './components/User/Auth';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/tasks" >
              <Navbar />
              <PrivateRoute path="/board" component={TaskGroupList} />
              <PrivateRoute path="/tasks/:id" component={TaskGroup} />
              <PrivateRoute path="/my-tasks" component={User} />
              <PrivateRoute path="/create-new-board" component={CreateNewBoard} />
            </Route>
            <Route path="/login" component={Auth} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
