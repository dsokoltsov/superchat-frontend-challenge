import actionTypes from './actionTypes';

export function requestUserData() {
  return { type: actionTypes.REQUESTED_USER_DATA };
}
export function requestUserDataSuccess(data) {
  return { type: actionTypes.REQUESTED_USER_DATA_SUCCEEDED, data };
}
export function requestUserDataError() {
  return { type: actionTypes.REQUESTED_USER_DATA_FAILED };
}
export const fetchUserDataAction = (data) => ({ type: actionTypes.FETCHED_USER_DATA, data });