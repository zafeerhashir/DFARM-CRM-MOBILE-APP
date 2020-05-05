import {combineReducers} from 'redux';
import {milk} from './Milk';
import {animal} from './Animal';

export const rootReducer = combineReducers({
  milk,
  animal,
});
