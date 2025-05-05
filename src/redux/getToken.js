import { createSlice } from "@reduxjs/toolkit";

const loadTokenFromStorage = () => {
  const savedToken = localStorage.getItem('token');
  // console.log(savedToken);
  return savedToken ? savedToken : '';
}

const saveTokenToStorage = (token) => {
  localStorage.setItem('token', token);
}

const getTokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: loadTokenFromStorage(),
  },
    
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
      // console.log(action);
      saveTokenToStorage(state.token);
    }
  }
});

export const { getToken } = getTokenSlice.actions;
export default getTokenSlice.reducer;