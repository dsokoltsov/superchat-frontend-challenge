import actionTypes from './actionTypes';

const initialState = {
  card: {},
};

export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_COLOR:
      return {
        ...state,
        card: { ...state.card, color: action.data },
      };
    case actionTypes.SET_EMOJI:
      return {
        ...state,
        card: { ...state.card, emoji: action.data },
      };
    default:
      return state;
  }
}