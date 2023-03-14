import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageModel } from '../../models/MessageModel'
import { DispatchType, RootState } from '../../redux/configStore'
import { getAllMessagesApi, getMessagesByClosedApi } from '../../redux/MessageReducer/messageReducer'
import AdminMessage from './AdminMessage'

type Props = {}

export default function AdminMessagesPage({ }: Props) {
    const { messagesByClosed } = useSelector((state: RootState) => state.messageReducer)
    const { newMessageResponse } = useSelector((state: RootState) => state.messageReducer)
    const [messagesStatus, setMessagesStatus] = useState('')
    const { allMessages } = useSelector((state: RootState) => state.messageReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getAllMessagesApi(messagesStatus))
    }, [newMessageResponse])

    useEffect(() => {
        setMessagesStatus('allMessages')
    }, [])

    const renderMessages = () => {
        if (messagesStatus === 'allMessages' && allMessages.length > 0) {
            return allMessages.map((message: MessageModel, index: number) => (
                <AdminMessage message={message} key={index} />
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

    return (
        <div className='container mt-3'>
            <h5>Pending Q/A: </h5>
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
        </div>
    )
}