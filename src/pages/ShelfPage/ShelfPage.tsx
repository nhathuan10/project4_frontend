import React from 'react'
import Loans from './components/Loans'

type Props = {}

export default function ShelfPage({ }: Props) {
    return (
        <div className='container'>
            <div className='mt-3'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab>' role='tablist'>
                        <button onClick={() => { }} className='nav-link background-main-color' id='nav-loans-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-loans' type='button' role='tab' aria-controls='nav-loans' aria-selected='true'
                        >
                            Loan
                        </button>
                        <button onClick={() => { }} className='nav-link background-main-color' id='nav-history-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-history' type='button' role='tab' aria-controls='nav-history' aria-selected='false'
                        >
                            Your History
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-loans' role='tabpanel' aria-labelledby='nav-loans-tab'>
                        <Loans /> 
                    </div>
                    <div className='tab-pane fade' id='nav-history' role='tabpanel' aria-labelledby='nav-history-tab'>
                        {/* {historyClick ? <HistoryPage /> : <></>} */} History page
                    </div>
                </div>
            </div>
        </div>
    )
}