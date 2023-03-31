import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import { DispatchType, RootState } from '../../../redux/configStore'
import { getMessagesApi } from '../../../redux/MessageReducer/messageReducer'

type Props = {}

export default function Messages({ }: Props) {
    const { messages } = useSelector((state: RootState) => state.messageReducer)
    const { newMessageResponse } = useSelector((state: RootState) => state.messageReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getMessagesApi())
    }, [newMessageResponse])

    return (
        <div className='mt-2'>
            {messages.length > 0 ?
                <>
                    <h4 className='my-3'>Current Q/A: </h4>
                    {messages.map(message => (
                        <Message message={message} />
                    ))}
                </> :
                <h5>All questions you submit will be shown here</h5>
            }
        </div>
    )
}