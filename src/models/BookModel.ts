export type BookModel = {
    id: number
    title: string
    author: string
    description: string
    copies: number
    copiesAvailable: number
    img: string
    categoryName: string
}

export type BookRequest = {
    title: string
    author: string
    description: string
    copies: number
    img?: string
}