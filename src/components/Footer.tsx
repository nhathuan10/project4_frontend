import React from 'react'

type Props = {}

export default function Footer({ }: Props) {
    const footerStyle = {
        color: '#CCCCFF',
        fontSize: 20,
        margin: 6
    }

    return (
        <div className='main-color'>
            <footer className='container d-flex flex-wrap justify-content-between align-items-center py-4 main-color'>
                <p className='col-md-4 mb-0 text-light fw-bold'>Huan's Library</p>
                <ul className='nav navbar-dark col-md-4 justify-content-end'>
                    <li className='nav-item'>
                        <a href="https://www.facebook.com/">
                            <i className="fa-brands fa-facebook" style={footerStyle}></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.google.com/">
                            <i className="fa-brands fa-google" style={footerStyle} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/">
                            <i className="fa-brands fa-instagram" style={footerStyle} />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/">
                            <i className="fa-brands fa-twitter" style={footerStyle}></i>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}