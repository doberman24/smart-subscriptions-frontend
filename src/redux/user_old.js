import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
    user: null,
    notifications: null, 
    localization: null, 
    familyAccess: null, 
    security: null,
    loading: false,
    error: null,
}

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const user = await api.getUserData();
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.notifications = action.payload.notifications;
                state.localization = action.payload.localization;
                state.familyAccess = action.payload.familyAccess;
                state.security = action.payload.security;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// export const { getToken } = userSlice.actions;
export default userSlice.reducer;