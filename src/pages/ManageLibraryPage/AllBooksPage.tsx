import React from 'react'

type Props = {}

export default function AllBooksPage({ }: Props) {
    return (
        <div className='container'>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Description</th>
                        <th scope="col">Copies</th>
                        <th scope="col">Copies Available</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>
                            <img
                                src="https://i.pravatar.cc?u=2"
                                alt="..."
                                width={150}
                                height={150}
                            />
                        </td>
                        <td>Book 1</td>
                        <td>Author 1</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry</td>
                        <td>1</td>
                        <td>111111111</td>
                        <td>Category 1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}