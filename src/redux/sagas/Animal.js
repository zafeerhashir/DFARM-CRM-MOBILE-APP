import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{ text: 'OK' }], { cancelable: false });
}

function* getAnimal() {
  const response = yield call(network.get, 'modules/animal');

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.GET_ANIMAL_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.GET_ANIMAL_SUCCESS,
      payload: response.data,
    });
  }
}

function* getAnimalMilk(action) {

  const response = yield call(network.get, 'modules/animal');
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.GET_ANIMAL_MILK_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    var filterData = response.data.filter(
      x => x._id == action.payload.animalTagId,
    );
    ;
    const fromDate = new Date(action.payload.fromDate);
    const toDate = new Date(action.payload.toDate);

    const data = filterData.pop().milk.filter(x => {
      const currentDate = new Date(x.date);
      if (currentDate >= fromDate && currentDate <= toDate) {
        return x;
      }
    });

    yield put({
      type: constant.GET_ANIMAL_MILK_SUCCESS,
      payload: data,
    });
  }
}

function* addAnimal(action) {
  ;
  const response = yield call(network.post, `modules/animal`, action.payload);

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.ADD_ANIMAL_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({ type: constant.ADD_ANIMAL_SUCCESS });
  }
}

function* deleteAnimal(action) {
  ;

  const response = yield call(
    network.delete,
    `modules/animal/${action.payload.animalTagId}`,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.DELETE_ANIMAL_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.DELETE_ANIMAL_SUCCESS,
    });
  }
}

function* editAnimal(action) {
  ;

  const response = yield call(
    network.patch,
    `modules/animal/${action.payload.animalTagId}`,
    action.payload.postBodyEditAnimal,
  );


  ;

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.EDIT_ANIMAL_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.EDIT_ANIMAL_SUCCESS,
    });
  }
}

function* animalWatcherSaga() {
  yield takeLatest(constant.ADD_ANIMAL_START, addAnimal);
  yield takeLatest(constant.EDIT_ANIMAL_START, editAnimal);
  yield takeLatest(constant.DELETE_ANIMAL_START, deleteAnimal);
  yield takeLatest(constant.GET_ANIMAL_START, getAnimal);
  yield takeLatest(constant.GET_ANIMAL_MILK_START, getAnimalMilk);
}
export { animalWatcherSaga };
