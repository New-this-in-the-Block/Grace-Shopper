import React from 'react'
import {Link} from 'react-router-dom'

export default function Paginate ({prodPerPage, totalProds, paginator}) {
    const pageNums = []

    for (let i=0; i<= Math.ceil(totalProds/prodPerPage); i++){
        pageNums.push(i+1)
    }

    return (
        <nav>
            <ul className='pagination'>{pageNums.map(page=> (
                <li key={page} className='page-item'>
                    <Link to={`/products/page/${page}`} onClick={()=> paginator(page)} className='page-link'>{page}</Link>
                </li>
            ))}
            </ul>
        </nav>
    )
}