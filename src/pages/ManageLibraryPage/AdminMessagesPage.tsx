import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { getMessagesByClosedApi } from '../../redux/MessageReducer/messageReducer'
import AdminMessage from './AdminMessage'

type Props = {}

export default function AdminMessagesPage({ }: Props) {
    const { messagesByClosed } = useSelector((state: RootState) => state.messageReducer)
    const { newMessageResponse } = useSelector((state: RootState) => state.messageReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getMessagesByClosedApi())
    }, [newMessageResponse])

    return (
        <div className='container mt-3'>
            {messagesByClosed.length > 0 ?
                <>
                    <h5>Pending Q/A: </h5>
                    {messagesByClosed.map(message => (
                        <AdminMessage message={message} key={message.id} />
                    ))}
                </> :
                <h5>No pending Q/A</h5>
            }
        </div>
    )
}