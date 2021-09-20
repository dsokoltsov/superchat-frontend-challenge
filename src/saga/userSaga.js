import {
  call, put, fork, takeEvery,
} from 'redux-saga/effects';
import {
  requestUserData,
  requestUserDataSuccess,
  requestUserDataError,
} from '../app/actions';
import { fetchUserData, fetchContributorsData } from '../utilities/api';
import actionTypes from '../app/actionTypes';

function* fetchUserDataAsync(action) {
  try {
    yield put(requestUserData());
    const response = yield call(fetchUserData, action.data);
    const contributorsResponse = yield call(fetchContributorsData, response.data?.contributors_url ?? false);
    localStorage.setItem('user', JSON.stringify({...response.data, contributors: contributorsResponse.data}));
    yield put(requestUserDataSuccess({...response.data, contributors: contributorsResponse.data}));
  } catch (error) {
    yield put(requestUserDataError());
  }
}

export default function* watchFetchUserData() {
  yield takeEvery(actionTypes.FETCHED_USER_DATA, fetchUserDataAsync);
}
export const userSaga = [fork(watchFetchUserData)];


// hexlet-codebattle  battle_asserts