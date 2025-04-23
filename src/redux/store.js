import { configureStore } from "@reduxjs/toolkit";
import userReduser from './user';
import subscriptionsReduser from './subscriptions';
import summaryReduser from './summaryInfo';

const store = configureStore({
    reducer: {
        user: userReduser,
        subscriptions: subscriptionsReduser,
        summaryInfo: summaryReduser,
    }
});

export { store };