import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../../redux/configStore'
import { getMessagesApi } from '../../../redux/MessageReducer/messageReducer'

type Props = {}

export default function Messages({ }: Props) {
    const { messages } = useSelector((state: RootState) => state.messageReducer)
    const { newMessageResponse } = useSelector((state: RootState) => state.messageReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getMessagesApi())
    }, [])
    console.log(messages)

    return (
        <div className='mt-2'>
            {messages.length > 0 ?
                <>
                    <h5>Current Q/A: </h5>
                    {messages.map(message => (
                        <div key={message.id}>
                            <div className='card mt-2 shadow p-3 bg-body rounded'>
                                <h5>Question {message.id}: {message.title}</h5>
                                <h6>{message.userEmail}</h6>
                                <p className='fst-italic'>{message.question}</p>
                                <hr />
                                <div>
                                    <h5>Response: </h5>
                                    {message.response && message.adminEmail ?
                                        <>
                                            <h6>{message.adminEmail} (admin)</h6>
                                            <p>{message.response}</p>
                                        </> :
                                        <p><i>Pending response from administration</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </> :
                <h5>All questions you submit will be shown here</h5>
            }
        </div>
    )
}