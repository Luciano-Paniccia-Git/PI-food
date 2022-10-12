import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetRecipes, searchRecipe} from '../../redux/actions'
import './SearchBar.css'

export const SearchBar = ({reset}) => {
    let [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(searchRecipe(name))
        setName('')
    }

    const handleReset = (e) => {
        e.preventDefault()
        setName('')
        reset()
        dispatch(resetRecipes())
    }

    return (
        <div className='searchcontainer'>
            <div>
                <input className='input' type='text' name='name' placeholder='Pork...' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div>
                <button onCLick={handleClick} className='btn'>Buscar</button>
            </div>
            <div>
                <button onClick={handleReset} className='btn'>Ver todo</button>
            </div>
        </div>
    )
}