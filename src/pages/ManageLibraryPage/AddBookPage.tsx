import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryModel } from '../../models/CategoryModel'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import { RootState, DispatchType } from '../../redux/configStore'

type Props = {}

export default function AddBookPage({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const dispatch: DispatchType = useDispatch()
    const [categorySelected, setCategorySelected] = useState('')
    const [displayWarning, setDisplayWarning] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [category, setCategory] = useState('Category')

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <li key={index}>
                <a
                    className="dropdown-item"
                    onClick={() => setCategorySelected(category.name)}>
                    {category.name}
                </a>
            </li>
        ))
    }

    useEffect(() => {
        dispatch(getCategoriesApi())
        setCategorySelected('Please Select')
    }, [])

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess &&
                <div className='alert alert-success' role='alert'>
                    Book Added Successfully
                </div>
            }
            {displayWarning &&
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className='card'>
                <div className='card-header'>Add a new book</div>
                <div className='card-body'>
                    <form action="post">
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Author</label>
                                <input type="text" className='form-control' name='author' required />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Category</label>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {categorySelected}
                                    </a>
                                    <ul className="dropdown-menu">
                                        {renderCategories()}
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} ></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type="number" className='form-control' name='copies' required />
                        </div>
                        <input type="file" />
                        <div>
                            <button type='button' className='btn btn-primary mt-3' >Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}