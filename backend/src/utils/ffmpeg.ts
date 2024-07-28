import ffmpeg from 'fluent-ffmpeg'

interface ffmpegVideoMetadataType {
    videoMetadata: ffmpeg.FfprobeStream | null
    audioMetadata: ffmpeg.FfprobeStream | null
}

export const getVideoMetaData = (videoPath: string): Promise<ffmpegVideoMetadataType> => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(err)
                return
            }

            const videoMetadata = metadata.streams.find(s => s.codec_type === 'video') ?? null
            const audioMetadata = metadata.streams.find(s => s.codec_type === 'audio') ?? null
            
            resolve({videoMetadata, audioMetadata})
        })
    })
}