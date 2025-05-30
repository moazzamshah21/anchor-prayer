import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import CommonReducer from '../reducers/Common/CommonReducer';
import {configureStore} from '@reduxjs/toolkit';
import GroupReducer from '../reducers/Group/GroupReducer';

const rootReducer = combineReducers({
  CommonReducer,
  GroupReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
