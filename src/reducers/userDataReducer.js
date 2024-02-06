import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const userDataReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('updateUserData', (state, action) => {
            Object.assign(state, action.payload);
        });
});
