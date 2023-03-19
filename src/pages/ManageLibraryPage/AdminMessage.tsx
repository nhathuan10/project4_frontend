import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MessageModel } from '../../models/MessageModel'
import { DispatchType } from '../../redux/configStore'
import { submitResponseApi } from '../../redux/MessageReducer/messageReducer'

type Props = {
    message: MessageModel
}

export default function AdminMessage({ message }: Props) {
    const dispatch: DispatchType = useDispatch()
    const [displayWarning, setDisplayWarning] = useState(false)
    const [response, setResponse] = useState('')

    const submitResponseHandler = () => {
        const responseMessage: MessageModel = { title: message.title, question: message.question, response }
        if (response !== '') {
            dispatch(submitResponseApi(responseMessage, message.id))
            setDisplayWarning(false)
        } else {
            setDisplayWarning(true)
        }
    }

    return (
        <div key={message.id}>
            <div className='card my-2 shadow p-3 bg-body rounded'>
                <h4 className='text-primary'>Question {message.id}: {message.title}</h4>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                    <h5 className='text-info'>Response: </h5>
                    <form action="PUT">
                        {displayWarning &&
                            <div className="alert alert-danger" role='alert'>
                                All fields must be filled out
                            </div>
                        }
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id='exampleFormControlTextarea1' rows={3}
                                onChange={e => setResponse(e.target.value)} value={response}
                            >
                            </textarea>
                        </div>
                        <div>
                            <button
                                type='button'
                                className="btn btn-outline-info mt-3"
                                onClick={submitResponseHandler}
                            >
                                Submit Response
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}