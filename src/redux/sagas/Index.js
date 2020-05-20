import {milkWatcherSaga} from './Milk';
import {animalWatcherSaga} from './Animal';
import {feedItemWatcherSaga} from './FeedIItem';
import {userWatcherSaga} from './User'
import {all} from 'redux-saga/effects';
import {personalInformationWatcherSaga} from './PersonalInformation';
import { onBoardingWatcherSaga } from '../sagas/onBoarding' 

export default function* rootSaga() {
  yield all([
    milkWatcherSaga(),
    animalWatcherSaga(),
    feedItemWatcherSaga(),
    personalInformationWatcherSaga(),
    onBoardingWatcherSaga(),
    userWatcherSaga()
  ]);
}
