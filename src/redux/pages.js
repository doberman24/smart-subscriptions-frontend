import { createSlice } from "@reduxjs/toolkit";

const pagesSlice = createSlice({
    name: 'page',
    initialState: {
        namePage: '',
    },
    
    reducers: {
        selectPage: (state, action) => {
            state.namePage = action.payload;
        }
    }
})

export const { selectPage } = pagesSlice.actions;

export default pagesSlice.reducer;