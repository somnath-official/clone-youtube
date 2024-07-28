import { SendEmailPayloadType } from "../../types";
import { log } from "../../utils/log";

export const sendEmail = async (data: SendEmailPayloadType) => {
    log(JSON.stringify(data))
}