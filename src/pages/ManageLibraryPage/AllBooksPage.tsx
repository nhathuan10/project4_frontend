import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { BookModel } from '../../models/BookModel'
import { getBooksApi } from '../../redux/BookReducer/bookReducer'
import { DispatchType, RootState } from '../../redux/configStore'

type Props = {}

export default function AllBooksPage({ }: Props) {
    const { books } = useSelector((state: RootState) => state.bookReducer)
    const { bookState } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getBooksApi())
    }, [bookState])

    const renderBooks = () => {
        return books.map((book: BookModel, index: number) => (
            <tr key={index}>
                <th scope="row">{book.id}</th>
                <td>
                    <img
                        src={book.img}
                        alt="..."
                        width={150}
                        height={150}
                    />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.copies}</td>
                <td>{book.copiesAvailable}</td>
                <td>{book.categoryName}</td>
            </tr>
        ))
    }

    return (
        <div className='container'>
            <h2 className='text-center m-3'>All Books</h2>
            <NavLink to='/admin/book/add-book' className='btn btn-primary mb-2'>Add Book</NavLink>
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
                    </tr>
                </thead>
                <tbody>
                    {renderBooks()}
                </tbody>
            </table>
        </div>
    )
}