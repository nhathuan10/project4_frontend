import React from 'react'
import { MessageModel } from '../models/MessageModel'

type Props = {
    message: MessageModel
}

export default function Message({ message }: Props) {
    return (
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
                        <p className='text-danger'><i>Pending response from administration</i></p>
                    }
                </div>
            </div>
        </div>
    )
}