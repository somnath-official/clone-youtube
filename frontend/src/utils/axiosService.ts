import axios, { AxiosError } from "axios"
const BASE_URL = import.meta.env.VITE_BACKEND_API

export const axiosService = axios.create({
    baseURL: BASE_URL,
})

axiosService.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`

    return config
}, function (error) {
    return Promise.reject(error);
})

axiosService.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.log("Unauthorized")
        }
        return Promise.reject(error);
    }
)