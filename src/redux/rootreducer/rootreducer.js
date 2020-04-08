import { combineReducers } from 'redux';

import UserReducer from '../users/user.reducer';

export default combineReducers({
    user: UserReducer
})