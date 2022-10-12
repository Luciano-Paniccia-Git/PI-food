import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getRecipeDetail, resetdetail } from '../../redux/actions';
import './RecipeDetail.css'

export const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    const recipeDetail = useSelector((state) => state.recipeDetail)
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getRecipeDetail(id));
        return () => dispatch(resetdetail())
    }, [dispatch, id])

    return (
        <div className="recipedetail">
            <div className='homebtn'>
                <Link className="detailLink" to='/home'>Home</Link>
            </div>
            <div className="box">
                <div>
                    <h2 className="h3d">{recipeDetail.name}</h2>
                </div>
                <div>
                    <img src={recipeDetail.image} alt='img' className='image'/>
                </div>
                <div>
                    <h4 className="h4d">
                    Ideal para {recipeDetail.dishTypes?.join(',')}
                    </h4>
                </div>
                <div className="detailtypes">
                    {recipeDetail.diets?.map((e) => {
                        return (
                            <h4 className="diet" key={e}>
                                {e}
                            </h4>
                        )
                    })}
                </div>
                <div>
                    <p className="pe"
                    dangerouslySetInnerHTML={{__html: recipeDetail.summary}}
                    />
                </div>
                <div>
                    <h4 className="h4d">Paso a paso:</h4>
                    {recipeDetail.steps &&
                        recipeDetail.steps.map((e) => {
                            return (
                                <div className="steps" key={e.number}>
                                    <h4>{e.number}</h4>
                                    <p>{e.steps}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )

}