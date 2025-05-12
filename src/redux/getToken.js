import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const loadTokenFromStorage = () => {
  const savedToken = localStorage.getItem('token');
  // console.log(savedToken);
  return savedToken ? savedToken : '';
}

const saveTokenToStorage = (token) => {
  localStorage.setItem('token', token);
}

export const getToken = createAsyncThunk(
  'token/getTokenData',
  async ({ formValue, activeTab }, { rejectWithValue }) => {
    try {
      const token = await api.authorization(formValue, activeTab);
      return token;
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
    token: loadTokenFromStorage(),
    loading: false,
    error: null,
    message: null,
  },
    
  reducers: {
    cleanToken: (state) => {
      state.token = null;
      // console.log(action);
      saveTokenToStorage(state.token);
      state.message = null;
      state.error = null;
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
        state.token = action.payload.token;
        saveTokenToStorage(state.token);
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