import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{text: 'OK'}], {cancelable: false});
}


function* login(action) {
    
  console.log(action, 'addMilk');
  const response = yield call(
    network.post,
    `modules/milk/${action.payload.animalTagId}`,
    action.payload.postBodyAddMilk,
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






function* onBoardingWatcherSaga() {

  yield takeLatest(constant.LOGIN_START, login);

}

export { onBoardingWatcherSaga };

