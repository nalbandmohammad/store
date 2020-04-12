import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import UserReducer from '../users/user.reducer';
import CartReducer from '../cart/cart.reducer';
import DirectoryReducer from '../directory/directory.reducer';
import ShopReducer from '../shop/shop.reduer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootreducer = combineReducers({
    user: UserReducer,
    cart: CartReducer,
    directory: DirectoryReducer,
    shop: ShopReducer
})

export default persistReducer(persistConfig,rootreducer);