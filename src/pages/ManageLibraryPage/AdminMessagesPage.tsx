import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Pagination2 from '../../components/Pagination2'
import { MessageModel } from '../../models/MessageModel'
import { DispatchType, RootState } from '../../redux/configStore'
import { getAllMessagesApi } from '../../redux/MessageReducer/messageReducer'
import AdminMessage from './AdminMessage'

type Props = {}

export default function AdminMessagesPage({ }: Props) {
    const { messagesByClosed } = useSelector((state: RootState) => state.messageReducer)
    const { newMessageResponse } = useSelector((state: RootState) => state.messageReducer)
    const [messagesStatus, setMessagesStatus] = useState('')
    const { allMessages } = useSelector((state: RootState) => state.messageReducer)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState<any>(0)
    const [totalAmountOfMessages, setTotalAmountOfMessages] = useState<any>(0)
    const [messagesPerPage] = useState(5)

    const indexOfLastMessage: number = currentPage * messagesPerPage
    const indexOfFirstMessage: number = indexOfLastMessage - messagesPerPage
    let lastItem = messagesPerPage * currentPage <= totalAmountOfMessages ? messagesPerPage * currentPage : totalAmountOfMessages
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getAllMessagesApi(messagesStatus, currentPage - 1, 4))
    }, [newMessageResponse, messagesStatus, currentPage])

    useEffect(() => {
        setTotalAmountOfMessages(allMessages?.totalElements)
        setTotalPages(allMessages?.totalPages)
    }, [currentPage])

    const renderMessages = () => {
        if (messagesStatus === 'allMessages' && totalAmountOfMessages > 0) {
            return allMessages?.content.map((message: MessageModel, index: number) => (
                <Message message={message} key={index} />
            ))
        } else if (messagesStatus === 'pendingMessages' && messagesByClosed.length > 0) {
            return messagesByClosed.map((message: MessageModel, index: number) => (
                <AdminMessage message={message} key={index} />
            ))
        } else if (messagesStatus === 'pendingMessages' && messagesByClosed.length == 0) {
            return <h5>No pending questions</h5>
        } else {
            return <h5>No question available</h5>
        }
    }
    console.log(allMessages)

    return (
        <div className='container mt-3'>
            <h5>Pending Q/A: </h5>
            {totalAmountOfMessages > 0 && messagesStatus === 'allMessages' &&
                <>
                    <div className='mt-3'>
                        <h5>Number of results: {totalAmountOfMessages}</h5>
                    </div>
                    <p>{indexOfFirstMessage + 1} to {lastItem} of {totalAmountOfMessages} items:</p>

                </>
            }
            <form className='my-3' onSubmit={(e) => e.preventDefault()}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="messagesStatus" id="allMessages"
                        value='allMessages' onChange={e => setMessagesStatus(e.target.value)} />
                    <label className="form-check-label text-dark" htmlFor="allMessages">All Messages</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="messagesStatus" id="pendingMessages"
                        value='pendingMessages' onChange={e => setMessagesStatus(e.target.value)} />
                    <label className="form-check-label text-dark" htmlFor="pendingMessages">Pending Messages</label>
                </div>
            </form>
            {renderMessages()}
            {totalPages > 1 && messagesStatus === 'allMessages' &&
                <Pagination2 currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    )
}