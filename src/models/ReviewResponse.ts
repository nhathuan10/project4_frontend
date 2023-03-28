import { ReviewModel } from "./ReviewModel"

export type ReviewResponse = {
    content: ReviewModel[]
    pageNo: number
    pageSize: number
    totalElements: number
    totalPages: number
    last: boolean
}