import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isUserLoggedIn: false,
    token: null,
};

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('loginUser', (state, action) => {
            state.isUserLoggedIn = true;
        })
        .addCase('logoutUser', (state) => {
            state.isUserLoggedIn = false;
        })
        .addCase('addToken', (state, action) => {
            state.token = action.payload;
        })
});
