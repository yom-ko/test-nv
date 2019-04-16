import { put, takeEvery, fork, all, call } from 'redux-saga/effects';
import { actions } from 'modules/app';
import * as api from 'utils/api';

// Sagas
function* fetchListing(action) {
  try {
    const data = yield call(api.fetchListing, action.payload.url);
    yield put(actions.receiveListing(data));
  } catch (err) {
    console.log(err);
  }
}

function* watchListingRequests() {
  yield takeEvery(actions.LISTING_REQUEST, fetchListing);
}

// Root saga
export default function* rootSaga() {
  yield all([fork(watchListingRequests)]);
}
