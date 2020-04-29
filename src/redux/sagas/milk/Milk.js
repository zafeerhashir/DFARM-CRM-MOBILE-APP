import {call, put, takeLatest} from 'redux-saga/effects';
import network from '../../../services/network';
import constant from '../../constant/Index';

async function modifyMilkData(response) {
    var data = [];
    for (let i = 0; i < response.length; i++) {
      for (let e of response[i].milk) {
        let milkObject = e;
        milkObject.parentId = response[i]._id;
        milkObject.tag = response[i].tag;
        data.push(milkObject);
      }
    }

    return await data
}

function* getMilk() {
  try {
    const response = yield call(network.get, 'modules/milk');
    var data = yield call(modifyMilkData,response);

    yield put({
      type: constant.GET_MILK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error, 'getMilkEror');
    yield put({
      type: constant.GET_MILK_FAILURE,
      payload: error,
    });
  }
}

function* addMilk(action) {
  console.log(action, 'addMilk');

  try {
    const response = yield call(
      network.post,
      `modules/milk/${action.payload.animalTagId}`,
      action.payload.postBodyAddMilk,
    );
    var data = yield call(modifyMilkData,response);

    yield put({
      type: constant.ADD_MILK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: constant.ADD_Milk_FAILURE,
      payload: error,
    });
  }
}

function* filterMilkData(action) {
  try {
    const response = yield call(network.get, 'modules/milk');
    var modifyData = yield call(modifyMilkData,response);


  } catch (error) {
    yield put({
      type: constant.FILTER_MILK_DATA_FAILURE,
      payload: error,
    });
  }

  const fromDate = new Date(action.payload.fromDate);
  const toDate = new Date(action.payload.toDate);

  const data = modifyData.filter(x => {
    const currentDate = new Date(x.date);
    if (currentDate >= fromDate && currentDate <= toDate) {
      return x;
    }
  });

  yield put({
    type: constant.FILTER_MILK_DATA_SUCCESS,
    payload: data,
  });
}


function* deleteMilk(action) {
  console.log(action, 'deleteMilk');



  try {
    const response = yield call(
      network.delete,
      `modules/milk/${action.payload.parentId}/${action.payload._id}`,
    );
    yield put({
      type: constant.DELETE_MILK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: constant.DELETE_MILK_FAILURE,
      payload: error,
    });
  }
}


function* watchGetMilk() {
  yield takeLatest(constant.FILTER_MILK_DATA_START, filterMilkData);
  yield takeLatest(constant.GET_MILK_START, getMilk);
  yield takeLatest(constant.ADD_MILK_START, addMilk);
  yield takeLatest(constant.DELETE_MILK_START, deleteMilk);
}



export {watchGetMilk};
