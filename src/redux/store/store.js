import {createStore, applyMiddleware} from 'redux';


import logger from 'redux-logger';

import reducers from '../rootreducer/rootreducer';

const middleWares = [logger]

const store = createStore(reducers, applyMiddleware(...middleWares));

export default store;