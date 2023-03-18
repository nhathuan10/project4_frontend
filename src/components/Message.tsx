import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MessageModel } from '../models/MessageModel'
import { RootState } from '../redux/configStore'

type Props = {
    message: MessageModel
}

export default function Message({ message }: Props) {
    const { userLogin } = useSelector((state: RootState) => state.userReducer)

    const renderDeleteButton = () => {
        if (userLogin) {
            let isUserRole = false
            for (let role of userLogin?.roles) {
                if (role.name === 'ROLE_ADMIN') {
                    isUserRole = true
                    break
                }
            }
            if (isUserRole) {
                return <button className='btn btn-danger'>Delete</button>
            }
        }
    }

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
                            {renderDeleteButton()}
                        </> :
                        <p className='text-danger'><i>Pending response from administration</i></p>
                    }
                </div>
            </div>
        </div>
    )
}