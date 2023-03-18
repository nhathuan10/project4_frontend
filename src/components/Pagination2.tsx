import React from 'react'

type Props = {
    currentPage: number
    totalPages: number
    paginate: Function
}

export default function Pagination2({ currentPage, totalPages, paginate }: Props) {
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

    return (
        <div className='d-flex justify-content-center my-2'>
            <ul className='pagination'>
                <li className='page-item' onClick={() => paginate(1)}>
                    <button className='page-link'>First Page</button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginate(number)} className={'page-item ' + (currentPage === number ? 'active' : '')}>
                        <button className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
                <li className='page-item' onClick={() => paginate(totalPages)}>
                    <button className='page-link'>Last Page</button>
                </li>
            </ul>
        </div>
    )
}