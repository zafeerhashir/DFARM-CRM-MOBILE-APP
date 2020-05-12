import {combineReducers} from 'redux';
import {milk} from './Milk';
import {animal} from './Animal';
import {feedItem} from './FeedItem';

export const rootReducer = combineReducers({
  milk,
  animal,
  feedItem
});
