import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { userDataReducer } from './reducers/userDataReducer';

export default store = configureStore({
    reducer: {
        authReducer,
        userDataReducer
    }
}) 