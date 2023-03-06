import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/configStore'

type Props = {}

export default function LibraryServices({ }: Props) {
    const { userLogin } = useSelector((state: RootState) => state.userReducer)

    const renderService = () => {
        if (userLogin) {
            let isUserRole = false
            for (let role of userLogin?.roles) {
                if (role.name === 'ROLE_USER') {
                    isUserRole = true
                    break
                }
            }
            if (userLogin && isUserRole) {
                return (
                    <Link to='/messages' className='btn btn-secondary main-color btn-lg text-white'>Library Services</Link>
                )
            } else if (userLogin) {
                return (
                    <></>
                )
            }
        } else {
            return (
                <Link to='/login' className='btn btn-secondary main-color btn-lg text-white'>Sign In</Link>
            )
        }
    }

    return (
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Can't find what you are looking for?
                    </h1>
                    <p className='lead'>
                        If you cannot find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        {renderService()}
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>
    )
}