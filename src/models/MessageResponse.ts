import { MessageModel } from "./MessageModel"

export type MessageResponse = {
    content: MessageModel[] 
    pageNo: number
    pageSize: number
    totalElements: number
    totalPages: number
    last: boolean
}