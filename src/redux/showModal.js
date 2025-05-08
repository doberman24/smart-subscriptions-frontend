import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: 'showModal',
    initialState: {
        isDeleteModal: false,
        isExitModal: false,
        isSaveModal: false,
        toggle: false,
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isDeleteModal = action.payload.isDeleteModal;
            state.isExitModal = action.payload.isExitModal;
            state.isSaveModal = action.payload.isSaveModal;
            state.toggle = action.payload.isDeleteModal || action.payload.isExitModal ||  action.payload.isSaveModal;
        }
    }
});

export const { toggleModal } = showModalSlice.actions;
export default showModalSlice.reducer;