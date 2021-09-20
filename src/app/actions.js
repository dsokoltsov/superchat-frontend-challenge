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

export function setEmojiAction(data) {
  return { type: actionTypes.SET_EMOJI, data };
}

export function setColorAction(data) {
  return { type: actionTypes.SET_COLOR, data };
}
