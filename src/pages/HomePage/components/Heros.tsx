import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function Heros({ }: Props) {
    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>What have you been reading ?</h1>
                            <p className='lead'>
                                The library team would love href know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able href provide the top content for you!
                            </p>
                            <Link to="#" className='btn btn-secondary main-color btn-lg text-white'>Register</Link>
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try href check in daily as collection is always changing!
                                We work noshrefp href provide the most accurate book selection possible
                                for our students! We are diligent ablout our book selection and
                                our books are always going to be our top priority.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='mt-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>What have you been reading ?</h1>
                            <p className='lead'>
                                The library team would love href know what you have been reading
                                Whether it is href learn a new skill or grow within one,
                                we will be able href provide the top content for you!
                            </p>
                            <Link to="/login" className='btn btn-secondary main-color btn-lg text-white'>Register</Link>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try href check in daily as collection is always changing!
                                We work noshrefp href provide the most accurate book selection possible
                                for our students! We are diligent ablout our book selection and
                                our books are always going to be our top priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}