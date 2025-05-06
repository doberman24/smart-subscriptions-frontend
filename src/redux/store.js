import { configureStore } from "@reduxjs/toolkit";
import tokenReduser from "./getToken";
import userReduser from './user';
import subscriptionsReduser from './subscriptions';
import summaryReduser from './summaryInfo';
import showModalReduser from './showModal';

const store = configureStore({
    reducer: {
        token: tokenReduser,
        user: userReduser,
        subscriptions: subscriptionsReduser,
        summaryInfo: summaryReduser,
        showModal: showModalReduser,
    }
});

export { store };