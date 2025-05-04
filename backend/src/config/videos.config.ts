import { config } from 'dotenv'
config()

export const videoConfig = {
    uploadPath: process.env.VIDEO_UPLOAD_PATH,
}