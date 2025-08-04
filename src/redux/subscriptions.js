import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  subscriptionsList: [],
  loading: false,
  error: null,
  message: null
};

const handleError = (error) => ({
  status: error.response?.status,
  statusText: error.response?.statusText,
  data: error.response?.data
})

export const getSubscriptions = createAsyncThunk(
  'subscriptions/getSubscriptions',
  async (token, { rejectWithValue }) => {
    try {
      const subscriptions = await api.getSubscriptionsData(token);
      return subscriptions.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  } 
);

export const oneHandleSubscription = createAsyncThunk(
  'subscriptions/addSubscriptions',
  async ({formData, token, action}, { rejectWithValue }) => {
    try {
      const subscriptions = await api.handleSubscription(token, formData, action);
      return subscriptions.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
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
      return rejectWithValue(handleError(error));
    }
  } 
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    resetDataSubscription: (state) => {
      Object.assign(state, initialState)
    }
  },
  extraReducers: builder => {
    const asyncThunks = [
      getSubscriptions,
      oneHandleSubscription,
      deleteSubscription,
    ];

    asyncThunks.forEach(thunk => {
      builder
      .addCase(thunk.pending, state => {
        state.loading = thunk === getSubscriptions;
        state.error = null;
      })
      .addCase(thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionsList = action.payload.subscriptionsData;
        state.message = action.payload.message;
      })
      .addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload 
          ? {status: action.payload.status, error: action.payload.statusText}
          : {status: 500, error: 'Неизвестная ошибка'};
        state.message = action.payload?.data?.error || 'Неизвестная ошибка';
      });
    });
    
  },
})

export const { resetDataSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;