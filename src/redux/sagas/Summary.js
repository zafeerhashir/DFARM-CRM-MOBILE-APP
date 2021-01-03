import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{text: 'OK'}], {cancelable: false});
}



function* getSummary(action) {

  const { fromDate, toDate } = action.payload
  
  const response = yield call(network.get, `modules/report?fromdate=${fromDate}&todate=${toDate}`);
  console.log(response,'getSummary')

  if(response.error) {
    serverErrorDialogue(response.errorMessage);

    yield put({
      type: constant.GET_SUMMARY_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.GET_SUMMARY_SUCCESS,
      payload: response.data,
    });
    
  }
}

function* summaryWatcherSaga() {
  yield takeLatest(constant.GET_SUMMARY_START, getSummary);
}

export { summaryWatcherSaga };

