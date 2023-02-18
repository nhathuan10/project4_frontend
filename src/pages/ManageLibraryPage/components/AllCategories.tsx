import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { CategoryModel, CategoryRequest } from '../../../models/CategoryModel'
import { deleteCategoryApi, getCategoriesApi, getCategoryByIdApi, updateCategoryApi } from '../../../redux/CategoryReducer/categoryReducer'
import { DispatchType, RootState } from '../../../redux/configStore'

type Props = {}

export default function AllCategories({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const { categoryState } = useSelector((state: RootState) => state.categoryReducer)
    const { categoryById } = useSelector((state: RootState) => state.categoryReducer)
    const [newCategory, setNewCategory] = useState('')
    const { id } = useParams() as any
    const dispatch: DispatchType = useDispatch()

    const deleteCategory = (id: number) => {
        dispatch(deleteCategoryApi(id))
    }

    const updateCategoryDisplay = (id: number) => {
        dispatch(getCategoryByIdApi(id))
    }

    const updateCategory = (id: number, updateCategoryRequest: CategoryRequest) => {
        dispatch(updateCategoryApi(id, updateCategoryRequest))
    }

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <tr key={index}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>
                    <NavLink
                        to={`/admin/category/${category.id}`}
                        className='btn btn-info me-2'
                        onClick={() => updateCategoryDisplay(category.id)}
                    >
                        Update
                    </NavLink>
                    <button
                        className='btn btn-danger'
                        onClick={() => deleteCategory(category.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))
    }

    useEffect(() => {
        dispatch(getCategoriesApi())
    }, [categoryState])

    useEffect(() => {
        if (categoryById) {
            setNewCategory(categoryById.name)
        }
    }, [categoryById])

    return (
        <>
            {id && (
                <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <div className='d-flex align-items-center p-2'>
                        <span className='fw-bold'>Category Id:</span>
                        <div className='form-group mx-3 d-flex'>
                            <input
                                type="text"
                                className='form-control me-2'
                                id='id'
                                value={categoryById?.id}
                            />
                            <input
                                type="text"
                                className='form-control'
                                id='name'
                                value={newCategory}
                                placeholder='add new name'
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <button
                                className='btn btn-info'
                                type='submit'
                                onClick={() => updateCategory(id, { name: newCategory })}
                            >
                                Update Category
                            </button>
                        </div>
                    </div>
                </form>
            )}
            <table className="table table-striped w-75">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderCategories()}
                </tbody>
            </table>
        </>
    )
}