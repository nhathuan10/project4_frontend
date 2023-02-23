import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookModel } from '../../models/BookModel'
import { deleteBookApi, getBooksApi } from '../../redux/BookReducer/bookReducer'
import { DispatchType, RootState } from '../../redux/configStore'
import { NavLink } from 'react-router-dom'
import Pagination from '../../components/Pagination'

type Props = {}

export default function AllBooksPage({ }: Props) {
    const { bookResponse } = useSelector((state: RootState) => state.bookReducer)
    const { bookState } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 4
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const indexOfLastBook: number = currentPage * booksPerPage
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        dispatch(getBooksApi(currentPage - 1, booksPerPage))
        window.scroll(0, 0)
    }, [bookState, currentPage])

    useEffect(() => {
        if (bookResponse) {
            setTotalAmountOfBooks(bookResponse.totalElements)
            setTotalPages(bookResponse.totalPages)
        }
    }, [currentPage])

    const deleteBookHandler = (id: number) => {
        dispatch(deleteBookApi(id))
    }

    const renderBooks = () => {
        return bookResponse?.content.map((book: BookModel, index: number) => (
            <tr key={index}>
                <th scope="row">{book.id}</th>
                <td>
                    <img src={book.img} alt="..." width={150} height={150} />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.copies}</td>
                <td>{book.copiesAvailable}</td>
                <td>{book.categoryName}</td>
                <td>
                    <NavLink to={`/admin/book/update/${book.id}`} className='btn btn-info me-2'>Update</NavLink>
                    <button className='btn btn-danger' onClick={() => deleteBookHandler(book.id)}>Delete</button>
                </td>
            </tr>
        ))
    }

    return (
        <div className='container'>
            <h2 className='text-center m-3'>All Books</h2>
            <NavLink to='/admin/book/add-book' className='btn btn-primary mb-2'>Add Book</NavLink>
            {totalAmountOfBooks > 0 &&
                <div className='mt-3'>
                    <h5>Number of results: {totalAmountOfBooks}</h5>

                    <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Description</th>
                                <th scope="col">Copies</th>
                                <th scope="col">Copies Available</th>
                                <th scope="col">Category</th>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderBooks()}
                        </tbody>
                    </table>
                </div>
            }
            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    )
}