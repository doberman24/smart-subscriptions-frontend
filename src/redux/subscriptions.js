import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "@/api/api";

const initialState = {
    subscriptions: {},
    analytics: {},
    loading: false,
    error: null,
}

const api = new Api();

export const fetchSubscriptions = createAsyncThunk(
    'subscriptions/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const subscriptions = await api.getUserData();
            return subscriptions;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSubscriptions.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload.subscriptions;
                state.analytics = action.payload.analytics;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default subscriptionsSlice.reducer;