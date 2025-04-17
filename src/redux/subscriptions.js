import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getSubscriptionsData();
      return data;      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
    .addCase(fetchSubscriptions.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptions = action.payload;
    })
    .addCase(fetchSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
})

export default subscriptionsSlice.reducer;