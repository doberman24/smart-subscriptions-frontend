import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  summaryData: {},
  loading: false,
  error: null,
  message: null
};

export const getAnalytics = createAsyncThunk(
  'analitics/getAnaliticData',
  async ({token, filter}, { rejectWithValue }) => {
    try {
      const analytics = await api.getAnalyticsData(token, filter);
      return analytics.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
  } 
);

const analyticsSlice = createSlice({
  name: 'analyticsData',
  initialState,
  reducers: {
    resetDataAnalitics: (state) => {
      Object.assign(state, initialState)
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getAnalytics.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAnalytics.fulfilled, (state, action) => {
      state.loading = false;
      state.summaryData = action.payload.summaryData;
      state.message = action.payload.message;
    })
    .addCase(getAnalytics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Неизвестная ошибка';
    })
  },
});

export const {resetDataAnalitics} = analyticsSlice.actions;
export default analyticsSlice.reducer;