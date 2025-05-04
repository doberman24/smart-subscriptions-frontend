import { configureStore } from "@reduxjs/toolkit";
import tokenReduser from "./getToken";
import userReduser from './user';
import subscriptionsReduser from './subscriptions';
import summaryReduser from './summaryInfo';

const store = configureStore({
    reducer: {
        token: tokenReduser,
        user: userReduser,
        subscriptions: subscriptionsReduser,
        summaryInfo: summaryReduser,
    }
});

export { store };