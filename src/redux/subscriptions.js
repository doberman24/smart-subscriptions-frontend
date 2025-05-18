import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  subscriptionsList: [],
  loading: false,
  error: null,
  message: null
};

export const getSubscriptions = createAsyncThunk(
  'subscriptions/getSubscriptions',
  async (token, { rejectWithValue }) => {
    try {
      const subscriptions = await api.getSubscriptionsData(token);
      return subscriptions.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
  } 
);

export const addNewSubscription = createAsyncThunk(
  'subscriptions/addSubscriptions',
  async ({formData, token}, { rejectWithValue }) => {
    try {
      const subscriptions = await api.createSubscription(token, formData);
      return subscriptions.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
  } 
);

export const deleteSubscription = createAsyncThunk(
  'subscriptions/deleteSubscriptions',
  async ({token, idCard}, { rejectWithValue }) => {
    try {
      const subscriptions = await api.deleteSubscriptionData(token, idCard);
      return subscriptions.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
  } 
);


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
      state.subscriptionsList = action.payload;
    })
    .addCase(fetchSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(getSubscriptions.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptionsList = action.payload.subscriptionsData;
      state.message = action.payload.message;
    })
    .addCase(getSubscriptions.rejected, (state, action) => {
      state.loading = false;
       state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Неизвестная ошибка';
    })

    .addCase(addNewSubscription.pending, state => {
      state.error = null;
    })
    .addCase(addNewSubscription.fulfilled, (state, action) => {
      state.subscriptionsList = action.payload.subscriptionsData;
      state.message = action.payload.message;
    })
    .addCase(addNewSubscription.rejected, (state, action) => {
       state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Неизвестная ошибка';
    })
    
    .addCase(deleteSubscription.pending, state => {
      state.error = null;
    })
    .addCase(deleteSubscription.fulfilled, (state, action) => {
      state.subscriptionsList = action.payload.subscriptionsData;
      state.message = action.payload.message;
    })
    .addCase(deleteSubscription.rejected, (state, action) => {
       state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Неизвестная ошибка';
    })
  },
})

export default subscriptionsSlice.reducer;