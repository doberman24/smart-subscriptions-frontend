import axios from "axios";

export class Api {
    async verifyEmailUser(mailToken) {
        const veryfy = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/verify-email?mailToken=${mailToken}`,
        });
        return veryfy;
    }

    //Проверка токена при переходе по ссылке на почте при сбросе пароля
    async checkTokenForgotPass(mailToken) {
        try {
            const response =  await axios({
                method: 'get',
                url: `${import.meta.env.VITE_API_URL}/forgot-password?mailToken=${mailToken}`,
            });
            return {
                data: response.data,
                error: null,
            };
        } catch (error) {
            console.log(error.response?.status);
            return {
                data: null,
                error: error.response?.data,
                status: error.response?.status,
            };
        }
    }

    //Сброс пароля
    async resetPassword({password, confirmPass}, token) {
        try {
            const response =  await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/reset-password`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    password: password, 
                    confirmPass: confirmPass, 
                    token: token,
                },
            });
            return {
                data: response.data,
                error: null,
            };
        } catch (error) {
            console.log(error.response?.status);
            return {
                data: null,
                error: error.response?.data,
                status: error.response?.status,
            };
        }
    }


    //Поиск аккаунта и отправка на почту письма восстановления пароля
    async sendRecover(login) {
        try {
            const response =  await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/send-recover`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: login,
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return error;

        }
    }

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

    //Управление подписками
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

    //Аналитика выбранной подписки
    async getInfoSubscription(token, id, filters) {
        const response = await axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/analytics/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    };
}

export default new Api();