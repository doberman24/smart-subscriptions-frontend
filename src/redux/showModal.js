import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: 'showModal',
    initialState: {
        isShow: false,
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isShow = action.payload;
        }
    }
});

export const { toggleModal } = showModalSlice.actions;
export default showModalSlice.reducer;