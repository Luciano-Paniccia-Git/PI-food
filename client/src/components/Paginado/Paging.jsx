import React from 'react'
import './Paging.css'

const Paging = ({recipesPerPage, recipesL, paging}) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(recipesL/recipesPerPage); i++) {//el Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
        //i <= 100/9 = 11.11 => Math.ceil(11.11) = 12
        pageNumbers.push(i)
    }
    
  return (
    <nav className='pagenav'>
        <ul className='pagelist'>
            {
                pageNumbers && pageNumbers.map(e => 
                    (
                        <li key={e} className='pagenumber'>
                            <a href={() => false} className='apage' onClick={() => paging(e)}>{e}</a>
                        </li>
                    )
                )
            }
        </ul>
    </nav>
  )
}

export default Paging