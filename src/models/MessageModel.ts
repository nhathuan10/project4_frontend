export type MessageModel = {
    id?: number
    title: string
    question: string
    userEmail?: string
    adminEmail?: string
    response?: string
    closed?: boolean
}