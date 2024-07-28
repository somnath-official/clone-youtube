import { log } from "../../utils/log"
import { VideoTranscodePayloadType } from "../../types"

export const videoTranscode = async (data: VideoTranscodePayloadType) => {
    switch(data.resolution) {
        case '144p':
            log(data.resolution)
            break
        case '240p':
            log(data.resolution)
            break
        case '360p':
            log(data.resolution)
            break
        case '480p':
            log(data.resolution)
            break
        case '720p':
            log(data.resolution)
            break
        case '1080p':
            log(data.resolution)
            break
        default:
            log('Invalid format encode')
    }
}