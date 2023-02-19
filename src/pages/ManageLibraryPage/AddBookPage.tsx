import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookRequest } from '../../models/BookModel'
import { CategoryModel } from '../../models/CategoryModel'
import { addBookApi } from '../../redux/BookReducer/bookReducer'
import { getCategoriesApi } from '../../redux/CategoryReducer/categoryReducer'
import { RootState, DispatchType } from '../../redux/configStore'

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
                    <form action="post">
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required onChange={(e) => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Author</label>
                                <input type="text" className='form-control' name='author' required onChange={(e) => setAuthor(e.target.value)} value={author} />
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
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type="number" className='form-control' name='copies' required onChange={(e) => setCopies(Number(e.target.value))} value={copies} />
                        </div>
                        <h5>Image</h5>
                        <input type="file" onChange={e => base64ConversionForImages(e)} />
                        <img
                            src={img}
                            alt="..."
                            width={150}
                            height={150}
                        />
                        {/* <input type="file" onChange={(e: any) => setImg(e.target.files[0])} /> */}
                        {/* <input type="text" onChange={(e) => setImg(e.target.value)} value={img}/> */}
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={addBookHandler}>Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}