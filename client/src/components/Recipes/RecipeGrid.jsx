import React from 'react'
import { Link } from 'react-router-dom'
import { RecipeDetail } from './RecipeDetail'
import './RecipeGrid.css'

export default function RecipeGrid({currentRecipes}) {
    return ( 
        <div className='RecipeGrid'>
            {
                currentRecipes?.map(e => {
                    return (
                        <div className='recipeholder' key={e.id}>
                            <Link to={`/home/${e.id}`} className='detailink'>
                                <RecipeDetail 
                                    name={e.name}
                                    image={e.image}
                                    diets={e.diets}
                                    />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}