import { BookModel } from "./BookModel"

export type CategoryModel = {
    id: number
    name: string
    books: BookModel[]
}

export type CategoryRequest = {
    name: string
}