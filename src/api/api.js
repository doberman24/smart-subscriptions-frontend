import axios from "axios";
import { reviewsApi, userApi } from "./mockApi";

class Api {
    constructor() {
        this.reviewsApi = reviewsApi;
        this.userApi = userApi;
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
            return await this.userApi.getUser()
        } catch (error) {
            console.error('Ошибка загрузки пользователя', error);
            return '';
        }
    }
}

export default Api;