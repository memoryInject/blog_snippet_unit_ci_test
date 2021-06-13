import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { blogListReducer, blogDetailsReducer } from './reducers/blogReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';

export const reducer = combineReducers({
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});

// Configure for localstorage on userLogin
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userLogin'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const initialState = {};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
