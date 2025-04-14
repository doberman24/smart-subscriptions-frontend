import { configureStore } from "@reduxjs/toolkit";
import subscriptionsReduser from './subscriptions';

const store = configureStore({
    reducer: {
        subscriptions: subscriptionsReduser,
    }
});

export { store };