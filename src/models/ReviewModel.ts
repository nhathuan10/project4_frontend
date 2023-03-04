export type ReviewModel = {
    id: number
    userEmail: string
    date: string
    rating: number 
    bookId: string
    description: string
}

export type ReviewRequest = {
    rating: number
    description: string
}