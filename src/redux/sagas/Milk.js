import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{text: 'OK'}], {cancelable: false});
}

async function modifyMilkData(response) {
  return await response.filter((x) => x.animal !== null )
}

function* getMilk() {
  const response = yield call(network.get, 'modules/milk');

  if (response.error) {
    serverErrorDialogue(response.errorMessage);

    yield put({
      type: constant.GET_MILK_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    var data = yield call(modifyMilkData, response.data);
    alert(JSON.stringify(data))
    console.log(response.data, 'modifyMilkData');
    yield put({
      type: constant.GET_MILK_SUCCESS,
      payload: data,
    });
  }
}

function* addMilk(action) {
  console.log(action, 'addMilk');
  const response = yield call(
    network.post,
    `modules/milk`,
    action.payload,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.ADD_Milk_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({type: constant.ADD_MILK_SUCCESS});
  }
}


function* filterMilkPerDayData(action) {
  const response = yield call(network.get, 'modules/milk');
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.FILTER_MILK_PER_DAY_DATA_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    var modifyData = response.data.filter((x) => x.animal === null)
    console.log(modifyData, 'modifyMilkperdayData');
    const fromDate = new Date(action.payload.fromDate);
    const toDate = new Date(action.payload.toDate);

    const data = modifyData.filter(x => {
      const currentDate = new Date(x.date);
      if (currentDate >= fromDate && currentDate <= toDate) {
        return x;
      }
    });

    yield put({
      type: constant.FILTER_MILK_PER_DAY_DATA_SUCCESS,
      payload: data,
    });
  }
}


function* filterMilkData(action) {
  const response = yield call(network.get, 'modules/milk');
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.FILTER_MILK_DATA_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    var modifyData = yield call(modifyMilkData, response.data);
    console.log(modifyData, 'modifyMilkData');
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
}

function* deleteMilk(action) {
  console.log(action, 'deleteMilk');

  const response = yield call(
    network.delete,
    `modules/milk/${action.payload.animalTagId}}`,
  );
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.DELETE_MILK_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.DELETE_MILK_SUCCESS,
    });
  }
}

function* editMilk(action) {
  console.log(action, 'editMilk');

  const response = yield call(
    network.patch,
    `modules/milk/${action.payload.animalTagId}`,
    action.payload.postBodyEditMilk,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.EDIT_MILK_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.EDIT_MILK_SUCCESS,
    });
  }
}

function* getAnimalTag() {
  const response = yield call(network.get, 'modules/animal');

  if (response.error) {
    serverErrorDialogue(response.errorMessage);

    yield put({
      type: constant.GET_ANIMAL_TAG_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    console.log(response.data, 'GET_ANIMAL_SUCCESS');

    yield put({
      type: constant.GET_ANIMAL_TAG_SUCCESS,
      payload: response.data,
    });
  }
}

function* milkWatcherSaga() {
  yield takeLatest(constant.FILTER_MILK_PER_DAY_DATA_START, filterMilkPerDayData);
  yield takeLatest(constant.FILTER_MILK_DATA_START, filterMilkData);
  yield takeLatest(constant.GET_MILK_START, getMilk);
  yield takeLatest(constant.ADD_MILK_START, addMilk);
  yield takeLatest(constant.DELETE_MILK_START, deleteMilk);
  yield takeLatest(constant.EDIT_MILK_START, editMilk);
  yield takeLatest(constant.GET_ANIMAL_TAG_START, getAnimalTag);
}

export { milkWatcherSaga };

