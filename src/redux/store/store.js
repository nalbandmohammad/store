import {createStore, applyMiddleware} from 'redux';

import {persistStore} from 'redux-persist';

import logger from 'redux-logger';

import reducers from '../rootreducer/rootreducer';

const middleWares = []

if(process.env.NODE_ENV === 'development'){
    middleWares.push(logger);
}

export const store = createStore(reducers, applyMiddleware(...middleWares));

export const persistor = persistStore(store);

export default { store, persistor };