export const BASE_URL = import.meta.env.VITE_BACKEND_API

export const API_ROUTES = {
    auth: {
        user: `/auth/user`,
        login: `/auth/login`,
        register: `/auth/register`,
    },
    POST: {
        video: {
            initUpload: () => `/video/upload/init`,
            upload: () => `/video/upload`
        }
    }
}