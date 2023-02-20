import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookRequest } from '../../models/BookModel'
import { CategoryModel } from '../../models/CategoryModel'
import { addBookApi } from '../../redux/BookReducer/bookReducer'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import { RootState, DispatchType } from '../../redux/configStore'
import * as yup from 'yup'

type Props = {}

export default function AddBookPage({ }: Props) {
    const { categories } = useSelector((state: RootState) => state.categoryReducer)
    const dispatch: DispatchType = useDispatch()
    const [categorySelected, setCategorySelected] = useState('')
    const [categoryIdSelected, setCategoryIdSelected] = useState<number>(0)
    const [displayWarning, setDisplayWarning] = useState(false)
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState<any>(null)
    const [copies, setCopies] = useState(0)
    const addBookForm = useFormik<BookRequest>({
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
            description: yup.string().required('Description can not be blank').min(10, 'Title is too short'),
            copies: yup.number().required('Copies can not be blank').positive('Copies must not be negative').integer('Copies must be integer'),
            img: yup.string().required('Image can not be blank'),
        }),
        onSubmit: (values: BookRequest) => {

        }
    })

    const renderCategories = () => {
        return categories.map((category: CategoryModel, index: number) => (
            <li key={index}>
                <a
                    className="dropdown-item"
                    onClick={() => {
                        setCategorySelected(category.name)
                        setCategoryIdSelected(category.id)
                    }}>
                    {category.name}
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
        }
        reader.onerror = (error) => {
            console.log('Error', error)
        }
    }

    const addBookHandler = () => {
        const addBook: BookRequest = { title, author, description, copies, img }
        dispatch(addBookApi(categoryIdSelected, addBook))
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
                    <form action="post" onSubmit={addBookForm.handleSubmit}>
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
                            <input type="number" className='form-control' name='copies'
                                required onChange={addBookForm.handleChange} onBlur={addBookForm.handleBlur} />
                            {addBookForm.errors.copies && <div className='text text-danger'>{addBookForm.errors.copies}</div>}
                        </div>
                        <h5>Image</h5>
                        <input type="file" onChange={e => base64ConversionForImages(e)} />
                        <img src={img} alt="..." width={150} height={150} />
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={addBookHandler}>Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}