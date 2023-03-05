import { BookModel } from "./BookModel"

export type ShelfCurrentLoanModel = {
    book: BookModel
    daysLeft: number
}