import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { rootReducer } from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
