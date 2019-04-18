import { put, takeEvery, call, fork, delay, all } from 'redux-saga/effects';
import { removeTokenFromPersistedState } from 'utils/helpers';
import { actions } from 'modules/app';
import * as api from 'utils/api';

// Sagas
function* logUserIn() {
  try {
    const result = yield call(api.checkResponse);
    if (result) {
      yield put(actions.logUserIn(result));
      // yield delay(50);
      // yield call(api.removeHash());
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchLoginAttempt() {
  yield takeEvery(actions.USER_ATTEMPT_LOGIN, logUserIn);
}

function* receiveListing(action) {
  try {
    const { payload } = action;
    const { token, path } = payload;

    const listing = yield call(api.requestListing, token, path);
    yield put(actions.receiveListing(listing, path));
  } catch (err) {
    console.log(err);
  }
}

function* watchRequestListing() {
  yield takeEvery(actions.LISTING_REQUEST, receiveListing);
}

function* logUserOut() {
  try {
    yield call(removeTokenFromPersistedState);
    yield delay(1500);
    yield put(actions.logUserOut());
  } catch (err) {
    console.log(err);
  }
}

function* watchRequestLogout() {
  yield takeEvery(actions.USER_REQUEST_LOGOUT, logUserOut);
}

// Root saga
export default function* rootSaga() {
  yield all([fork(watchLoginAttempt), fork(watchRequestListing), fork(watchRequestLogout)]);
}
