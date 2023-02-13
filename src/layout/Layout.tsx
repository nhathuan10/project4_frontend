import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../assets/components/Footer'
import Navbar from '../assets/components/Navbar'

type Props = {}

export default function Layout({ }: Props) {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar />
            <div className='flex-grow-1'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}