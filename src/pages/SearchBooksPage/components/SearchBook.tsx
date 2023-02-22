import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

export default function SearchBook({ }: Props) {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {/* {props.book.img ? */}
                            {/* <img src={props.book.img} width='123' height='196' alt='book' /> : */}
                            <img src={require('../../../assets/img/BooksImages/book.png')} width='123' height='196' alt='book' />
                        {/* } */}
                    </div>
                    {/* <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.book.img ?
                            <img src={props.book.img} width='123' height='196' alt='book' /> :
                            <img src={require('../../../Images/BooksImages/book-luv2code-1000.png')} width='123' height='196' alt='book' />
                        }
                    </div> */}
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            author
                        </h5>
                        <h4>title</h4>
                        <p className='card-text'>description</p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <NavLink to={`/checkout/3`} className='btn btn-md main-color text-white'>View Details</NavLink>
                </div>
            </div>
        </div>
    )
}