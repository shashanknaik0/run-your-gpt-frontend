import axios from 'axios';

const API_HOST_LOCAL = "http://localhost:8000";

const getCsrfToken=async()=>{
    const response = await axios({
        method: 'GET',
        url: `${API_HOST_LOCAL}/csrf/`,
        withCredentials: true,
    })
    return response.data;
}

export default {
    post: async (path, payload) => {
        return axios({
            method: 'POST',
            url: `${API_HOST_LOCAL}/${path}`,
            withCredentials: true,
            data:payload,
            headers:{
                'X-CSRFToken': await getCsrfToken()
            }
        });
    },


    get: async (path) => {
        return axios({
            method: 'GET',
            url: `${API_HOST_LOCAL}/${path}`,
            withCredentials: true
        });
    },

};