import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './counter/counter';
import authReducer from './counter/authenticate';
import modeReducer from './counter/mode';
import modalReducer from './counter/modal';

export default configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    mode: modeReducer,
    modal: modalReducer,
  },
});
