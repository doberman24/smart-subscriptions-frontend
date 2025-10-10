import { createSlice } from "@reduxjs/toolkit";

const showModalSlice = createSlice({
    name: 'showModal',
    initialState: {
        isDeleteModal: false,
        isExitModal: false,
        isSaveModal: false,
        isInfoModal: false,
        isChangePass: false,
        isLosePass: false,
        handleSubscriptionModal: false,
        isDeleteSubscriptionModal: false,
        isTopModal: false,
        isContactInfo: false,
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isDeleteModal = action.payload.isDeleteModal;
            state.isExitModal = action.payload.isExitModal;
            state.isSaveModal = action.payload.isSaveModal;
            state.isInfoModal = action.payload.isInfoModal;
            state.isChangePass = action.payload.isChangePass;
            state.isLosePass = action.payload.isLosePass;
            state.handleSubscriptionModal = action.payload.handleSubscriptionModal;
            state.isDeleteSubscriptionModal = action.payload.isDeleteSubscriptionModal;
            state.isTopModal = action.payload.isTopModal;
            state.isContactInfo = action.payload.isContactInfo;
        }
    }
});

export const { toggleModal } = showModalSlice.actions;
export default showModalSlice.reducer;