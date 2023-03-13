import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookModel } from '../../models/BookModel'
import { deleteBookApi, getBooksApi, getBooksByCategoryApi, getBooksByTitleApi } from '../../redux/BookReducer/bookReducer'
import { DispatchType, RootState } from '../../redux/configStore'
import { NavLink } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { CategoryModel } from '../../models/CategoryModel'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import SearchBar from '../../components/SearchBar'

type Props = {}

export default function AllBooksPage({ }: Props) {
    const { bookResponse } = useSelector((state: RootState) => state.bookReducer)
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const { bookState } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()
    const { currentPage } = useSelector((state: RootState) => state.bookReducer)
    const booksPerPage = 4
    const { totalAmountOfBooks } = useSelector((state: RootState) => state.bookReducer)
    const { totalPages } = useSelector((state: RootState) => state.bookReducer)
    const [searchTitle, setSearchTitle] = useState('')
    const [categorySelected, setCategorySelected] = useState('Search By Category')
    const [categoryObj, setCategoryObj] = useState<CategoryModel | null>(null)


    const indexOfLastBook: number = currentPage * booksPerPage
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks

    useEffect(() => {
        dispatch(getBooksApi(currentPage - 1, booksPerPage))
        window.scroll(0, 0)
    }, [bookState])

    const deleteBookHandler = (id?: number) => {
        dispatch(deleteBookApi(id))
    }

    useEffect(() => {
        if (searchTitle !== '') {
            dispatch(getBooksByTitleApi(searchTitle))
            setCategorySelected('Search By Category')
            setCategoryObj(null)
        } else if (searchTitle == '' && categoryObj != null) {
            dispatch(getBooksByCategoryApi(categoryObj?.id))
        } 
    }, [searchTitle])

    useEffect(() => {
        dispatch(getCategoriesApi())
    }, [])

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

    const allBooksHandler = () => {
        setSearchTitle('')
        setCategoryObj(null)
        setCategorySelected('Search By Category')
        dispatch(getBooksApi())
    }
    const searchByCategoryHandler = (category: CategoryModel) => {
        setCategorySelected(category.name)
        setCategoryObj(category)
        setSearchTitle('')
        dispatch(getBooksByCategoryApi(category.id))
    }

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <li key={index}>
                <a className='dropdown-item' onClick={() => searchByCategoryHandler(category)}>{category.name}</a>
            </li>
        ))
    }

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Books Management</h2>
            <div className='text-end'>
                <NavLink to='/admin/book/add-book' className='btn btn-primary'>Add Book</NavLink>
            </div>
            <SearchBar
                categorySelected={categorySelected}
                allBooksHandler={allBooksHandler}
                renderCategories={renderCategories}
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
            />
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
            {totalPages > 1 && <Pagination searchTitle={searchTitle} category={categoryObj} />}
        </div>
    )
}