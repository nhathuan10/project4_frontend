import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MessageModel } from '../../../models/MessageModel'
import { DispatchType } from '../../../redux/configStore'
import { submitQuestionApi } from '../../../redux/MessageReducer/messageReducer'

type Props = {}

export default function NewMessageForm({ }: Props) {
    const dispatch: DispatchType = useDispatch()
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [displayWarning, setDisplayWarning] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)

    const submitNewQuestion = () => {
        if (title !== '' && question !== '') {
            const newMessage: MessageModel = { title, question }
            dispatch(submitQuestionApi(newMessage))
            setTitle('')
            setQuestion('')
            setDisplayWarning(false)
            setDisplaySuccess(true)
        } else {
            setDisplayWarning(true)
            setDisplaySuccess(false)
        }
    }

    return (
        <div className='card mt-3'>
            <div className='card-header text-info fw-bold'>
                Ask question 
            </div>
            <div className='card-body'>
                <form method='POST'>
                    {displayWarning &&
                        <div className='alert alert-danger' role='alert'>
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess &&
                        <div className='alert alert-success' role='alert'>
                            Question added successfully
                        </div>
                    }
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type="text" className='form-control' placeholder='Title' onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Question</label>
                        <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} onChange={e => setQuestion(e.target.value)} value={question}></textarea>
                    </div>
                    <div>
                        <button onClick={submitNewQuestion} type='button' className='btn btn-outline-info mt-3'>Submit Question</button>
                    </div>
                </form>
            </div>
        </div>
    )
}