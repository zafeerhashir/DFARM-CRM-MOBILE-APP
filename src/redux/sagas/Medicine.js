import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{ text: 'OK' }], { cancelable: false });
}

// async function modifyMEDICINEData(response) {
//   return await response.filter((x) => x.animal !== null )
// }

function* getMedicine() {
  const response = yield call(network.get, 'modules/medicine');

  if (response.error) {
    serverErrorDialogue(response.errorMessage);

    yield put({
      type: constant.GET_MEDICINE_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    // var data = yield call(modifyMEDICINEData, response.data);
    alert(JSON.stringify(data))
      ;
    yield put({
      type: constant.GET_MEDICINE_SUCCESS,
      payload: response.data,
    });
  }
}

function* addMedicine(action) {
  ;
  const response = yield call(
    network.post,
    `modules/medicine`,
    action.payload,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.ADD_MEDICINE_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({ type: constant.ADD_MEDICINE_SUCCESS });
  }
}



function* filterMedicineData(action) {
  const response = yield call(network.get, 'modules/medicine');
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.FILTER_MEDICINE_DATA_FAILURE,
      payload: response.errorMessage,
    });
  } else {

    const fromDate = new Date(action.payload.fromDate);
    const toDate = new Date(action.payload.toDate);

    const data = response.data.filter(x => {
      const currentDate = new Date(x.date);
      if (currentDate >= fromDate && currentDate <= toDate) {
        return x;
      }
    });

    yield put({
      type: constant.FILTER_MEDICINE_DATA_SUCCESS,
      payload: data,
    });
  }
}

function* deleteMedicine(action) {
  ;

  const response = yield call(
    network.delete,
    `modules/medicine/${action.payload.id}`,
  );
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.DELETE_MEDICINE_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.DELETE_MEDICINE_SUCCESS,
    });
  }
}

function* editMedicine(action) {
  ;

  const response = yield call(
    network.patch,
    `modules/medicine/${action.payload.id}`,
    action.payload.postBodyEditMedicine,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.EDIT_MEDICINE_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.EDIT_MEDICINE_SUCCESS,
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
    ;

    yield put({
      type: constant.GET_ANIMAL_TAG_SUCCESS,
      payload: response.data,
    });
  }
}

function* medicineWatcherSaga() {
  yield takeLatest(constant.FILTER_MEDICINE_DATA_START, filterMedicineData);
  yield takeLatest(constant.GET_MEDICINE_START, getMedicine);
  yield takeLatest(constant.ADD_MEDICINE_START, addMedicine);
  yield takeLatest(constant.DELETE_MEDICINE_START, deleteMedicine);
  yield takeLatest(constant.EDIT_MEDICINE_START, editMedicine);
  yield takeLatest(constant.GET_ANIMAL_TAG_START, getAnimalTag);
}

export { medicineWatcherSaga };

