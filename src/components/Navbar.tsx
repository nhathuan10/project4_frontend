import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../redux/configStore'
import { ACCESS_TOKEN, settings, USER_LOGIN } from '../utils/config'

type Props = {}

export default function ({ }: Props) {
    const { userLogin } = useSelector((state: RootState) => state.userReducer)

    const logoutHandler = () => {
        settings.eraseCookie(ACCESS_TOKEN)
        settings.eraseCookie(USER_LOGIN)
        settings.clearStorage(ACCESS_TOKEN)
        settings.clearStorage(USER_LOGIN)
        window.location.reload()
    }

    const renderLoginUI = () => {
        if (userLogin) {
            return (
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'>
                        <NavLink className='nav-link me-1' to='/'>{userLogin.userEmail}</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link me-1' to='/' onClick={logoutHandler}>Logout</NavLink>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'>
                        <NavLink className='nav-link me-1' to='/login'>Sign In</NavLink>
                    </li>
                </ul>
            )
        }
    }

    const renderAdminUI = () => {
        if (userLogin) {
            let isAdminRole = false
            for (let role of userLogin?.roles) {
                if (role.name === 'ROLE_ADMIN') {
                    isAdminRole = true
                    break
                }
            }
            if (isAdminRole) {
                return (
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/admin/book'>Admin</NavLink>
                    </li>
                )
            }
        }
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color'>
            <div className='container'>
                <span className='navbar-brand logo'>
                    <i className="fa fa-book-open book-icon"></i>
                </span>
                <button
                    className='navbar-toggler nav-btn'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavDropdown'
                    arial-controls='navbarNavDropdown'
                    aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse nav-col d-flex' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search-books'>Search Books</NavLink>
                        </li>
                        {renderAdminUI()}
                    </ul>
                    {renderLoginUI()}
                </div>
            </div>
        </nav>
    )
}