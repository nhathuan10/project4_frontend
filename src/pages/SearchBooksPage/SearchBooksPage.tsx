import React, { useState } from 'react'
import Pagination from '../../components/Pagination'
import SearchBook from './components/SearchBook'

type Props = {}

export default function SearchBooksPage({ }: Props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [booksPerPage] = useState(5)
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const indexOfLastBook: number = currentPage * booksPerPage
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
                                    placeholder='Search'
                                    aria-label='Search'
                                // onChange={e => setSearch(e.target.value)}
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
                                    {/* <li onClick={() => categoryField('All')}>
                                        <a href="#" className='dropdown-item'>All</a>
                                    </li>
                                    <li onClick={() => categoryField('FE')}>
                                        <a href="#" className='dropdown-item'>Front End</a>
                                    </li>
                                    <li onClick={() => categoryField('BE')}>
                                        <a href="#" className='dropdown-item'>Back End</a>
                                    </li>
                                    <li onClick={() => categoryField('Data')}>
                                        <a href="#" className='dropdown-item'>Data</a>
                                    </li>
                                    <li onClick={() => categoryField('Devops')}>
                                        <a href="#" className='dropdown-item'>DevOps</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <SearchBook />
                    <SearchBook />
                    <SearchBook />
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    {/* {totalAmountOfBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: {totalAmountOfBooks}</h5>
                            </div>
                            <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id}></SearchBook>
                            ))}
                        </> :
                        <div className='m-5'>
                            <h3>Can't find what you are looking for ?</h3>
                            <a href="#" type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'>Library Services</a>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    } */}
                </div>
            </div>
        </div>
    )
}