import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
    loading: false,
    error: null,
    summaryData: {},
    message: null
}

export const getSummaryInfo = createAsyncThunk(
  'analitics/getSummaryInfo',
  async ({token}, { rejectWithValue }) => {
    try {
      const dashboard = await api.getSummary(token);
      return dashboard.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
  } 
);

const summarySlice = createSlice({
    name: 'summaryInfo',
    initialState,
    reducers: {
        resetDataDashboard: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getSummaryInfo.pending, (state, action) => {
            if (!action.meta.arg?.silent) {
              state.loading = true;
            }
            state.error = null;
        })
        .addCase(getSummaryInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.summaryData = action.payload.summaryData;
            state.message = action.payload.message;
        })
        .addCase(getSummaryInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload 
            ? {status: action.payload.status, error: action.payload.statusText}
            : {status: 500, error: 'Неизвестная ошибка'};
            state.message = action.payload?.data?.error || 'Неизвестная ошибка';
        })
    },
});

export const {resetDataDashboard} = summarySlice.actions;
export default summarySlice.reducer;