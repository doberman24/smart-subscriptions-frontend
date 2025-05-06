import axios from "axios";

import { reviewsApi, userApi, summaryApi, subscriptionsApi, analiticsApi } from "./mockApi";

export class Api {
    constructor() {
        this.reviewsApi = reviewsApi;
        this.userApi = userApi;
        this.subscriptionsApi = subscriptionsApi;
        this.summaryApi = summaryApi;
    };

    async authorization(formValue, activeTab) {
        const authUrl = activeTab === 'reg' ? '/auth/register' : '/auth/login';
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}${authUrl}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: formValue,
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка подключения', error);
            return null;
        }
    };

    async getData(token) {
        const response = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/settings`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    };

    async saveData(userData, token) {
        try {
            const response = await axios({
                method: 'patch',
                url: `${import.meta.env.VITE_API_URL}/settings/`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: userData,
            });
            return response;
        } catch (error) {
            console.error('Ошибка подключения', error);
            return null;
        }
    }

    async deleteUserData(token) {
        const response = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_API_URL}/settings`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    }

    async getReviewsData() {
        try {
            return await this.reviewsApi.getReviews();
        } catch (error) {
            console.error('Ошибка загрузки отзывов', error);
            return [];
        }
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