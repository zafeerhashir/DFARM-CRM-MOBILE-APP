import {combineReducers} from 'redux';
import {milk} from './Milk';
import {animal} from './Animal';
import {feedItem} from './FeedItem';
import { onBoarding } from './onBoarding';
import { personalInformation } from './PersonalInformation';


export const rootReducer = combineReducers({
  milk,
  animal,
  feedItem,
  onBoarding,
  personalInformation
});
