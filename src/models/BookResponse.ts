import { BookModel } from "./BookModel"

export type BookResponse = {
    content: BookModel[]
    pageNo: number
    pageSize: number
    totalElements: number
    totalPages: number
    last: boolean
}