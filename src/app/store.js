import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './userReducer';
import cardReducer from './cardReducer'

import rootSaga from '../saga/rootSaga';

const rootReducer = combineReducers({
  userReducer,
  cardReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  // composeWithDevTools(),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
