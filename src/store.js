import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import axios from 'axios';

const initialState = {};
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

axios.defaults.baseURL = 'http://localhost:8080';

export default store;
