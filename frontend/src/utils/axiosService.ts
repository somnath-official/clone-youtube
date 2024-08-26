import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { BASE_URL } from "../apis"

export const axiosService = axios.create({
    baseURL: BASE_URL,
})

axiosService.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token && !config.headers['Authorization']) config.headers['Authorization'] = `Bearer ${token}`

    return config
}, function (error) {
    return Promise.reject(error);
})

interface InternalAxiosRequestConfigOverloaded extends InternalAxiosRequestConfig {
    isSent: boolean
}

axiosService.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const prevRequest: InternalAxiosRequestConfigOverloaded |undefined = error?.config as InternalAxiosRequestConfigOverloaded
        if (error.response?.status === 401 && prevRequest && !prevRequest.isSent) {
            prevRequest.isSent = true;
            const newAccessToken = await getRefreshToken()
            
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            localStorage.setItem('token', newAccessToken)
            return axiosService(prevRequest);
        }
        return Promise.reject(error);
    }
)

const getRefreshToken = async () => {
    try {
        const response = await axios.post( `${BASE_URL}/auth/refresh`, {}, { withCredentials: true } )
        return response.data?.accessToken
    } catch (err) {
        return ''
    }
}