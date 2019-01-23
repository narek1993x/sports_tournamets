import { combineReducers } from 'redux';
import tournaments from './tournaments/reducer';

const reducers = combineReducers({
  tournaments
});

export default reducers;
