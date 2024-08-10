import { log } from "../../utils/log"
import { MergeVideoChunkPayloadType, VideoTranscodePayloadType } from "../../types"
import { initVideoTranscode, mergeChunks } from "../../utils/video"

export const videoTranscode = async (data: VideoTranscodePayloadType) => {
    await initVideoTranscode(data.videoPath, data.fileName, data.resolution)
}

export const mergeVideoChunks = async (data: MergeVideoChunkPayloadType) => {
    const { videoPath, originalname, totalChunks } = data
    await mergeChunks(videoPath, totalChunks, originalname)
}