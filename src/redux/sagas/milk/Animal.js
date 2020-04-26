import {call, put, takeLatest} from 'redux-saga/effects';
import network from '../../../services/network';
import constant from '../../constant/Index';

function* getAnimal() {
  try {
    const response = yield call(network.get, 'modules/animal');
    
    console.log(response,'GET_ANIMAL_SUCCESS')
    yield put({
      type: constant.GET_ANIMAL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: constant.GET_ANIMAL_FAILURE,
      payload: error,
    });
  }
}


function* watchAnimal() {
  yield takeLatest(constant.GET_ANIMAL_START, getAnimal);


}
export {watchAnimal};
