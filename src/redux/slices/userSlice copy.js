// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     users: [],
//     page: 1,
//     loading: false,
//     error: null,
// };

// // export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page, { rejectWithValue }) => {
// //     try {
// //         console.log("fetchUsers Called");
// //         const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);
// //         console.log("response of thunk api call => ", response);
// //         return response.data.results;
// //     } catch (error) {
// //         return rejectWithValue(error.response.data);
// //     }
// // });

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page, { rejectWithValue }) => {
//     try {
//         console.log("fetchUsers Called");
//         const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);
//         console.log("response of thunk api call => ", response);
//         return response.data.results;
//     } catch (error) {
//         console.log("Error during API call =>", error);
//         return rejectWithValue(error.response ? error.response.data : error.message);
//     }
// });


// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         resetUsers: (state) => {
//             state.users = [];
//             state.page = 1;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUsers.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.users = [...state.users, ...action.payload];
//                 state.page += 1;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { resetUsers } = userSlice.actions;

// export const selectUsers = (state) => state.users.users;
// export const selectPage = (state) => state.users.page;
// export const selectLoading = (state) => state.users.loading;

// export default userSlice.reducer;


// usersSlice.js (Simplified Example)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// // Async thunk for fetching users
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page) => {
//     const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);
//     return response.data.results;
// });

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page, thunkAPI) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page}`);
        return response.data.results;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        hasMore: true, // For tracking if there are more users to load
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
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
