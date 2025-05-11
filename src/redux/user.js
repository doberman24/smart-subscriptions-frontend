import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  userData: {},
  loading: false,
  error: null,
  message: null
};

export const getUser = createAsyncThunk(
  'user/getUserData',
  async (token, { rejectWithValue }) => {
    try {
      const user = await api.getData(token);
      return user.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  } 
);

export const saveUserData = createAsyncThunk(
  'user/saveUserData',
  async ({userData, token}, { rejectWithValue }) => {
    try {
      const user = await api.saveData(userData, token);
      return user.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  } 
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateDataUser: (state, action) => {
      state.userData = action.payload.userData;
      state.message = action.payload.message;
      console.log(action.payload);
      // if (action.payload.status !== 200) {
      //   state.error = {status: action.payload.status, error: action.payload.statusText};
      //   state.message = action.payload.data?.error;
      // }
    },
    resetData: (state) => {
      state.userData = {};
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getUser.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload.userData;
      state.message = action.payload.message;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Ошибка при сохранении данных';
    })
    
    .addCase(saveUserData.pending, state => {
      state.error = null;
      state.message = null;
    })
    .addCase(saveUserData.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
      state.message = action.payload.message;
    })
    .addCase(saveUserData.rejected, (state, action) => {
      state.error = action.payload 
        ? {status: action.payload.status, error: action.payload.statusText}
        : {status: 500, error: 'Неизвестная ошибка'};
      state.message = action.payload?.data?.error || 'Ошибка при сохранении данных';
    });
  },
});

export const { updateDataUser, resetData } = userSlice.actions;
export default userSlice.reducer;