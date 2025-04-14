import { configureStore } from "@reduxjs/toolkit";
import userReduser from './user';

const store = configureStore({
    reducer: {
        user: userReduser,
    }
});

export { store };