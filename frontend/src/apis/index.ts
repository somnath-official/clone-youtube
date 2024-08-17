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