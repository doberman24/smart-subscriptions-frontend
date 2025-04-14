import { configureStore } from "@reduxjs/toolkit";
import userReduser from './user';
import subscriptionsReduser from './subscriptions'

const store = configureStore({
    reducer: {
        user: userReduser,
        subscriptions: subscriptionsReduser,
    }
});

export { store };