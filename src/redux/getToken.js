import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const loadTokenFromStorage = () => {
  if (typeof window === "undefined") return "";
  const savedToken = localStorage.getItem('token');
  const savedResendToken =  localStorage.getItem('resendToken');
  return {savedToken: savedToken || '', savedResendToken: savedResendToken || ''};
}

const saveTokenToStorage = (token = '', resendToken = '') => {
  if (typeof window === "undefined") return "";
  localStorage.setItem('token', token);
  localStorage.setItem('resendToken', resendToken);
}

export const getToken = createAsyncThunk(
  'token/getTokenData',
  async ({ formValue, activeTab }, { rejectWithValue }) => {
    try {
      const tokenData = await api.authorization(formValue, activeTab);
      return tokenData;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
  }
); 

const getTokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: loadTokenFromStorage().savedToken,
    resendToken: loadTokenFromStorage().savedResendToken,
    loading: false,
    error: null,
    message: null,
  },
    
  reducers: {
    cleanToken: (state) => {
      state.token = '';
      state.resendToken = '';
      // console.log(action);
      saveTokenToStorage(state.token, state.resendToken);
      state.message = null;
      state.error = null;
      localStorage.setItem('tz', '');
    }
  },

  extraReducers: buider => {
    buider
      .addCase(getToken.pending, state => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token
        state.resendToken = action.payload.resendToken;
        saveTokenToStorage(state.token, state.resendToken);
        state.message = action.payload.message;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? {status: action.payload.status, error: action.payload.statusText}
          : {status: 500, error: 'Неизвестная ошибка'};
        state.message = action.payload?.data?.error || 'Неизвестная ошибка';
      })
  },
});

export const { cleanToken } = getTokenSlice.actions;
export default getTokenSlice.reducer;