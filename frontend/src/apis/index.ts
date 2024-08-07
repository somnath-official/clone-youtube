const BASE_URL = import.meta.env.VITE_BACKEND_API

export const API_ROUTES = {
    POST: {
        video: {
            initUpload: () => `${BASE_URL}/video/upload/init`,
            upload: () => `${BASE_URL}/video/upload`
        }
    }
}