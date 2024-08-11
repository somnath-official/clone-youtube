import { VideoResolutionTypes } from "./VideoTypes";

export type TypeVideoTranscodeQueue = 'VideoTranscode'
export type TypeSendEmailQueue = 'SendEmail'
export type TypeMergeVideoChunkQueue = 'MergeVideoChunk'

export type QueueTypes = TypeVideoTranscodeQueue | TypeSendEmailQueue | TypeMergeVideoChunkQueue

export interface VideoTranscodePayloadType {
    fileName: string
    videoDir: string
    resolution: VideoResolutionTypes
}

export interface MergeVideoChunkPayloadType {
    chunkDir: string
    videoDir: string
    totalChunks: number
    originalname: string
}

export interface SendEmailPayloadType {
    sender: string
    receivers: string[]
    message: string,
}