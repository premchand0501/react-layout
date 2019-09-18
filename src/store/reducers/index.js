import { combineReducers } from 'redux';
import taskGroupReducer from './taskGroupReducer';
import taskListReducer from './taskListReducer';
import userReducer from './userReducer';
import taskDetailsReducer from './taskDetailsReducer';

export const rootReducer = combineReducers({
  taskGroupReducer,
  taskListReducer,
  userReducer,
  taskDetailsReducer
})