import axios from "axios";
import { reviewsApi, userApi, subscriptionsApi, analiticsApi } from "./mockApi";

export class Api {
    constructor() {
        this.reviewsApi = reviewsApi;
        this.userApi = userApi;
        this.subscriptionsApi = subscriptionsApi;
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
        try {
            // await new Promise(resolve => setTimeout(resolve, 1000));
            return await this.userApi.getUser();
        } catch (error) {
            console.error('Ошибка загрузки пользователя', error);
            return '';
        }
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