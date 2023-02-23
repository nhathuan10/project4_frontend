import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../../components/Pagination'
import { BookModel } from '../../models/BookModel'
import { CategoryModel } from '../../models/CategoryModel'
import { getBooksApi, getBooksByTitleApi } from '../../redux/BookReducer/bookReducer'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import { DispatchType, RootState } from '../../redux/configStore'
import SearchBook from './components/SearchBook'

type Props = {}

export default function SearchBooksPage({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const { bookResponse } = useSelector((state: RootState) => state.bookReducer)
    const { booksResponseByTitle } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()
    const { currentPage } = useSelector((state: RootState) => state.bookReducer)
    const booksPerPage = 4
    const { totalAmountOfBooks } = useSelector((state: RootState) => state.bookReducer)
    const { totalPages } = useSelector((state: RootState) => state.bookReducer)
    const [searchTitle, setSearchTitle] = useState('')

    const indexOfLastBook: number = currentPage * booksPerPage
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks

    useEffect(() => {
        dispatch(getCategoriesApi())
    }, [])

    useEffect(() => {
        if (searchTitle !== '') {
            dispatch(getBooksByTitleApi(searchTitle))
        } else {
            dispatch(getBooksApi())
        }
    }, [searchTitle])

    console.log(bookResponse)

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <li key={index}>
                <a href="#" className='dropdown-item'>{category.name}</a>
            </li>
        ))
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input
                                    className='form-control'
                                    type='search'
                                    placeholder='Search By Title'
                                    aria-label='Search'
                                    onChange={e => setSearchTitle(e.target.value)}
                                />
                                <button
                                    className='btn btn-outline-success ms-2'
                                // onClick={searchHandleChange}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle'
                                    type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    {/* {categorySelection} */}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    {renderCategories()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: {totalAmountOfBooks}</h5>
                            </div>
                            <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                            {bookResponse?.content.map((book: BookModel, index: number) => (
                                <SearchBook book={book} key={index} />
                            ))}
                        </> :
                        <div className='m-5'>
                            <h3>Can't find what you are looking for ?</h3>
                            <a href="#" type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'>Library Services</a>
                        </div>
                    }
                    {totalPages > 1 && <Pagination />}
                </div>
            </div>
        </div>
    )
}