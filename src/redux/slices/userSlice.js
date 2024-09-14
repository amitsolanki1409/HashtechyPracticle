import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page, thunkAPI) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);
        return response.data.results;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// creating slice to get the data into the store
const userSlice = createSlice({
    name: 'users',
    // initialStates
    initialState: {
        users: [],
        loading: false,
        hasMore: true,
        error: null,
    },
    // extraReducers are used to get Promise like funtionality that we can get states like pending, rejected or completed means fulfilled the API response.
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            // actions.meta.arg weill get the passed page means for refresh we passing the page = 1
            if (action.meta.arg === 1) {
                // If it's a pull-to-refresh or the first load, reset the users list
                state.users = action.payload;
            } else {
                // Append new users to the list for infinite scroll
                state.users = [...state.users, ...action.payload];
            }
            // Check if we have more users to load
            if (action.payload.length === 0) {
                state.hasMore = false;
            }
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("Error => ", action.payload)
        });
    },
});

export default userSlice.reducer;
