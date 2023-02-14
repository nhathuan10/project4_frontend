import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CategoryModel } from '../../models/CategoryModel'

type Props = {}

export default function ManageLibraryPage({ }: Props) {
    const [category, setCategory] = useState<string>()

    const addCategory = (category: string) => {

    }

    return (
        <div className='container'>
            <h2 className='m-3 text-center'>All Categories</h2>
            <form>
                <div className='d-flex align-items-center p-2'>
                    <span className='fw-bold'>Category:</span>
                    <div className='form-group mx-3'>
                        <input
                            type="text"
                            className='form-control'
                            id='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn btn-success'
                            type='submit'
                            // onClick={addCategory}
                        >
                            Add Category
                        </button>
                    </div>
                </div>
            </form>
            <Outlet />
        </div>
    )
}