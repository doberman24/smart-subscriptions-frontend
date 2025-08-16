import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  summaryData: {},
  details: {},
  loading: false,
  error: null,
  message: null
};

export const getAnalytics = createAsyncThunk(
  'analytics/getAnalyticsData',
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

export const getAnalyticsSubscription = createAsyncThunk(
  'analytics/getSubscription',
  async ({token, id}, { rejectWithValue }) => {
    try {
      const info = await api.getInfoSubscription(token, id);
      return info.data;
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
      Object.assign(state, initialState);
    },
    resetDetails: (state) => {
      state.details = {};
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

    .addCase(getAnalyticsSubscription.pending, state => {
      state.loading = false;
      state.error = null;
    })
    .addCase(getAnalyticsSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload;
      state.message = action.payload.message;
    })
    .addCase(getAnalyticsSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Неизвестная ошибка';
    })
  },
});

export const {resetDataAnalitics, resetDetails} = analyticsSlice.actions;
export default analyticsSlice.reducer;