import axios from "axios";
import { usersApi } from "./mockApi";

class Api {
    constructor() {
        this.api = usersApi;
    };

    async getUsersData() {
        try {
            return await this.api.getUsers();
        } catch (error) {
            console.error('Ошибка загрузки отзывов', error);
            return [];
        }
    };

    async getUsersById(id) {
        return (await this.api.getUsers()).filter(user => user.id === id)
    }
}

export default Api;