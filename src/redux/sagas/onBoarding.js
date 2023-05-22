import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';
import AsyncStorage from '@react-native-community/async-storage';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{ text: 'OK' }], { cancelable: false });
}

async function saveUser(response) {
  await AsyncStorage.multiSet([
    ['userToken', response.data.document.token],
    ['user', JSON.stringify(response.data.document)],
  ]);
}

async function getUser() {
  let user = await AsyncStorage.getItem('user')
  return await JSON.parse(user);
}

async function clearStorage() {
  await AsyncStorage.clear()
}

function* login(action) {
  ;
  const response = yield call(network.post, `onboarding/login`, action.payload);

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.LOGIN_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield call(saveUser, response);
    yield put({ type: constant.LOGIN_SUCCESS, payload: response.data.document });
  }
}


function* logout() {

  // let user = yield  call(getUser)

  // 

  // const response = yield call(network.get, `modules/user/logout/${user._id}`);

  // if (response.error) {
  //   serverErrorDialogue(response.errorMessage);
  //   yield put({
  //     type: constant.LOGOUT_FAILURE,
  //     payload: response.errorMessage,
  //   });
  // } else {
  yield call(clearStorage)
  yield put({ type: constant.LOGOUT_SUCCESS });
  // }


}
function* restoreToken() {

  let user = yield call(getUser)
  if (user == null) {
    yield put({ type: constant.RESTORE_TOKEN_FAILURE });

  }
  else {
    yield put({ type: constant.RESTORE_TOKEN_SUCCESS, payload: user });
  }
}

function* onBoardingWatcherSaga() {
  yield takeLatest(constant.LOGIN_START, login);
  yield takeLatest(constant.RESTORE_TOKEN_START, restoreToken);
  yield takeLatest(constant.LOGOUT_START, logout);
}

export { onBoardingWatcherSaga };
