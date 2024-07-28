import { VideoResolutionTypes } from "./VideoTypes";

export type TypeVideoTranscodeQueue = 'VideoTranscode'
export type TypeSendEmailQueue = 'SendEmail'

export type QueueTypes = TypeVideoTranscodeQueue | TypeSendEmailQueue

export interface VideoTranscodePayloadType {
    fileName: string,
    resolution: VideoResolutionTypes
}

export interface SendEmailPayloadType {
    sender: string
    receivers: string[]
    message: string,
}