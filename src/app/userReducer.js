import actionTypes from './actionTypes';

const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUESTED_USER_DATA:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case actionTypes.REQUESTED_USER_DATA_SUCCEEDED:
      return {
        ...state,
        user: action.data,
        isError: false,
        isLoading: false,
      };
    case actionTypes.REQUESTED_USER_DATA_FAILED:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
}