import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{ text: 'OK' }], { cancelable: false });
}


function* changePassword(action) {

  ;
  const response = yield call(
    network.post,
    `modules/user/changepassword/${action.payload.userId}`,
    action.payload.postBodyPersonalInformation);

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.CHANGE_PASSWORD_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({ type: constant.CHANGE_PASSWORD_SUCCESS });
  }
}






function* personalInformationWatcherSaga() {

  yield takeLatest(constant.CHANGE_PASSWORD_START, changePassword);

}

export { personalInformationWatcherSaga };

