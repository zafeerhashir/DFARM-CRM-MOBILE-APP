import {watchGetMilk, watchAnimal} from './milk/Index';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([watchGetMilk(), watchAnimal()]);
}
