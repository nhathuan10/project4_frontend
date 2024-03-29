import { CheckoutModel } from "./CheckoutModel"
import { ReviewModel } from "./ReviewModel"

export type BookModel = {
    id?: number
    title: string
    author: string
    description: string
    copies: number
    copiesAvailable?: number
    img: string
    categoryName?: string
    reviews?: ReviewModel[]
    checkouts?: CheckoutModel[]
}
