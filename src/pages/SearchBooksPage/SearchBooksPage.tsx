import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import SearchBar from '../../components/SearchBar'
import { BookModel } from '../../models/BookModel'
import { CategoryModel } from '../../models/CategoryModel'
import { getBooksApi, getBooksByCategoryApi, getBooksByTitleApi } from '../../redux/BookReducer/bookReducer'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import { DispatchType, RootState } from '../../redux/configStore'
import SearchBook from './components/SearchBook'

type Props = {}

export default function SearchBooksPage({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const { bookResponse } = useSelector((state: RootState) => state.bookReducer)
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
        dispatch(getCategoriesApi())
    }, [])

    useEffect(() => {
        if (searchTitle !== '') {
            dispatch(getBooksByTitleApi(searchTitle))
            setCategorySelected('Search By Category')
            setCategoryObj(null)
        } else if (searchTitle == '' && categoryObj != null) {
            dispatch(getBooksByCategoryApi(categoryObj.id))
        } else {
            dispatch(getBooksApi())
        }
    }, [searchTitle])

    const searchByCategoryHandler = (category: CategoryModel) => {
        setCategorySelected(category.name)
        setCategoryObj(category)
        setSearchTitle('')
        dispatch(getBooksByCategoryApi(category.id))
    }

    const allBooksHandler = () => {
        setSearchTitle('')
        setCategoryObj(null)
        setCategorySelected('Search By Category')
        dispatch(getBooksApi())
    }

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <li key={index}>
                <a className='dropdown-item' onClick={() => searchByCategoryHandler(category)}>{category.name}</a>
            </li>
        ))
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <SearchBar
                        categorySelected={categorySelected}
                        allBooksHandler={allBooksHandler}
                        renderCategories={renderCategories}
                        searchTitle={searchTitle}
                        setSearchTitle={setSearchTitle}
                    />
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
                            <Link to="/messages" type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'>Library Services</Link>
                        </div>
                    }
                    {totalPages > 1 && <Pagination searchTitle={searchTitle} category={categoryObj} />}
                </div>
            </div>
        </div>
    )
}