import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeDetail, resetdetail } from "../../redux/actions/actions";
import "./RecipeDetail.css";

export const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const recipeDetail = useSelector((state) => state.recipeDetail);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => dispatch(resetdetail());
  }, [dispatch, id]);

  
  return (
    <div className="recipedetail">
      <div className="homebtn">
        <Link className='detailink' to={`/home`}>Home</Link>
      </div>
      <div className="box">
        <div>
          <h2 className="h3D">{recipeDetail.name}</h2>
        </div>
        <div>
          <img src={recipeDetail.image} alt="img" className="image" width="370px" height="280px"/>
        </div>
        <div>
          <h4 className="h4D">
            Ideal for {recipeDetail.dishTypes?.join(", ")}
          </h4>
        </div>
        <h3>TYPES OF DIETS</h3>
        <div className="detailtypes">
          {recipeDetail.diets?.map((e) => {
            return (
              <h4 className="diet" key={e}>
                {e}
              </h4>
            );
          })}
        </div>
        <div>
          <h5>SUMMARY</h5>
          <p className="pe"
            dangerouslySetInnerHTML={{__html: recipeDetail.summary}}//cambiar, con regEx
          />
        </div>
        <div>
          <h4 className="h4D">HEALTH SCORE: {recipeDetail.healthScore}</h4>
        </div>
        <div>
          <h4 className="h4D">STEP BY STEP:</h4>
          {recipeDetail.steps &&
            recipeDetail.steps.map((e) => {
              return (
                <div className="steps" key={e.number}>
                  <h4>{e.number}</h4>
                  <p>{e.step}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};