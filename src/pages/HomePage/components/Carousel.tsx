import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookModel } from '../../../models/BookModel'
import { getBooksApi } from '../../../redux/BookReducer/bookReducer'
import { DispatchType, RootState } from '../../../redux/configStore'
import ReturnBook from './ReturnBook'

type Props = {}

export default function Carousel({ }: Props) {
    const { bookResponse } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getBooksApi())
    }, [])
    console.log(bookResponse)

    const renderTopBooks = (x: number, y: number) => {
        if (bookResponse) {
            return bookResponse?.content.slice(x, y).map((book: BookModel, index: number) => (
                <ReturnBook book={book} key={index} />
            ))
        } else {
            return (
                <>
                    <ReturnBook bookImg={`book_${x}`} />
                    <ReturnBook bookImg={`book_${y}`} />
                </>
            )
        }
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h2 className='carousel-title'>Our hot books</h2>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 d-none d-lg-block' data-bs-interval='false'>
                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-content-center'>
                            {renderTopBooks(0, 2)}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-content-center'>
                            {renderTopBooks(2, 4)}
                        </div>
                    </div>
                </div>
                <button
                    className='carousel-control-prev'
                    type='button'
                    data-bs-target='#carouselExampleControls'
                    data-bs-slide='prev'
                >
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden' aria-hidden='true'>Previous</span>
                </button >
                <button
                    className='carousel-control-next'
                    type='button'
                    data-bs-target='#carouselExampleControls'
                    data-bs-slide='next'
                >
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden' aria-hidden='true'>Next</span>
                </button>
            </div>
            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    {bookResponse?.content[0] && (
                        <ReturnBook book={bookResponse.content[0]} />
                    )}
                </div>
            </div>        
        </div >
    )
}