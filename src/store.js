import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'modules/reducers';
import rootSaga from 'modules/sagas';

const enhancers = [];

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

// create the store
export default createStore(rootReducer, composedEnhancers);

// run the saga
sagaMiddleware.run(rootSaga);
