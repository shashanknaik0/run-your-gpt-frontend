import axios from 'axios';

const API_HOST_LOCAL = "http://localhost:8000";

export default {
    post: async (path, payload) => {
        return axios({
            method: 'POST',
            url: `${API_HOST_LOCAL}/${path}`,
            data:payload
        });
    },

    get: async (path) => {
        return axios({
            method: 'GET',
            url: `${API_HOST_LOCAL}/${path}`
        });
    },

};