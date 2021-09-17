import actionTypes from './actionTypes';

const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUESTED_USER_DATA:
      return {
        ...state,
      };
    case actionTypes.REQUESTED_USER_DATA_SUCCEEDED:
      return {
        ...state,
        user: action.data,
      };
    case actionTypes.REQUESTED_USER_DATA_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}