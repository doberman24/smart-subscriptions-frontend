import axios from "axios";

import { reviewsApi } from "./mockApi";

export class Api {
    constructor() {
        this.reviewsApi = reviewsApi;
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


    //Данные пользователя
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

    //Уппавление подримками подисок
    async handleSubscription(token, formValue, action) {
        const response = await axios({
            method: action ? 'put' : 'post',
            url: `${import.meta.env.VITE_API_URL}/subscriptions/${action ? formValue.id : ''}`,
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

    //Данные аналитики
    async getAnalyticsData(token, filteredData) {
        const response = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/analytics`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            ...(filteredData && {data: filteredData}),
        });
        return response;
    };

    //Общие данные для главной страницы
    async getSummary(token) {
        const response = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/dashboard`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    };    

    async getReviewsData() {
        try {
            return await this.reviewsApi.getReviews();
        } catch (error) {
            console.error('Ошибка загрузки отзывов', error);
            return [];
        }
    };
}

export default new Api();