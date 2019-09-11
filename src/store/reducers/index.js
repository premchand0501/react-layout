import { combineReducers } from 'redux';
import taskGroupReducer from './taskGroupReducer';

export const rootReducer = combineReducers({
  taskGroupReducer,
})