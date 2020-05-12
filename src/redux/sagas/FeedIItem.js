import {Alert} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';
import network from '../../services/network';
import constant from '../constant/Index';
import {formatDate} from '../../conversions/Index';

async function serverErrorDialogue(message) {
  Alert.alert('Sorry', message, [{text: 'OK'}], {cancelable: false});
}

async function modifyFeedItemData(response) {
  var data = [];
  for (let i = 0; i < response.length; i++) {
    for (let e of response[i].feed) {
      let feedObject = e;
      feedObject.feedItemDateId = response[i]._id;
      feedObject.date = response[i].date;
      data.push(feedObject);
    }
  }

  return await data;
}

async function getFeedItemDate(response, payload) {
  for (let x of response.data) {
    if (
      (await new Date(formatDate(x.date)).getTime()) ==
      new Date(formatDate(payload)).getTime()
    ) {
      console.log(new Date(formatDate(x.date)).getTime(), 'x.date');
      console.log(new Date(formatDate(payload)).getTime(), 'payload');
      return await {date: x.date, id: x._id};
    }
  }

  return await null;
}

function* addFeedItemDate(action) {
  var response = yield call(network.get, 'modules/feeddate');

  if (response.error) {
    serverErrorDialogue(response.errorMessage);

    yield put({
      type: constant.ADD_FEED_ITEM_DATE_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    var dateItem = yield call(getFeedItemDate, response, action.payload.date);

    if (dateItem == null) {
      response = yield call(network.post, 'modules/feeddate', action.payload);

      if (response.error) {
        serverErrorDialogue(response.errorMessage);

        yield put({
          type: constant.ADD_FEED_ITEM_DATE_FAILURE,
          payload: response.errorMessage,
        });
      } else {
        yield put({
          type: constant.ADD_FEED_ITEM_DATE_SUCCESS,
          payload: {date: response.data.date, id: response.data._id},
        });
      }
    } else {
      yield put({
        type: constant.ADD_FEED_ITEM_DATE_SUCCESS,
        payload: dateItem,
      });
    }
  }
}


function* addFeedItem(action) {
  console.log(action, 'addFeedItem');

  const response = yield call(
    network.post,
    `modules/feeditem/${action.payload.feedItemDateId}`,
    action.payload.postBodyAddFeedItem,
  );

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.ADD_FEED_ITEM_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({type: constant.ADD_FEED_ITEM_SUCCESS});
  }
}

function* getFeedItem(action) {
  const response = yield call(network.get, 'modules/feeditem');

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.GET_FEED_ITEM_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    var modifyData = yield call(modifyFeedItemData, response.data);
    console.log(modifyData, 'modifyFeedItemData');
    const fromDate = new Date(action.payload.fromDate);
    const toDate = new Date(action.payload.toDate);

    const data = modifyData.filter(x => {
      const currentDate = new Date(x.date);
      if (currentDate >= fromDate && currentDate <= toDate) {
        return x;
      }
    });

    yield put({
      type: constant.GET_FEED_ITEM_SUCCESS,
      payload: data,
    });
  }
}

function* deleteFeed(action) {


  const response = yield call(
    network.delete,
    `modules/feeditem/${action.payload.feedItemDateId}/${
      action.payload.feedItemId
    }`,
    action.payload.postBodyEditFeedItem,
  );
  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.DELETE_FEED_ITEM_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.DELETE_FEED_ITEM_SUCCESS,
    });
  }
}

function* editFeedItem(action) {
  console.log(action, 'editFeedItem');
  const response = yield call(
    network.patch,
    `modules/feeditem/${action.payload.feedItemDateId}/${action.payload.feedItemId}`,
    action.payload.postBodyEditFeedItem,
  );

  console.log()

  if (response.error) {
    serverErrorDialogue(response.errorMessage);
    yield put({
      type: constant.EDIT_FEED_ITEM_FAILURE,
      payload: response.errorMessage,
    });
  } else {
    yield put({
      type: constant.EDIT_FEED_ITEM_SUCCESS,
    });
  }
}



function* feedItemWatcherSaga() {

  yield takeLatest(constant.ADD_FEED_ITEM_START, addFeedItem);
  yield takeLatest(constant.GET_FEED_ITEM_START, getFeedItem);
  yield takeLatest(constant.ADD_FEED_ITEM_DATE_START, addFeedItemDate);
  yield takeLatest(constant.EDIT_FEED_ITEM_START, editFeedItem);
  yield takeLatest(constant.DELETE_FEED_ITEM_START, deleteFeed);
}

export {feedItemWatcherSaga};
