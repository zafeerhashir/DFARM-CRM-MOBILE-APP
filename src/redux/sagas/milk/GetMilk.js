import {call, put, takeLatest} from 'redux-saga/effects';
import network from '../../../services/network';
import constant from '../../constant/Index';

function* getMilk() {
  try {
    const response = yield call(network.get, 'modules/milk');
    yield put({
      type: constant.GET_MILK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: constant.GET_MILK_FAILURE,
      payload: error,
    });
  }
}

function* addMilk(action) {

  console.log(action,'addMilk')

  try {
    const response = yield call(network.post, 'modules/milk/5e9dceba1c9d4400001e7d1c',action.payload);
    yield put({
      type: constant.ADD_MILK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: constant.ADD_MILK_FAILURE,
      payload: error,
    });
  }
}


function* watchGetMilk() {
  yield takeLatest(constant.GET_MILK_START, getMilk);
  yield takeLatest(constant.ADD_MILK_START, addMilk);

}
export {watchGetMilk};
