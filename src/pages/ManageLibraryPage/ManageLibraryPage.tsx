import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CategoryModel, CategoryRequest } from '../../models/CategoryModel'
import { DispatchType } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { addCategoryApi } from '../../redux/CategoryReducer/categoryReducer'

type Props = {}

export default function ManageLibraryPage({ }: Props) {
    const dispatch: DispatchType = useDispatch()
    const [category, setCategory] = useState<string>('')

    const addCategory = (category: string) => {
        const categoryRequest: CategoryRequest = { name: category }
        dispatch(addCategoryApi(categoryRequest))
    }

    return (
        <div className='container'>
            <h2 className='m-3 text-center'>All Categories</h2>
            <form onSubmit={() => addCategory(category)}>
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