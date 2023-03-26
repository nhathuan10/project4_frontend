import React from 'react'

type Props = {
    searchTitle: string
    setSearchTitle: Function
    allBooksHandler: any
    categorySelected: string
    renderCategories: Function
}

export default function SearchBar({ searchTitle, setSearchTitle, allBooksHandler, categorySelected, renderCategories }: Props) {
    return (
        <div className='row mt-4'>
            <div className='col-8'>
                <div className='d-flex'>
                    <input
                        className='form-control w-75 custom-input'
                        type='search'
                        placeholder='Search By Title'
                        aria-label='Search'
                        onChange={e => setSearchTitle(e.target.value)}
                        value={searchTitle}
                    />
                    <button
                        className='btn btn-outline-success ms-4 w-25'
                        onClick={allBooksHandler}
                    >
                        All Books
                    </button>
                </div>
            </div>
            <div className='col-3'>
                <div className='drop-down'>
                    <button className='btn btn-secondary secondary mb-2'
                        type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                        {categorySelected}
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                        {renderCategories()}
                    </ul>
                </div>
            </div>
        </div>
    )
}