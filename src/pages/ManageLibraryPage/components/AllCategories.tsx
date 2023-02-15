import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryModel } from '../../../models/CategoryModel'
import { deleteCategoryApi, getCategoriesApi } from '../../../redux/CategoryReducer/categoryReducer'
import { DispatchType, RootState } from '../../../redux/configStore'

type Props = {}

export default function AllCategories({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const dispatch: DispatchType = useDispatch()

    const deleteCategory = (id: number) => {
        dispatch(deleteCategoryApi(id))
    }

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <tr key={index}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>
                    <button className='btn btn-info me-2'>Update</button>
                    <button className='btn btn-danger' onClick={() => deleteCategory(category.id)}>Delete</button>
                </td>
            </tr>
        ))
    }

    useEffect(() => {
        dispatch(getCategoriesApi())
    })

    return (
        <table className="table table-striped">
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
    )
}