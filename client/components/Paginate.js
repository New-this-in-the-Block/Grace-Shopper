import React from 'react'
import {Link} from 'react-router-dom'


export default function Paginate ({prodPerPage, totalProds, paginator, currentPage}) {
    const pageNums = []
    
    for (let i=0; i<= Math.floor(totalProds/prodPerPage); i++){
        pageNums.push(i+1)
    }
    
    const previous = () => {
        if(currentPage > 1){
            return currentPage - 1
        }
        return currentPage
    }
    const next = () => {
        if(currentPage < pageNums.length){
            return currentPage + 1
        }
        return currentPage
    }

  
    if(!currentPage) return null
    return (
        <nav className='pagenav'>
            <ul className='pagination'>
                <li className="page-item"><Link className="page-link" to={`/products/page/${previous()}`} onClick={()=> paginator(previous())}>Previous</Link></li>
                {pageNums.map(page=> (
                <li key={page} className='page-item'>
                    <Link to={`/products/page/${page}`} onClick={()=> paginator(page)} className='page-link'>{page}</Link>
                </li>
                ))}
                <li className="page-item"><Link className="page-link" to={`/products/page/${next()}`} onClick={()=> paginator(next())}>Next</Link></li>
            </ul>
        </nav>
    ) 
}

