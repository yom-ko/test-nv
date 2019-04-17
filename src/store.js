import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from 'modules/reducers';

const enhancers = [];

const middleware = [];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

// create the store
export default createStore(rootReducer, composedEnhancers);
