import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookModel } from '../../models/BookModel'
import { CategoryModel } from '../../models/CategoryModel'
import { addBookApi, getBookByIdApi, updateBookApi } from '../../redux/BookReducer/bookReducer'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import { RootState, DispatchType } from '../../redux/configStore'
import * as yup from 'yup'
import { useParams } from 'react-router-dom'
import { history } from '../../utils/config'

type Props = {}

export default function AddBookPage({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const dispatch: DispatchType = useDispatch()
    const [categorySelected, setCategorySelected] = useState<string | undefined>('')
    const [categoryIdSelected, setCategoryIdSelected] = useState<number | undefined>(0)
    const [displayWarning, setDisplayWarning] = useState(false)
    const [img, setImg] = useState<any>(null)
    const { id } = useParams() as any
    const { book } = useSelector((state: RootState) => state.bookReducer)

    const addBookForm = useFormik<BookModel>({
        initialValues: {
            title: '',
            author: '',
            description: '',
            copies: 0,
            img: ''
        },
        validationSchema: yup.object().shape({
            title: yup.string().required('Title can not be blank').min(5, 'Title is too short'),
            author: yup.string().required('Author can not be blank').min(5, 'Author is too short'),
            description: yup.string().required('Description can not be blank').min(10, 'Title is too short').max(255, 'Title is too long'),
            copies: yup.number().required('Copies can not be blank').integer('Copies must be integer').positive('Copies must be greater than 0'),
            img: yup.string().required('Image need to be updated'),
        }),
        onSubmit: (values: BookModel) => {
            if (categoryIdSelected) {
                if (id) {
                    dispatch(updateBookApi(categoryIdSelected, id, values))
                } else {
                    dispatch(addBookApi(categoryIdSelected, values))
                }
                history.push('/admin/book')
            } else {
                setDisplayWarning(true)
            }
        }
    })

    const renderCategories = () => {
        return categories.map((category?: CategoryModel, index?: number) => (
            <li key={index}>
                <a
                    className="dropdown-item"
                    onClick={() => {
                        setCategorySelected(category?.name)
                        setCategoryIdSelected(category?.id)
                        setDisplayWarning(false)
                    }}>
                    {category?.name}
                </a>
            </li>
        ))
    }

    const base64ConversionForImages = (e: any) => {
        if (e.target.files[0]) {
            getBase64(e.target.files[0])
        }
    }

    const getBase64 = (file: any) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImg(reader.result)
            addBookForm.setFieldValue('img', reader.result)
        }
        reader.onerror = (error) => {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        dispatch(getCategoriesApi())
        setCategorySelected('Please Select')
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getBookByIdApi(id))
        }
    }, [book])

    useEffect(() => {
        if (book && id) {
            setImg(book.img)
        }
    }, [book])

    return (
        <div className='container mt-5 mb-5'>
            <div className='card'>
                <div className='card-header fw-bold'>
                    {id ? 'Update Book' : 'Add New Book'}
                </div>
                <div className='card-body'>
                    <form onSubmit={addBookForm.handleSubmit}>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title'
                                    required onChange={addBookForm.handleChange} onBlur={addBookForm.handleBlur} />
                                {addBookForm.errors.title && <div className='text text-danger'>{addBookForm.errors.title}</div>}
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Author</label>
                                <input type="text" className='form-control' name='author'
                                    required onChange={addBookForm.handleChange} onBlur={addBookForm.handleBlur} />
                                {addBookForm.errors.author && <div className='text text-danger'>{addBookForm.errors.author}</div>}
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
                                    {displayWarning &&
                                        <p className='text-danger mt-2' role='alert'>
                                            Category must not be blank
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' name='description' rows={3}
                                onChange={addBookForm.handleChange} onBlur={addBookForm.handleBlur}></textarea>
                            {addBookForm.errors.description && <div className='text text-danger'>{addBookForm.errors.description}</div>}
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type="number" className='form-control' name='copies' min='0'
                                required onChange={addBookForm.handleChange} onBlur={addBookForm.handleBlur} />
                            {addBookForm.errors.copies && <div className='text text-danger'>{addBookForm.errors.copies}</div>}
                        </div>
                        <h5>Image</h5>
                        <input type="file" name='img' onChange={e => base64ConversionForImages(e)} onBlur={addBookForm.handleBlur} />
                        {addBookForm.errors.img && <div className='text text-danger'>{addBookForm.errors.img}</div>}
                        {img && <img src={img} alt="..." width={150} height={150} />}
                        <div>
                            {id ? (
                                <button type='submit' className='btn btn-primary mt-3' >Update Book</button>
                            ) : (
                                <button type='submit' className='btn btn-primary mt-3' >Add Book</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}