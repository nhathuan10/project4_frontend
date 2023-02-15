import React from 'react'

type Props = {}

export default function ({ }: Props) {
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
                            <a className='nav-link' href='/'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/'>Search Books</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/admin'>Admin</a>
                        </li>
                    </ul>
                    {/* <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <a type='button' className='btn btn-outline-light' href='*'>Sign in</a>
                        </li>
                        <li>
                            <button className='btn b btn-outline-light'>Logout</button>
                        </li>

                    </ul> */}
                </div>
            </div>
        </nav>
    )
}