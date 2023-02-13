import React from 'react'

type Props = {}

export default function ExploreTopBook({ }: Props) {
    return (
        <div className='p-5 mb-4 bg-dark header'>
            <div className='container-fluid py-5 text-white d-flex justify-content-center align-items-center'>
                <div>
                    <h1 className='display-5 fw-bold'>Find your next adventure</h1>
                    <p className='col-md-8 fs-4'>Where would you like to go next?</p>
                    <a href='*' type='button' className='btn btn-secondary btn-lg text-white explore-btn'>Explore top books</a>
                </div>
            </div>
        </div>
    )
}