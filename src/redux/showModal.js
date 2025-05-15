import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: 'showModal',
    initialState: {
        isDeleteModal: false,
        isExitModal: false,
        isSaveModal: false,
        isInfoModal: false,
        isChangePass: false,
        addSubscriptionModal: false,
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isDeleteModal = action.payload.isDeleteModal;
            state.isExitModal = action.payload.isExitModal;
            state.isSaveModal = action.payload.isSaveModal;
            state.isInfoModal = action.payload.isInfoModal;
            state.isChangePass = action.payload.isChangePass;
            state.addSubscriptionModal = action.payload.addSubscriptionModal;
        }
    }
});

export const { toggleModal } = showModalSlice.actions;
export default showModalSlice.reducer;