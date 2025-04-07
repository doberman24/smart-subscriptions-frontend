import axios from "axios";
import { feedbackApi } from "./mockApi";

class Api {
    constructor() {
        this.api = feedbackApi;
    };

    async getFeedbackData() {
        try {
            return await feedbackApi.getFeedback();
        } catch (error) {
            console.error('Ошибка загрузки отзывов', error);
            return [];
        }
    }
}

export default Api;