import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { DispatchType, RootState } from '../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { UserLoginRequest } from '../../models/UserLoginModel'
import { loginAsyncApi } from '../../redux/UserReducer/userReducer'

type Props = {}

export default function LoginPage({ }: Props) {
    const { isInvalidAccount } = useSelector((state: RootState) => state.userReducer)
    const dispatch: DispatchType = useDispatch()

    const formLogin = useFormik<UserLoginRequest>({
        initialValues: {
            usernameOrEmail: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            usernameOrEmail: yup.string().required('Email can not be blank').email('Invalid email'),
            password: yup.string().required('Password can not be blank').max(10, 'Password must be less than 10 characters').min(3, 'Password must be greater than 3 characters')
        }),
        onSubmit: (values: UserLoginRequest) => {
            dispatch(loginAsyncApi(values))
        }
    })

    return (
        <form className='container' onSubmit={formLogin.handleSubmit}>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-50 m-3'>
                    <h3 className='text-center'>Login</h3>
                    <div className='form-group'>
                        <p>Email</p>
                        <input type="text" className='form-control' id='usernameOrEmail'
                            onChange={formLogin.handleChange} onBlur={formLogin.handleBlur}
                        />
                        {formLogin.errors.usernameOrEmail &&
                            <div className='text text-danger'>{formLogin.errors.usernameOrEmail}</div>
                        }
                    </div>
                    <div className='form-group mt-2'>
                        <p>Password</p>
                        <input type="password" className='form-control' id='password'
                            onChange={formLogin.handleChange} onBlur={formLogin.handleBlur}
                        />
                        {formLogin.errors.password &&
                            <div className='text text-danger'>{formLogin.errors.password}</div>
                        }
                    </div>
                    {isInvalidAccount && <p className='text-danger fst-italic my-2'>Invalid email or password!</p>}
                    <div className='form-group mt-3'>
                        <button className='btn btn-success' type='submit'>Login</button>
                    </div>
                </div>
            </div>
        </form>
    )
}