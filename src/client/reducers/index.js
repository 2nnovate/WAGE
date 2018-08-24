import authentication from './authentication';
import store from './store';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    store
});
