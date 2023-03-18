import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageModel } from '../models/MessageModel'
import { DispatchType, RootState } from '../redux/configStore'
import { deleteResponseApi } from '../redux/MessageReducer/messageReducer'

type Props = {
    message: MessageModel
}

export default function Message({ message }: Props) {
    const { userLogin } = useSelector((state: RootState) => state.userReducer)
    const dispatch: DispatchType = useDispatch()

    const deleteMessageHandler = () => {
        dispatch(deleteResponseApi(message?.id))
    }

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
                return (
                    <div className='text-end'>
                        <button className='btn btn-danger' onClick={deleteMessageHandler}>Delete</button>
                    </div>
                )
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