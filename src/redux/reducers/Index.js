import {combineReducers} from 'redux';
import {milk} from './Milk';
import {animal} from './Animal';
import {medicine} from './Medicine';
import {feedItem} from './FeedItem';
import { onBoarding } from './onBoarding';
import { personalInformation } from './PersonalInformation';
import { user } from './User';
import { summary } from './Summary';


export const rootReducer = combineReducers({
  summary,
  milk,
  animal,
  feedItem,
  onBoarding,
  personalInformation,
  user,
  medicine
});
