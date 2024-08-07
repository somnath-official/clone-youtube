import { log } from "../../utils/log"
import { MergeVideoChunkPayloadType, VideoTranscodePayloadType } from "../../types"
import { mergeChunks } from "../../utils/video"

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

export const mergeVideoChunks = async (data: MergeVideoChunkPayloadType) => {
    const { videoPath, originalname, totalChunks } = data
    await mergeChunks(videoPath, totalChunks, originalname)
}