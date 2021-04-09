import { combineReducers } from 'redux';
import weather from './weather';

const allReducers = combineReducers({
  weather: weather,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
