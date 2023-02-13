import React from 'react'

type Props = {}

export default function ReturnBook({ }: Props) {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                <img src={require('./../../../assets/img/BooksImages/book.png')} alt="..." width='160' height='240' />
                <h6 className='mt-2'>Book</h6>
                <p>Book Library</p>
                <a className='btn btn-secondary main-color text-white'>Reserve</a>
            </div>
        </div>
    )
}