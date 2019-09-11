import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './assets/scss/App.scss';
import TaskGroup from './components/Task/TaskGroup';
import Navbar from './components/Navbar/Navbar';
import TaskGroupList from './components/Task/TaskGroupList';
import User from './components/User/User';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={TaskGroupList} />
            <Route path="/tasks/:id" component={TaskGroup} />
            <Route path="/my-tasks" component={User} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
