import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryModel } from '../models/CategoryModel'
import { getBooksApi, getBooksByCategoryApi, getBooksByTitleApi } from '../redux/BookReducer/bookReducer'
import { DispatchType, RootState } from '../redux/configStore'

type Props = {
    searchTitle: string
    category: CategoryModel | null
}

export default function Pagination({ searchTitle, category }: Props) {
    const { currentPage } = useSelector((state: RootState) => state.bookReducer)
    const { totalPages } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()

    const pageNumbers = []
    if (currentPage === 1) {
        pageNumbers.push(currentPage)
        if (totalPages >= currentPage + 1) {
            pageNumbers.push(currentPage + 1)
        }
        if (totalPages >= currentPage + 2) {
            pageNumbers.push(currentPage + 2)
        }
    } else if (currentPage > 1) {
        if (currentPage >= 3) {
            pageNumbers.push(currentPage - 2)
            pageNumbers.push(currentPage - 1)
        } else {
            pageNumbers.push(currentPage - 1)
        }
        pageNumbers.push(currentPage)
        if (totalPages >= currentPage + 1) {
            pageNumbers.push(currentPage + 1)
        }
        if (totalPages >= currentPage + 2) {
            pageNumbers.push(currentPage + 2)
        }
    }

    const paginateHandler = (number: number) => {
        if (searchTitle != '') {
            dispatch(getBooksByTitleApi(searchTitle, number, 4))
        } else if (category != null) {
            dispatch(getBooksByCategoryApi(category.id, number, 4))
        } else {
            dispatch(getBooksApi(number, 4))
        }
        window.scroll(0, 0)
    }

    return (
        <div className='d-flex justify-content-center my-2'>
            <ul className='pagination'>
                <li className='page-item' onClick={() => paginateHandler(0)}>
                    <button className='page-link'>First Page</button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginateHandler(number - 1)}
                        className={'page-item ' + (currentPage === number ? 'active' : '')}>
                        <button className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
                <li className='page-item' onClick={() => paginateHandler(totalPages - 1)}>
                    <button className='page-link'>Last Page</button>
                </li>
            </ul>
        </div>
    )
}