import axios from "axios";
import { reviewsApi, userApi, summaryApi, subscriptionsApi, analiticsApi } from "./mockApi";

export class Api {
    constructor() {
        this.reviewsApi = reviewsApi;
        this.userApi = userApi;
        this.subscriptionsApi = subscriptionsApi;
        this.summaryApi = summaryApi;
    };

    async getReviewsData() {
        try {
            return await this.reviewsApi.getReviews();
        } catch (error) {
            console.error('Ошибка загрузки отзывов', error);
            return [];
        }
    };

    async getUserData() {
        return await this.userApi.getUser();
    };

    async getSummaryData() {
        return await this.summaryApi.getSummaryInfo();
    };

    async getSubscriptionsData() {
        return await this.subscriptionsApi.getSubscriptions();
    }

    async getAnaliticsData() {
        try {
            return await analiticsApi.getAnalitics();
        } catch (error) {
            console.error('Ошибка загрузки отзывов', error);
            return {};
        }
    }
}

export default new Api();