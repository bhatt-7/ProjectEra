import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
    friendRequests: [],
    loading: false,
    error: null,
};

// Async actions
export const sendFriendRequest = createAsyncThunk('friendRequest/sendFriendRequest', async ({ fromUserId, toUserId }) => {
    const response = await axios.post('/api/friendRequests', { fromUserId, toUserId });
    return response.data;
});

export const acceptFriendRequest = createAsyncThunk('friendRequest/acceptFriendRequest', async (requestId) => {
    const response = await axios.put(`/api/friendRequests/${requestId}/accept`);
    return response.data;
});

export const rejectFriendRequest = createAsyncThunk('friendRequest/rejectFriendRequest', async (requestId) => {
    const response = await axios.put(`/api/friendRequests/${requestId}/reject`);
    return response.data;
});

export const removeFriend = createAsyncThunk('friendRequest/removeFriend', async (requestId) => {
    const response = await axios.delete(`/api/friendRequests/${requestId}`);
    return response.data;
});

// Create slice
const friendRequestSlice = createSlice({
    name: 'friendRequest',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests.push(action.payload);
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(acceptFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.friendRequests.findIndex(request => request._id === action.payload._id);
                if (index !== -1) state.friendRequests[index] = action.payload;
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(rejectFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.friendRequests.findIndex(request => request._id === action.payload._id);
                if (index !== -1) state.friendRequests[index] = action.payload;
            })
            .addCase(rejectFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeFriend.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests = state.friendRequests.filter(request => request._id !== action.payload._id);
            })
            .addCase(removeFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default friendRequestSlice.reducer;
