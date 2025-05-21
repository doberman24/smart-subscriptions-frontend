import axios from "axios";

import { reviewsApi, userApi, summaryApi, subscriptionsApi, analiticsApi } from "./mockApi";

export class Api {
    constructor() {
        this.reviewsApi = reviewsApi;
        this.userApi = userApi;
        this.subscriptionsApi = subscriptionsApi;
        this.summaryApi = summaryApi;
    };


    //Авторизация и регистрация
    async authorization(formValue, activeTab) {
        const authUrl = activeTab === 'reg' ? '/auth/register' : '/auth/login';
        const response = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}${authUrl}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: formValue,
        });
        return response.data;
    };


    //Данные ползователя
    async getData(token) {
        const response = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/settings`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    };

    async saveData(userData, token) {
        const response = await axios({
            method: 'patch',
            url: `${import.meta.env.VITE_API_URL}/settings/`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: userData,
        });
        return response;
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
    };

    //Данные подисок
    async createSubscription(token, formValue) {
        const response = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/subscriptions`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formValue,
        });
        return response;
    };

    async getSubscriptionsData(token) {
        const response = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/subscriptions`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    };

    async deleteSubscriptionData(token, id) {
        const response = await axios({
            method: 'delete',
            url: `${import.meta.env.VITE_API_URL}/subscriptions/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    };

    async updateSubscriptionData(token, formValue) {
        const response = await axios({
            method: 'put',
            url: `${import.meta.env.VITE_API_URL}/subscriptions/${formValue.id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formValue,
        });
        return response;
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