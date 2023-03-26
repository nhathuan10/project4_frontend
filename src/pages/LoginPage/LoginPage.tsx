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
            usernameOrEmail: yup.string().required('Username or Email can not be blank'),
            password: yup.string().required('Password can not be blank').max(10, 'Password must be less than 10 characters').min(3, 'Password must be greater than 3 characters')
        }),
        onSubmit: (values: UserLoginRequest) => {
            dispatch(loginAsyncApi(values))
        }
    })

    return (
        <form onSubmit={formLogin.handleSubmit} className='login-container'>
            <div className='login-form-container'>
                <div className='login-form'>
                    <i className='login-icon fa-solid fa-user'></i>
                    {isInvalidAccount &&
                        <div className='fst-italic mt-3 alert alert-danger w-75' role='alert'>
                            Invalid email or password!
                        </div>
                    }
                    <div className='form-group w-75'>
                        <h5 className='fw-bold text-light'>Username or Email</h5>
                        <input type="text" className='form-control custom-input' id='usernameOrEmail'
                            onChange={formLogin.handleChange} onBlur={formLogin.handleBlur}
                        />
                        {formLogin.errors.usernameOrEmail &&
                            <p className='text-warning fw-bold'>{formLogin.errors.usernameOrEmail}</p>
                        }
                    </div>
                    <div className='form-group w-75 mt-3'>
                        <h5 className='fw-bold text-light'>Password</h5>
                        <input type="password" className='form-control custom-input' id='password'
                            onChange={formLogin.handleChange} onBlur={formLogin.handleBlur}
                        />
                        {formLogin.errors.password &&
                            <div className='text-warning fw-bold'>{formLogin.errors.password}</div>
                        }
                    </div>
                    <div className='form-group mt-4 w-75 text-center'>
                        <button
                            className='btn text-dark w-100 fw-bold'
                            style={{ backgroundColor: '#AAFFFF', opacity: 0.8 }}
                            type='submit'
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}