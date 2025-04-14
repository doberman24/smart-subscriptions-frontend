import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
    user: {},
    subscriptions: {},
    analytics: {},
    loading: false,
    error: null,
}

// const api = new Api();

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const user = await api.getUserData();
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.subscriptions = action.payload.subscriptions;
                state.analytics = action.payload.analytics;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;