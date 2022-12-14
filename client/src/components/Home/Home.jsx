import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllRecipes, getDietTypes } from "../../redux/actions/actions";
import Paging from "../Paginado/Paging";
import RecipesGrid from "../Recipes/RecipesGrid";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  let { recipes } = useSelector((state) => state);
  const [currentpage, setCurrentPage] = useState(1); //lo seteo en un 1 porque siempre arranco por la primer pagina
  const recipesPerPage = 9; // cantidad de recetas por pagina

  const indexOfLastRecipe = currentpage * recipesPerPage; 
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; 

  let currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //para dividir la cantidad de recetas por pagina

  const paging = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  React.useEffect(() => {
    dispatch(getDietTypes());
    dispatch(getAllRecipes());
  }, [dispatch]);

  return !recipes.length ? (
    <div className="spinnercontainer">
      <div className="spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  ) : (
    <div className="Home">
      <div>
        <NavBar paging={paging}/>
      </div>
      <div className="paging">
        <Paging
          recipesPerPage={recipesPerPage}
          recipesL={recipes.length}
          paging={paging}
        />
      </div>
      <div>
        <RecipesGrid currentRecipes={currentRecipes} />
      </div>
    </div>
  );
}