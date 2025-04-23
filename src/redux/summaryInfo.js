import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
    subscriptions: {},
    analytics: {},
    loading: false,
    error: null,
}

export const fetchSummary = createAsyncThunk(
    'summaryInfo/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.getSummaryData();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const summarySlice = createSlice({
    name: 'summaryInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSummary.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.subscriptions = action.payload.subscriptions;
                state.analytics = action.payload.analytics;
            })
            .addCase(fetchSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default summarySlice.reducer;