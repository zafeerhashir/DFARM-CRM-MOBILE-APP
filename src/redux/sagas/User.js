import {Alert} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{text: 'OK'}], {cancelable: false});
}

function* getUser() {
  const response = yield call(network.get, 'modules/user');
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.GET_USER_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.GET_USER_SUCCESS,
      payload: response.data.pop().user,
    });
  }
}

function* addUser(action) {
  const response = yield call(
    network.post,
    `onboarding/adduser/BASIC_USER`,
    action.payload,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.ADD_USER_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({type: constant.ADD_USER_SUCCESS});
  }
}

function* deleteUser(action) {
  const response = yield call(
    network.delete,
    `modules/user/${action.payload.userId}`,
  );
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.DELETE_USER_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.DELETE_USER_SUCCESS,
    });
  }
}

function* editUserPassword(action) {
  const response = yield call(
    network.post,
    `modules/user/changepassword/${action.payload.userId}`,
    action.payload.postBodyEditUserPassword,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.EDIT_USER_PASSWORD_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({type: constant.EDIT_USER_PASSWORD_SUCCESS});
  }
}

function* userWatcherSaga() {
  yield takeLatest(constant.ADD_USER_START, addUser);
  yield takeLatest(constant.EDIT_USER_PASSWORD_START, editUserPassword);
  yield takeLatest(constant.DELETE_USER_START, deleteUser);
  yield takeLatest(constant.GET_USER_START, getUser);
}
export {userWatcherSaga};
