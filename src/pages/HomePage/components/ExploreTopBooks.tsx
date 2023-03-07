import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function ExploreTopBook({ }: Props) {
    return (
        <div className='p-5 mb-4 header d-flex justify-content-center align-items-center'>
            <div className='container-fluid text-white text-center'>
                <div>
                    <h1 className='display-3 fw-bold'>Find your next adventure</h1>
                </div>
            </div>
        </div>
    )
}