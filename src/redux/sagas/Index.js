import {milkWatcherSaga} from './Milk';
import {animalWatcherSaga} from './Animal';
import {feedItemWatcherSaga} from './FeedIItem';
import {medicineWatcherSaga} from './Medicine'
import { onBoardingWatcherSaga } from '../sagas/onBoarding' 
import {personalInformationWatcherSaga} from './PersonalInformation';
import {userWatcherSaga} from './User'
import {summaryWatcherSaga} from './Summary'
import {all} from 'redux-saga/effects';


export default function* rootSaga() {
  yield all([
    userWatcherSaga(),
    milkWatcherSaga(),
    animalWatcherSaga(),
    medicineWatcherSaga(),
    feedItemWatcherSaga(),
    onBoardingWatcherSaga(),
    personalInformationWatcherSaga(),
    summaryWatcherSaga()
  ]);
}
