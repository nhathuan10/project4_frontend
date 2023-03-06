import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UserRegisterModel } from '../../models/UserRegisterModel'
import { DispatchType } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { signupAsyncApi } from '../../redux/UserReducer/userReducer'

type Props = {}

export default function RegisterPage({ }: Props) {
    const dispatch: DispatchType = useDispatch()
    const [displayWarning, setDisplayWarning] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)

    const formSignUp = useFormik<UserRegisterModel>({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Name can not be blank'),
            username: yup.string().required('Username can not be blank').max(10, 'Username must be less than 10 characters').min(5, 'Username must be greater than 5 characters'),
            email: yup.string().required('Email can not be blank').email('Invalid email'),
            password: yup.string().required('Password can not be blank').max(10, 'Password must be less than 10 characters').min(3, 'Password must be greater than 3 characters')
        }),
        onSubmit: (values: UserRegisterModel) => {
            dispatch(signupAsyncApi(values))
            setDisplaySuccess(true)
        }
    })

    return (
        <form onSubmit={formSignUp.handleSubmit}>
            <div className='signup-form-container'>
                <div className='signup-form'>
                    <div className='form-group w-75 my-3'>
                        {displaySuccess &&
                            <div className='alert alert-success fw-bold' role='alert'>
                                User Registered successfully
                            </div>
                        }
                        <h5 className='fw-bold text-dark'>Name</h5>
                        <input type="text" className='form-control' id='name'
                            onChange={formSignUp.handleChange} onBlur={formSignUp.handleBlur}
                        />
                        {formSignUp.errors.name &&
                            <div className='text-danger fst-italic'>{formSignUp.errors.name}</div>
                        }
                    </div>
                    <div className='form-group w-75'>
                        <h5 className='fw-bold text-dark'>Username</h5>
                        <input type="text" className='form-control' id='username'
                            onChange={formSignUp.handleChange} onBlur={formSignUp.handleBlur}
                        />
                        {formSignUp.errors.username &&
                            <div className='text-danger fst-italic'>{formSignUp.errors.username}</div>
                        }
                    </div>
                    <div className='form-group w-75'>
                        <h5 className='fw-bold text-dark'>Email</h5>
                        <input type="text" className='form-control' id='email'
                            onChange={formSignUp.handleChange} onBlur={formSignUp.handleBlur}
                        />
                        {formSignUp.errors.email &&
                            <div className='text-danger fst-italic'>{formSignUp.errors.email}</div>
                        }
                    </div>
                    <div className='form-group w-75 mt-3'>
                        <h5 className='fw-bold text-dark'>Password</h5>
                        <input type="password" className='form-control' id='password'
                            onChange={formSignUp.handleChange} onBlur={formSignUp.handleBlur}
                        />
                        {formSignUp.errors.password &&
                            <div className='text-danger fst-italic'>{formSignUp.errors.password}</div>
                        }
                    </div>
                    <div className='form-group mt-4 w-75 text-center'>
                        <button className='btn btn-primary main-color w-100' type='submit'>Register</button>
                    </div>
                </div>
            </div>
        </form>
    )
}