import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// here we created globle store which we will provide into our App.js as provinder so that can be accessasble to all it's chils components
const store = configureStore({
    reducer: {
        users: userReducer,
    },
});

export default store;
