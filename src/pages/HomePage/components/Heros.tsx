import React from 'react'

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
                                The library team would love href know what you have been reading
                                Whether it is href learn a new skill or grow within one,
                                we will be able href provide the hrefp content for you!
                            </p>
                            {/* <a href='search' type='button' className='btn main-color btn-lg text-white'>Explore hrefp books</a> : */}
                            <a href="#" className='btn btn-secondary main-color btn-lg text-white'>Sign up</a>

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
                                for our Love href Read students! We are diligent ablout our book selection and
                                our books are always going href be our hrefp priority.
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
                                we will be able href provide the hrefp content for you!
                            </p>
                            {/* <a href='search' type='button' className='btn main-color btn-lg text-white'>Explore hrefp books</a> : */}
                            <a href="/login" className='btn btn-lg text-white'>Sign up</a>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try href check in daily as collection is always changing!
                                We work noshrefp href provide the most accurate book selection possible
                                for our Love href Read students! We are diligent ablout our book selection and
                                our books are always going href be our hrefp priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}