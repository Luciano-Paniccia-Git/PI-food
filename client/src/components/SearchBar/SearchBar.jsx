import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecipes, searchRecipe } from '../../redux/actions/actions'
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
        dispatch(getAllRecipes())
    }

  return (
    <div className='searchcontainer'>
        <div>
          <input className='input' 
            type='text'
            name='name' 
            placeholder='Buscar receta...' 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleClick} className='btn'>Buscar</button>
        </div>
        <div>
          <button onClick={handleReset} className='btn'>Actualizar</button>
        </div>
    </div>
  )
}