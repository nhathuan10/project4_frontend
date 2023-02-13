import React from 'react'
import Carousel from './components/Carousel'
import ExploreTopBooks from './components/ExploreTopBooks'
import Heros from './components/Heros'
import LibraryServices from './components/LibraryServices'

type Props = {}

export default function Homepage({ }: Props) {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    )
}