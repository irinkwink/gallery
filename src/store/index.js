import {tokenMiddleware, tokenReducer} from './tokenReducer';
import {authReducer} from './auth/authReducer';
import {errorsReducer} from './errorsReducer';
import photosReducer from './photos/photosSlice';
import photoReducer from './photo/photoSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    errors: errorsReducer,
    photos: photosReducer,
    photo: photoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware)
});

