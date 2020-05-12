import {milkWatcherSaga} from './Milk';
import {animalWatcherSaga} from './Animal';
import { feedItemWatcherSaga } from './FeedIItem';
import { all } from 'redux-saga/effects';


export default function* rootSaga() {
  yield all([milkWatcherSaga(), animalWatcherSaga(),feedItemWatcherSaga()]);
}
