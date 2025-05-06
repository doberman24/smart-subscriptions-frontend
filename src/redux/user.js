import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  userData: {},
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk(
  'user/getUserData',
  async (token, { rejectWithValue }) => {
    try {
      const user = await api.getData(token);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  } 
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateDataUser: (state, action) => {
      state.userData = action.payload
    },
    resetData: (state) => {
      state.userData = {};
      state.loading = false;
      state.error = null;
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
      state.userData = action.payload;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { updateDataUser, resetData } = userSlice.actions;
export default userSlice.reducer;