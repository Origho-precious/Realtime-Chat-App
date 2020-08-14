import { combineReducers } from 'redux';
import { reducer } from 'redux-form'
import { signinReducer, messageReducer } from './chatReducer';

export default combineReducers({
    form: reducer,
    user: signinReducer,
    messages: messageReducer
})