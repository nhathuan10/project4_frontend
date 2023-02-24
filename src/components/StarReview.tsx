import React from 'react'

type Props = {
    rating: number
    size: number
}

export default function StarReview({ rating, size }: Props) {
    let fullStar = 0
    let halfStar = 0
    let emptyStar = 0

    if (rating !== undefined && rating > 0 && rating <= 5) {
        for (let i = 0; i <= 4; i++) {
            if (rating - 1 >= 0) {
                fullStar++
                rating--
            } else if (rating === 0.5) {
                halfStar++
                rating = rating - 0.5
            } else if (rating == 0) {
                emptyStar++
            } else {
                break
            }
        }
    } else {
        emptyStar = 5
    }

    return (
        <div>
            {Array.from({ length: fullStar }, (_, index) =>
                <i key={index} className="fa-solid fa-star" style={{ fontSize: size, color: '#6bff00' }}></i>
            )}
            {Array.from({ length: halfStar }, (_, index) =>
                <i key={index} className="fa-solid fa-star-half-stroke" style={{ fontSize: size, color: '#6bff00' }}></i>
            )}
            {Array.from({ length: emptyStar}, (_, index) =>
                <i key={index} className="fa-regular fa-star" style={{ fontSize: size, color: '#6bff00' }}></i>
            )}
        </div>
    )
}