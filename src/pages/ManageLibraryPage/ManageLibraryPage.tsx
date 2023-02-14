import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import AllCategories from './components/AllCategories'

type Props = {}

export default function ManageLibraryPage({ }: Props) {
    return (
        <div className='container'>
            <div className='mt-5'>
                <nav>
                    <div className='nav nav-tabs' id='nab-tab' role='tablist'>
                        <button className='nav-link active' id='nav-category-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-category' type='button' role='tab' aria-controls='nav-category' aria-selected='false'
                        >
                            Category
                        </button>
                        {/* <button className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book' aria-selected='false'
                        >
                            Add new book
                        </button>
                        <button className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' aria-selected='true'
                        >
                            Change quantity
                        </button>
                        <button className='nav-link' id='nav-add-messages-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' aria-selected='false'
                        >
                            Messages
                        </button> */}
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-category' role='tabpanel' aria-labelledby='nav-category-tab'>
                        <AllCategories />
                    </div>
                    {/* <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel' aria-labelledby='nav-add-book-tab'>
                        Add new book
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                        Change quantity
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-mesasges-tab'>
                        Admin message
                    </div> */}
                </div>
            </div>
        </div>
    )
}