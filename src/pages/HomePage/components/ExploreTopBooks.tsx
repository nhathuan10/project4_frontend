import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function ExploreTopBook({ }: Props) {
    return (
        <div className='p-5 mb-4 header d-flex justify-content-center align-items-center'>
            <div className='container-fluid text-white text-center'>
                <h1 className='heading-primary'>Find your next adventure</h1>
            </div>
        </div>
    )
}